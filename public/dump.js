const path = require('path');
const fs = require('fs');
async function getFiles(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  dirents.forEach(dirent => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : console.log(res);
  });
}
const TIMEOUT = 10000;
const watchdog = setTimeout(() => {
  //  console.error('process timed out waiting for subscriptions validation');
}, TIMEOUT);
//console.error('✔ setup watchdog for', TIMEOUT);
async function main() {
  const dir = path.join(process.env['PWD'], '..', 'node_modules', 'full-icu');
  console.log('listing', dir);
  try {
    await getFiles(dir);
  } catch (error) {
    console.log('error', error);
  }
  console.log('done');
  clearTimeout(watchdog);
}
console.log('start');
main();
