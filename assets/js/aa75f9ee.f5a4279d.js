"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[4716],{6038:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>l,contentTitle:()=>t,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>d});var r=o(74848),c=o(28453);const i={},t=void 0,s={id:"topic/test/httprunner/pkg-boomer/boomer",title:"boomer",description:"global func",source:"@site/docs/00800-topic/test/httprunner/pkg-boomer/0100-boomer.md",sourceDirName:"00800-topic/test/httprunner/pkg-boomer",slug:"/topic/test/httprunner/pkg-boomer/boomer",permalink:"/dddtdd-docs/topic/test/httprunner/pkg-boomer/boomer",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:100,frontMatter:{},sidebar:"docSidebar",previous:{title:"boomer",permalink:"/dddtdd-docs/topic/test/httprunner/boomer"},next:{title:"hrp\\pkg\\boomer\\runner",permalink:"/dddtdd-docs/topic/test/httprunner/pkg-boomer/runner"}},l={},d=[{value:"global func",id:"global-func",level:2},{value:"type Boomer",id:"type-boomer",level:2}];function h(e){const n={code:"code",h2:"h2",li:"li",ul:"ul",...(0,c.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"global-func",children:"global func"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func BytesToProfile(profileBytes []byte) *Profile"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func NewMasterBoomer(masterBindHost string, masterBindPort int) *Boomer"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func NewStandaloneBoomer(spawnCount int64, spawnRate float64) *Boomer"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func NewWorkerBoomer(masterHost string, masterPort int) *Boomer"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func ProfileToBytes(profile *Profile) []byte"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"type-boomer",children:"type Boomer"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) GetProfile() *Profile"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) SetProfile(profile *Profile)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) SetMode(mode Mode)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) GetMode() string"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) SetAutoStart()"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) RunMaster()"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) RunWorker()"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) TestCaseBytesChan() chan []byte"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) GetTestCaseBytes() []byte"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) GetTasksChan() chan *task"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) GetRebalanceChan() chan bool"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) SetTestCasesPath(paths []string)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) GetTestCasesPath() []string"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) ParseTestCasesChan() chan bool"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) GetMasterHost() string"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) GetState() int32"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) SetSpawnCount(spawnCount int64)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) SetSpawnRate(spawnRate float64)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) SetRunTime(runTime int64)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) SetExpectWorkers(expectWorkers int, expectWorkersMaxWait int)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) SetRateLimiter(maxRPS int64, requestIncreaseRate string)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) SetDisableKeepAlive(disableKeepalive bool)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) SetIgnoreQuit()"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) SetDisableCompression(disableCompression bool)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) GetDisableKeepAlive() bool"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) GetDisableCompression() bool"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) SetLoopCount(loopCount int64)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) AddOutput(o Output)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) EnableCPUProfile(cpuProfile string, duration time.Duration)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) EnableMemoryProfile(memoryProfile string, duration time.Duration)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) EnableGracefulQuit(ctx context.Context) context.Context"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) Run(tasks ...*Task)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) SetTasks(tasks ...*Task)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) RecordTransaction(name string, success bool, elapsedTime int64, contentSize int64)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) RecordSuccess(requestType, name string, responseTime int64, responseLength int64)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) RecordFailure(requestType, name string, responseTime int64, exception string)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) Start(Args *Profile) error"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) ReBalance(Args *Profile) error"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) Stop() error"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) GetWorkersInfo() []WorkerNode"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) GetMasterInfo() map[string]interface{}"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) GetCloseChan() chan bool"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) Quit()"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) GetSpawnDoneChan() chan struct{}"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) GetSpawnCount() int"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"func (b *Boomer) ResetStartTime()"})}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},28453:(e,n,o)=>{o.d(n,{R:()=>t,x:()=>s});var r=o(96540);const c={},i=r.createContext(c);function t(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:t(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);