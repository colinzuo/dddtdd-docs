const versioning = require('./lib/versioning.js')

fullSidebars = versioning.sidebars
fullSidebars['/apple/'] = getDemoSidebar()
fullSidebars['/pear/'] = getDemoSidebar()
fullSidebars['/grape/'] = getDemoSidebar()

module.exports = {
    base: '/docs/group_fruit/',
    locales: {
      '/': {
        lang: 'en-US',
        title: 'Group Fruit',
        description: 'A group of fruits'
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
            },
            {
              text: 'ApplePear',
              items: [
                {
                  text: 'Apple',
                  link: '/apple/',
                },
                {
                  text: 'Pear',
                  link: '/pear/'
                }
              ]
            },
            {
                text: 'Grape',
                link: '/grape/'
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

function getDemoSidebar() {
  return [
    {
      title: "GroupA",
      collapsable: false,
      children: [
        '',
        'page-a-1',
        'page-a-2',
        'page-a-3'
      ]
    },
    {
      title: "GroupB",
      collapsable: false,
      children: [
          'page-b-1',
          'page-b-2',
          'page-b-3'
      ]
    }
  ]
}
