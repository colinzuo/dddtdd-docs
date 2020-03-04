const versioning = require('./lib/versioning.js')

fullSidebars = versioning.sidebars

module.exports = {
    base: '/docs_server/',
    locales: {
      '/': {
        lang: 'en-US',
        title: 'Document Center',
        description: 'Document Center'
      }
    },
    themeConfig: {
      versions: {
        latest: versioning.versions.latest,
        selected: versioning.versions.latest,
        all: versioning.versions.all
      },
      locales: {
        '/': {
          label: 'English',
          selectText: 'Languages',
          nav: [
            {
              text: 'Docs',
              items: versioning.linksFor('getting-started/')
            }
          ],
          sidebar: fullSidebars
        }
      }
    },
    plugins: [
        ['@vuepress/back-to-top', true],
        ['@vuepress/medium-zoom', true],
        ['@vuepress/search', {
            searchMaxSuggestions: 10,
            // Only search the latest version, e.g. 4.3, otherwise many duplicates will show up
            test: `/${versioning.versions.latest.replace('.', '\\.')}/`
        }],
        ['vuepress-plugin-export', true],
    ]
}
