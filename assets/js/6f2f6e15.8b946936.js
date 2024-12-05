"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[8070],{1500:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var n=t(74848),r=t(28453);const i={},a="Network Requests",o={id:"frontend/cypress/guides/network-requests",title:"Network Requests",description:"What you'll learn",source:"@site/docs/00200-frontend/cypress/060-guides/060-network-requests.md",sourceDirName:"00200-frontend/cypress/060-guides",slug:"/frontend/cypress/guides/network-requests",permalink:"/dddtdd-docs/frontend/cypress/guides/network-requests",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1721530274e3,sidebarPosition:60,frontMatter:{},sidebar:"docSidebar",previous:{title:"Module API",permalink:"/dddtdd-docs/frontend/cypress/guides/module-api"},next:{title:"Screenshots and Videos",permalink:"/dddtdd-docs/frontend/cypress/guides/screenshots-and-videos"}},c={},l=[{value:"What you&#39;ll learn",id:"what-youll-learn",level:2},{value:"Testing Strategies",id:"testing-strategies",level:2},{value:"Routing",id:"routing",level:2},{value:"Fixtures",id:"fixtures",level:2},{value:"Waiting",id:"waiting",level:2}];function d(e){const s={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"network-requests",children:"Network Requests"}),"\n",(0,n.jsx)(s.h2,{id:"what-youll-learn",children:"What you'll learn"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["How Cypress enables you to stub out the back end with ",(0,n.jsx)(s.code,{children:"cy.intercept()"})]}),"\n",(0,n.jsx)(s.li,{children:"What tradeoffs we make when we stub our network requests"}),"\n",(0,n.jsx)(s.li,{children:"How Cypress visualizes network management in the Command Log"}),"\n",(0,n.jsx)(s.li,{children:"How to use Aliases to refer back to requests and wait on them"}),"\n",(0,n.jsx)(s.li,{children:"How to write declarative tests that resist flake"}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"testing-strategies",children:"Testing Strategies"}),"\n",(0,n.jsx)(s.p,{children:"Common testing scenarios:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Asserting on a request's body"}),"\n",(0,n.jsx)(s.li,{children:"Asserting on a request's url"}),"\n",(0,n.jsx)(s.li,{children:"Asserting on a request's headers"}),"\n",(0,n.jsx)(s.li,{children:"Stubbing a response's body"}),"\n",(0,n.jsx)(s.li,{children:"Stubbing a response's status code"}),"\n",(0,n.jsx)(s.li,{children:"Stubbing a response's headers"}),"\n",(0,n.jsx)(s.li,{children:"Delaying a response"}),"\n",(0,n.jsx)(s.li,{children:"Waiting for a response to happen"}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"routing",children:"Routing"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"cy.intercept(\r\n  {\r\n    method: 'GET', // Route all GET requests\r\n    url: '/users/*', // that have a URL that matches '/users/*'\r\n  },\r\n  [] // and force the response to be: []\r\n).as('getUsers') // and assign an alias\n"})}),"\n",(0,n.jsx)(s.h2,{id:"fixtures",children:"Fixtures"}),"\n",(0,n.jsxs)(s.p,{children:["A fixture is a fixed set of ",(0,n.jsx)(s.strong,{children:"data located in a file"})," that is used in your tests. The purpose of a test fixture is to ensure that there is a well known and fixed environment in which tests are run so that results are repeatable. Fixtures are accessed within tests by calling the ",(0,n.jsx)(s.code,{children:"cy.fixture()"})," command"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"// we set the response to be the activites.json fixture\r\ncy.intercept('GET', '/activities/*', { fixture: 'activities.json' })\n"})}),"\n",(0,n.jsx)(s.h2,{id:"waiting",children:"Waiting"}),"\n",(0,n.jsxs)(s.p,{children:["Whether or not you choose to stub responses, Cypress enables you to declaratively ",(0,n.jsx)(s.code,{children:"cy.wait()"})," for requests and their responses"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"cy.intercept('/activities/*', { fixture: 'activities' }).as('getActivities')\r\ncy.intercept('/messages/*', { fixture: 'messages' }).as('getMessages')\r\n\r\n// mounting the dashboard should make requests that match\r\n// the two routes above\r\ncy.mount(<Dashboard />)\r\n\r\n// pass an array of Route Aliases that forces Cypress to wait\r\n// until it sees a response for each request that matches\r\n// each of these aliases\r\ncy.wait(['@getActivities', '@getMessages'])\r\n\r\n// these commands will not run until the wait command resolves above\r\ncy.get('h1').should('contain', 'Dashboard')\n"})}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"cy.intercept({\r\n  method: 'POST',\r\n  url: '/myApi',\r\n}).as('apiCheck')\r\n\r\ncy.visit('/')\r\ncy.wait('@apiCheck').then((interception) => {\r\n  assert.isNotNull(interception.response.body, '1st API call has data')\r\n})\r\n\r\ncy.wait('@apiCheck').then((interception) => {\r\n  assert.isNotNull(interception.response.body, '2nd API call has data')\r\n})\r\n\r\ncy.wait('@apiCheck').then((interception) => {\r\n  assert.isNotNull(interception.response.body, '3rd API call has data')\r\n})\n"})})]})}function u(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},28453:(e,s,t)=>{t.d(s,{R:()=>a,x:()=>o});var n=t(96540);const r={},i=n.createContext(r);function a(e){const s=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),n.createElement(i.Provider,{value:s},e.children)}}}]);