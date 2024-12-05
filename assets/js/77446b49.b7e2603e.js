"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[3504],{79367:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>o});var s=n(74848),i=n(28453);const r={},c=void 0,l={id:"topic/test/perf-test/k6",title:"k6",description:"https://github.com/grafana/k6",source:"@site/docs/00800-topic/test/perf-test/00300-k6.md",sourceDirName:"00800-topic/test/perf-test",slug:"/topic/test/perf-test/k6",permalink:"/dddtdd-docs/topic/test/perf-test/k6",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:300,frontMatter:{},sidebar:"docSidebar",previous:{title:"\u963f\u91cc\u4e91PTS",permalink:"/dddtdd-docs/topic/test/perf-test/\u963f\u91cc\u4e91PTS"},next:{title:"locust",permalink:"/dddtdd-docs/topic/test/perf-test/locust"}},d={},o=[{value:"\u6982\u8ff0",id:"\u6982\u8ff0",level:2},{value:"\u8fd0\u884c",id:"\u8fd0\u884c",level:2},{value:"Metric",id:"metric",level:2},{value:"Built-in metrics",id:"built-in-metrics",level:3},{value:"Create custom metrics",id:"create-custom-metrics",level:3},{value:"\u534f\u8bae",id:"\u534f\u8bae",level:2},{value:"HTTP",id:"http",level:3},{value:"gRPC",id:"grpc",level:3},{value:"Testing guides",id:"testing-guides",level:2},{value:"Load test types",id:"load-test-types",level:3}];function a(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://github.com/grafana/k6",children:"https://github.com/grafana/k6"}),"\n",(0,s.jsx)(t.a,{href:"https://k6.io/",children:"https://k6.io/"}),"\n",(0,s.jsx)(t.a,{href:"https://grafana.com/docs/k6/latest/",children:"https://grafana.com/docs/k6/latest/"})]}),"\n",(0,s.jsx)(t.h2,{id:"\u6982\u8ff0",children:"\u6982\u8ff0"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"\u5f00\u6e90\u514d\u8d39\u7248\u4e0d\u652f\u6301\u5206\u5e03\u5f0f\u8fd0\u884c"}),"\n",(0,s.jsx)(t.li,{children:"Scripting in JavaScript ES2015/ES6"}),"\n",(0,s.jsx)(t.li,{children:"the tool itself is written in Go, embedding a JavaScript runtime allowing for easy test scripting"}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"\u8fd0\u884c",children:"\u8fd0\u884c"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.code,{children:"k6 run --vus 10 --duration 30s script.js"})}),"\n",(0,s.jsx)(t.p,{children:"For a test to run, you need to have init code, which prepares the test, and VU code, which makes requests."}),"\n",(0,s.jsx)(t.p,{children:"Code in the init context defines functions and configures the test options (like duration)."}),"\n",(0,s.jsx)(t.p,{children:"Every test also has a default function, which defines the VU logic"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"// init\n\nexport default function () {\n  // vu code: do things here...\n}\n"})}),"\n",(0,s.jsx)(t.p,{children:"Init code runs first and is called only once per VU. The default code runs as many times or as long as is configured in the test options"}),"\n",(0,s.jsx)(t.h2,{id:"metric",children:"Metric"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.a,{href:"https://k6.io/docs/using-k6/metrics/",children:"https://k6.io/docs/using-k6/metrics/"})}),"\n",(0,s.jsx)(t.p,{children:"By default, k6 automatically collects built-in metrics. Besides built-ins, you can also make custom metrics"}),"\n",(0,s.jsx)(t.p,{children:"To filter metrics, you can use Tags and groups. You can also export metrics in various summary and granular formats, as documented in Results output"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"requests: measure traffic (in requests)"}),"\n",(0,s.jsx)(t.li,{children:"errors:   availability (in error rate)"}),"\n",(0,s.jsx)(t.li,{children:"duration: latency (in request duration)"}),"\n"]}),"\n",(0,s.jsx)(t.h3,{id:"built-in-metrics",children:"Built-in metrics"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"vus"}),"\n",(0,s.jsx)(t.li,{children:"vus_max"}),"\n",(0,s.jsx)(t.li,{children:"iterations"}),"\n",(0,s.jsx)(t.li,{children:"iteration_duration"}),"\n",(0,s.jsx)(t.li,{children:"dropped_iterations"}),"\n",(0,s.jsx)(t.li,{children:"http_reqs"}),"\n",(0,s.jsx)(t.li,{children:"http_req_duration"}),"\n",(0,s.jsx)(t.li,{children:"http_req_failed"}),"\n",(0,s.jsx)(t.li,{children:"grpc_req_duration"}),"\n",(0,s.jsx)(t.li,{children:"grpc_streams"}),"\n",(0,s.jsx)(t.li,{children:"grpc_streams_msgs_sent"}),"\n",(0,s.jsx)(t.li,{children:"grpc_streams_msgs_received"}),"\n"]}),"\n",(0,s.jsx)(t.h3,{id:"create-custom-metrics",children:"Create custom metrics"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"import http from 'k6/http';\nimport { Trend } from 'k6/metrics';\n\nconst myTrend = new Trend('waiting_time');\n\nexport default function () {\n  const r = http.get('https://httpbin.test.k6.io');\n  myTrend.add(r.timings.waiting);\n  console.log(myTrend.name); // waiting_time\n}\n"})}),"\n",(0,s.jsx)(t.h2,{id:"\u534f\u8bae",children:"\u534f\u8bae"}),"\n",(0,s.jsx)(t.h3,{id:"http",children:"HTTP"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.a,{href:"https://k6.io/docs/using-k6/http-requests/",children:"https://k6.io/docs/using-k6/http-requests/"})}),"\n",(0,s.jsx)(t.h3,{id:"grpc",children:"gRPC"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.a,{href:"https://k6.io/blog/performance-testing-grpc-services/",children:"https://k6.io/blog/performance-testing-grpc-services/"})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"import grpc from 'k6/net/grpc';\nimport { check, sleep } from 'k6';\n\nconst client = new grpc.Client();\nclient.load(['definitions'], 'hello.proto');\n\nexport default () => {\n  client.connect('grpcbin.test.k6.io:9001', {\n    // plaintext: false\n  });\n\n  const data = { greeting: 'Bert' };\n  const response = client.invoke('hello.HelloService/SayHello', data);\n\n  check(response, {\n    'status is OK': (r) => r && r.status === grpc.StatusOK,\n  });\n\n  console.log(JSON.stringify(response.message));\n\n  client.close();\n  sleep(1);\n};\n"})}),"\n",(0,s.jsx)(t.h2,{id:"testing-guides",children:"Testing guides"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.a,{href:"https://grafana.com/docs/k6/latest/testing-guides/",children:"https://grafana.com/docs/k6/latest/testing-guides/"})}),"\n",(0,s.jsx)(t.h3,{id:"load-test-types",children:"Load test types"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.a,{href:"https://grafana.com/docs/k6/latest/testing-guides/test-types/",children:"https://grafana.com/docs/k6/latest/testing-guides/test-types/"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Smoke tests"}),"\n",(0,s.jsx)(t.li,{children:"Average-load test"}),"\n",(0,s.jsx)(t.li,{children:"Stress tests"}),"\n",(0,s.jsx)(t.li,{children:"Soak tests"}),"\n",(0,s.jsx)(t.li,{children:"Spike tests"}),"\n",(0,s.jsx)(t.li,{children:"Breakpoint tests"}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>c,x:()=>l});var s=n(96540);const i={},r=s.createContext(i);function c(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);