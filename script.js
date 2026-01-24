/* Game Configuration & Data */
const monsters = [
    { name: "슬라임", emoji: "💧", hp: 2, enter: "말랑말랑 슬라임이 나타났다!", defeat: "으악! 너무 미끄러워~" }, // Stage 1
    { name: "버섯 몬스터", emoji: "🍄", hp: 2, enter: "버섯 몬스터가 춤을 춘다.", defeat: "포자가 다 떨어졌어..." }, // Stage 2
    { name: "심술 고양이", emoji: "😼", hp: 3, enter: "야옹! 생선 내놔!", defeat: "두고보자 야옹!" }, // Stage 3
    { name: "고블린", emoji: "👺", hp: 3, enter: "금화는 내 거야!", defeat: "내 보물 돌려줘~" }, // Stage 4
    { name: "바위 골렘", emoji: "🗿", hp: 3, enter: "나는 돌처럼 단단하다.", defeat: "몸이 부서진다 쿠광!" }, // Stage 5
    { name: "박쥐", emoji: "🦇", hp: 3, enter: "내 날개를 피할 수 있겠느냐!", defeat: "어지러워~ 추락한다!" }, // Stage 6
    { name: "얼음 늑대", emoji: "🐺", hp: 3, enter: "모두 얼려주마!", defeat: "너무 따뜻해... 녹는다..." }, // Stage 7
    { name: "해골 전사", emoji: "💀", hp: 4, enter: "달그락 달그락...", defeat: "뼈밖에 안 남았는데 또 부러지다니!" }, // Stage 8
    { name: "그림자 기사", emoji: "👻", hp: 4, enter: "마왕님을 지킨다!", defeat: "강하군... 지나가라." }, // Stage 9
    { name: "마왕", emoji: "😈", image: "adversary.png", hp: 6, enter: "짐이 바로 마왕이다! 덤벼라!", defeat: "으악! 8살 용사에게 지다니! 평화가 찾아왔군." } // Stage 10 (Boss)
];

/* Game State */
let currentState = {
    stage: 1,
    playerHp: 3,
    enemyMaxHp: 3,
    enemyCurrentHp: 3,
    currentAnswer: 0,
    correctAnswers: 0,
    startTime: 0
};

/* DOM Elements */
const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-screen'),
    gameOver: document.getElementById('game-over-screen'),
    victory: document.getElementById('victory-screen'),
    credits: document.getElementById('credits-screen'),
    hallOfFame: document.getElementById('hall-of-fame-screen')
};

const hud = {
    hearts: document.getElementById('player-hearts'),
    stage: document.getElementById('stage-indicator')
};

const battle = {
    dialogue: document.getElementById('monster-dialogue'),
    emoji: document.getElementById('monster-emoji'),
    name: document.getElementById('monster-name'),
    hpBar: document.getElementById('monster-hp-bar'),
    question: document.getElementById('question-text'),
    buttonsDiv: document.getElementById('answer-buttons')
};

const audio = {
    bgm: document.getElementById('bgm'),
    ending: document.getElementById('ending-music'),
    ctx: null
};

/* Audio System (Web Audio API) */
function initAudio() {
    if (!audio.ctx) {
        audio.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audio.ctx.state === 'suspended') {
        audio.ctx.resume();
    }
    // Play BGM
    playBGM();
}

function playBGM() {
    audio.bgm.volume = 0.3;
    audio.bgm.play().catch(e => console.log("Auto-play blocked", e));
}

function playEndingMusic() {
    audio.bgm.pause();
    audio.bgm.currentTime = 0;
    audio.ending.volume = 0.5;
    audio.ending.play();
}

// Simple Synth for SFX
function playTone(type) {
    if (!audio.ctx) return;
    const osc = audio.ctx.createOscillator();
    const gain = audio.ctx.createGain();

    osc.connect(gain);
    gain.connect(audio.ctx.destination);

    const now = audio.ctx.currentTime;

    if (type === 'attack') {
        // High pitch pew
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (type === 'damage') {
        // Low distorted buzz
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    } else if (type === 'win') {
        // Major Arpeggio
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc2 = audio.ctx.createOscillator();
            const gain2 = audio.ctx.createGain();
            osc2.connect(gain2);
            gain2.connect(audio.ctx.destination);

            const start = now + (i * 0.1);
            osc2.frequency.value = freq;
            gain2.gain.setValueAtTime(0.3, start);
            gain2.gain.exponentialRampToValueAtTime(0.01, start + 0.4);
            osc2.start(start);
            osc2.stop(start + 0.4);
        });
    }
}

/* Core Functions */
function initGame() {
    initAudio(); // Initialize Audio on first user interaction
    currentState.playerHp = 3;
    currentState.stage = 1;
    currentState.correctAnswers = 0;
    currentState.startTime = Date.now();
    loadStage(1);
    showScreen('game');
    updatePlayerHpUI();
}

