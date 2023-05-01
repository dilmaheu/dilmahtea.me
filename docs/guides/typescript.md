---
Title: TypeScript
---

Our codebase consists of both TypeScript and JavaScript files. We want to gradually migrate to TypeScript. But we aren't giving it a high priority right now since it'll cost us a lot of efforts. So, we are trying to write new code in TypeScript as much as possible but keeping the existing code as it is.

Astro supports TypeScript out of the box. So, we needn't to do anything special to use TypeScript in our codebase. It can be configured in the `tsconfig.json` file. Check out the [TypeScript Astro guide](https://docs.astro.build/en/guides/typescript/) for more details.

## TODOs

The things we need to do and follow to migrate to a fully typed codebase are:

- [ ] Add types for props of all the components.
- [ ] Write fully typed code inside the components.
- [ ] Convert existing JavaScript stores and utilities to TypeScript.
- [ ] Write fully typed code inside the stores and utilities.
- [ ] Achieve 0 (non false positive) errors after running `pnpm check`.

## `window.d.ts`

We have a TypeScript declaration file in our project root that extends the global `Window` interface. Types for all the extended window property are defined in this file. Whenever you define a new property in the `window` object, or update the type of an existing property, update this file to reflect the changes.

## Import Aliases

We use import aliases to import files from different directories to keep the imports simple. The aliases are defined in the `tsconfig.json` file in the `compilerOptions.paths` property. The preceeding part of every import path must be aliased.

```astro
---
// don't do this
import ClippedPicture from "../../components/ClippedPicture.astro";

// do this
import ClippedPicture from "@components/ClippedPicture.astro";
---
```
