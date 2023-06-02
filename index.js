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
  // sameSite: "lax" improves navigation performance by permitting back/forward cache restoration
  res.cookie("cookieName", "cookieValue", { sameSite: "lax", secure: true });
  res.render("index");
});

// Main section routes
app.get("/ink", (req, res) => {
  res.render("ink/ink");
});
app.get("/voice", (req, res) => {
  res.render("voice/voice");
});
app.get("/sources", (req, res) => {
  res.render("sources/sources");
});
app.get("/about", (req, res) => {
  res.render("about/about");
});

// Routes to article stubs
app.get("/:subroute/:stub", (req, res) => {
  const subroute = req.params.subroute;
  const stub = req.params.stub;
  res.render(`${subroute}/pages/${stub}`);
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
