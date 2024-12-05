"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[4354],{35265:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>r,default:()=>c,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var a=t(74848),d=t(28453);const o={},r=void 0,i={id:"programming-languages/golang/gin/tree",title:"tree",description:"type node",source:"@site/docs/00400-programming-languages/golang/gin/0800-tree.md",sourceDirName:"00400-programming-languages/golang/gin",slug:"/programming-languages/golang/gin/tree",permalink:"/dddtdd-docs/programming-languages/golang/gin/tree",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:800,frontMatter:{},sidebar:"docSidebar",previous:{title:"utils",permalink:"/dddtdd-docs/programming-languages/golang/gin/utils"},next:{title:"gin",permalink:"/dddtdd-docs/programming-languages/golang/gin/gin"}},s={},l=[{value:"type node",id:"type-node",level:2},{value:"addRoute",id:"addroute",level:3},{value:"getValue",id:"getvalue",level:3}];function g(e){const n={code:"code",h2:"h2",h3:"h3",pre:"pre",...(0,d.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h2,{id:"type-node",children:"type node"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"type node struct {\n\tpath      string\n\tindices   string\n\twildChild bool\n\tnType     nodeType\n\tpriority  uint32\n\tchildren  []*node // child nodes, at most 1 :param style node at the end of the array\n\thandlers  HandlersChain\n\tfullPath  string\n}\n"})}),"\n",(0,a.jsx)(n.h3,{id:"addroute",children:"addRoute"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"// addRoute adds a node with the given handle to the path.\n// Not concurrency-safe!\nfunc (n *node) addRoute(path string, handlers HandlersChain) {\n"})}),"\n",(0,a.jsx)(n.h3,{id:"getvalue",children:"getValue"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-go",children:"// Returns the handle registered with the given path (key). The values of\n// wildcards are saved to a map.\n// If no handle can be found, a TSR (trailing slash redirect) recommendation is\n// made if a handle exists with an extra (without the) trailing slash for the\n// given path.\nfunc (n *node) getValue(path string, params *Params, skippedNodes *[]skippedNode, unescape bool) (value nodeValue) {\n"})})]})}function c(e={}){const{wrapper:n}={...(0,d.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(g,{...e})}):g(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>i});var a=t(96540);const d={},o=a.createContext(d);function r(e){const n=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:r(e.components),a.createElement(o.Provider,{value:n},e.children)}}}]);