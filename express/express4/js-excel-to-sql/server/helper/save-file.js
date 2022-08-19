const fs = require("fs");
function saveFile(myFileName, writeData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(myFileName, writeData, function (err) {
      if (err) {
        console.log(err);
        return reject(err);
      } else {
        return resolve();
      }
    });
  });
}

module.exports = { saveFile };
