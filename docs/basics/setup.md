---
Title: Setup
---

## Node.js

Astro recommends using Node `16.12.0` or higher. We recommend using Node 18 for running this project. Other versions may work, but we do not test against them.

## Package Manager

We use `pnpm` to manage our dependencies. You can install `pnpm` using the following command:

```bash
npm install -g pnpm
```

## Git

We commit the `astro-imagetools` cache directory to Git. Since they are large binary files, we use [Git LFS](https://git-lfs.github.com/) to manage them. So, you need to install Git LFS first from its website before cloning the repository.

If you have already cloned the repository, run the following command to pull the _Git LFS Objects_ from the remote repository:

```bash
git-lfs pull
```

## Editor

We don't recommend any specific editor, but Astro recommends using [VS Code](https://code.visualstudio.com/). **VS Code** has the best language support for Astro, and with a few extensions, the experience gets even better.

### Recommended Extensions

- [**Astro**](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode): Syntax highlighting, code snippets, and more
- [**Prettier**](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Code formatter
- [**Tailwind CSS IntelliSense**](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss): Tailwind CSS class name completion
- [**GraphQL: Language Feature Support**](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql): GraphQL syntax highlighting
