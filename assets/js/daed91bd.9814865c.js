"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[9381],{91726:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>l,toc:()=>a});var c=t(74848),s=t(28453);const r={title:"Capsules"},o=void 0,l={id:"programming-languages/python/c-api/concrete-capsule",title:"Capsules",description:"- type PyCapsule",source:"@site/docs/00400-programming-languages/python/c-api/1050-concrete-capsule.md",sourceDirName:"00400-programming-languages/python/c-api",slug:"/programming-languages/python/c-api/concrete-capsule",permalink:"/dddtdd-docs/programming-languages/python/c-api/concrete-capsule",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:1050,frontMatter:{title:"Capsules"},sidebar:"docSidebar",previous:{title:"Weak Reference Objects",permalink:"/dddtdd-docs/programming-languages/python/c-api/concrete-weekref"},next:{title:"Frame Objects",permalink:"/dddtdd-docs/programming-languages/python/c-api/concrete-frame"}},i={},a=[];function d(e){const n={code:"code",li:"li",ul:"ul",...(0,s.R)(),...e.components};return(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"type PyCapsule"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"type PyCapsule_Destructor"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"int PyCapsule_CheckExact(PyObject *p)"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"PyObject *PyCapsule_New(void *pointer, const char *name, PyCapsule_Destructor destructor)"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"void *PyCapsule_GetPointer(PyObject *capsule, const char *name)"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"PyCapsule_Destructor PyCapsule_GetDestructor(PyObject *capsule)"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"void *PyCapsule_GetContext(PyObject *capsule)"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"const char *PyCapsule_GetName(PyObject *capsule)"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"void *PyCapsule_Import(const char *name, int no_block)"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"int PyCapsule_IsValid(PyObject *capsule, const char *name)"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"int PyCapsule_SetContext(PyObject *capsule, void *context)"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"int PyCapsule_SetDestructor(PyObject *capsule, PyCapsule_Destructor destructor)"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"int PyCapsule_SetName(PyObject *capsule, const char *name)"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"int PyCapsule_SetPointer(PyObject *capsule, void *pointer)"})}),"\n"]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>l});var c=t(96540);const s={},r=c.createContext(s);function o(e){const n=c.useContext(r);return c.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),c.createElement(r.Provider,{value:n},e.children)}}}]);