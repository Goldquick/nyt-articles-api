const app = require("./app");
const CONFIG = require("./Config/config");

app.listen(CONFIG.server.PORT, () => {
    console.log("🚀 Server running on port:", CONFIG.server.PORT);
});