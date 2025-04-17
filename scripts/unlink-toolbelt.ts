const glob = require('glob');
const fs = require('fs');
const shell = require('shelljs');
// get projects
const toolbeltPath = '../everesst-toolbelt';
glob(`${toolbeltPath}/dist/libs/*/package.json`, (err, res) => {
    if (!err) {
      const tarballPaths: string[] = [];
      const names: string[] = [];
      const currentPath = __dirname;
      res.forEach(file => {
        const obj = JSON.parse(fs.readFileSync(file, 'utf8'));
        const splitted = obj.name.split('/');
        names.push(obj.name);
        tarballPaths.push(`${toolbeltPath}/dist/libs/${splitted[1]}/${splitted.join('-').replace('@', '')}-${obj.version}.tgz`);
        console.log(tarballPaths);
      });
      tarballPaths.forEach(path => {
        const chunks = path.split('/');
        const tgz = chunks.pop();
        const pathWithoutTgz = chunks.join('/').replace('@', '');
        const command = `cd ${pathWithoutTgz} && npm unlink ${tgz} && cd ${currentPath}`;
        shell.exec(command);
      });
      names.forEach(name => shell.exec(`cd ${currentPath} && npm unlink ${name} && npm i`));
    }
  }
);
