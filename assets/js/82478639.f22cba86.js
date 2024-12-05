"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[9880],{74255:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>o});var i=t(74848),r=t(28453);const l={},s=void 0,c={id:"cloud/helm/architecture",title:"architecture",description:"https://helm.sh/docs/topics/architecture/",source:"@site/docs/00500-cloud/helm/010-architecture.md",sourceDirName:"00500-cloud/helm",slug:"/cloud/helm/architecture",permalink:"/dddtdd-docs/cloud/helm/architecture",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:10,frontMatter:{},sidebar:"docSidebar",previous:{title:"Helm\u4ecb\u7ecd",permalink:"/dddtdd-docs/cloud/helm/"},next:{title:"quickstart",permalink:"/dddtdd-docs/cloud/helm/quickstart"}},a={},o=[{value:"The Purpose of Helm",id:"the-purpose-of-helm",level:2},{value:"Components",id:"components",level:2},{value:"Helm Client",id:"helm-client",level:3},{value:"Helm Library",id:"helm-library",level:3},{value:"Implementation",id:"implementation",level:2}];function d(e){const n={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"https://helm.sh/docs/topics/architecture/"})}),"\n",(0,i.jsx)(n.h2,{id:"the-purpose-of-helm",children:"The Purpose of Helm"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Create new charts from scratch"}),"\n",(0,i.jsx)(n.li,{children:"Package charts into chart archive (tgz) files"}),"\n",(0,i.jsx)(n.li,{children:"Interact with chart repositories where charts are stored"}),"\n",(0,i.jsx)(n.li,{children:"Install and uninstall charts into an existing Kubernetes cluster"}),"\n",(0,i.jsx)(n.li,{children:"Manage the release cycle of charts that have been installed with Helm"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"For Helm, there are three important concepts"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The chart is a bundle of information necessary to create an instance of a Kubernetes application."}),"\n",(0,i.jsx)(n.li,{children:"The config contains configuration information that can be merged into a packaged chart to create a releasable object."}),"\n",(0,i.jsx)(n.li,{children:"A release is a running instance of a chart, combined with a specific config"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"components",children:"Components"}),"\n",(0,i.jsxs)(n.p,{children:["Helm is an executable which is implemented into ",(0,i.jsx)(n.strong,{children:"two distinct parts"})]}),"\n",(0,i.jsx)(n.h3,{id:"helm-client",children:"Helm Client"}),"\n",(0,i.jsx)(n.p,{children:"The Helm Client is a command-line client for end users. The client is responsible for the following:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Local chart development"}),"\n",(0,i.jsx)(n.li,{children:"Managing repositories"}),"\n",(0,i.jsx)(n.li,{children:"Managing releases"}),"\n",(0,i.jsxs)(n.li,{children:["Interfacing with the Helm library","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Sending charts to be installed"}),"\n",(0,i.jsx)(n.li,{children:"Requesting upgrading or uninstalling of existing releases"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"helm-library",children:"Helm Library"}),"\n",(0,i.jsx)(n.p,{children:"The Helm Library provides the logic for executing all Helm operations. It interfaces with the Kubernetes API server and provides the following capability:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Combining a chart and configuration to build a release"}),"\n",(0,i.jsx)(n.li,{children:"Installing charts into Kubernetes, and providing the subsequent release object"}),"\n",(0,i.jsx)(n.li,{children:"Upgrading and uninstalling charts by interacting with Kubernetes"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"implementation",children:"Implementation"}),"\n",(0,i.jsxs)(n.p,{children:["The library uses the ",(0,i.jsx)(n.strong,{children:"Kubernetes client library"})," to communicate with Kubernetes. Currently, that library uses REST+JSON. It ",(0,i.jsx)(n.strong,{children:"stores information in Secrets"})," located inside of Kubernetes. It does not need its own database"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>c});var i=t(96540);const r={},l=i.createContext(r);function s(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);