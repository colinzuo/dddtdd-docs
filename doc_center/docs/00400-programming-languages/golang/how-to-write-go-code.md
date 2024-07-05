
[https://golang.org/doc/code](https://golang.org/doc/code)

## package
同一个目录下的代码组成一个package

## module
一个module包含多个package

一个module有一个go.mod文件来描述它的名字和它的依赖项

## test

创建结尾为_test.go的测试文件，文件内测试函数规则为
名字TestXXX，签名func (t *testing.T)，如果函数调用
了某个失败函数，比如t.Error 或者 t.Fail，测试就被认为失败了

