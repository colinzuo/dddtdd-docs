"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[5716],{55851:(i,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>d});var e=t(74848),s=t(28453);const o={title:"Python Initialization Configuration"},l=void 0,r={id:"programming-languages/python/c-api/init_config",title:"Python Initialization Configuration",description:"PyWideStringList",source:"@site/docs/00400-programming-languages/python/c-api/1130-init_config.md",sourceDirName:"00400-programming-languages/python/c-api",slug:"/programming-languages/python/c-api/init_config",permalink:"/dddtdd-docs/programming-languages/python/c-api/init_config",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:1130,frontMatter:{title:"Python Initialization Configuration"},sidebar:"docSidebar",previous:{title:"Initialization, Finalization, and Threads",permalink:"/dddtdd-docs/programming-languages/python/c-api/init"},next:{title:"Memory Management",permalink:"/dddtdd-docs/programming-languages/python/c-api/memory"}},c={},d=[{value:"PyWideStringList",id:"pywidestringlist",level:2},{value:"PyStatus",id:"pystatus",level:2},{value:"PyConfig",id:"pyconfig",level:2},{value:"Initialization with PyConfig",id:"initialization-with-pyconfig",level:2},{value:"Py_RunMain()",id:"py_runmain",level:2},{value:"Multi-Phase Initialization Private Provisional API",id:"multi-phase-initialization-private-provisional-api",level:2}];function a(i){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...(0,s.R)(),...i.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(n.h2,{id:"pywidestringlist",children:"PyWideStringList"}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"PyStatus PyWideStringList_Append(PyWideStringList *list, const wchar_t *item)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"PyStatus PyWideStringList_Insert(PyWideStringList *list, Py_ssize_t index, const wchar_t *item)"})}),"\n"]}),"\n",(0,e.jsx)(n.h2,{id:"pystatus",children:"PyStatus"}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"int exitcode"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"const char *err_msg"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"const char *func"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"PyStatus PyStatus_Ok(void)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"PyStatus PyStatus_Error(const char *err_msg)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"PyStatus PyStatus_NoMemory(void)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"PyStatus PyStatus_Exit(int exitcode)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"int PyStatus_Exception(PyStatus status)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"int PyStatus_IsError(PyStatus status)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"int PyStatus_IsExit(PyStatus status)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"void Py_ExitStatusException(PyStatus status)"})}),"\n"]}),"\n",(0,e.jsx)(n.h2,{id:"pyconfig",children:"PyConfig"}),"\n",(0,e.jsxs)(n.p,{children:["When done, the ",(0,e.jsx)(n.code,{children:"PyConfig_Clear()"})," function must be used to release the configuration memory"]}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"void PyConfig_InitPythonConfig(PyConfig *config)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"void PyConfig_InitIsolatedConfig(PyConfig *config)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"PyStatus PyConfig_SetString(PyConfig *config, wchar_t *const *config_str, const wchar_t *str)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"PyStatus PyConfig_SetBytesString(PyConfig *config, wchar_t *const *config_str, const char *str)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"PyStatus PyConfig_SetArgv(PyConfig *config, int argc, wchar_t *const *argv)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"PyStatus PyConfig_SetBytesArgv(PyConfig *config, int argc, char *const *argv)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"PyStatus PyConfig_SetWideStringList(PyConfig *config, PyWideStringList *list, Py_ssize_t length, wchar_t **items)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"PyStatus PyConfig_Read(PyConfig *config)"})}),"\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"void PyConfig_Clear(PyConfig *config)"})}),"\n"]}),"\n",(0,e.jsx)(n.h2,{id:"initialization-with-pyconfig",children:"Initialization with PyConfig"}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsx)(n.li,{children:(0,e.jsx)(n.code,{children:"PyStatus Py_InitializeFromConfig(const PyConfig *config)"})}),"\n"]}),"\n",(0,e.jsx)(n.h2,{id:"py_runmain",children:"Py_RunMain()"}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsxs)(n.li,{children:[(0,e.jsx)(n.code,{children:"int Py_RunMain(void)"}),": Execute the command (",(0,e.jsx)(n.code,{children:"PyConfig.run_command"}),"), the script (",(0,e.jsx)(n.code,{children:"PyConfig.run_filename"}),") or the module (",(0,e.jsx)(n.code,{children:"PyConfig.run_module"}),") specified on the command line or in the configuration"]}),"\n"]}),"\n",(0,e.jsx)(n.h2,{id:"multi-phase-initialization-private-provisional-api",children:"Multi-Phase Initialization Private Provisional API"}),"\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsxs)(n.li,{children:["\u201cCore\u201d initialization phase, \u201cbare minimum Python\u201d:","\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsx)(n.li,{children:"Builtin types;"}),"\n",(0,e.jsx)(n.li,{children:"Builtin exceptions;"}),"\n",(0,e.jsx)(n.li,{children:"Builtin and frozen modules;"}),"\n",(0,e.jsx)(n.li,{children:"The sys module is only partially initialized (ex: sys.path doesn\u2019t exist yet)."}),"\n"]}),"\n"]}),"\n",(0,e.jsxs)(n.li,{children:["\u201cMain\u201d initialization phase, Python is fully initialized:","\n",(0,e.jsxs)(n.ul,{children:["\n",(0,e.jsx)(n.li,{children:"Install and configure importlib;"}),"\n",(0,e.jsx)(n.li,{children:"Apply the Path Configuration;"}),"\n",(0,e.jsx)(n.li,{children:"Install signal handlers;"}),"\n",(0,e.jsx)(n.li,{children:"Finish sys module initialization (ex: create sys.stdout and sys.path);"}),"\n",(0,e.jsx)(n.li,{children:"Enable optional features like faulthandler and tracemalloc;"}),"\n",(0,e.jsx)(n.li,{children:"Import the site module;"}),"\n",(0,e.jsx)(n.li,{children:"etc."}),"\n"]}),"\n"]}),"\n"]})]})}function h(i={}){const{wrapper:n}={...(0,s.R)(),...i.components};return n?(0,e.jsx)(n,{...i,children:(0,e.jsx)(a,{...i})}):a(i)}},28453:(i,n,t)=>{t.d(n,{R:()=>l,x:()=>r});var e=t(96540);const s={},o=e.createContext(s);function l(i){const n=e.useContext(o);return e.useMemo((function(){return"function"==typeof i?i(n):{...n,...i}}),[n,i])}function r(i){let n;return n=i.disableParentContext?"function"==typeof i.components?i.components(s):i.components||s:l(i.components),e.createElement(o.Provider,{value:n},i.children)}}}]);