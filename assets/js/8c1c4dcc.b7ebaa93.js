"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[310],{83832:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>a});var s=n(74848),d=n(28453);const r={},o=void 0,i={id:"middleware/mysql/db-setup",title:"db-setup",description:"create db",source:"@site/docs/00600-middleware/mysql/030-db-setup.md",sourceDirName:"00600-middleware/mysql",slug:"/middleware/mysql/db-setup",permalink:"/dddtdd-docs/middleware/mysql/db-setup",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:30,frontMatter:{},sidebar:"docSidebar",previous:{title:"\u8d26\u6237",permalink:"/dddtdd-docs/middleware/mysql/account"},next:{title:"backup-and-recovery",permalink:"/dddtdd-docs/middleware/mysql/backup-and-recovery"}},c={},a=[{value:"create db",id:"create-db",level:2},{value:"assign permission to user",id:"assign-permission-to-user",level:2}];function l(e){const t={code:"code",h2:"h2",pre:"pre",...(0,d.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{id:"create-db",children:"create db"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"CREATE SCHEMA `zhiyoufy_20231114` ;\n"})}),"\n",(0,s.jsx)(t.h2,{id:"assign-permission-to-user",children:"assign permission to user"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"GRANT ALL\n  ON zhiyoufy_20231114.*\n  TO 'zhiyoufy'@'%'\n  WITH GRANT OPTION;\n"})})]})}function u(e={}){const{wrapper:t}={...(0,d.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>i});var s=n(96540);const d={},r=s.createContext(d);function o(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:o(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);