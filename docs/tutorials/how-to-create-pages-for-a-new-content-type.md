---
Title: How to create pages for a new content type
---

To create pages for a new content type, follow the below steps:

1. Add a GraphQL query file to the `src/queries` directory. Check out the [Data Fetching](/docs/guides/data-fetching) guide for more details.
2. Generate route data for the new pages type using the `getPages()` & `getPosts()` utilities in the `[...slug].astro` file.
3. Add the route data to the `getStaticPaths` function export.
4. Add a component for the pages to the `src/components/pages` directory.
5. Import & add the component to the `[..slug].astro` component body based on the page type and wrap it with the proper layout component. Create a new layout component if required.

**Note:** Adding code examples for creating pages for a new content type will be too complex to describe in this tutorial. But if we have written the `[...slug].astro` component in a way that it's easy to understand. So, try to follow what we have done in that component to accomplish the above steps. If you have any questions, feel free to ask the seniors.
