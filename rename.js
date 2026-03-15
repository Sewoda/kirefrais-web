import fs from 'fs';
import path from 'path';

const dir = 'c:/composer/kiri/Kirefrais-web/app/assets/images';

const files = fs.readdirSync(dir);
for (const file of files) {
  let newName = file.toLowerCase()
    .replace(/ /g, '_')
    .replace(/'/g, '')
    .replace(/[éèêë]/g, 'e')
    .replace(/[àâä]/g, 'a')
    .replace(/[îï]/g, 'i')
    .replace(/[ôö]/g, 'o')
    .replace(/[ûü]/g, 'u')
    .replace(/[ç]/g, 'c');

  if (newName !== file) {
    fs.renameSync(path.join(dir, file), path.join(dir, newName));
  }
}
console.log('Done renaming images.');
