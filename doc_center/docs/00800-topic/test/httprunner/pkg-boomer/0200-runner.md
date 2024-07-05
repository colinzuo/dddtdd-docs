---
title: hrp\pkg\boomer\runner
---

## reportStats

```go
func (r *runner) reportStats() {
	data := r.stats.collectReportData()
	data["user_count"] = r.controller.getCurrentClientsNum()
	data["state"] = atomic.LoadInt32(&r.state)
	r.outputOnEvent(data)
}
```

## spawnWorkers

`func (r *runner) spawnWorkers(spawnCount int64, spawnRate float64, quit chan bool, spawnCompleteFunc func())`

```go
	for {

			if r.isStarting() && r.controller.acquire() {
                
				r.goAttach(func() {
					for {
						select {
						case <-quit:
							r.controller.increaseFinishedCount()
							return
						default:
							if workerLoop != nil && !workerLoop.acquire() {
								r.controller.increaseFinishedCount()
								return
							}
							if r.rateLimitEnabled {
								blocked := r.rateLimiter.Acquire()
								if !blocked {
									task := r.getTask()
									r.safeRun(task.Fn)
								}
							} else {
								task := r.getTask()
								r.safeRun(task.Fn)
							}
							if workerLoop != nil {
								// finished count of total
								r.loop.increaseFinishedCount()
								// finished count of single worker
								workerLoop.increaseFinishedCount()
								if r.loop.isFinished() {
									go r.stop()
									r.controller.increaseFinishedCount()
									return
								}
							}
							if r.controller.erase() {
								return
							}
						}
					}
				})
				continue

			<-r.controller.getRebalanceChan()
			if r.isStarting() {
				// rebalance spawn count
				r.controller.setSpawn(r.getSpawnCount(), r.getSpawnRate())
			}                            
```

## getTask

```go
func (r *runner) getTask() *Task {

	tasksCount := len(r.tasks)
	if tasksCount == 0 {
		log.Error().Msg("no valid testcase found")
		os.Exit(1)
	} else if tasksCount == 1 {
		// Fast path
		return r.tasks[0]
	}

	rs := rand.New(rand.NewSource(time.Now().UnixNano()))

	totalWeight := r.totalTaskWeight
	if totalWeight <= 0 {
		// If all the tasks have not weights defined, they have the same chance to run
		randNum := rs.Intn(tasksCount)
		return r.tasks[randNum]
	}

	randNum := rs.Intn(totalWeight)
	runningSum := 0
	for _, task := range r.tasks {
		runningSum += task.Weight
		if runningSum > randNum {
			return task
		}
	}    
```

## statsStart

```go
func (r *runner) statsStart() {
	ticker := time.NewTicker(reportStatsInterval)
	for {
		select {

		case <-ticker.C:
			r.reportStats()
			// close reportedChan and return if the last stats is reported successfully
			if !r.isStarting() && !r.isStopping() {
				close(r.reportedChan)
				log.Info().Msg("Quitting statsStart")
				return
			}           
```

## stop

```go
func (r *runner) stop() {
	// stop previous goroutines without blocking
	// those goroutines will exit when r.safeRun returns
	r.gracefulStop()
	if r.rateLimitEnabled {
		r.rateLimiter.Stop()
	}
	r.updateState(StateStopped)
}

func (r *runner) gracefulStop() {
	select {
	case r.stopChan <- true:
	case <-r.doneChan:
		return
	}
	<-r.doneChan
}
```

## newLocalRunner

```go
func newLocalRunner(spawnCount int64, spawnRate float64) *localRunner {
	return &localRunner{
		runner: runner{
			state:      StateInit,
			stats:      newRequestStats(),
			spawnCount: spawnCount,
			spawnRate:  spawnRate,
			controller: &Controller{},
			outputs:    make([]Output, 0),
			stopChan:   make(chan bool),
			closeChan:  make(chan bool),
			wg:         sync.WaitGroup{},
			wgMu:       sync.RWMutex{},
		},
	}
}
```

## localRunner start

```go
func (r *localRunner) start() {

	// start rate limiter
	if r.rateLimitEnabled {
		r.rateLimiter.Start()
	}
	// output setup
	r.outputOnStart()

	go r.runTimeCheck(r.getRunTime())

	go r.spawnWorkers(r.getSpawnCount(), r.getSpawnRate(), r.stoppingChan, nil)    

	go r.statsStart()

	<-r.stopChan    
```

## newWorkerRunner

```go
func newWorkerRunner(masterHost string, masterPort int) (r *workerRunner) {
	r = &workerRunner{
		runner: runner{
			stats:      newRequestStats(),
			outputs:    make([]Output, 0),
			controller: &Controller{},
			stopChan:   make(chan bool),
			closeChan:  make(chan bool),
		},
		masterHost: masterHost,
		masterPort: masterPort,
		nodeID:     getNodeID(),
		tasksChan:  make(chan *task, 10),
		mutex:      sync.Mutex{},
		ignoreQuit: false,
	}
	return r
}
```

## workerRunner spawnComplete

```go
func (r *workerRunner) spawnComplete() {
	data := make(map[string][]byte)
	data["count"] = builtin.Int64ToBytes(r.controller.getSpawnCount())
	r.client.sendChannel() <- newGenericMessage("spawning_complete", data, r.nodeID)
}
```

## masterRunner start

```go
	spawnCounts := builtin.SplitInteger(int(r.profile.SpawnCount), numWorkers)

	// spawn rate
	spawnRate := workerProfile.SpawnRate / float64(numWorkers)
	if spawnRate < 1 {
		spawnRate = 1
	}

	// max RPS
	maxRPSs := builtin.SplitInteger(int(workerProfile.MaxRPS), numWorkers)

	r.updateState(StateSpawning)    

	cur := 0
	r.server.clients.Range(func(key, value interface{}) bool {
        
			workerInfo.getStream() <- &messager.StreamResponse{
				Type:    "spawn",
				Profile: ProfileToBytes(workerProfile),
				NodeID:  workerInfo.ID,
				Tasks:   testCasesBytes,
			}
			cur++        
```

## masterRunner rebalance

```go
	spawnCounts := builtin.SplitInteger(int(r.profile.SpawnCount), numWorkers)

	// spawn rate
	spawnRate := workerProfile.SpawnRate / float64(numWorkers)
	if spawnRate < 1 {
		spawnRate = 1
	}

	// max RPS
	maxRPSs := builtin.SplitInteger(int(workerProfile.MaxRPS), numWorkers)

	cur := 0
	log.Info().Msg("send spawn data to worker")
	r.server.clients.Range(func(key, value interface{}) bool {
        
			if workerInfo.getState() == StateInit {
				workerInfo.getStream() <- &messager.StreamResponse{
					Type:    "spawn",
					Profile: ProfileToBytes(workerProfile),
					NodeID:  workerInfo.ID,
					Tasks:   r.testCasesBytes,
				}
			} else {
				workerInfo.getStream() <- &messager.StreamResponse{
					Type:    "rebalance",
					Profile: ProfileToBytes(workerProfile),
					NodeID:  workerInfo.ID,
				}
			}
			cur++        
```

## masterRunner fetchTestCases

```go
	r.parseTestCasesChan <- true
	select {
	case <-ticker.C:
		return nil, errors.New("parse testcases timeout")
	case testCasesBytes := <-r.testCaseBytesChan:
		r.testCasesBytes = testCasesBytes
		return testCasesBytes, nil
	}
```


