---
title: Data Fetching
---

We use [Strapi](https://strapi.io/) as our _Content Management System_. Strapi provides both REST and GraphQL APIs for fetching data. We use the GraphQL API for fetching data in our project.

For every content type, we have a corresponding GraphQL query file in the `src/queries` directory. To fetch data for a new content type, create a new query file in the `src/queries` directory. The file name must be the same as the GraphQL version of the content type name (e.g. `kindnessCauses`, not `Kindness Causes`) and end with the `.graphql` extension. Use plural names for collection types.

The query file must contain a query that fetches all the available attributes for the content type. To fetch data for the localized versions, we use fragments for the attributes to avoid repetition.

**Note:** All the queries must fetch the `locale` attribute. And fragments must be defined before the query.

The fetched data can be accessed from the `CMS` store. The store provides a `get` method that takes the content type name as the argument and returns the data for that content type. It accepts a locale code as the second argument. If provided, it returns the data for the specified locale. Otherwise, it returns the data for the default locale. The default locale always contains the `localizations` field that contains all the localized versions of an entry.

**Note:** If the `locale` code is provided, then the attributes of single types will be direct children of the returned object, and, for collection types, the returned data will be an array of objects, and the attributes will be inside the `attributes` field of each object. And if the `locale` code is not provided, then the returned data will have the same shape as the GraphQL query.

## Example

Suppose, we want to fetch the `Notification` collection type. The GraphQL name of the content type should be `notifications`. So, the name of the query file should be `notifications.graphql`.

The `Notification` content type has the following attributes:

1. `Type`
2. `Content`
3. `Closing_Enabled`

The query file should look like this:

```graphql
fragment NotificationAttributes on Notification {
  locale
  Type
  Content
  Closing_Enabled
}

query Notifications {
  notifications {
    ...NotificationAttributes
    localizations {
      data {
        attributes {
          ...NotificationAttributes
        }
      }
    }
  }
}
```

Then, we can access the data from the `CMS` store like this:

```astro
---
import CMS from "@stores/CMS";

const notifications = CMS.get("notifications");
---

{
  notifications.data.map((notification) => {
    return (
      <div>
        <p>{notification.attributes.Content}</p>
      </div>
    );
  })
}
```

If we want to fetch the data for a specific locale, we can pass the locale code as the second argument to the `get` method:

```astro
---
import CMS from "@stores/CMS";

const { locale } = Astro.props.page;

const notifications = CMS.get("notifications", locale);
---

{
  notifications.map((notification) => {
    return (
      <div>
        <p>{notification.attributes.Content}</p>
      </div>
    );
  })
}
```
