"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[3692],{45532:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var s=t(74848),r=t(28453);const a={},i="Variables and Aliases",l={id:"frontend/cypress/core-concepts/variables-and-aliases",title:"Variables and Aliases",description:"What you'll learn",source:"@site/docs/00200-frontend/cypress/050-core-concepts/060-variables-and-aliases.md",sourceDirName:"00200-frontend/cypress/050-core-concepts",slug:"/frontend/cypress/core-concepts/variables-and-aliases",permalink:"/dddtdd-docs/frontend/cypress/core-concepts/variables-and-aliases",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1721530274e3,sidebarPosition:60,frontMatter:{},sidebar:"docSidebar",previous:{title:"Interacting with Elements",permalink:"/dddtdd-docs/frontend/cypress/core-concepts/interacting-with-elements"},next:{title:"Conditional Testing",permalink:"/dddtdd-docs/frontend/cypress/core-concepts/conditional-testing"}},o={},c=[{value:"What you&#39;ll learn",id:"what-youll-learn",level:2},{value:"Return Values",id:"return-values",level:2},{value:"Closures",id:"closures",level:3},{value:"Debugging",id:"debugging",level:3},{value:"Variables",id:"variables",level:3},{value:"Aliases",id:"aliases",level:2},{value:"Sharing Context",id:"sharing-context",level:3},{value:"Elements",id:"elements",level:3},{value:"Aliases are reset before each test",id:"aliases-are-reset-before-each-test",level:3}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"variables-and-aliases",children:"Variables and Aliases"}),"\n",(0,s.jsx)(n.h2,{id:"what-youll-learn",children:"What you'll learn"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"How to deal with async commands"}),"\n",(0,s.jsx)(n.li,{children:"What Aliases are and how they simplify your code"}),"\n",(0,s.jsx)(n.li,{children:"Why you rarely need to use variables with Cypress"}),"\n",(0,s.jsx)(n.li,{children:"How to use Aliases for objects, elements and routes"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"return-values",children:"Return Values"}),"\n",(0,s.jsx)(n.h3,{id:"closures",children:"Closures"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"cy.get('button').then(($btn) => {\r\n\r\n  // store the button's text\r\n  const txt = $btn.text()\r\n\r\n  // submit a form\r\n  cy.get('form').submit()\r\n\r\n  // compare the two buttons' text\r\n  // and make sure they are different\r\n  cy.get('button').should(($btn2) => {\r\n    expect($btn2.text()).not.to.eq(txt)\r\n  })\r\n})\r\n\r\n// these commands run after all of the\r\n// other previous commands have finished\r\ncy.get(...).find(...).should(...)\n"})}),"\n",(0,s.jsx)(n.h3,{id:"debugging",children:"Debugging"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"cy.get('button').then(($btn) => {\r\n  // inspect $btn <object>\r\n  debugger\r\n\r\n  cy.get('[data-testid=\"countries\"]')\r\n    .select('USA')\r\n    .then(($select) => {\r\n      // inspect $select <object>\r\n      debugger\r\n\r\n      cy.clock().then(($clock) => {\r\n        // inspect $clock <object>\r\n        debugger\r\n\r\n        $btn // is still available\r\n        $select // is still available too\r\n      })\r\n    })\r\n})\n"})}),"\n",(0,s.jsx)(n.h3,{id:"variables",children:"Variables"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"// cypress test code\r\ncy.get('[data-testid=\"num\"]').then(($span) => {\r\n  // capture what num is right now\r\n  const num1 = parseFloat($span.text())\r\n\r\n  cy.get('button')\r\n    .click()\r\n    .then(() => {\r\n      // now capture it again\r\n      const num2 = parseFloat($span.text())\r\n\r\n      // make sure it's what we expected\r\n      expect(num2).to.eq(num1 + 1)\r\n    })\r\n})\n"})}),"\n",(0,s.jsx)(n.h2,{id:"aliases",children:"Aliases"}),"\n",(0,s.jsx)(n.h3,{id:"sharing-context",children:"Sharing Context"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"beforeEach(() => {\r\n  // alias the $btn.text() as 'text'\r\n  cy.get('button').invoke('text').as('text')\r\n})\r\n\r\nit('has access to text', function () {\r\n  this.text // is now available\r\n})\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Under the hood, aliasing basic objects and primitives utilizes ",(0,s.jsx)(n.strong,{children:"Mocha's shared context object"}),": that is, aliases are available as ",(0,s.jsx)(n.code,{children:"this.*"})]}),"\n",(0,s.jsxs)(n.p,{children:["When using ",(0,s.jsx)(n.code,{children:"this.users"}),", it is stored on the context when it is first evaluated. But when using ",(0,s.jsx)(n.code,{children:"cy.get('@users')"}),", any queries are re-evaluated every time the alias is accessed"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"const favorites = { color: 'blue' }\r\n\r\ncy.wrap(favorites).its('color').as('favoriteColor')\r\n\r\ncy.then(function () {\r\n  favorites.color = 'red'\r\n})\r\n\r\ncy.get('@favoriteColor').then(function (aliasValue) {\r\n  expect(aliasValue).to.eql('red')\r\n\r\n  expect(this.favoriteColor).to.eql('blue')\r\n})\n"})}),"\n",(0,s.jsx)(n.h3,{id:"elements",children:"Elements"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"// alias all of the tr's found in the table as 'rows'\r\ncy.get('table').find('tr').as('rows')\r\n\r\n// Cypress returns the reference to the <tr>'s\r\n// which allows us to continue to chain commands\r\n// finding the 1st row.\r\ncy.get('@rows').first().click()\n"})}),"\n",(0,s.jsx)(n.h3,{id:"aliases-are-reset-before-each-test",children:"Aliases are reset before each test"}),"\n",(0,s.jsxs)(n.p,{children:["all aliases are ",(0,s.jsx)(n.strong,{children:"reset before each test"}),". A common user mistake is to create aliases using the before hook. Such aliases work in the first test only!"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>l});var s=t(96540);const r={},a=s.createContext(r);function i(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);