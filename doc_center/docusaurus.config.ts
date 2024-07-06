import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

var baseUrl = '/'
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  baseUrl = '/dddtdd-docs/'
}

const config: Config = {
  title: "文档中心",
  tagline: '部署 自动化测试 前端 后端 中间件',
  favicon: 'img/logo.png',

  url: 'https://colinzuo.github.io',
  baseUrl: baseUrl, 

  organizationName: 'colinzuo',
  projectName: 'dddtdd-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    prism: {
      additionalLanguages: ['java'],
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    docs: {
      sidebar: {
        hideable: true
      }
    },
    navbar: {
      title: '文档中心',
      logo: {
        alt: 'DDDTDD Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/colinzuo/dddtdd-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: '上手指南',
              to: '/getting-started/intro',
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
              label: 'Docusaurus',
              href: 'https://github.com/facebook/docusaurus',
            },
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

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      {
        hashed: true,
        indexBlog: false,
        language: ["en", "zh"],
      },
    ],
  ],
};

export default config;
