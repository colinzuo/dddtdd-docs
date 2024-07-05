
## hrp\cmd\cli\main.go

```go title="hrp\cmd\cli\main.go"
func main() {

	exitCode := cmd.Execute()
	os.Exit(exitCode)    
```

## hrp\cmd\root.go

```go
func Execute() int {
	rootCmd.PersistentFlags().StringVarP(&logLevel, "log-level", "l", "INFO", "set log level")
	rootCmd.PersistentFlags().BoolVar(&logJSON, "log-json", false, "set log to json format")
	rootCmd.PersistentFlags().StringVar(&venv, "venv", "", "specify python3 venv path")

	err := rootCmd.Execute()
	return code.GetErrorCode(err)
}
```

## hrp\cmd\run.go

```go
var runCmd = &cobra.Command{
	RunE: func(cmd *cobra.Command, args []string) error {
		...
		runner := makeHRPRunner()
		return runner.Run(paths...)	
		
func makeHRPRunner() *hrp.HRPRunner {
	runner := hrp.NewRunner(nil).
		SetFailfast(!continueOnFailure).
		SetSaveTests(saveTests).
		SetCaseTimeout(caseTimeout)		
```

## hrp\cmd\boom.go

```go
var boomCmd = &cobra.Command{

	RunE: func(cmd *cobra.Command, args []string) (err error) {
		
		var hrpBoomer *hrp.HRPBoomer
		if boomArgs.master {
			hrpBoomer = hrp.NewMasterBoomer(boomArgs.masterBindHost, boomArgs.masterBindPort)
		} else if boomArgs.worker {
			hrpBoomer = hrp.NewWorkerBoomer(boomArgs.masterHost, boomArgs.masterPort)
		} else {
			hrpBoomer = hrp.NewStandaloneBoomer(boomArgs.SpawnCount, boomArgs.SpawnRate)
		}
		
		switch hrpBoomer.GetMode() {
		case "master":
			hrpBoomer.SetTestCasesPath(args)
			if boomArgs.autoStart {
				hrpBoomer.SetAutoStart()
				hrpBoomer.SetExpectWorkers(boomArgs.expectWorkers, boomArgs.expectWorkersMaxWait)
				hrpBoomer.SetSpawnCount(boomArgs.SpawnCount)
				hrpBoomer.SetSpawnRate(boomArgs.SpawnRate)
				hrpBoomer.SetRunTime(boomArgs.RunTime)
			}
			if boomArgs.autoStart {
				hrpBoomer.InitBoomer()
			} else {
				go hrpBoomer.StartServer(ctx, boomArgs.masterHttpAddress)
			}
			go hrpBoomer.PollTestCases(ctx)
			hrpBoomer.RunMaster()
		case "worker":
			if boomArgs.ignoreQuit {
				hrpBoomer.SetIgnoreQuit()
			}
			go hrpBoomer.PollTasks(ctx)
			hrpBoomer.RunWorker()
		case "standalone":
			if venv != "" {
				hrpBoomer.SetPython3Venv(venv)
			}
			hrpBoomer.InitBoomer()
			hrpBoomer.Run(paths...)
		}		
```
