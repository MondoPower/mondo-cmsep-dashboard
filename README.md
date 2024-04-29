# Webflow JS Starter

This GitHub project provides a development workflow for JavaScript files in Webflow JS Starter.

In essence, it uses bun to start a development server on [localhost:3000](http://localhost:3000), bundle, build and serve any working file (from the `/src` directory) in local mode. Once pushed up and merged into `main`, it's auto-tagged with the latest semver tag version, and the production code will be auto-loaded from [jsDelivr CDN](https://www.jsdelivr.com/).

## Install

### Prerequisites

- Have [bun](https://bun.sh/) installed locally. Installation guidelines [here](https://bun.sh/docs/installation) (recommended approach - homebrew / curl)
   - Alternatively, `pnpm` or `npm` will work too.

### Setup

- Run `bun install`

## Usage

On starting, update the repo name and URL in this README file, and the `./bin/build.js`.

### Output

The project will process and output the files mentioned in the `files` const of `./bin/build.js` file. The output minified files will be in the `./dist/prod` folder for production (pushed to github), and in the `./dist/dev` used for local file serving.

**Keep the repository public for jsDelivr to access and serve the file via CDN**

### Development

1. The initial `entry.js` file needs to be made available via external server first for this system to work (in the `<head>` area of the site).

   ```html
   <script src="https://cdn.jsdelivr.net/gh/igniteagency/{{repo}}/dist/prod/entry.js"></script>
   ```

   For occasional localhost testing when editing `entry.js`, you'll have to manually include that script like following:
   ```html
   <script src="http://localhost:3000/entry.js"></script>
   ```

2. Add scripts to the Webflow site global settings/page-level, as required, by adding the script path to the `window.JS_SCRIPTS` set. **Do not include `/src` in the file path.**

   ```html
   <script>
     window.JS_SCRIPTS.add('{FILE_PATH_1}');
     window.JS_SCRIPTS.add('{FILE_PATH_2}');
   </script>
   ```

3. Whilst working locally, run `bun run dev` to start a development server on [localhost:3000](http://localhost:3000)

4. Execute `window.setScriptsENV('dev')` in browser console to serve the file from localhost. If local server is not running, it will error out and serve from production instead. This preference is saved in the browser's localstorage.

   - To switch back to production mode, execute `window.setScriptsENV('prod')` from console.

5. As changes are made to the code locally and saved, the [localhost:3000](http://localhost:3000) will then serve those files

#### Code execution

To execute code after all the scripts have loaded, the script loader emits an event listener on the `window` object. This can come in handy when you want to ensure a certain imported library from another script file has loaded before executing it.

You can use that as following:

   ```html
   <script>
      import { SCRIPTS_LOADED_EVENT } from 'src/constants';
      window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
         // code to execute after all scripts have loaded
      });
   </script>
   ```

#### Debugging

There is an opt-in debugging setup that turns on logs in the console. The preference can be toggled via browser console, and is stored in browser localStorage.

- Add any console logs in the code using the `window.DEBUG` function. It's a `console.log` wrapper. There is also a `window.IS_DEBUG_MODE` variable to run code conditions on
- Execute `window.setDebugMode(true)` in the console to turn on Debug mode. After reload, the console will start showing code logs.
- To turn it off, execute `window.setDebugMode(false)` in the console.

### Production

1. Run `bun run build` to generate the production files in `./dist` folder

2. To push code to production, merge the working branch into `main`. A Github Actions workflow will run tagging that version with an incremented [semver](https://semver.org/)) tag. Once pushed, the production code will be auto loaded from [jsDelivr CDN](https://www.jsdelivr.net/).
   - By default, the version bump is a patch (`x.y.{{patch number}}`). To bump the version by a higher amount, mention a tag in the commit message, like `#major` or `#minor`

#### jsDelivr Notes & Caveats

- Direct jsDelivr links directly use semver tagged releases when available, else falls back to the master branch [[info discussion link](https://github.com/jsdelivr/jsdelivr/issues/18376#issuecomment-1046876129)]
- Tagged version branches are purged every 12 hours from their servers [[info discussion link](https://github.com/jsdelivr/jsdelivr/issues/18376#issuecomment-1046918481)]
- To manually purge a tagged version's files, wait for 10 minutes after the new release tag is added [[info discussion link](https://github.com/jsdelivr/jsdelivr/issues/18376#issuecomment-1047040896)]

[**JSDelivr CDN Purge URL**](https://www.jsdelivr.com/tools/purge)
