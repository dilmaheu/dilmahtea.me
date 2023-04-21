---
Title: Testing
---

Testing is an important part of our software development process. We test features and bug fixes manually. We don't yet have automated tests, but it's on our roadmap.

## Testing Environments

Our website is hosted on Cloudflare Pages. In Cloudflare Pages, there are three environments: _Production_, _Development_, and _Preview_. The _Production_ environment is built from the `main` branch, the _Development_ environment is built from the `dev` branch, and for every other branch, there is a _Preview_ environment for it.

The _Production_ environment is hosted at [https://dilmahtea.me], the _Development_ environment is hosted at [https://dev.dilmahtea-me.pages.dev], and the _Preview_ environments are hosted at subdomains of [https://dilmahtea-me.pages.dev]. The subdomain is hyphenated version of the branch name. For example, the _Preview_ environment for the `feature/xyz` branch is hosted at [https://feature-xyz.dilmahtea-me.pages.dev].

**Note:** The _Development_ environment is not a concept of **Cloudflare Pages**. We treat the _Preview_ environment for the `dev` branch as the _Development_ environment.

## Workflow

We developers first work on a feature or a bug fix from the dev server. It's our duty to make sure everything is working as expected. Then we push the changes to the remote GitHub repository.

When we are working on something, we must create a new branch from the latest `dev` branch. And we should also prefix the branch name correctly, e.g. `feature/`, `bugfix/`, `update/`, `docs/`, etc.

When a branch on GitHub has been updated, Cloudflare automatically rebuilds the corresponding environment. When a new PR has been created, Cloudflare automatically creates a _Preview_ environment for the new branch. The URL of the _Preview_ environment can be found in an auto-generated comment on the PR.

Once the changes have been tested on the _Preview_ environment, and if everything is working as expected, the PR can be approved and merged. Cloudflare will automatically update the _Development_ environment on merge.

The changes will stay on the _Development_ environment for a while. We can test the changes on the _Development_ environment before pushing them to the _Production_ environment. If everything is working as expected, we can merge the `dev` branch into the `main` branch by creating a PR. Cloudflare will automatically update the _Production_ environment.

## Experimental Features

Sometimes, there might be some features that we want to merge into the _Production_ environment, but we don't want to make them available to the public yet. In that case, we can use the [`shouldDisplayExperimentals`](/src/utils/shouldDisplayExperimentals.js) variable to display the experimental features in the dev server, _Preview_ environments, and the _Development_ environment, but not in the _Production_ environment.

We can also do the opposite. If we want to enable a feature only in the _Production_ environment, or if we want to conditionally enable/disable a feature based on the environment, we can use the `shouldDisplayExperimentals` variable.

```astro
---
import shouldDisplayExperimentals from "@utils/shouldDisplayExperimentals";

const { hostname } = Astro.site;
---

{
  !shouldDisplayExperimentals && (
    // Plausible Analytics Tracking Code
    <script
      defer
      src="/rpcq/script.js"
      data-api="/rpcq/event"
      data-domain={hostname}
    />
  )
}
```