function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function loadStage(stageNum) {
    currentState.stage = stageNum;
    const monsterData = monsters[stageNum - 1];

    // Set Monster Data
    currentState.enemyMaxHp = monsterData.hp;
    currentState.enemyCurrentHp = monsterData.hp;

    battle.name.textContent = monsterData.name;
    battle.dialogue.textContent = `"${monsterData.enter}"`;

    // Check if monster has image or use emoji
    if (monsterData.image) {
        battle.emoji.innerHTML = `<img src="${monsterData.image}" alt="${monsterData.name}" style="width: 200px; height: 200px; object-fit: contain;">`;
    } else {
        battle.emoji.textContent = monsterData.emoji;
    }

    // Animation: Pop in
    battle.emoji.classList.remove('pop-in');
    void battle.emoji.offsetWidth; // Trigger reflow
    battle.emoji.classList.add('pop-in');

    updateEnemyHpUI();
    hud.stage.textContent = `Stage ${stageNum}/10`;

    generateProblem();
}

function generateProblem() {
    let num1, num2, isPlus, answer;
    const stage = currentState.stage;

    // Difficulty Logic
    // Stage 1-6: Single-digit, addition <= 12, subtraction >= 0
    // Stage 7-8: Addition <= 15, subtraction >= 0
    // Stage 9-10: Addition <= 20, subtraction >= 0

    let type = 'mix_easy'; // Default for stages 1-6
    if (stage >= 7 && stage <= 8) type = 'plus_hard'; // Stages 7-8: addition <= 15
    if (stage >= 9 && stage <= 10) type = 'mix_hard'; // Stages 9-10: addition <= 20

    // Randomize for mix types
    if (type === 'mix_easy') {
        type = Math.random() < 0.5 ? 'plus_easy' : 'sub_easy';
    }
    if (type === 'mix_hard') {
        type = Math.random() < 0.5 ? 'plus_hard' : 'sub_hard';
    }

    /* Generator Implementations */
    if (type === 'plus_easy') {
        // Level 1: Sum <= 12, Single digits (Stages 1-6)
        do {
            num1 = Math.floor(Math.random() * 9) + 1; // 1-9
            num2 = Math.floor(Math.random() * 9) + 1;
        } while (num1 + num2 > 12);
        isPlus = true;
    } else if (type === 'sub_easy') {
        // Level 2: Single digit sub, result >= 0
        num1 = Math.floor(Math.random() * 10); // 0-9
        num2 = Math.floor(Math.random() * 10);
        if (num1 < num2) [num1, num2] = [num2, num1]; // Swap ensures result >= 0
        isPlus = false;
    } else if (type === 'plus_hard') {
        // Level 3: Addition result <= 15 for stages 7-8
        do {
            num1 = Math.floor(Math.random() * 9) + 1; // 1-9
            num2 = Math.floor(Math.random() * 9) + 1; // 1-9
        } while (num1 + num2 > 15);
        isPlus = true;
    } else if (type === 'sub_hard') {
        // Level 4: Subtraction for stages 9-10, single digit sub, result >= 0
        do {
            num1 = Math.floor(Math.random() * 21); // 0-20 for stages 9-10
            num2 = Math.floor(Math.random() * 10); // 0-9
        } while (num1 < num2);
        isPlus = false;
    } else if (type === 'mix_hard') {
        // For stages 9-10: Addition <= 20
        do {
            num1 = Math.floor(Math.random() * 10) + 1; // 1-10
            num2 = Math.floor(Math.random() * 10) + 1; // 1-10
        } while (num1 + num2 > 20);
        isPlus = true;
    }

    answer = isPlus ? num1 + num2 : num1 - num2;
    currentState.currentAnswer = answer;
    battle.question.textContent = `${num1} ${isPlus ? '+' : '-'} ${num2} = ?`;

    generateAnswers(answer);
}

function generateAnswers(correctAnswer) {
    // Generate 3 random wrong answers (total 4 options)
    let answers = [correctAnswer];
    while (answers.length < 4) {
        let offset = Math.floor(Math.random() * 5) + 1;
        let wrong = Math.random() < 0.5 ? correctAnswer + offset : correctAnswer - offset;
        if (wrong >= 0 && !answers.includes(wrong)) { // Keep non-negative
            answers.push(wrong);
        }
    }

    // Shuffle
    answers.sort(() => Math.random() - 0.5);

    // Render Buttons
    battle.buttonsDiv.innerHTML = '';
    answers.forEach(ans => {
        const btn = document.createElement('button');
        btn.className = 'ans-btn';
        btn.textContent = ans;
        btn.onclick = () => checkAnswer(ans);
        battle.buttonsDiv.appendChild(btn);
    });
}

