"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[9558],{15773:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>r});var c=t(74848),i=t(28453);const o={sidebar_position:1},l=void 0,a={id:"topic/design-pattern/message-channel",title:"message-channel",description:"connect",source:"@site/docs/00800-topic/design-pattern/message-channel.md",sourceDirName:"00800-topic/design-pattern",slug:"/topic/design-pattern/message-channel",permalink:"/dddtdd-docs/topic/design-pattern/message-channel",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docSidebar",previous:{title:"\u90e8\u7f72\u76f8\u5173\u5de5\u5177",permalink:"/dddtdd-docs/topic/deployment/tools"},next:{title:"message-bus",permalink:"/dddtdd-docs/topic/design-pattern/message-bus"}},s={},r=[{value:"connect",id:"connect",level:2},{value:"disconnect",id:"disconnect",level:2},{value:"onConnectEndTimeout",id:"onconnectendtimeout",level:2},{value:"onReconnectTimeout",id:"onreconnecttimeout",level:2},{value:"scheduleReconnectIfNeeded",id:"schedulereconnectifneeded",level:2}];function d(n){const e={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...n.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-java",children:"private ScheduledExecutorService scheduledExecutorService;\nprivate ChannelState channelState;\nprivate ConnectOptions connectOptions;\nprivate ExponentialBackOff backOff;\nprivate BackOffExecution backOffExecution;\nprivate ListenableScheduledFuture reconnectFuture;\nprivate ListenableScheduledFuture connectEndFuture;\nprivate ListenableScheduledFuture keepaliveFuture;\n"})}),"\n",(0,c.jsx)(e.h2,{id:"connect",children:"connect"}),"\n",(0,c.jsx)(e.p,{children:"connectOptions\u6307\u5b9aconnectionTimeout\u548cautomaticReconnect"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:"\u68c0\u67e5\u72b6\u6001\u4e3aDISCONNECTED"}),"\n",(0,c.jsx)(e.li,{children:"\u6839\u636econnectionTimeout\u542f\u52a8\u8fde\u63a5\u8d85\u65f6timer"}),"\n",(0,c.jsx)(e.li,{children:"\u51c6\u5907\u91cd\u8fde\u76f8\u5173\u7684backoff"}),"\n",(0,c.jsx)(e.li,{children:"\u66f4\u65b0\u72b6\u6001\u5230CONNECTING"}),"\n",(0,c.jsx)(e.li,{children:"doConnect\u5177\u4f53\u8fde\u63a5"}),"\n"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-java",children:'  synchronized \uff08channelLock) {\n    if (channelState != ChannelState.DISCONNECTED) {\n        throw new IllegalStateException("Channel state is not disconnected");\n    }\n\n    backOff = new ExponentialBackOff(\n            properties.getExpBackOffInitialInterval(),\n            properties.getExpBackOffMultiplier()\n    );\n    if (connectOptions.getConnectionTimeout() > 0) {\n        backOff.setMaxElapsedTime(connectOptions.getConnectionTimeout());\n\n        connectEndFuture = scheduledExecutorService.schedule(\n                this::onConnectEndTimeout,\n                connectOptions.getConnectionTimeout(), TimeUnit.MILLISECONDS);\n    }\n\n    setChannelState(ChannelState.CONNECTING);    \n  }\n\n  scheduledExecutorService.execute(this::doConnect);\n'})}),"\n",(0,c.jsx)(e.h2,{id:"disconnect",children:"disconnect"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:"\u5982\u679c\u72b6\u6001\u4e3aDISCONNECTED\u6216DISCONNECTING\u5219\u76f4\u63a5\u8fd4\u56de"}),"\n",(0,c.jsx)(e.li,{children:"\u66f4\u65b0\u72b6\u6001\u4e3aDISCONNECTING"}),"\n",(0,c.jsx)(e.li,{children:"\u505c\u6b62\u8d85\u65f6\u548c\u91cd\u8fde\u8ba1\u65f6\u5668"}),"\n",(0,c.jsx)(e.li,{children:"\u8c03\u7528doDisconnect\u65ad\u5f00\u8fde\u63a5"}),"\n"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-java",children:"  synchronized (channelLock) {\n      if (channelState == ChannelState.DISCONNECTED ||\n              channelState == ChannelState.DISCONNECTING) {\n          return;\n      }\n\n      setChannelState(ChannelState.DISCONNECTING);\n\n      if (connectEndFuture != null) {\n          connectEndFuture.cancel(false);\n          connectEndFuture = null;\n      }\n\n      if (reconnectFuture != null) {\n          reconnectFuture.cancel(true);\n          reconnectFuture = null;\n      }\n  }\n\n  scheduledExecutorService.execute(this::doDisconnect);\n"})}),"\n",(0,c.jsx)(e.h2,{id:"onconnectendtimeout",children:"onConnectEndTimeout"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:"\u5982\u679c\u72b6\u6001\u4e0d\u4e3aCONNECTING\u5219\u76f4\u63a5\u8fd4\u56de"}),"\n",(0,c.jsx)(e.li,{children:"\u505c\u6b62\u91cd\u8fdetimer"}),"\n",(0,c.jsx)(e.li,{children:"\u66f4\u65b0\u72b6\u6001\u4e3aDISCONNECTED"}),"\n",(0,c.jsx)(e.li,{children:"\u53d1\u9001ConnectStateEvent\u5230EventBus"}),"\n"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-java",children:"  synchronized (channelLock) {\n      if (channelState == ChannelState.CONNECTING) {\n          if (reconnectFuture != null) {\n              reconnectFuture.cancel(true);\n              reconnectFuture = null;\n          }\n\n          setChannelState(ChannelState.DISCONNECTED);\n\n          sendConnectStateEventForTimeout();\n      }\n  }\n"})}),"\n",(0,c.jsx)(e.h2,{id:"onreconnecttimeout",children:"onReconnectTimeout"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:"\u68c0\u67e5\u72b6\u6001\uff0c\u4e0d\u4e3aCONNECTING\u5219\u76f4\u63a5\u8fd4\u56de"}),"\n",(0,c.jsx)(e.li,{children:"\u8c03\u7528doConnect\u8fde\u63a5"}),"\n"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-java",children:"  synchronized (switchLock) {\n      if (channelState == ChannelState.CONNECTING) {\n          doConnect();\n      }\n  }\n"})}),"\n",(0,c.jsx)(e.h2,{id:"schedulereconnectifneeded",children:"scheduleReconnectIfNeeded"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:"\u83b7\u53d6\u91cd\u8fde\u7b49\u5f85\u65f6\u95f4"}),"\n",(0,c.jsx)(e.li,{children:"\u542f\u52a8\u91cd\u8fdetimer"}),"\n"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-java",children:"    long waitInterval = backOffExecution.nextBackOff();\n\n    if (waitInterval != BackOffExecution.STOP) {\n        reconnectFuture = scheduledExecutorService.schedule(\n                this::onReconnectTimeout, waitInterval, TimeUnit.MILLISECONDS);\n    }\n"})})]})}function u(n={}){const{wrapper:e}={...(0,i.R)(),...n.components};return e?(0,c.jsx)(e,{...n,children:(0,c.jsx)(d,{...n})}):d(n)}},28453:(n,e,t)=>{t.d(e,{R:()=>l,x:()=>a});var c=t(96540);const i={},o=c.createContext(i);function l(n){const e=c.useContext(o);return c.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:l(n.components),c.createElement(o.Provider,{value:e},n.children)}}}]);