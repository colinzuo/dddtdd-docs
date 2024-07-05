
## Run

```go
// Run starts to run load test for one or multiple testcases.
func (b *HRPBoomer) Run(testcases ...ITestCase) {

	taskSlice := b.ConvertTestCasesToBoomerTasks(testcases...)

	b.Boomer.Run(taskSlice...)    
```

## convertBoomerTask

```go
func (b *HRPBoomer) convertBoomerTask(testcase *TestCase, rendezvousList []*Rendezvous) *boomer.Task {
	// init case runner for testcase
	// this runner is shared by multiple session runners
	caseRunner, err := b.hrpRunner.NewCaseRunner(testcase)

	// set paramters mode for load testing
	parametersIterator := caseRunner.parametersIterator
	parametersIterator.SetUnlimitedMode()

	// reset start time only once
	once := sync.Once{}

	// update session variables mutex
	mutex := sync.Mutex{}
    
	return &boomer.Task{
		Name:   testcase.Config.Name,
		Weight: testcase.Config.Weight,
		Fn: func() {
			testcaseSuccess := true    // flag whole testcase result
			transactionSuccess := true // flag current transaction result

			// init session runner
			sessionRunner := caseRunner.NewSession()

			mutex.Lock()
			if parametersIterator.HasNext() {
				sessionRunner.InitWithParameters(parametersIterator.Next())
			}
			mutex.Unlock()

			defer func() {
				sessionRunner.releaseResources()
			}()

			startTime := time.Now()
			for _, step := range testcase.TestSteps {
                
				stepResult, err := step.Run(sessionRunner)
                
				} else {
					// request or testcase step
					b.RecordSuccess(string(step.Type()), stepResult.Name, stepResult.Elapsed, stepResult.ContentSize)
					// update extracted variables
					for k, v := range stepResult.ExportVars {
						sessionRunner.sessionVariables[k] = v
					}
				}                
			}
			endTime := time.Now()  
            
            
```
