module.exports = {
  docs: [
    {
      type: 'category',
      label: '快速上手',
      items: [
        'getting-started/README',
      ],
    },
    {
      type: 'category',
      label: '前端',
      items: [
        'frontend/README',
        {
          type: 'category',
          label: '前端共用',
          items: [
            {
              type: 'autogenerated',
              dirName: 'frontend/common',
            },
          ],
        },
        {
          type: 'category',
          label: 'Angular',
          items: [
            {
              type: 'autogenerated',
              dirName: 'frontend/angular',
            },
          ],
        },
        {
          type: 'category',
          label: 'Flutter',
          items: [
            {
              type: 'autogenerated',
              dirName: 'frontend/flutter',
            },
          ],
        },
        {
          type: 'category',
          label: 'React',
          items: [
            {
              type: 'autogenerated',
              dirName: 'frontend/react',
            },
          ],
        },
        {
          type: 'category',
          label: 'Vue',
          items: [
            {
              type: 'autogenerated',
              dirName: 'frontend/vue',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '后端',
      items: [
        'backend/README',
        {
          type: 'category',
          label: 'Spring',
          items: [
            {
              type: 'autogenerated',
              dirName: 'backend/spring',
            },
          ],
        },
      ]
    },
    {
      type: 'category',
      label: '编程语言',
      items: [
        'programming-languages/README',
        {
          type: 'category',
          label: 'Golang',
          items: [
            {
              type: 'autogenerated',
              dirName: 'programming-languages/golang',
            },
          ],
        },
        {
          type: 'category',
          label: 'Java',
          items: [
            {
              type: 'autogenerated',
              dirName: 'programming-languages/java',
            },
          ],
        },
        {
          type: 'category',
          label: 'Javascript',
          items: [
            {
              type: 'autogenerated',
              dirName: 'programming-languages/javascript',
            },
          ],
        },
        {
          type: 'category',
          label: 'Python',
          items: [
            {
              type: 'autogenerated',
              dirName: 'programming-languages/python',
            },
          ],
        },
      ]
    },
    {
      type: 'category',
      label: '云开发',
      items: [
        'cloud/README',
        'cloud/docker',
        {
          type: 'category',
          label: 'kubernetes',
          items: [
            {
              type: 'autogenerated',
              dirName: 'cloud/kubernetes',
            },
          ],
        },
        {
          type: 'category',
          label: 'helm',
          items: [
            {
              type: 'autogenerated',
              dirName: 'cloud/helm',
            },
          ],
        },
        'cloud/operator',
        'cloud/rancher',
        'cloud/elk',
        'cloud/nginx',
        'cloud/gcloud',
      ]
    },
    {
      type: 'category',
      label: '中间件',
      items: [
        'middleware/README',
        {
          type: 'category',
          label: 'dialogflow',
          items: [
            {
              type: 'autogenerated',
              dirName: 'middleware/dialogflow',
            },
          ],
        },
        {
          type: 'category',
          label: 'kafka',
          items: [
            {
              type: 'autogenerated',
              dirName: 'middleware/kafka',
            },
          ],
        },
        {
          type: 'category',
          label: 'mysql',
          items: [
            {
              type: 'autogenerated',
              dirName: 'middleware/mysql',
            },
          ],
        },
        {
          type: 'category',
          label: 'prometheus',
          items: [
            {
              type: 'autogenerated',
              dirName: 'middleware/prometheus',
            },
          ],
        },
      ]
    },
    {
      type: 'category',
      label: '开发工具',
      items: [
        'tools/README',
        {
          type: 'category',
          label: 'Git',
          items: [
            {
              type: 'autogenerated',
              dirName: 'tools/git',
            },
          ],
        },
        {
          type: 'category',
          label: 'Github',
          items: [
            {
              type: 'autogenerated',
              dirName: 'tools/github',
            },
          ],
        },
        {
          type: 'category',
          label: 'Intellij Idea',
          items: [
            {
              type: 'autogenerated',
              dirName: 'tools/intellij-idea',
            },
          ],
        },
        {
          type: 'category',
          label: 'maven',
          items: [
            {
              type: 'autogenerated',
              dirName: 'tools/maven',
            },
          ],
        },
        {
          type: 'category',
          label: 'rabbitmq',
          items: [
            {
              type: 'autogenerated',
              dirName: 'tools/rabbitmq',
            },
          ],
        },
      ]
    },
    {
      type: 'category',
      label: '主题',
      items: [
        'topic/README',
        {
          type: 'category',
          label: 'API网关',
          items: [
            {
              type: 'autogenerated',
              dirName: 'topic/api-gateway',
            },
          ],
        },
        {
          type: 'category',
          label: 'CI CD',
          items: [
            {
              type: 'autogenerated',
              dirName: 'topic/ci-cd',
            },
          ],
        },
        {
          type: 'category',
          label: '云供应商',
          items: [
            {
              type: 'autogenerated',
              dirName: 'topic/cloud-provider',
            },
          ],
        },
        {
          type: 'category',
          label: 'commons',
          items: [
            {
              type: 'autogenerated',
              dirName: 'topic/commons',
            },
          ],
        },
        {
          type: 'category',
          label: '部署',
          items: [
            {
              type: 'autogenerated',
              dirName: 'topic/deployment',
            },
          ],
        },
        {
          type: 'category',
          label: '设计模式',
          items: [
            {
              type: 'autogenerated',
              dirName: 'topic/design-pattern',
            },
          ],
        },
        {
          type: 'category',
          label: '分布式tracing',
          items: [
            {
              type: 'autogenerated',
              dirName: 'topic/distributed-tracing',
            },
          ],
        },
        {
          type: 'category',
          label: '文档搭建',
          items: [
            {
              type: 'autogenerated',
              dirName: 'topic/documentation',
            },
          ],
        },
        {
          type: 'category',
          label: '监控',
          items: [
            {
              type: 'autogenerated',
              dirName: 'topic/monitor',
            },
          ],
        },
        {
          type: 'category',
          label: '响应式',
          items: [
            {
              type: 'autogenerated',
              dirName: 'topic/reactive',
            },
          ],
        },
        {
          type: 'category',
          label: 'RestApi',
          items: [
            {
              type: 'autogenerated',
              dirName: 'topic/rest',
            },
          ],
        },
        {
          type: 'category',
          label: '安全',
          items: [
            {
              type: 'autogenerated',
              dirName: 'topic/security',
            },
          ],
        },
        {
          type: 'category',
          label: '测试',
          items: [
            {
              type: 'autogenerated',
              dirName: 'topic/test',
            },
          ],
        },
        {
          type: 'category',
          label: 'webrtc',
          items: [
            {
              type: 'autogenerated',
              dirName: 'topic/webrtc',
            },
          ],
        },
      ]
    },
    {
      type: 'category',
      label: '开源项目',
      items: [
        {
          type: 'category',
          label: 'Carla',
          items: [
            {
              type: 'autogenerated',
              dirName: 'opensource-projects/carla',
            },
          ],
        },
        {
          type: 'category',
          label: 'UE4',
          items: [
            {
              type: 'autogenerated',
              dirName: 'opensource-projects/ue4',
            },
          ],
        },
      ]
    },
  ]
};
