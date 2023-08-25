
## Config

- TConfig

```yaml
config:
    name: "request methods testcase with functions"
    variables:
        foo1: config_bar1
        foo2: config_bar2
        expect_foo1: config_bar1
        expect_foo2: config_bar2
    base_url: "https://postman-echo.com"
    verify: False
    export: ["foo3"]
```

## Step

- IStep

```yaml
teststeps:
-
    name: get with params
    variables:
        foo1: bar11
        foo2: bar21
        sum_v: "${sum_two(1, 2)}"
    request:
        method: GET
        url: /get
        params:
            foo1: $foo1
            foo2: $foo2
            sum_v: $sum_v
        headers:
            User-Agent: HttpRunner/${get_httprunner_version()}
    extract:
        foo3: "body.args.foo2"
    validate:
        - eq: ["status_code", 200]
        - eq: ["body.args.foo1", "bar11"]
        - eq: ["body.args.sum_v", "3"]
        - eq: ["body.args.foo2", "bar21"]
```		

## Variable

<https://httprunner.com/docs/user-guide/enhance-tests/variables/>

### 全局变量

在 config 下声明的 variables 为测试用例全局变量，作用域为整个测试用例，在测试用例的所有地方都可以引用

### 数据驱动

在 config 下声明的 parameters 为测试用例的驱动参数；它的作用域也是覆盖整个测试用例，在测试用例的所有地方都可以引用

### 局部变量

在单个测试步骤（teststep）下声明的 variables 是测试步骤局部变量，作用域仅限当前步骤

### 参数变量（session variables）

可以在某个测试步骤（teststep）中提取（extract）特定的响应参数，并赋值给指定的变量名。该操作也常被成为 参数关联。

提取的参数变量类似于 session 参数，作用域为当前步骤及之后的步骤

### 变量优先级

优先级从高到低依次为：step variables > session variables > parameter variables > config variables

## Other

- TestCase

- ParametersIterator
- CaseRunner
- SessionRunner
- TestCaseSummary

```go
type TestCase struct {
	Config    *TConfig
	TestSteps []IStep
}
```

```go
type IStep interface {
	Name() string
	Type() StepType
	Struct() *TStep
	Run(*SessionRunner) (*StepResult, error)
}
```

```go
type HRPRunner struct {
	t             *testing.T
	failfast      bool
	requestsLogOn bool
	pluginLogOn   bool
	saveTests     bool
	genHTMLReport bool
	client        *http.Client
}

func (r *HRPRunner) Run(testcases ...ITestCase) error
func (r *HRPRunner) NewCaseRunner(testcase *TestCase) (*CaseRunner, error)
```

```go
type CaseRunner struct {
	testCase  *TestCase
	hrpRunner *HRPRunner
	parser    *Parser

	parsedConfig       *TConfig
	parametersIterator *ParametersIterator
	rootDir            string // project root dir
}

func (r *CaseRunner) NewSession() *SessionRunner {
```

```go
type SessionRunner struct {
	caseRunner       *CaseRunner
	sessionVariables map[string]interface{}
	transactions      map[string]map[transactionType]time.Time
	startTime         time.Time                  // record start time of the testcase
	summary           *TestCaseSummary           // record test case summary
}

func (r *SessionRunner) Start(givenVars map[string]interface{}) error
```


