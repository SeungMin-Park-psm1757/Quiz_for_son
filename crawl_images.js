const https = require('https');
const fs = require('fs');

// We need to read the quiz data manually since it's an ES6 module
const quizDataPath = './src/data/quizData.js';
const rawData = fs.readFileSync(quizDataPath, 'utf8');

// Simple regex to extract answer strings. 
// This is not perfect but works if "answer": "Value" pattern is consistent.
const answerRegex = /answer:\s*"([^"]+)"/g;
let match;
const uniqueAnswers = new Set();

while ((match = answerRegex.exec(rawData)) !== null) {
    uniqueAnswers.add(match[1]);
}

console.log(`Found ${uniqueAnswers.size} unique answers to crawl.`);

const answers = Array.from(uniqueAnswers);
const results = {};

function searchWikipediaImage(query) {
    return new Promise((resolve) => {
        const term = encodeURIComponent(query);
        const url = `https://ko.wikipedia.org/w/api.php?action=query&titles=${term}&prop=pageimages&format=json&pithumbsize=500`;
        const options = {
            headers: { 'User-Agent': 'JungWooQuizApp/1.0 (psm1757@gmail.com)' }
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const pages = json.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pageId === '-1') {
                        resolve(null);
                    } else {
                        const page = pages[pageId];
                        if (page.thumbnail && page.thumbnail.source) {
                            resolve(page.thumbnail.source);
                        } else {
                            resolve(null);
                        }
                    }
                } catch (e) {
                    console.error(`Error parsing result for ${query}:`, e.message);
                    resolve(null);
                }
            });
        }).on('error', (e) => {
            console.error(`Error fetching ${query}:`, e.message);
            resolve(null);
        });
    });
}

async function runCrawl() {
    let count = 0;
    for (const answer of answers) {
        count++;
        // console.log(`[${count}/${answers.length}] Searching for: ${answer}`);
        process.stdout.write(`\r[${count}/${answers.length}] Searching for: ${answer}          `);

        try {
            const imageUrl = await searchWikipediaImage(answer);
            if (imageUrl) {
                results[answer] = imageUrl;
            } else {
                // Try removing brackets or extra text if any? 
                // Currently answers seem clean e.g. "사자", "티라노사우루스"
            }
        } catch (e) {
            console.error(e);
        }

        // Politeness delay
        await new Promise(r => setTimeout(r, 200));
    }

    console.log("\nCrawl finished.");
    console.log(`Found images for ${Object.keys(results).length} / ${answers.length} items.`);

    fs.writeFileSync('crawled_images.json', JSON.stringify(results, null, 2));
    console.log("Saved to crawled_images.json");
}

runCrawl();
