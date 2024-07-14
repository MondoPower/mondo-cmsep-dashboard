   # Mondo CMSEP dashboard

This GitHub project provides a development workflow for JavaScript files in Mondo CMSEP dashboard.

In essence, it uses bun to start a development server on [localhost:3000](http://localhost:3000), bundle, build and serve any working file (from the `/src` directory) in local mode. Once pushed up and merged into `main`, it's auto-tagged with the latest semver tag version (using Github CI), and the production code will be auto-loaded from [jsDelivr CDN](https://www.jsdelivr.com/).

**Keep the repository public for jsDelivr to access and serve the file via CDN**

## Install

### Prerequisites

- Have [bun](https://bun.sh/) installed locally. Installation guidelines [here](https://bun.sh/docs/installation) (recommended approach - homebrew / curl)
   - Alternatively, `pnpm` or `npm` will work too.

### Setup

- Run `bun install`
   - Alternatively, `pnpm install` or `npm install`

## Usage

After repository migration, update the repo name and URL in this README file, and the `./src/entry.ts`.

### Output

The project will process and output the files mentioned in the `files` const of `./bin/build.js` file. The output minified files will be in the `./dist/prod` folder for production (pushed to github), and in the `./dist/dev` used for local file serving (excluded from Git).

### Development

1. The initial `entry.js` file needs to be made available via external server first for this system to work (in the `<head>` area of the site).

   ```html
   <script src="https://cdn.jsdelivr.net/gh/MondoPower/mondo-cmsep-dashboard/dist/prod/entry.js"></script>
   ```

   For occasional localhost testing when editing `entry.js`, you'll have to manually include that script like following:
   ```html
   <script src="http://localhost:3000/entry.js"></script>
   ```

2. Add scripts to the Webflow site global settings/page-level, as required, by adding the script path (`.js` instead of `.ts`) to the `window.JS_SCRIPTS` set. **Do not include `/src` in the file path.**

   ```html
   <script>
     window.JS_SCRIPTS.add('{FILE_PATH_1}');
     window.JS_SCRIPTS.add('{FILE_PATH_2}');
   </script>
   ```

   Example:
   ```html
   <script>
     window.JS_SCRIPTS.add('global.js');
   </script>
   ```

3. Whilst working locally, run `bun run dev` to start a development server on [localhost:3000](http://localhost:3000)
   - Alternatively, `pnpm run dev` or `npm run dev`

4. Execute `window.setScriptSource('local')` in the browser console to serve the file from localhost. If local server is not running, it will error out and automatically serve from CDN instead. This preference is saved in the browser's localstorage.

   - To switch back to CDN serving mode, execute `window.setScriptSource('cdn')` from console.

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

- Add any debug console logs in the code using the `console.debug` function instead of `console.log`. This way, they can be toggled on/off using the browser native "Verbose/Debug" level.

### Production CDN

1. Run `bun run build` to generate the production files in `./dist/prod` folder
   - Alternatively, `pnpm run build` or `npm run build`

2. To push code to production, merge the working branch into `main`. A Github Actions workflow will run tagging that version with an incremented [semver](https://semver.org/)) tag. Once pushed, the production code will be auto loaded from [jsDelivr CDN](https://www.jsdelivr.net/).
   - By default, the version bump is a patch (`x.y.{{patch number}}`). To bump the version by a higher amount, mention a hashtag in the merge commit message, like `#major` or `#minor`

3. To create separate environments for `dev` and `staging`, respective branches can be used, and the [jsDelivr file path can be set to load the latest scripts from those respective branches](https://www.jsdelivr.com/documentation#id-github). Note: The [caching for branches lasts 12 hours](https://www.jsdelivr.com/documentation#id-caching) and would hence require a manual purge.
   - To do so, override the `window.PRODUCTION_BASE` variable in the HTML file after the inclusion of `entry.js` script.

#### jsDelivr Notes & Caveats

- Direct jsDelivr links directly use semver tagged releases when available, else falls back to the master branch [[info discussion link](https://github.com/jsdelivr/jsdelivr/issues/18376#issuecomment-1046876129)]
- Tagged version branches are purged every 12 hours from their servers [[info discussion link](https://github.com/jsdelivr/jsdelivr/issues/18376#issuecomment-1046918481)]
- To manually purge a tagged version's files, wait for 10 minutes after the new release tag is added [[info discussion link](https://github.com/jsdelivr/jsdelivr/issues/18376#issuecomment-1047040896)]

[**JSDelivr CDN Purge URL**](https://www.jsdelivr.com/tools/purge)
