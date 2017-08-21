var unzip = require('unzip')
var fs = require('fs')
fs.createReadStream('readme.zip').pipe(unzip.Extract({ path: 'extract' }));