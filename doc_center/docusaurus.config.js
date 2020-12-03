var baseUrl = '/'
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  baseUrl = '/docs_server/'
}

module.exports = {
  title: "文档中心",
  tagline: '部署 自动化测试 前端 后端 中间件',
  url: 'https://colinzuo.github.io',
  baseUrl: baseUrl, 
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.png',
  organizationName: 'colinzuo',
  projectName: 'docs_server',
  themeConfig: {
    prism: {
      additionalLanguages: ['java'],
    },
    hideableSidebar: true,
    navbar: {
      title: '文档中心',
      logo: {
        alt: 'DDDTDD Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '站内',
          items: [
            {
              label: '快速上手',
              to: 'docs/',
            },
            {
              label: '博客',
              to: 'blog',
            },
          ],
        },
        {
          title: 'Github',
          items: [
            {
              label: 'Docusaurus',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: 'Markdown语法',
              href: 'https://daringfireball.net/projects/markdown/syntax',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ColinZuo.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "zh"],
      },
    ],
  ],
};
