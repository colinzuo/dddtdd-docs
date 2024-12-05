"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[5524],{73274:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>d});var r=t(74848),o=t(28453);const i={},s=void 0,a={id:"programming-languages/golang/gin/official-doc",title:"official-doc",description:"https://pkg.go.dev/github.com/gin-gonic/gin",source:"@site/docs/00400-programming-languages/golang/gin/0100-official-doc.md",sourceDirName:"00400-programming-languages/golang/gin",slug:"/programming-languages/golang/gin/official-doc",permalink:"/dddtdd-docs/programming-languages/golang/gin/official-doc",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:100,frontMatter:{},sidebar:"docSidebar",previous:{title:"effective-go",permalink:"/dddtdd-docs/programming-languages/golang/effective-go"},next:{title:"context",permalink:"/dddtdd-docs/programming-languages/golang/gin/context"}},l={},d=[{value:"type Context",id:"type-context",level:2},{value:"type Engine",id:"type-engine",level:2},{value:"type Error",id:"type-error",level:2},{value:"type HandlerFunc",id:"type-handlerfunc",level:2},{value:"func CustomRecovery",id:"func-customrecovery",level:2},{value:"func Logger",id:"func-logger",level:2},{value:"type IRouter",id:"type-irouter",level:2},{value:"type IRoutes",id:"type-iroutes",level:2},{value:"type LoggerConfig",id:"type-loggerconfig",level:2},{value:"type RouteInfo",id:"type-routeinfo",level:2},{value:"type RouterGroup",id:"type-routergroup",level:2}];function c(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://pkg.go.dev/github.com/gin-gonic/gin",children:"https://pkg.go.dev/github.com/gin-gonic/gin"})}),"\n",(0,r.jsx)(n.h2,{id:"type-context",children:"type Context"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"type Context struct {\n\tRequest *http.Request\n\tWriter  ResponseWriter\n\n\tParams Params\n\n\t// Keys is a key/value pair exclusively for the context of each request.\n\tKeys map[string]any\n\n\t// Errors is a list of errors attached to all the handlers/middlewares who used this context.\n\tErrors errorMsgs\n\n\t// Accepted defines a list of manually accepted formats for content negotiation.\n\tAccepted []string\n\t// contains filtered or unexported fields\n}\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (c *Context) Abort()"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (c *Context) Done() <-chan struct{}"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (c *Context) Err() error"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (c *Context) Error(err error) *Error"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (c *Context) Get(key string) (value any, exists bool)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (c *Context) GetDuration(key string) (d time.Duration)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (c *Context) Next()"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (c *Context) Set(key string, value any)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (c *Context) Value(key any) any"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"type-engine",children:"type Engine"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"type Engine struct {\n\tRouterGroup\n\n\t// RedirectTrailingSlash enables automatic redirection if the current route can't be matched but a\n\t// handler for the path with (without) the trailing slash exists.\n\t// For example if /foo/ is requested but a route only exists for /foo, the\n\t// client is redirected to /foo with http status code 301 for GET requests\n\t// and 307 for all other request methods.\n\tRedirectTrailingSlash bool\n\n\t// RedirectFixedPath if enabled, the router tries to fix the current request path, if no\n\t// handle is registered for it.\n\t// First superfluous path elements like ../ or // are removed.\n\t// Afterwards the router does a case-insensitive lookup of the cleaned path.\n\t// If a handle can be found for this route, the router makes a redirection\n\t// to the corrected path with status code 301 for GET requests and 307 for\n\t// all other request methods.\n\t// For example /FOO and /..//Foo could be redirected to /foo.\n\t// RedirectTrailingSlash is independent of this option.\n\tRedirectFixedPath bool\n\n\t// HandleMethodNotAllowed if enabled, the router checks if another method is allowed for the\n\t// current route, if the current request can not be routed.\n\t// If this is the case, the request is answered with 'Method Not Allowed'\n\t// and HTTP status code 405.\n\t// If no other Method is allowed, the request is delegated to the NotFound\n\t// handler.\n\tHandleMethodNotAllowed bool\n\n\t// ForwardedByClientIP if enabled, client IP will be parsed from the request's headers that\n\t// match those stored at `(*gin.Engine).RemoteIPHeaders`. If no IP was\n\t// fetched, it falls back to the IP obtained from\n\t// `(*gin.Context).Request.RemoteAddr`.\n\tForwardedByClientIP bool\n\n\t// AppEngine was deprecated.\n\t// Deprecated: USE `TrustedPlatform` WITH VALUE `gin.PlatformGoogleAppEngine` INSTEAD\n\t// #726 #755 If enabled, it will trust some headers starting with\n\t// 'X-AppEngine...' for better integration with that PaaS.\n\tAppEngine bool\n\n\t// UseRawPath if enabled, the url.RawPath will be used to find parameters.\n\tUseRawPath bool\n\n\t// UnescapePathValues if true, the path value will be unescaped.\n\t// If UseRawPath is false (by default), the UnescapePathValues effectively is true,\n\t// as url.Path gonna be used, which is already unescaped.\n\tUnescapePathValues bool\n\n\t// RemoveExtraSlash a parameter can be parsed from the URL even with extra slashes.\n\t// See the PR #1817 and issue #1644\n\tRemoveExtraSlash bool\n\n\t// RemoteIPHeaders list of headers used to obtain the client IP when\n\t// `(*gin.Engine).ForwardedByClientIP` is `true` and\n\t// `(*gin.Context).Request.RemoteAddr` is matched by at least one of the\n\t// network origins of list defined by `(*gin.Engine).SetTrustedProxies()`.\n\tRemoteIPHeaders []string\n\n\t// TrustedPlatform if set to a constant of value gin.Platform*, trusts the headers set by\n\t// that platform, for example to determine the client IP\n\tTrustedPlatform string\n\n\t// MaxMultipartMemory value of 'maxMemory' param that is given to http.Request's ParseMultipartForm\n\t// method call.\n\tMaxMultipartMemory int64\n\n\t// UseH2C enable h2c support.\n\tUseH2C bool\n\n\t// ContextWithFallback enable fallback Context.Deadline(), Context.Done(), Context.Err() and Context.Value() when Context.Request.Context() is not nil.\n\tContextWithFallback bool\n\n\tHTMLRender render.HTMLRender\n\tFuncMap    template.FuncMap\n\t// contains filtered or unexported fields\n}\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func Default() *Engine"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func New() *Engine"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (engine *Engine) Routes() (routes RoutesInfo)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (engine *Engine) Run(addr ...string) (err error)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (engine *Engine) RunListener(listener net.Listener) (err error)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (engine *Engine) Use(middleware ...HandlerFunc) IRoutes"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"type-error",children:"type Error"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"type Error struct {\n\tErr  error\n\tType ErrorType\n\tMeta any\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"type-handlerfunc",children:"type HandlerFunc"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"type HandlerFunc func(*Context)\n"})}),"\n",(0,r.jsx)(n.h2,{id:"func-customrecovery",children:"func CustomRecovery"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"func CustomRecovery(handle RecoveryFunc) HandlerFunc\n"})}),"\n",(0,r.jsx)(n.h2,{id:"func-logger",children:"func Logger"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"func Logger() HandlerFunc\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func Recovery() HandlerFunc"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"type HandlersChain []HandlerFunc"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"type-irouter",children:"type IRouter"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"type IRouter interface {\n\tIRoutes\n\tGroup(string, ...HandlerFunc) *RouterGroup\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"type-iroutes",children:"type IRoutes"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"type IRoutes interface {\n\tUse(...HandlerFunc) IRoutes\n\n\tHandle(string, string, ...HandlerFunc) IRoutes\n\tAny(string, ...HandlerFunc) IRoutes\n\tGET(string, ...HandlerFunc) IRoutes\n\tPOST(string, ...HandlerFunc) IRoutes\n\tDELETE(string, ...HandlerFunc) IRoutes\n\tPATCH(string, ...HandlerFunc) IRoutes\n\tPUT(string, ...HandlerFunc) IRoutes\n\tOPTIONS(string, ...HandlerFunc) IRoutes\n\tHEAD(string, ...HandlerFunc) IRoutes\n\tMatch([]string, string, ...HandlerFunc) IRoutes\n\n\tStaticFile(string, string) IRoutes\n\tStaticFileFS(string, string, http.FileSystem) IRoutes\n\tStatic(string, string) IRoutes\n\tStaticFS(string, http.FileSystem) IRoutes\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"type-loggerconfig",children:"type LoggerConfig"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"type LoggerConfig struct {\n\t// Optional. Default value is gin.defaultLogFormatter\n\tFormatter LogFormatter\n\n\t// Output is a writer where logs are written.\n\t// Optional. Default value is gin.DefaultWriter.\n\tOutput io.Writer\n\n\t// SkipPaths is an url path array which logs are not written.\n\t// Optional.\n\tSkipPaths []string\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"type-routeinfo",children:"type RouteInfo"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"type RouteInfo struct {\n\tMethod      string\n\tPath        string\n\tHandler     string\n\tHandlerFunc HandlerFunc\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"type-routergroup",children:"type RouterGroup"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-go",children:"type RouterGroup struct {\n\tHandlers HandlersChain\n\t// contains filtered or unexported fields\n}\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (group *RouterGroup) BasePath() string"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (group *RouterGroup) GET(relativePath string, handlers ...HandlerFunc) IRoutes"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (group *RouterGroup) Group(relativePath string, handlers ...HandlerFunc) *RouterGroup"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (group *RouterGroup) Use(middleware ...HandlerFunc) IRoutes"})}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>a});var r=t(96540);const o={},i=r.createContext(o);function s(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);