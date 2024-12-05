"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[8276],{38928:(e,c,t)=>{t.r(c),t.d(c,{assets:()=>s,contentTitle:()=>d,default:()=>y,frontMatter:()=>r,metadata:()=>l,toc:()=>o});var i=t(74848),n=t(28453);const r={title:"Dictionary Objects"},d=void 0,l={id:"programming-languages/python/c-api/concrete-dict",title:"Dictionary Objects",description:"- type PyDictObject",source:"@site/docs/00400-programming-languages/python/c-api/0920-concrete-dict.md",sourceDirName:"00400-programming-languages/python/c-api",slug:"/programming-languages/python/c-api/concrete-dict",permalink:"/dddtdd-docs/programming-languages/python/c-api/concrete-dict",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:920,frontMatter:{title:"Dictionary Objects"},sidebar:"docSidebar",previous:{title:"Tuple Objects",permalink:"/dddtdd-docs/programming-languages/python/c-api/concrete-list"},next:{title:"Set Objects",permalink:"/dddtdd-docs/programming-languages/python/c-api/concrete-set"}},s={},o=[];function j(e){const c={code:"code",li:"li",ul:"ul",...(0,n.R)(),...e.components};return(0,i.jsxs)(c.ul,{children:["\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"type PyDictObject"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"PyTypeObject PyDict_Type"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"int PyDict_Check(PyObject *p)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"int PyDict_CheckExact(PyObject *p)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"PyObject *PyDict_New()"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"PyObject *PyDictProxy_New(PyObject *mapping)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"void PyDict_Clear(PyObject *p)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"int PyDict_Contains(PyObject *p, PyObject *key)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"PyObject *PyDict_Copy(PyObject *p)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"int PyDict_SetItem(PyObject *p, PyObject *key, PyObject *val)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"int PyDict_SetItemString(PyObject *p, const char *key, PyObject *val)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"int PyDict_DelItem(PyObject *p, PyObject *key)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"int PyDict_DelItemString(PyObject *p, const char *key)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"PyObject *PyDict_GetItem(PyObject *p, PyObject *key)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"PyObject *PyDict_GetItemWithError(PyObject *p, PyObject *key)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"PyObject *PyDict_GetItemString(PyObject *p, const char *key)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"PyObject *PyDict_SetDefault(PyObject *p, PyObject *key, PyObject *defaultobj)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"PyObject *PyDict_Items(PyObject *p)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"PyObject *PyDict_Keys(PyObject *p)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"PyObject *PyDict_Values(PyObject *p)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"Py_ssize_t PyDict_Size(PyObject *p)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"int PyDict_Next(PyObject *p, Py_ssize_t *ppos, PyObject **pkey, PyObject **pvalue)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"int PyDict_Merge(PyObject *a, PyObject *b, int override)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"int PyDict_Update(PyObject *a, PyObject *b)"})}),"\n",(0,i.jsx)(c.li,{children:(0,i.jsx)(c.code,{children:"int PyDict_MergeFromSeq2(PyObject *a, PyObject *seq2, int override)"})}),"\n"]})}function y(e={}){const{wrapper:c}={...(0,n.R)(),...e.components};return c?(0,i.jsx)(c,{...e,children:(0,i.jsx)(j,{...e})}):j(e)}},28453:(e,c,t)=>{t.d(c,{R:()=>d,x:()=>l});var i=t(96540);const n={},r=i.createContext(n);function d(e){const c=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(c):{...c,...e}}),[c,e])}function l(e){let c;return c=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:d(e.components),i.createElement(r.Provider,{value:c},e.children)}}}]);