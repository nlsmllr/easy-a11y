this repo includes the following features/tools:
- [Next.js](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for code style
- [JSX-A11Y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) for live accessibility-checks 
- [JSX-A11Y-CHECK](https://github.com/nlsmllr/eslint-plugin-jsx-a11y-check) for additional linting rules to align with the WCAG
- [Storybook](https://storybook.js.org/) for component development
- [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [msw](https://mswjs.io/) for testing
- [Husky](https://typicode.github.io/husky/) for git hooks
- [Next.js Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) to visualize the size of the production build
- [Vercel CLI](https://vercel.com/docs/cli) for connecting to Vercel projects
- [Google Lighthouse Check](https://developer.chrome.com/docs/lighthouse/overview) for accessibility checks of your most recent deployment
- [HTML Validator](https://www.npmjs.com/package/html-validator-cli) checks the markup validity of HTML code

## Table of Contents
- [Table of Contents](#table-of-contents)
- [General](#general)
  - [Prerequisites](#prerequisites)
  - [Project structure](#project-structure)
  - [Setup](#setup)
- [Code Editor (e.g. VSCode)](#code-editor-eg-vscode)
  - [Environment variables](#environment-variables)
  - [Linting](#linting)
    - [JSX-A11Y](#jsx-a11y)
  - [Testing](#testing)
  - [Storybook](#storybook)
    - [Server components](#server-components)
  - [Git Hooks](#git-hooks)
  - [Bundle Analyzer](#bundle-analyzer)
- [Deployment](#deployment)
- [Version Control (e.g. GitHub)](#version-control-eg-github)
  - [Google Lighthouse Check](#google-lighthouse-check)
  - [HTML Validator](#html-validator)

## General

### Prerequisites
This repository includes various features aimed at the usage of [Vercel](https://vercel.com/) for hosting. To get the best experience from implementing this setup in your project you will need to adjust a few settings within GitHub and Vercel:
**GitHub:**
1. [Your repository] > Settings > Branches > Add branch ruleset
2. Branch targeting criteria: Default
3. Branch rules
   1. Check: Require deployment to succeed
      1. Select: Preview
   2. Check: Require a pull request before merging
   3. Check: Require status check to pass
      1. Check: Require branches to be up to date before merging
      2. Select: generate_lighthouse_audit

**Vercel:**
1. [Your project] > Project Settings > Deployment Protection
2. Disable: Vercel Authentication

### Project structure
The recommended structure for the project is as follows:
- `src`: The main source folder
  - `assets`: Images, fonts, etc.
  - `components`: Reusable components
    - `ComponentName`: Component folder
      - `ComponentName.tsx`: Component file
      - `ComponentName.stories.tsx`: Storybook stories
      - `ComponentName.test.tsx`: Component tests
  - `const`: Shared constants
  - `hooks`: Custom hooks
  - `mocks`: API mocks
    - `handlers.ts`: Mock API handlers
  - `types`: TypeScript types
  - `utils`: Utility functions

### Setup
Some features might work best with VSCode (e.g. automated linting), so it is recommended to use it as the main code editor.  
Contributions are welcome, so please create a PR if you want to add features for your favorite editor.

Here's how to get started:
1. Clone the [eslint-plugin-jsx-a11y-check](https://github.com/nlsmllr/eslint-plugin-jsx-a11y-check) repository to make use of an additional set of ESLint rules in alignment with the WCAG
   1. Run `npm`
   2. Run `npm install`
   3. Run `npm run build`
   4. Run `npm link`
2. Clone this repository
   1. Run `npm link eslint-plugin-jsx-a11y-check` and reload the IDE
   2. Run `yarn` to install the dependencies
   3. Run `yarn dev` to start the development server

## Code Editor (e.g. VSCode)

### Environment variables
Next.js automatically picks up environment variables from `.env.local` and `.env`.  
If your project is deployed to Vercel, you can set environment variables in the Vercel project dashboard. To use those environment variables locally, you can run `yarn env:pull` to sync them to your local `.env.local` file.  
You might need to link your project first using `yarn vercel link`.  
**Warning**: Pulling the env variables will overwrite any changes you made to your local `.env.local` file.

### Linting
The project uses ESLint and Prettier to enforce code style. You can run `yarn lint` to check for linting errors and `yarn lint:fix` to fix them. If you use VSCode, fixing automatically happens on save. This is configured in [.vscode/settings.json](.vscode/settings.json).  
The project also includes a pre-commit hook that runs the linter via `lint-staged` before committing. This is configured in [.husky/pre-commit](.husky/pre-commit).

#### JSX-A11Y
  JSX-A11Y is an extension of the ESLint eco systyem and does a static evaluation of the JSX to spot accessibility issues in React apps.

### Testing
The project uses Vitest for testing. You can run `yarn test` to run the tests or `yarn test:watch` to run the tests in watch mode.  
The project also includes msw to mock API requests. You can find an example for mocks in [src/mocks/handlers.ts](src/mocks/handlers.ts) and for tests using those mocks in [src/mocks/handlers.test.ts](src/mocks/handlers.test.ts).  
The mocks are initialized in [vitest-setup.ts](./vitest-setup.ts).

### Storybook
The project includes Storybook for component development. You can run `yarn storybook` to start the Storybook server. 

#### Server components
Support for Next.js server components is currently experimental.  
Add a `<Suspense>` component around your Story in the decorator like this to use a server component:
```tsx
decorators: [
  Story => (
    <Suspense>
      <Story />
    </Suspense>
  ),
],
```

### Git Hooks
The project uses Husky to run git hooks. The [pre-commit hook](./.husky/pre-commit) runs a few things before committing:
- `yarn` to make sure the dependencies are up to date
- `git add yarn.lock` to make sure the lock file is up to date
- `yarn lint-staged` to check for linting errors
- `yarn test` to run the tests

### Bundle Analyzer
The project includes the [Next.js bundle analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) to visualize the size of the production build. You can run `yarn build:analyze` to start the bundle analyzer. This will build the project and open a new tab in your browser with the bundle analyzer.

## Deployment
The easiest way to deploy the project and make use of the [Google Lighthouse Check](https://developer.chrome.com/docs/lighthouse/overview) and the [HTML Validator](https://www.npmjs.com/package/html-validator-cli) is to use Vercel. The Vercel CLI is already included in the project in case you want to use features like syncing environment variables. To deploy using Vercel, you need to create a new Vercel project and link it to the GitHub repository using the Vercel website.  
This will automagically create a new deployment whenever you push to the GitHub repository.

For other deployment options, check the [Next.js documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Version Control (e.g. GitHub)
You will find the result of the Google Lighthouse Check and the HTML Validator once you have created a pull request from your branch.

### Google Lighthouse Check
Google Lighthouse keeps a watchful eye on various web attributes like:
- Performance
- Best Practices
- SEO
- Accessibility

It runs each audit thrice to triple-check consistency. Currently, it shines a spotlight primarily on the Accessibility score. Our GitHub Action is designed like a vigilant gatekeeper, ensuring that only code compliant with WCAG 2.2 standards can see the light of day, keeping the shadow of inaccessibility at bay.

### HTML Validator
The HTML Validator is your web code’s grammar guru. It checks your HTML against the W3C standards to make sure it’s not committing any syntax faux pas. From missing tags to outdated attributes, this tool ensures your site’s code is not just speaking the language of browsers but is downright eloquent.