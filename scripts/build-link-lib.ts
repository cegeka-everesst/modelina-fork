/*
This script builds, packs and links the library to a client project for local development.
Re-run the build-link-lib command after making a change to the library to receive the newest version.

REQUIRED ARGS:
- lib: The name of the library you want to build, pack and link.
- clientProject: The name of your client for which you are developing.
  - name of the repository folder of the client

e.g. npm run build-link-lib layout wages-ui
 */

const shell = require('shelljs');
const lib = process.argv[2] ?? '';
const clientProject = process.argv[3] ?? '';

const buildLibCommand = `npx nx build ${lib} --skip-nx-cache --configuration production`;
shell.exec(buildLibCommand, () => {
  const packCommand = `cd dist/libs/${lib} && npm pack`;

  shell.exec(packCommand, () => {
    const linkCommand = `cd ../${clientProject} && npm link ../ui-toolbelt/dist/libs/${lib}`;

    shell.exec(linkCommand, () => {
      console.log('-----------------------------------------------------------------------------');
      console.log(`Successfully linked library (${lib}) to project (${clientProject})`);
      console.log('-----------------------------------------------------------------------------');
    });
  });
});
