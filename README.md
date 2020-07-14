# Gridsome source for Google Anatytics Reporting API

inspired by [antonmedv/gatsby\-source\-google\-analytics\-reporting\-api](https://github.com/antonmedv/gatsby-source-google-analytics-reporting-api)

## Install

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
      use: `gridsome-source-google-analytics-reporting-api`,
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

if you set optional `bindSchema`(line `allContentfulPost`), you can get like this,

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

## License

MIT
