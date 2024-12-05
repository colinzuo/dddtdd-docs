"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[4236],{73855:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>g,contentTitle:()=>r,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>d});var t=i(74848),o=i(28453);const a={title:"Creating and discovering plugins"},r=void 0,s={id:"programming-languages/python/packaging/guides/creating-and-discovering-plugins",title:"Creating and discovering plugins",description:"automatic plugin discovery",source:"@site/docs/00400-programming-languages/python/packaging/guides/090-creating-and-discovering-plugins.md",sourceDirName:"00400-programming-languages/python/packaging/guides",slug:"/programming-languages/python/packaging/guides/creating-and-discovering-plugins",permalink:"/dddtdd-docs/programming-languages/python/packaging/guides/creating-and-discovering-plugins",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:90,frontMatter:{title:"Creating and discovering plugins"},sidebar:"docSidebar",previous:{title:"Packaging binary extensions",permalink:"/dddtdd-docs/programming-languages/python/packaging/guides/packaging-binary-extensions"},next:{title:"Tool recommendations",permalink:"/dddtdd-docs/programming-languages/python/packaging/guides/tool-recommendations"}},g={},d=[{value:"automatic plugin discovery",id:"automatic-plugin-discovery",level:2},{value:"Using naming convention",id:"using-naming-convention",level:3}];function c(n){const e={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{id:"automatic-plugin-discovery",children:"automatic plugin discovery"}),"\n",(0,t.jsx)(e.h3,{id:"using-naming-convention",children:"Using naming convention"}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"pkgutil.iter_modules()"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:"import importlib\nimport pkgutil\n\ndiscovered_plugins = {\n    name: importlib.import_module(name)\n    for finder, name, ispkg\n    in pkgutil.iter_modules()\n    if name.startswith('flask_')\n}\n"})})]})}function p(n={}){const{wrapper:e}={...(0,o.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(c,{...n})}):c(n)}},28453:(n,e,i)=>{i.d(e,{R:()=>r,x:()=>s});var t=i(96540);const o={},a=t.createContext(o);function r(n){const e=t.useContext(a);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function s(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:r(n.components),t.createElement(a.Provider,{value:e},n.children)}}}]);