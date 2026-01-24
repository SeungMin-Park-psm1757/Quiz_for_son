const fs = require('fs');

const quizDataPath = './src/data/quizData.js';
const imagesPath = './crawled_images.json';

if (!fs.existsSync(imagesPath)) {
    console.error("Images file not found. Run crawler first.");
    process.exit(1);
}

const images = JSON.parse(fs.readFileSync(imagesPath, 'utf8'));
let quizData = fs.readFileSync(quizDataPath, 'utf8');

let count = 0;

// Strategy: Replace `answer: "Value"` with `answer: "Value",\n    imageUrl: "URL"` 
// We generally want to inject it after the answer line.
// We also need to remove existing imageUrl lines if they exist for that question to avoid duplicates?
// Or just regex replace the block.
// `quizQuestions` array has objects.
// `answer: "foo"`
// We can use a regex that looks for `answer: "foo"` and appends `imageUrl`.
// Existing `imageUrl` might be on the nextline.
// Let's do a simple replace first.

// 1. Remove existing "imageUrl" lines? 
// Some questions might have `imageUrl: "..."`.
// If I simply append, I might have two `imageUrl` keys in the object? (JS allows it, last wins, but it's messy).
// Or invalid syntax if commas are missing.
// Most entries in `quizData.js` look like:
// {
//   id: "...", ...
//   question: "...",
//   answer: "...",
// },
// Some have `imageUrl`.

// Let's iterate over keys in `images`
Object.entries(images).forEach(([term, url]) => {
    // Regex to find the answer line.
    // We look for: answer: "term", (note the comma or closing brace)
    // Be careful with spacing.
    // The file has `answer: "금붕어",`

    // We want to replace `answer: "term"` with `answer: "term", imageUrl: "url"`
    // But we should check if `imageUrl` is already there. 
    // If it is, we replace it.
    // It's hard to robustly parse JS with Regex.

    // Simplistic approach:
    // 1. Find `answer: "term"`.
    // 2. Check if next line has `imageUrl`.

    // Alternative:
    // Just Replace `answer: "term"` with `answer: "term", imageUrl: "THE_URL"`. 
    // And if there was a `imageUrl` later in the object, valid JS will interpret the second one (duplicate key).
    // But we might screw up commas.

    // Cleanest Regex Replacer:
    // Target: `answer: "term"`
    // Replacement: `answer: "term",\n    imageUrl: "${url}"`

    const regex = new RegExp(`answer:\\s*"${term}"`, 'g');
    if (regex.test(quizData)) {
        // We found matches.
        quizData = quizData.replace(regex, `answer: "${term}",\n    imageUrl: "${url}"`);
        count++;
    }
});

// Now we might have duplicate `imageUrl` keys if one already existed. 
// e.g. 
// answer: "fish",
// imageUrl: "new",
// imageUrl: "old",
// This is valid JS (last one wins), BUT we injected "new" BEFORE "old" usually?
// `answer` is usually before `imageUrl` in the file?
// In `quizData.js`:
// answer: "흰동가리",
// imageUrl: "..."
// So `answer` comes first.
// If I inject `imageUrl` right after `answer`, then:
// answer: "...",
// imageUrl: "NEW",
// imageUrl: "OLD"
// "OLD" wins. That's bad. We want NEW to win.
// We should remove old `imageUrl` lines first? 
// Or better: regex replace `imageUrl: ".*"` with empty? No, checking context is hard.

// Better regex:
// Look for the block containing `answer: "term"`.
// If `imageUrl` follows, replace it.
// This is getting complicated for regex.

// Alternative:
// Since `quizData.js` is uniform (formatted), maybe we can assume the structure.
// Most don't have imageUrl.
// Those that do (line 107) have it after answer.

// Let's try to remove all `imageUrl: "..."` lines first?
// `quizData = quizData.replace(/^\s*imageUrl: ".*",?\s*$/gm, '');`
// This removes ALL image urls.
// That is actually what we want, because we want to replace them with crawled ones (or if crawl failed, we lose the placeholder? Crawler has 320 items, likely covers all).
// And if crawler missed it, we lose the placeholder.
// Loremflickr placeholders aren't valuable.
// So yes, removing all existing imageUrl lines is a good start.

console.log("Removing existing imageUrl lines...");
quizData = quizData.replace(/^\s*imageUrl:\s*".*",?\r?\n?/gm, '');

// Now inject.
console.log(`Injecting ${count} images...`);
Object.entries(images).forEach(([term, url]) => {
    const regex = new RegExp(`answer:\\s*"${term}"`, 'g');
    if (regex.test(quizData)) {
        // We use \n for new line, hopefully indent matches roughly or formatted later.
        // The file uses 2 or 4 spaces.
        quizData = quizData.replace(regex, `answer: "${term}",\n    imageUrl: "${url}"`);
    }
});

fs.writeFileSync(quizDataPath, quizData, 'utf8');
console.log("Merge complete.");