function checkAnswer(selectedAnswer) {
    if (selectedAnswer === currentState.currentAnswer) {
        handleCorrect();
    } else {
        handleWrong();
    }
}

function handleCorrect() {
    // 1. Visual Feedback
    battle.emoji.classList.add('hit-effect');
    setTimeout(() => battle.emoji.classList.remove('hit-effect'), 200);
    playTone('attack');

    // 2. Track correct answer
    currentState.correctAnswers++;

    // 3. Reduce Monster HP
    currentState.enemyCurrentHp--;
    updateEnemyHpUI();

    // 4. Check Monster Death
    if (currentState.enemyCurrentHp <= 0) {
        handleStageClear();
    } else {
        generateProblem();
    }
}

function handleWrong() {
    // 1. Player Damage
    currentState.playerHp--;
    updatePlayerHpUI();
    playTone('damage');

    // 2. Shake Screen
    document.body.classList.add('shake-screen');
    setTimeout(() => document.body.classList.remove('shake-screen'), 500);

    // 3. Check Game Over
    if (currentState.playerHp <= 0) {
        setTimeout(() => showScreen('gameOver'), 500);
    }
}

function handleStageClear() {
    battle.dialogue.textContent = `"${monsters[currentState.stage - 1].defeat}"`;
    playTone('win');

    // Small delay to read the text
    setTimeout(() => {
        if (currentState.stage >= 10) {
            // Save achievement to Hall of Fame
            saveAchievement();
            showScreen('victory');
        } else {
            loadStage(currentState.stage + 1);
        }
    }, 1500);
}

function updatePlayerHpUI() {
    let heartsStr = '';
    for (let i = 0; i < currentState.playerHp; i++) heartsStr += '❤️';
    hud.hearts.textContent = heartsStr;
}

function updateEnemyHpUI() {
    const percentage = (currentState.enemyCurrentHp / currentState.enemyMaxHp) * 100;
    battle.hpBar.style.width = `${percentage}%`;
}

/* Hall of Fame Functions */
function saveAchievement() {
    const endTime = Date.now();
    const totalTime = Math.floor((endTime - currentState.startTime) / 1000); // in seconds

    const achievement = {
        date: new Date().toLocaleString('ko-KR'),
        correctAnswers: currentState.correctAnswers,
        health: currentState.playerHp,
        time: totalTime
    };

    // Get existing achievements
    let achievements = JSON.parse(localStorage.getItem('hallOfFame') || '[]');

    // Add new achievement
    achievements.unshift(achievement); // Add to beginning

    // Keep only last 10 achievements
    if (achievements.length > 10) {
        achievements = achievements.slice(0, 10);
    }

    // Save to localStorage
    localStorage.setItem('hallOfFame', JSON.stringify(achievements));
}

function loadHallOfFame() {
    const achievements = JSON.parse(localStorage.getItem('hallOfFame') || '[]');
    const listElement = document.getElementById('hall-of-fame-list');

    if (achievements.length === 0) {
        listElement.innerHTML = '<div class="empty-hall">아직 기록이 없습니다.<br>게임을 완료하면 명예의 전당에 기록됩니다!</div>';
        return;
    }

    listElement.innerHTML = achievements.map((achievement, index) => `
        <div class="hall-entry">
            <div class="hall-entry-header">🏆 ${index + 1}위 - ${achievement.date}</div>
            <div class="hall-entry-stats">
                <div>✅ 정답 개수: ${achievement.correctAnswers}개</div>
                <div>❤️ 남은 체력: ${achievement.health}</div>
                <div>⏱️ 걸린 시간: ${formatTime(achievement.time)}</div>
            </div>
        </div>
    `).join('');
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
        return `${mins}분 ${secs}초`;
    }
    return `${secs}초`;
}

/* Event Listeners */
document.getElementById('start-btn').addEventListener('click', initGame);
document.getElementById('retry-btn').addEventListener('click', () => {
    // Restart from beginning when game over
    initGame();
});

// Ending Buttons
document.getElementById('ending-btn').addEventListener('click', () => {
    showScreen('credits');
    playEndingMusic();
});

document.getElementById('final-restart-btn').addEventListener('click', () => {
    // Reset Audio
    audio.ending.pause();
    audio.ending.currentTime = 0;
    audio.bgm.play();
    initGame();
});

// Hall of Fame Buttons
document.getElementById('hall-of-fame-btn').addEventListener('click', () => {
    loadHallOfFame();
    showScreen('hallOfFame');
});

document.getElementById('back-to-start-btn').addEventListener('click', () => {
    showScreen('start');
});

document.getElementById('view-hall-of-fame-btn').addEventListener('click', () => {
    loadHallOfFame();
    showScreen('hallOfFame');
});
