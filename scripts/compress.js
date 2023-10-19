const fs = require('fs');
const archiver = require('archiver');
const path = require("path");

const packageJson = require("../package.json");


// create a file to stream archive data to.
const output = fs.createWriteStream(path.join(__dirname, "..", `${packageJson["name"]}-${packageJson["version"]}.zip`));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});


output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});
output.on('end', function() {
  console.log('Data has been drained');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);
archive.directory(path.join(__dirname, "..", "dist"), false);
archive.finalize();