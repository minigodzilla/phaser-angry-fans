const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;
const rootDir = __dirname;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.static(rootDir));

app.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Angry Birds running at http://localhost:${port}`);
});
