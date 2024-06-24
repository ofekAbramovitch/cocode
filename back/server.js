const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const http = require("http").createServer(app);

app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "public")));
} else {
    const corsOptions = {
        origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
        credentials: true,
    };
    app.use(cors(corsOptions));
}

const codeBlockRoutes = require("./api/code-block/code-block.routes");
const { setupSocketAPI } = require("./services/socket.service");

app.use("/api/codeblock", codeBlockRoutes);
setupSocketAPI(http);

app.get("/**", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const logger = require("./services/logger.service");
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info("Server is running on port: " + port);
});
