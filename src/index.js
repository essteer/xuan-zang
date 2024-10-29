if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const ejsMate = require("ejs-mate");
const express = require("express");
const rateLimit = require("express-rate-limit");
// Built-in module to access and interact with file system
const fs = require("fs");
const path = require("path");
// Parse front matter from Markdown files
const { marked } = require("marked");
// Get recursive file walk function
const gatherPaths = require("./public/javascripts/recursivePathWalk");

const app = express();
// Disable X-Powered-By header for your Express app (Snyk)
app.disable("x-powered-by");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
// Configure path to 'views' directory
app.set("views", path.join(__dirname, "views"));
// Configure path to 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  res.set("Expires", "0");
  res.set("Pragma", "no-cache");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("X-Frame-Options", "SAMEORIGIN");
  res.set("X-XSS-Protection", "1; mode=block");
  next();
});

// Main index page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about/about");
});

app.get("/sources", (req, res) => {
  const baseDir = path.join(
    __dirname,
    "views",
    "sources",
    "content",
    "entries"
  );
  // gathers resources from specific subdirectory
  const toolPaths = gatherPaths(path.join(baseDir, "tools"));

  res.render("sources/sources", {
    toolPaths: toolPaths,
  });
});

app.get("/sources/print", (req, res) => {
  const subroute = req.params.subroute;
  const stub = req.params.stub;
  res.render("sources/pages/print");
});

app.get("/works/ink", (req, res) => {
  res.redirect("/ink"); // maintain for backwards compatibility
});

app.get("/ink", function (req, res) {
  const entriesDir = path.join(
    __dirname, // walks through 'content/entries' dir to render content
    "views",
    "works",
    "ink",
    "content",
    "entries"
  );
  const entryPaths = gatherPaths(entriesDir);
  res.render("works/ink/ink", { entryPaths: entryPaths });
});

app.get("/works/ink/moreink", (req, res) => {
  res.redirect("/ink/moreink"); // maintain for backwards compatibility
});

app.get("/ink/moreink", (req, res) => {
  const subroute = req.params.subroute;
  const stub = req.params.stub;
  res.render("works/ink/pages/moreink");
});

app.get("/works/voice", (req, res) => {
  res.redirect("/voice"); // maintain for backwards compatibility
});

app.get("/voice", (req, res) => {
  const entriesDir = path.join(
    // walks through 'content/entries' dir to render content
    __dirname,
    "views",
    "works",
    "voice",
    "content",
    "entries"
  );
  const entryPaths = gatherPaths(entriesDir);
  res.render("works/voice/voice", { entryPaths: entryPaths });
});

app.get("/changelog", (req, res) => {
  const markdownPath = path.join(
    __dirname,
    "views",
    "changelog",
    "changelog.md"
  );

  fs.readFile(markdownPath, "utf8", (err, data) => {
    const htmlContent = marked(data);
    res.render("layouts/boilerplate", { body: htmlContent });
  });
});

// Permitted Markdown pages exist in this directory
const pagesDirectory = path.join(__dirname, "views", "works", "misc", "pages");
// Markdown to HTML rendering for entire pages
app.get("/works/:filename", (req, res) => {
  const filename = req.params.filename;
  const markdownPath = path.join(pagesDirectory, `${filename}.md`);

  fs.access(markdownPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404);
      res.render("utils/status404");
    } else {
      fs.readFile(markdownPath, "utf8", (err, data) => {
        if (err) {
          res.status(404);
          res.render("utils/status404");
        } else {
          const htmlContent = marked(data);
          res.render("works/misc/misc", { content: htmlContent });
        }
      });
    }
  });
});

// Error page routes
app.use((req, res, next) => {
  res.status(404);
  res.render("utils/status404");
});
app.use((req, res, next) => {
  res.status(429);
  res.render("utils/status429");
});
app.use((req, res, next) => {
  res.status(500);
  res.render("utils/status500");
});
app.use((req, res, next) => {
  res.status(503);
  res.render("utils/status503");
});

// Localhost server
app.listen(3000, () => {
  console.log("Serving on port 3000");
});

module.exports = app;
