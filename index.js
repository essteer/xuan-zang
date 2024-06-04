if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();
// Disable X-Powered-By header for your Express app (Snyk)
app.disable('x-powered-by');
const path = require("path");
const ejsMate = require("ejs-mate");
// Built-in module to access and interact with file system
const fs = require("fs");
// Parse front matter from Markdown files
const { marked } = require("marked");


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
// Configure path to "views" directory
app.set("views", path.join(__dirname, "views"));
// Configure path to "public" directory
app.use(express.static(path.join(__dirname, "public")));


// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);


// Main index page
app.get("/", (req, res) => {
  // sameSite: "lax" improves navigation performance by permitting back/forward cache restoration
  res.cookie("cookieName", "cookieValue", { sameSite: "lax", secure: true, httpOnly: true });
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


// Markdown to HTML rendering for entire pages
app.get("/:filename", (req, res) => {
  const filename = req.params.filename;
  const markdownPath = path.join(__dirname, "views", "misc", "pages", `${filename}.md`);
  
  fs.readFile(markdownPath, "utf8", (err, data) => {
    if (err) {
      res.send("File not found");
    } else {
      const htmlContent = marked(data);
      res.render("misc/misc", { content: htmlContent });
    }
  });
});
// Create a route for each Markdown post
// fs.readdir('./views/misc', (err, files) => {
//   files.forEach(file => {
//     const name = file.split('.')[0];
//     const filePath = path.join(__dirname, "views", "misc", file);
//     const fileContents = fs.readFileSync(filePath, 'utf8');
//     const html = marked(fileContents);
//     app.get(`/${name}`, (req, res) => {
//       res.render('post', { title: name, content: html });
//     });
//   });
// });


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
