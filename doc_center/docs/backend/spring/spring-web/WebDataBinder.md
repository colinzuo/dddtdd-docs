
[DataBinder](../spring-context/DataBinder.md)

```java
public class WebDataBinder extends DataBinder {

	protected void doBind(MutablePropertyValues mpvs) {
    // 检查字段缺省值，比如!age=1，如果age没设置则设置它为1
		checkFieldDefaults(mpvs);
    // 检查字段marker，比如_helloName，如果helloName没设置
    // 则设置helloName的值为对应类型空值
		checkFieldMarkers(mpvs);
    // 如果字段结尾为[]，比如colors[]，则改成colors
		adaptEmptyArrayIndices(mpvs);
		super.doBind(mpvs);
	}
```