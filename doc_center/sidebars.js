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
            'frontend/common/README',
            'frontend/common/setup-env',
          ],
        },
        {
          type: 'category',
          label: 'Angular',
          items: [
            'frontend/angular/README',
            'frontend/angular/setup-angular-project',
            'frontend/angular/manage-angular-project',
            'frontend/angular/auth',
            'frontend/angular/awesome',
          ],
        },
        {
          type: 'category',
          label: 'React',
          items: [
            'frontend/react/README',
            'frontend/react/create-react-app',
            'frontend/react/antd-pro',
            'frontend/react/build-size',
          ],
        },
        {
          type: 'category',
          label: 'Vue',
          items: [
            'frontend/vue/README',
            'frontend/vue/setup-vue-project',
            'frontend/vue/awesome',
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
            'backend/spring/README',
            'backend/spring/webflux',
            'backend/spring/different-async-web',
            'backend/spring/spring-boot-actuator',
            'backend/spring/spring-cloud-netflix',
            'backend/spring/spring-cloud-circuitbreaker',
            'backend/spring/spring-cloud-gateway',
            'backend/spring/observability',
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
            'programming-languages/golang/README',
            'programming-languages/golang/compile',
          ],
        },
        {
          type: 'category',
          label: 'Java',
          items: [
            'programming-languages/java/README',
            'programming-languages/java/install-on-ubuntu-18',
            {
              type: 'category',
              label: 'Grpc',
              items: [
                'programming-languages/java/grpc/README',
                'programming-languages/java/grpc/set-header',
              ],
            },
            {
              type: 'category',
              label: 'Cache',
              items: [
                'programming-languages/java/cache/README',
                'programming-languages/java/cache/caffeine',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Javascript',
          items: [
            'programming-languages/javascript/README',
          ],
        },
        {
          type: 'category',
          label: 'Python',
          items: [
            'programming-languages/python/README',
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
        'cloud/kubernetes',
        'cloud/helm',
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
            'middleware/dialogflow/README',
            'middleware/dialogflow/create-service-account',
          ],
        },
        {
          type: 'category',
          label: 'kafka',
          items: [
            'middleware/kafka/README',
          ],
        },
        {
          type: 'category',
          label: 'mysql',
          items: [
            'middleware/mysql/README',
            'middleware/mysql/account',
            'middleware/mysql/timezone',
          ],
        },
        {
          type: 'category',
          label: 'prometheus',
          items: [
            'middleware/prometheus/README',
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
            'tools/git/README',
            'tools/git/submodules',
          ],
        },
        {
          type: 'category',
          label: 'Intellij Idea',
          items: [
            'tools/intellij-idea/README',
          ],
        },
        {
          type: 'category',
          label: 'maven',
          items: [
            'tools/maven/README',
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
            'topic/api-gateway/README',
            'topic/api-gateway/nginx-config',
          ],
        },
        {
          type: 'category',
          label: '部署',
          items: [
            'topic/deployment/README',
            'topic/deployment/tools',
            'topic/deployment/setup-ubuntu-basic',
            'topic/deployment/setup-ubuntu-dev',
            'topic/deployment/setup-ubuntu-env',
            'topic/deployment/setup-ansible-project',
            'topic/deployment/deploy-use-ansible-project',
            'topic/deployment/k8s-cluster-setup',
          ],
        },
        {
          type: 'category',
          label: '分布式tracing',
          items: [
            'topic/distributed-tracing/README',
            {
              type: 'category',
              label: 'Zipkin',
              items: [
                'topic/distributed-tracing/zipkin/README',
              ],
            },
            'topic/distributed-tracing/spring-cloud-sleuth',
          ],
        },
        {
          type: 'category',
          label: '文档搭建',
          items: [
            'topic/documentation/README',
            'topic/documentation/docusaurus',
          ],
        },
        {
          type: 'category',
          label: 'RestApi',
          items: [
            'topic/rest/README',
            'topic/rest/error-handling',
          ],
        },
        {
          type: 'category',
          label: '安全',
          items: [
            'topic/security/README',
            'topic/security/oauth2',
            'topic/security/authorization-server',
          ],
        },
      ]
    },
  ]
};
