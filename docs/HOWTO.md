## Migrations

### How to run migrations

- for `docker` local setup - run `docker compose exec app npm run migrations`
- for other database locations - run `npm run migrations`

### How to create a migration

Change database schema and run `npm run migrations`.

Consider following when creating migration:

- using meaningful name
- separate dropping/creating tables and columns

## Linting & Formatting

Linting is enabled on pre-commit hook, and manually you can run it with `npm run lint` or
`npm run lint:fix` to automatically apply fixes.

## Git(hub) conventions & guides

### Git(hub) Flow:

1. Checkout and pull latest `dev` branch
2. Make your new feature branch following naming conventions
3. Do your changes, and make pull request in github back to `dev` branch
4. Ask for review, or(and) assign people on your pr to speed up process
5. After receiving enough approves and testing, merge your pull request to `dev`

`Note: make sure to pull dev frequent, to detect compatibility issues early`

### Git naming conventions:

- branch name should start with ticket id, separated by underscore with short description in kebab-case

```
wrong
MID-12_add_cool_feature

wrong
MID-12-add-cool-feature

correct
MID-12_add-cool-feature
```

- commit should include ticket id in square brackets, following by space and meaningful description what was done

```
wrong
MID-12 add new linter rules for react

wrong
(MID-12) add new linter rules for react

wrong
MID-12-add-new-linter-rules-for-react

correct
[MID-12] add linter rules for react hooks
```

## Deploy

We are using Vercel for all the deployments.

All merged pull-requests to the `dev` branch automatically deploy to [dev-server](https://mayak-dev.vercel.app/).

### Feature branches or local development

#### Getting Started

1. Install Vercel cli globally with `npm i -g vercel`
2. Sign in into Vercel ( with github for example )
3. Login cli with `vercel login`

#### How to deploy current app state to your own Vercel instance

1. Initialize Vercel project with `vercel link`, and accept all defaults
   ![vercel link](https://github.com/keenethics/mayak/assets/21224705/83782cc0-090f-49d3-8308-b45709d61ad8)
2. Better will be to set nearest to you region. For it, please, visit `Settings` => `Functions` and set `Function Region` to `Frankfurt` or other one.
3. Create DB on Vercel. Visit tab `Storage` and create postgres DB.
4. Open created project in Vercel dashboard, go to settings, and fill required environment variables
   ![fill environment](https://github.com/keenethics/mayak/assets/21224705/812af0ee-a738-4b3e-938e-280579290599)
   ![saved environment](https://github.com/keenethics/mayak/assets/21224705/a9d5a1e2-bb5b-4231-b6b0-30fb5c262c83)
5. Deploy your app with `vercel deploy`

```sh
❯ vercel deploy
Vercel CLI 33.3.0
🔍  Inspect: https://vercel.com/alex-popov-tech/mayak/7v5j7Ysq6nuzAFNto7ZxRcGcyWtA [1s]
✅  Preview: https://mayak-gl0htomud-alex-popov-tech.vercel.app [1s]
📝  To deploy to production (mayak.vercel.app), run `vercel --prod`
```

`Preview` is the url of deployed app which already can be shared with others ( but might require login to Vercel ).

You can use dev toolbar at the bottom of the page to make truly public link with `share` button.
