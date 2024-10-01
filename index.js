if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
// Disable X-Powered-By header for your Express app (Snyk)
app.disable('x-powered-by');
const path = require('path');
const ejsMate = require('ejs-mate');
// Built-in module to access and interact with file system
const fs = require('fs');
// Parse front matter from Markdown files
const { marked } = require('marked');
// Get recursive file walk function
const gatherPaths = require('./public/javascripts/recursivePathWalk');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
// Configure path to 'views' directory
app.set('views', path.join(__dirname, 'views'));
// Configure path to 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// Main index page
app.get('/', (req, res) => {
  res.cookie('cookieName', 'cookieValue', {
    sameSite: 'lax', // improves navigation performance by permitting back/forward cache restoration
    secure: true,
    httpOnly: true,
  });
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about/about');
});

app.get('/sources', (req, res) => {
  const baseDir = path.join(
    __dirname,
    'views',
    'sources',
    'content',
    'entries'
  );
  // gathers resources from specific subdirectory
  const bookPaths = gatherPaths(path.join(baseDir, 'books'));
  const podcastPaths = gatherPaths(path.join(baseDir, 'podcasts'));
  const toolPaths = gatherPaths(path.join(baseDir, 'tools'));

  res.render('sources/sources', {
    bookPaths: bookPaths,
    podcastPaths: podcastPaths,
    toolPaths: toolPaths,
  });
});

app.get('/works/ink', function (req, res) {
  const entriesDir = path.join(
    __dirname, // walks through 'content/entries' dir to render content
    'views',
    'works',
    'ink',
    'content',
    'entries'
  );
  const entryPaths = gatherPaths(entriesDir);
  res.render('works/ink/ink', { entryPaths: entryPaths });
});

app.get('/works/voice', (req, res) => {
  const entriesDir = path.join(
    // walks through 'content/entries' dir to render content
    __dirname,
    'views',
    'works',
    'voice',
    'content',
    'entries'
  );
  const entryPaths = gatherPaths(entriesDir);
  res.render('works/voice/voice', { entryPaths: entryPaths });
});

// Permitted Markdown pages exist in this directory
const pagesDirectory = path.join(__dirname, 'views', 'works', 'misc', 'pages');
// Markdown to HTML rendering for entire pages
app.get('/works/:filename', (req, res) => {
  const filename = req.params.filename;
  const markdownPath = path.join(pagesDirectory, `${filename}.md`);

  fs.access(markdownPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404);
      res.render('utils/pagenotfound');
    } else {
      fs.readFile(markdownPath, 'utf8', (err, data) => {
        if (err) {
          res.status(404);
          res.render('utils/pagenotfound');
        } else {
          const htmlContent = marked(data);
          res.render('works/misc/misc', { content: htmlContent });
        }
      });
    }
  });
});

// Routes to article stubs
app.get('/sources/print', (req, res) => {
  const subroute = req.params.subroute;
  const stub = req.params.stub;
  res.render('sources/pages/print');
});
app.get('/works/ink/moreink', (req, res) => {
  const subroute = req.params.subroute;
  const stub = req.params.stub;
  res.render('works/ink/pages/moreink');
});

// 404 error page route
app.use((req, res, next) => {
  res.status(404);
  res.render('utils/pagenotfound');
});

// Localhost server
app.listen(3000, () => {
  console.log('Serving on port 3000');
});

module.exports = app;
