---
sidebar_position: 4
---

处理request和response时用到codec的配置

## CodecCustomizer jacksonCodecCustomizer

获取ObjectMapper Bean，对DefaultCodecs中的jackson2JsonDecoder和jackson2JsonEncoder进行配置

### jackson2JsonDecoder

- 如果输入不是utf-8则转换
- 通过JsonParser将输入转换为TokenBuffer流
- 通过ObjectReader和ObjectMapper将TokenBuffer流解析成目标Object

### Jackson2JsonEncoder

- 如果是流式MimeType则流式输出，否则先collect输入到一个list
- 通过ObjectWriter和ObjectMapper将Object序列化到ByteArray

## CodecCustomizer defaultCodecCustomizer

通过CodecProperties，对DefaultCodecs中的enableLoggingRequestDetails和maxInMemorySize进行配置

CodecProperties: `spring.codec`
