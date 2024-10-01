const fs = require('fs');
const path = require('path');

function gatherPaths(directory) {
    let entryPaths = [];
  
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    entries.forEach(entry => {
        if (entry.isFile() && path.extname(entry.name) === '.html') {
            const filePath = path.join(directory, entry.name);
            entryPaths.push(filePath);
        }
    });

    return entryPaths;
}

module.exports = gatherPaths;