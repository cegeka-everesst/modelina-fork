import { getLibraryNames } from './library-names';

const shell = require('shelljs');
const noGitTagVersionArg = process.argv[2] ?? '';
const versionArg = process.argv[3] ?? '';
const rootPath = __dirname;
const libs = getLibraryNames();
libs.forEach((lib) => {
  console.log(`> Running npm version ${noGitTagVersionArg} ${versionArg}`);
  const command = `cd dist/libs/${lib} && npm version ${noGitTagVersionArg} ${versionArg} && cd ${rootPath}`;
  console.log(`> ${command}`);
  shell.exec(command, function (err: string) {
    if (err) {
      process.exit(1);
    }
  });
});
