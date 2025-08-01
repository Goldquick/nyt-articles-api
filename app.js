const express = require("express");
const helmet = require("helmet");
const newsRouter = require("./Routes/news");

// MAIN Express Setup
const app = express();
app.use(express.json());
app.use(helmet());

// Routes here \/
app.use("/", newsRouter);

// Health Check
app.get("/ping", (req, res) => {
    try{
        res.status(200).json({message: "pong!", status: "ok"});
    } catch (err) {
        res.status(500).message({error: "Internal Server Error"});
    }
});

//404 unknown routes
app.use((req, res) => {
    return res.status(404).json({error: "Endpoint not found"});
})




module.exports = app;