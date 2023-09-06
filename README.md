### npm

```sh
cd myapp
npm install
npm validate
npm start
```

If you don't need TailwindCSS, run `npm remove:tailwind` after npm installed.

### Commands

```sh
npm dev             # start development server
npm start           # start development server
npm validate        # run test,lint,build,typecheck concurrently
npm test            # run jest
npm lint            # run eslint
npm lint:fix        # run eslint with --fix option
npm typecheck       # run TypeScript compiler check
npm build           # build production bundle to 'dist' directly
npm prettier        # run prettier for json|yml|css|md|mdx files
npm clean           # remove 'node_modules' 'yarn.lock' 'dist' completely
npm serve           # launch server for production bundle in local
npm remove:tailwind # remove TailwindCSS
```
