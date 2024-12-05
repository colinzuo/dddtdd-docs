"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[7582],{70038:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>l,frontMatter:()=>i,metadata:()=>d,toc:()=>c});var t=o(74848),r=o(28453);const i={title:"Instrumenting a Go application"},s=void 0,d={id:"middleware/prometheus/go-application",title:"Instrumenting a Go application",description:"How Go exposition works",source:"@site/docs/00600-middleware/prometheus/0710-go-application.md",sourceDirName:"00600-middleware/prometheus",slug:"/middleware/prometheus/go-application",permalink:"/dddtdd-docs/middleware/prometheus/go-application",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:710,frontMatter:{title:"Instrumenting a Go application"},sidebar:"docSidebar",previous:{title:"Basic auth",permalink:"/dddtdd-docs/middleware/prometheus/guides-basic-auth"},next:{title:"\u5f00\u53d1\u5de5\u5177\u4ecb\u7ecd",permalink:"/dddtdd-docs/tools/"}},a={},c=[{value:"How Go exposition works",id:"how-go-exposition-works",level:2},{value:"Adding your own metrics",id:"adding-your-own-metrics",level:2}];function p(e){const n={code:"code",h2:"h2",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"how-go-exposition-works",children:"How Go exposition works"}),"\n",(0,t.jsxs)(n.p,{children:["To expose Prometheus metrics in a Go application, you need to provide a ",(0,t.jsx)(n.code,{children:"/metrics"})," HTTP endpoint"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:'package main\n\nimport (\n        "net/http"\n\n        "github.com/prometheus/client_golang/prometheus/promhttp"\n)\n\nfunc main() {\n        http.Handle("/metrics", promhttp.Handler())\n        http.ListenAndServe(":2112", nil)\n}\n'})}),"\n",(0,t.jsx)(n.h2,{id:"adding-your-own-metrics",children:"Adding your own metrics"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:'var (\n        opsProcessed = promauto.NewCounter(prometheus.CounterOpts{\n                Name: "myapp_processed_ops_total",\n                Help: "The total number of processed events",\n        })\n)\n\nfunc recordMetrics() {\n        go func() {\n                for {\n                        opsProcessed.Inc()\n                        time.Sleep(2 * time.Second)\n                }\n        }()\n}\n'})})]})}function l(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},28453:(e,n,o)=>{o.d(n,{R:()=>s,x:()=>d});var t=o(96540);const r={},i=t.createContext(r);function s(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);