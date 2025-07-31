const express = require("express");
const NodeCache = require('node-cache');
const {scrapeHomePage, scrapeSections, scrapeSection} = require("../Helpers/scrapeNews");

const cache = new NodeCache({ stdTTL: 60 });
const newsRouter = express.Router();

newsRouter.get("/homepage", async (req, res) => {
    const data = cache.get("homepage");
    if(data) return res.status(200).json(data);

    try{
        const articles = await scrapeHomePage();
        cache.set("homepage", articles);
        return res.status(200).json(articles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
});

newsRouter.get("/newsSections", async (req, res) => {
    const data = cache.get("sections");
    if(data) return res.status(200).json(data);

    try{
        const sections = await scrapeSections();
        cache.set("sections", sections);
        return res.status(200).json(sections);
    } catch (error){
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
});

newsRouter.get("/section/:section", async (req, res) => {
    const data = cache.get(`section:${req.params.section}`);
    if(data) return res.status(200).json(data);

    try{
        const sectionNews = await scrapeSection(req.params.section);
        if(!sectionNews) return res.status(404).json({error: "Invalid section."});

        cache.set(`section:${req.params.section}`, sectionNews);
        return res.status(200).json(sectionNews);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
})


module.exports = newsRouter;