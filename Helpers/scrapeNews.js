const axios = require("axios");
const cheerio = require("cheerio");
const isNYTArticleUrl = require("./isNytArticle");

let sections = []

async function scrapeSections() {
    const sectionLinks = [];
    const res = await axios.get("https://www.nytimes.com");
    const html = res.data;
    const $ = cheerio.load(html);

    // Select only nav <ul> elements where the sections are
    $('ul[aria-labelledby$="-links-column-header"]').each(function () {
        $(this).find("a").each(function () {
            const sectionId = $(this).text().trim();
            const href = $(this).attr("href");

            if (href && href.startsWith("https://www.nytimes.com/section")) {
                sectionLinks.push({ sectionId, url: href });
            }
        });
    });

    const endPaths = sectionLinks.map(item => item.url.split("/section/")[1]);
    if(endPaths.join(" ") !== sections.join(" ")) sections = endPaths

    // console.log(sectionLinks)
    return sectionLinks;
}

async function scrapeHomePage(){
    const articles = [];
    const res = await axios.get("https://www.nytimes.com");
    const html = res.data;
    const $ = cheerio.load(html);

    $('a').each(function(){
        $(this).each(function(){
            let title = $(this).text().trim();
            const url = $(this).attr('href');

            if(!url || !title) return;

            
            // Normalize relative URLs to absolute
            const absoluteUrl = url.startsWith('http') ? url : `https://www.nytimes.com${url}`;
            
            // This is very very bad code but it works
            if (!isNYTArticleUrl(absoluteUrl)) return;
            if(/<\/?[a-z][\s\S]*>/i.test(title)) return;
            if(/crossword/.test(url)) return;

            articles.push({ title, url: absoluteUrl });
        })
    });

    // console.log(articles);
    return articles;
}

async function scrapeSection(sectionPath){
    const baseURL = "https://www.nytimes.com"

    // Check if the section even exists on the nyt website
    if(sections.length <= 1) await scrapeSections();
    if(!sections.includes(sectionPath)){
        console.log("Wrong section id");
        return null;
    }
    
    const articles = [];
    const res = await axios.get(baseURL + "/section/" + sectionPath + "?page=10");
    const html = res.data;
    const $ = cheerio.load(html);

    $('a').each(function(){
        $(this).each(function(){
            const title = $(this).text().trim();
            let url = $(this).attr('href');

            // console.log({title, url})
            // Example: /2025/07/31/us/politics/trump-tariffs-mexico-extension.html
            // Pattern: /YYYY/MM/DD/ or /YYYY/MM/
            const dateRegex = /^\/\d{4}\/\d{2}(\/\d{2})?\//;
            if (dateRegex.test(url)) {
                if(!url.startsWith("https")) url = baseURL + url;

                articles.push({title, url: baseURL + url})
            }
        })
    });

    return articles;
}

module.exports = {scrapeHomePage, scrapeSection, scrapeSections}