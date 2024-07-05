
## global func

- `func BytesToProfile(profileBytes []byte) *Profile`
- `func NewMasterBoomer(masterBindHost string, masterBindPort int) *Boomer`
- `func NewStandaloneBoomer(spawnCount int64, spawnRate float64) *Boomer`
- `func NewWorkerBoomer(masterHost string, masterPort int) *Boomer`
- `func ProfileToBytes(profile *Profile) []byte`

## type Boomer

- `func (b *Boomer) GetProfile() *Profile`
- `func (b *Boomer) SetProfile(profile *Profile)`
- `func (b *Boomer) SetMode(mode Mode)`
- `func (b *Boomer) GetMode() string`
- `func (b *Boomer) SetAutoStart()`
- `func (b *Boomer) RunMaster()`
- `func (b *Boomer) RunWorker()`
- `func (b *Boomer) TestCaseBytesChan() chan []byte`
- `func (b *Boomer) GetTestCaseBytes() []byte`
- `func (b *Boomer) GetTasksChan() chan *task`
- `func (b *Boomer) GetRebalanceChan() chan bool`
- `func (b *Boomer) SetTestCasesPath(paths []string)`
- `func (b *Boomer) GetTestCasesPath() []string`
- `func (b *Boomer) ParseTestCasesChan() chan bool`
- `func (b *Boomer) GetMasterHost() string`
- `func (b *Boomer) GetState() int32`
- `func (b *Boomer) SetSpawnCount(spawnCount int64)`
- `func (b *Boomer) SetSpawnRate(spawnRate float64)`
- `func (b *Boomer) SetRunTime(runTime int64)`
- `func (b *Boomer) SetExpectWorkers(expectWorkers int, expectWorkersMaxWait int)`
- `func (b *Boomer) SetRateLimiter(maxRPS int64, requestIncreaseRate string)`
- `func (b *Boomer) SetDisableKeepAlive(disableKeepalive bool)`
- `func (b *Boomer) SetIgnoreQuit()`
- `func (b *Boomer) SetDisableCompression(disableCompression bool)`
- `func (b *Boomer) GetDisableKeepAlive() bool`
- `func (b *Boomer) GetDisableCompression() bool`
- `func (b *Boomer) SetLoopCount(loopCount int64)`
- `func (b *Boomer) AddOutput(o Output)`
- `func (b *Boomer) EnableCPUProfile(cpuProfile string, duration time.Duration)`
- `func (b *Boomer) EnableMemoryProfile(memoryProfile string, duration time.Duration)`
- `func (b *Boomer) EnableGracefulQuit(ctx context.Context) context.Context`
- `func (b *Boomer) Run(tasks ...*Task)`
- `func (b *Boomer) SetTasks(tasks ...*Task)`
- `func (b *Boomer) RecordTransaction(name string, success bool, elapsedTime int64, contentSize int64)`
- `func (b *Boomer) RecordSuccess(requestType, name string, responseTime int64, responseLength int64)`
- `func (b *Boomer) RecordFailure(requestType, name string, responseTime int64, exception string)`
- `func (b *Boomer) Start(Args *Profile) error`
- `func (b *Boomer) ReBalance(Args *Profile) error`
- `func (b *Boomer) Stop() error`
- `func (b *Boomer) GetWorkersInfo() []WorkerNode`
- `func (b *Boomer) GetMasterInfo() map[string]interface{}`
- `func (b *Boomer) GetCloseChan() chan bool`
- `func (b *Boomer) Quit()`
- `func (b *Boomer) GetSpawnDoneChan() chan struct{}`
- `func (b *Boomer) GetSpawnCount() int`
- `func (b *Boomer) ResetStartTime()`
