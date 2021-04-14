# Nintendo Game Store Scraper
This scraper will return all the listed games in the Nintendo Game Store.

# How does it work?
The script uses puppeteer. It visits the websites and scrolls down to the bottom where it will load all of the games. After that we return the list of games and create a custom array of the listed games. After we have created the custom array we write it to a local json file.

# Installation
First you will have to clone the project.
```console
$ git clone https://github.com/Siddhartt/Nintendo-Game-Store-Scraper
```

## Dependencies
In order to use the scraper you will have to install html2json and puppeteer. Use the following command to install the dependencies.
```console
$ npm install html2json puppeteer
```

## Run the Scraper
To scrape the games run the following command in the same directory as the index.js file.
```console
$ node index.js
```

Congratulations! You have successfully scraped the games.
If there are any errors please send me a dm on Discord
Siddhartt#2194
