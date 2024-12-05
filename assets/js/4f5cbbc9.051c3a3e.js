"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[8669],{58590:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var n=s(74848),r=s(28453);const i={title:"Examples"},o=void 0,a={id:"middleware/prometheus/examples",title:"Examples",description:"Simple time series selection",source:"@site/docs/00600-middleware/prometheus/0330-examples.md",sourceDirName:"00600-middleware/prometheus",slug:"/middleware/prometheus/examples",permalink:"/dddtdd-docs/middleware/prometheus/examples",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:330,frontMatter:{title:"Examples"},sidebar:"docSidebar",previous:{title:"Functions",permalink:"/dddtdd-docs/middleware/prometheus/functions"},next:{title:"HTTP API",permalink:"/dddtdd-docs/middleware/prometheus/api"}},c={},l=[{value:"Simple time series selection",id:"simple-time-series-selection",level:2},{value:"Subquery",id:"subquery",level:2},{value:"Using functions, operators, etc",id:"using-functions-operators-etc",level:2}];function d(e){const t={code:"code",h2:"h2",pre:"pre",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"simple-time-series-selection",children:"Simple time series selection"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-r",children:'http_requests_total\n\nhttp_requests_total{job="apiserver", handler="/api/comments"}\n\nhttp_requests_total{job="apiserver", handler="/api/comments"}[5m]\n\nhttp_requests_total{job=~".*server"}\n\nhttp_requests_total{status!~"4.."}\n'})}),"\n",(0,n.jsx)(t.h2,{id:"subquery",children:"Subquery"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-r",children:"rate(http_requests_total[5m])[30m:1m]\n\nmax_over_time(deriv(rate(distance_covered_total[5s])[30s:5s])[10m:])\n"})}),"\n",(0,n.jsx)(t.h2,{id:"using-functions-operators-etc",children:"Using functions, operators, etc"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-r",children:"rate(http_requests_total[5m])\n\nsum by (job) (\n  rate(http_requests_total[5m])\n)\n\n(instance_memory_limit_bytes - instance_memory_usage_bytes) / 1024 / 1024\n\nsum by (app, proc) (\n  instance_memory_limit_bytes - instance_memory_usage_bytes\n) / 1024 / 1024\n\ntopk(3, sum by (app, proc) (rate(instance_cpu_time_ns[5m])))\n\ncount by (app) (instance_cpu_time_ns)\n"})})]})}function m(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},28453:(e,t,s)=>{s.d(t,{R:()=>o,x:()=>a});var n=s(96540);const r={},i=n.createContext(r);function o(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);