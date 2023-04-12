if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
// Built-in module to access and interact with file system
const fs = require("fs");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
// Configure path to "views" directory
app.set("views", path.join(__dirname, "views"));
// Configure path to "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Main index page
app.get("/", (req, res) => {
  res.render("index");
});

// Xuanzang sections
app.get("/:subroute", (req, res) => {
  const subroute = req.params.subroute;
  res.render(`${subroute}/${subroute}`);
});

// 404 error page route
app.use((req, res, next) => {
  res.status(404);
  res.render("utils/pagenotfound");
});

// Localhost server
app.listen(3000, () => {
  console.log("Serving on port 3000");
});

module.exports = app;
