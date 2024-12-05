"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[5230],{68183:(t,e,d)=>{d.r(e),d.d(e,{assets:()=>c,contentTitle:()=>r,default:()=>l,frontMatter:()=>i,metadata:()=>a,toc:()=>s});var n=d(74848),o=d(28453);const i={title:"Nginx\u914d\u7f6e"},r=void 0,a={id:"topic/api-gateway/nginx-config",title:"Nginx\u914d\u7f6e",description:"\u7c7b\u4f3c\u672c\u6587\u6863\u7f51\u7ad9\u914d\u7f6e",source:"@site/docs/00800-topic/api-gateway/nginx-config.md",sourceDirName:"00800-topic/api-gateway",slug:"/topic/api-gateway/nginx-config",permalink:"/dddtdd-docs/topic/api-gateway/nginx-config",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,frontMatter:{title:"Nginx\u914d\u7f6e"},sidebar:"docSidebar",previous:{title:"API\u7f51\u5173\u4ecb\u7ecd",permalink:"/dddtdd-docs/topic/api-gateway/"},next:{title:"rate-limiting",permalink:"/dddtdd-docs/topic/api-gateway/rate-limiting"}},c={},s=[];function p(t){const e={a:"a",code:"code",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(e.p,{children:["\u7c7b\u4f3c\u672c",(0,n.jsx)(e.a,{href:"https://github.com/colinzuo/dddtdd-docs/blob/master/nginx_server/config/dddtdd.conf",children:"\u6587\u6863\u7f51\u7ad9\u914d\u7f6e"})]}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsx)(e.li,{children:"\u4e00\u90e8\u5206\u662f\u9488\u5bf9SPA\u63d0\u4f9b\u9759\u6001\u6587\u4ef6\u7684\uff0c\u53c2\u7167\u4e0b\u9762dddtdd-docs\u5bf9\u5e94\u914d\u7f6e"}),"\n",(0,n.jsx)(e.li,{children:"\u4e00\u90e8\u5206\u662f\u9488\u5bf9API\u63d0\u4f9b\u53cd\u5411\u4ee3\u7406\u7684\uff0c\u53c2\u7167\u4e0b\u9762dddtdd-api\u7684\u5bf9\u5e94\u914d\u7f6e\uff0c\u8fd9\u91cc\u8fd8\u914d\u7f6e\u4e86\nwebsocket\u76f8\u5173\u90e8\u5206\uff0c\u56e0\u4e3a\u540e\u7aef\u5f88\u591a\u65f6\u5019\u4f1a\u9700\u8981\u548c\u524d\u9762\u4fdd\u6301\u4e00\u4e2awebsocket\u957f\u8fde\u63a5"}),"\n"]}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{children:'    location /dddtdd-docs/ {\n        alias /srv/dddtdd-docs/;\n        try_files $uri$args $uri$args/ /dddtdd-docs/index.html;\n    }\n\n    location /dddtdd-api/ {\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection "upgrade";\n        proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;\n        proxy_set_header Host $host;\n        proxy_http_version 1.1;\n        proxy_pass http://172.16.23.70:18080/dddtdd-api/;\n        proxy_redirect off;\n    }\n'})})]})}function l(t={}){const{wrapper:e}={...(0,o.R)(),...t.components};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(p,{...t})}):p(t)}},28453:(t,e,d)=>{d.d(e,{R:()=>r,x:()=>a});var n=d(96540);const o={},i=n.createContext(o);function r(t){const e=n.useContext(i);return n.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function a(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(o):t.components||o:r(t.components),n.createElement(i.Provider,{value:e},t.children)}}}]);