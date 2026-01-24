const fs = require('fs');
const path = require('path');

const quizDataPath = path.resolve(__dirname, 'src/data/quizData.js');
let content = fs.readFileSync(quizDataPath, 'utf8');

const items = [];
let currentItem = null;

const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check for start of new item (id property)
    if (line.trim().startsWith('id: "')) {
        // If we were tracking an item and it didn't have an image, push it
        if (currentItem && !currentItem.imageUrl) {
            items.push(currentItem);
        }

        const idMatch = line.match(/id:\s*"([^"]+)"/);
        const catMatch = line.match(/category:\s*"([^"]+)"/);

        currentItem = {
            id: idMatch ? idMatch[1] : 'unknown',
            category: catMatch ? catMatch[1] : 'unknown',
            answer: '',
            imageUrl: null
        };
    }

    if (currentItem) {
        if (line.includes('answer: "')) {
            const ansMatch = line.match(/answer:\s*"([^"]+)"/);
            if (ansMatch) currentItem.answer = ansMatch[1];
        }
        // distinct check for null or empty string
        if (line.includes('imageUrl:')) {
            const imgMatch = line.match(/imageUrl:\s*"([^"]+)"/);
            if (imgMatch && imgMatch[1].trim() !== "") {
                currentItem.imageUrl = imgMatch[1];
            }
        }
    }
}

// Check last item
if (currentItem && !currentItem.imageUrl) {
    items.push(currentItem);
}

console.log(JSON.stringify(items, null, 2));
