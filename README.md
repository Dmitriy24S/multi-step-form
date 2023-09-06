# Installation

```
npx degit laststance/create-react-app-vite myapp
```

### npm

```sh
cd myapp
pnpm install
pnpm validate
pnpm start
```

If you don't need TailwindCSS, run `pnpm remove:tailwind` after npm installed.

### Commands

```sh
pnpm dev             # start development server
pnpm start           # start development server
pnpm validate        # run test,lint,build,typecheck concurrently
pnpm test            # run jest
pnpm lint            # run eslint
pnpm lint:fix        # run eslint with --fix option
pnpm typecheck       # run TypeScript compiler check
pnpm build           # build production bundle to 'dist' directly
pnpm prettier        # run prettier for json|yml|css|md|mdx files
pnpm clean           # remove 'node_modules' 'yarn.lock' 'dist' completely
pnpm serve           # launch server for production bundle in local
pnpm remove:tailwind # remove TailwindCSS
```
