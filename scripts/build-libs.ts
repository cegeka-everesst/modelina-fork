import { getLibraryNames } from './library-names';

const shell = require('shelljs');
const libs = getLibraryNames();

const buildProject = function (lib: string): Promise<string> {
  const command = `npx nx build ${lib} --skip-nx-cache --configuration production --verbose`;
  return new Promise((resolve, reject) => {
    shell.exec(command, (err: string, stdout: string) => {
      if (err) {
        console.log(`[${lib}] Failed. Error: ${err}`);
        return reject(err);
      }
      resolve(stdout);
    });
  });
};

libs
  .reduce((p: Promise<string[]>, cmd) => {
    return p.then((results) => {
      return buildProject(cmd).then((stdout) => {
        results.push(stdout);
        return results;
      });
    });
  }, Promise.resolve([]))
  .then(
    () => {
      console.log('All projects built successfully!');
    },
    (err) => {
      console.log('There were some errors building the projects: ', err);
      process.exit(1);
    }
  );
