import { getLibraryNames } from './library-names';

const shell = require('shelljs');
const nexusRegistry = process.argv[2] ?? '';
const nexusAuth = process.argv[3] ?? '';
const libs = getLibraryNames();
libs.forEach((lib) => {
  const libPath = `dist/libs/${lib}`;
  console.log(`> Running npm publish in ${libPath} ...`);
  const command = `npm publish ${libPath} ${nexusRegistry} ${nexusAuth}`;
  console.log(`> ${command}`);
  shell.exec(command, function (err: string) {
    if (err) {
      process.exit(1);
    }
  });
});
