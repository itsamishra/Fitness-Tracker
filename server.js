const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const path = require("path");

// Allows us to serve static react file from build/ directory
app.use(express.static(path.join(__dirname, "build")));

// Serves react app
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/" + "index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
