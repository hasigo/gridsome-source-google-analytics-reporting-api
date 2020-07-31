const { google } = require('googleapis');

class SourceGoogleAnalyticsReporting {
  constructor(api, options) {
    const {
      email, key, viewId, startDate, bindSchema,
    } = options;
    this.viewId = viewId;
    this.startDate = startDate;

    this.jwt = new google.auth.JWT({
      email,
      key,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    api.loadSource(async (store) => {
      await this.getContents(store);
    });

    if (bindSchema) {
      api.loadSource(({ addSchemaResolvers }) => {
        const self = this;
        addSchemaResolvers({
          [bindSchema]: {
            totalCount: {
              type: 'Int',
              resolve(obj) {
                return Number(self.resolver(obj));
              },
            },
          },
        });
      });
    }
  }

  resolver(obj) {
    const pv = this.result.data.rows.filter((item) => item[0] === obj.path);
    if (pv.length) {
      return pv.pop()[1];
    }
    return 0;
  }

  async getContents(actions) {
    await this.jwt.authorize();
    this.result = await google.analytics('v3').data.ga.get({
      auth: this.jwt,
      ids: `ga:${this.viewId}`,
      'start-date': this.startDate || '2009-01-01',
      'end-date': 'today',
      dimensions: 'ga:pagePath',
      metrics: 'ga:pageviews',
      sort: '-ga:pageviews',
    });

    const pv = actions.addCollection({
      typeName: 'PageViews',
    });

    // TODO: mod for-of statement to every statement
    // eslint-disable-next-line no-restricted-syntax
    for (const [path, totalCount] of this.result.data.rows) {
      pv.addNode({
        id: path,
        path,
        totalCount: Number(totalCount),
      });
    }
  }
}

module.exports = SourceGoogleAnalyticsReporting;
