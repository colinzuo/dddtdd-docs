
## 如何访问webrtc-internals
在有webrtc会话的时候，新打开一个tab，然后访问chrome://webrtc-internals/

## 词典
- BUNDLE: 在同一个socket连接上传多路流的技术  
<https://webrtcstandards.info/sdp-bundle/>
- BWE: bandwidth estimate
- FIR: Full Intra Request
- NACK: Negative Acknowledgement
- PLI: Picture Loss Indication
- rtcp-mux: 在同一个socket连接上同时传输rtp和rtcp的技术  
<https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration#RTCRtcpMuxPolicy_enum>

## 示例媒体统计数据

```
Statistics RTCInboundRTPVideoStream_1417484896

kind	video

firCount	0
pliCount	20
nackCount	26

[bytesReceived_in_bits/s]	86817.18910334124

packetsLost	66
framesReceived	3317
framesDecoded	3317
[framesDecoded/s]	14.985016070032664
keyFramesDecoded	56
framesDropped	0

lastPacketReceivedTimestamp	1.86209e+06

[codec]	H264 (96, level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=640014)
frameWidth	320
frameHeight	240
framesPerSecond	15
```

## 参考文档
<https://www.w3.org/TR/webrtc/>

[The Missing chrome://webrtc-internals Documentation](https://testrtc.com/webrtc-internals-documentation)

[What do the Parameters in webrtc-internals Really Mean](https://testrtc.com/webrtc-internals-parameters/)

这个文档讲了chrome可能因为cpu不足，或者带宽不足而降低帧率和编码分辨率，相关参数
googFrameRateInput, googCpuLimitedResolution ，googBandwidthLimitedResolution

这些个人在webrtc-internal中没有看到，有一些如果选legacy view能看到

[How do you find the current active connection in webrtc-internals](https://testrtc.com/find-webrtc-active-connection/)

这个文档讲连接，比如ICE，下面示例icecandidate事件中typ host代表这是一个local
地址，然后typ srflx对应STUN，typ relay对应TURN

```
sdpMid: video, sdpMLineIndex: 0, candidate: candidate:2747735740 1 udp 2122260223 192.168.75.1 60542 typ host generation 0 ufrag 307y network-id 2
```

ICE通过优先级控制使用哪个，TURN这种通过中继转发的被设为低优先级

[Your best WebRTC debugging buddy](https://testrtc.com/webrtc-api-trace/)


