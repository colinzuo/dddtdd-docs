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
            }
        ]
    }
];