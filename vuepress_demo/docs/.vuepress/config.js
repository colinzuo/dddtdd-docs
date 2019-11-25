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
      locales: {
        '/': {
          label: 'English',
          selectText: 'Languages',
          nav: [
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
          sidebar: {
            '/apple/': getDemoSidebar(),
            '/pear/': getDemoSidebar(),
            '/grape/': getDemoSidebar()
          }
        }
      }
    }
}

function getDemoSidebar () {
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
