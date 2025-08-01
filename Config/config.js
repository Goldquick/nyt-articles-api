require("dotenv").config({silent: true});

module.exports = {
    server: {
        PORT: process.env.PORT || 8000
    }
}