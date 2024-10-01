const fs = require('fs');
const path = require('path');

function gatherPaths(directory) {
    let entryPaths = [];
  
    function traverse(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      entries.forEach(entry => {
        if (entry.isDirectory()) {
          traverse(path.join(dir, entry.name));
        } else if (entry.isFile() && path.extname(entry.name) === '.html') {
          const filePath = path.join(dir, entry.name);
          entryPaths.push(filePath);
        }
      });
    }
  
    traverse(directory);
    return entryPaths;
  }

module.exports = gatherPaths;