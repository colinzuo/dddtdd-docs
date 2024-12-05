"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[188],{34285:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>r,default:()=>c,frontMatter:()=>a,metadata:()=>s,toc:()=>d});var i=t(74848),o=t(28453);const a={},r=void 0,s={id:"programming-languages/python/pep/2007-3121-Extension-Module-Initialization-and-Finalization",title:"2007-3121-Extension-Module-Initialization-and-Finalization",description:"https://peps.python.org/pep-3121/",source:"@site/docs/00400-programming-languages/python/pep/2007-3121-Extension-Module-Initialization-and-Finalization.md",sourceDirName:"00400-programming-languages/python/pep",slug:"/programming-languages/python/pep/2007-3121-Extension-Module-Initialization-and-Finalization",permalink:"/dddtdd-docs/programming-languages/python/pep/2007-3121-Extension-Module-Initialization-and-Finalization",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,frontMatter:{},sidebar:"docSidebar",previous:{title:"2006-3107-Function-Annotations",permalink:"/dddtdd-docs/programming-languages/python/pep/2006-3107-Function-Annotations"},next:{title:"2009-0376-Database-of-Installed-Python-Distributions",permalink:"/dddtdd-docs/programming-languages/python/pep/2009-0376-Database-of-Installed-Python-Distributions"}},p={},d=[{value:"Specification",id:"specification",level:2}];function l(e){const n={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://peps.python.org/pep-3121/",children:"https://peps.python.org/pep-3121/"})}),"\n",(0,i.jsx)(n.h2,{id:"specification",children:"Specification"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-c",children:"PyObject *PyInit_<modulename>()\n"})}),"\n",(0,i.jsx)(n.p,{children:"The initialization routine will be invoked once per interpreter, when the module is imported. It should return a new module object each time."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-c",children:"struct PyModuleDef{\n  PyModuleDef_Base m_base;  /* To be filled out by the interpreter */\n  Py_ssize_t m_size; /* Size of per-module data */\n  PyMethodDef *m_methods;\n  inquiry m_reload;\n  traverseproc m_traverse;\n  inquiry m_clear;\n  freefunc m_free;\n};\n"})})]})}function c(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>s});var i=t(96540);const o={},a=i.createContext(o);function r(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);