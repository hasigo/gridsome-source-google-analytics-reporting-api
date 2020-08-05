# Gridsome source for Google Anatytics Reporting API

inspired by [antonmedv/gatsby\-source\-google\-analytics\-reporting\-api](https://github.com/antonmedv/gatsby-source-google-analytics-reporting-api)

## Install

from GitHub Packages. (**NOTE: MUST auth https://npm.pkg.github.com**)

```
npm i @hasigo/gridsome-source-google-analytics-reporting-api
```

or alternative, direct from GitHub.

```
npm i hasigo/gridsome-source-google-analytics-reporting-api
```

## Configure

In `gridsome.config.js`:

```js
module.exports = {
  plugins: [
    ...
    {
      use: `@hasigo/gridsome-source-google-analytics-reporting-api`,
      options: {
        email: 'your_client_email',
        key: 'your_private_key',
        viewId: `your_view_id`,
        startDate: `2020-07-13`,     // set report from date
        bindSchema: "ContentfulPost" // optional
      }
    },
    ...
};

```

## Usage

```graphql
query {
  allPageViews {
    edges {
      node {
        id
        path
        totalCount
      }
    }
  }
}
```

if you set optional `bindSchema`(like `bindSchema: "ContentfulPost"`), you can get like this,

```graphql
query {
  allContentfulPost {
    edges {
      node {
        id
        title
        totalCount
      }
    }
  }
}
```

**NOTE: can't filter using this property.**

because Gridsome specifications, more detail: [Schema API \- Gridsome](https://gridsome.org/docs/schema-api/#addschemaresolversresolvers)

> Note that any fields you add via custom resolvers will not work in the filter portion of GraphQL queries. This is a gap in Gridsome's GraphQL implementation and will be fixed before Gridsome's 1.0 release.

## License

MIT
