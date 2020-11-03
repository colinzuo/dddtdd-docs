module.exports = [
    {
        title: 'Getting Started',
        children: [
            'getting-started/',
        ]
    },
    {
        title: 'FrontEnd',
        sidebarDepth: 2,
        children: [
            'frontend/',
            {
                title: 'Angular',
                children: [
                    'frontend/angular/',
                    'frontend/angular/setup-angular-project',
                    'frontend/angular/manage-angular-project',
                    'frontend/angular/auth',
                    'frontend/angular/awesome',
                ]
            },
            {
                title: 'Vue',
                children: [
                    'frontend/vue/',
                    'frontend/vue/setup-vue-project',
                    'frontend/vue/awesome',
                ]
            },
            {
                title: 'React',
                children: [
                    'frontend/react/',
                ]
            }
        ]
    },
    {
        title: 'BackEnd',
        children: [
            {
                title: 'spring',
                children: [
                    'backend/spring/',
                    'backend/spring/webflux',
                ]
            }
        ]
    }, 
    {
        title: 'Programming Languages',
        children: [
            {
                title: 'golang',
                children: [
                    'programming-languages/golang/',
                ]
            },
            {
                title: 'java',
                children: [
                    'programming-languages/java/',
                    {
                        title: 'grpc',
                        children: [
                            'programming-languages/java/grpc/',
                            'programming-languages/java/grpc/set-header',
                        ]
                    }
                ]
            },
            {
                title: 'javascript',
                children: [
                    'programming-languages/javascript/',
                ]
            },
            {
                title: 'python',
                children: [
                    'programming-languages/python/',
                ]
            }
        ]
    },    
    {
        title: 'Cloud',
        children: [
            'cloud/',
            'cloud/docker.md',
            'cloud/elk.md',
            'cloud/nginx.md',
            'cloud/kubernetes.md',
            'cloud/rancher.md',
            'cloud/gcloud.md',
            'cloud/helm.md',
            'cloud/operator.md',
        ]
    },   
    {
        title: 'Middleware',
        children: [
            'middleware/',
            {
                title: 'Kafka',
                children: [
                    'middleware/kafka/',
                ]
            },
            {
                title: 'Mysql',
                children: [
                    'middleware/mysql/timezone',
                    'middleware/mysql/account',
                ]
            }
        ]
    },   
    {
        title: 'Tools',
        children: [
            'tools/',
            {
                title: 'IntelliJ IDEA',
                children: [
                    'tools/intellij-idea/',
                ]
            },
            {
                title: 'Maven',
                children: [
                    'tools/maven/',
                ]
            }
        ]
    },   
    {
        title: 'Topic',
        children: [
            'topic/',
            {
                title: 'Distributed Tracing',
                children: [
                    'topic/distributed-tracing/zipkin/',
                ]
            },
            {
                title: 'Rest',
                children: [
                    'topic/rest/error-handling',
                ]
            },
            {
                title: 'Security',
                children: [
                    'topic/security/',
                    'topic/security/oauth2',
                ]
            }
        ]
    }
];