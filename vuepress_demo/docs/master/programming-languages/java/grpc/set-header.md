# 设置Header

## ClientInterceptor

如果是每次请求不变的header，比如认证相关的header如Authorization，可以通过ClientInterceptor设置

[HeaderClientInterceptor](https://github.com/grpc/grpc-java/blob/master/examples/src/main/java/io/grpc/examples/header/HeaderClientInterceptor.java)

## MetadataUtils

如果是每次请求不一样的header，比如消息id，可以通过MetadataUtils设置

[MetadataUtils](https://grpc.github.io/grpc-java/javadoc/io/grpc/stub/MetadataUtils.html)
