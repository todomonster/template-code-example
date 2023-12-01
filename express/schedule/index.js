// npm i child_process
const { exec } = require("child_process");

main();
async function main() {
  const data = await cmd("dir");
  console.log(data);
  console.log(456);
}

function cmd(指令) {
  return new Promise((resolve, reject) => {
    exec(指令, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      resolve(stdout);
    });
  });
}
