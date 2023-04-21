---
Title: Project Structure
---

We try to follow the below file & folder structure to keep the codebase organized:

- **.gitignore**: Specifies intentionally untracked files to ignore
- **.prettierrc**: Prettier configuration file
- **astro-imagetools.config.mjs**: `astro-imagetools` configuration file
- **astro.config.mjs**: Astro configuration file
- **tailwind.config.mjs**: Tailwind CSS configuration file
- **tsconfig.json**: TypeScript configuration file, _import aliases_ are defined here
- **window.d.ts**: TypeScript declaration file for the extended `window` object
- **docs**: Documentation files
- **docs/basics/\*.md**: Basics
- **docs/guides/\*.md**: Guides
- **docs/recipies/\*.md**: Recipies
- **public**: Static files
- **public/fonts**: Font files
- **public/scripts/\*\*.js**: Static client-side script files
- **src**: Source files
- **src/pages/\*\*.astro**: Astro pages
- **src/pages/db/\*\*.ts**: Static file routes, used to generate client-side accessible data
- **src/components/\*.astro**: Astro components
- **src/components/solid/\*.tsx**: Solid JS components
- **src/components/pages/\*.astro**: Astro components for pages
- **src/components/scripts/\*.astro**: Astro components for generating client-side scripts
- **src/layouts/\*.astro**: Astro layouts
- **src/queries/\*.graphql**: GraphQL queries for fetching data from the CMS
- **src/styles/\*.scss**: Global stylesheets & SASS modules
- **src/stores/\*.(ts|js)**: Server-side stores, used to create easily accessible data sources
- **src/stores/signals/\*.ts**: Solid JS signals, used for sharing data between components
- **src/utils/\*.(ts|js)**: Server-side utilities
- **src/utils/client/\*.ts**: Client-side utilities
- **src/postbuild-integration**: Custom Astro integration code for running post-build tasks
- **src/postbuild-integration/tasks/\*.js**: Post-build tasks
