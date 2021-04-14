var html2json = require('html2json').html2json;
const puppeteer = require('puppeteer')
const fs = require('fs');

//this is the timeout where we will wait untill all the cards are visible.
var timeout = 10;

function main() {
    getHTML(timeout).then(scrapedHTML =>{
        //convert the scraped html to json format so we can loop trough it and make our own objects
        const jsonData = html2json(scrapedHTML)

        const gameList = []
        jsonData.child.map(obj =>{
            const dataObj = {
                "name":obj.child[0].child[1].child[0].text,
                "href":"https://www.nintendo.com" + obj.child[0].attr.href,
                "image": obj.child[0].attr.image,
                "platform": obj.child[0].attr.platform,
                "date": obj.child[0].attr.date,
            }
            gameList.push(dataObj)
        })

        fs.writeFileSync('./GameList.json', JSON.stringify(gameList))
    })
}

//this function will return the innerHTML of the <ul>
function getHTML(timeOut) {
    return new Promise(async function (resolve, reject) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto("https://www.nintendo.com/games/game-guide/#filter/:q=&hitsPerPage=500", { waitUntil: "networkidle2" });
        await page.waitForTimeout(1000 * timeOut);

        //find the button to expand for more games
        try {
            await page.evaluate(() => {
                window.scrollBy(0, window.innerHeight);
            });
            await page.click('[id="btn-load-more"]');
        } catch { }

        //wait untill all the new games are visible.
        await page.waitForTimeout(1000 * timeOut)

        //Get the list class and get every element in this class
        var data = await page.evaluate(() => {
            return document.getElementsByClassName('game-list-results-container grid col-4 col-3-tab col-2-tab-sm')[0].innerHTML;
        });

        resolve(data)
        await browser.close();
    })
}

main();