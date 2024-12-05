"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[1888],{20854:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>d,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var s=n(74848),r=n(28453);const i={},d="Your First Test with Cypress",o={id:"frontend/cypress/end-to-end-testing/writing-your-first-end-to-end-test",title:"Your First Test with Cypress",description:"What you'll learn",source:"@site/docs/00200-frontend/cypress/030-end-to-end-testing/010-writing-your-first-end-to-end-test.md",sourceDirName:"00200-frontend/cypress/030-end-to-end-testing",slug:"/frontend/cypress/end-to-end-testing/writing-your-first-end-to-end-test",permalink:"/dddtdd-docs/frontend/cypress/end-to-end-testing/writing-your-first-end-to-end-test",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1721530274e3,sidebarPosition:10,frontMatter:{},sidebar:"docSidebar",previous:{title:"Opening the App",permalink:"/dddtdd-docs/frontend/cypress/getting-started/opening-the-app"},next:{title:"Testing Your App",permalink:"/dddtdd-docs/frontend/cypress/end-to-end-testing/testing-your-app"}},a={},l=[{value:"What you&#39;ll learn",id:"what-youll-learn",level:2},{value:"Add a test file",id:"add-a-test-file",level:2},{value:"Write your first test",id:"write-your-first-test",level:2},{value:"Write a real test",id:"write-a-real-test",level:2}];function c(e){const t={code:"code",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"your-first-test-with-cypress",children:"Your First Test with Cypress"}),"\n",(0,s.jsx)(t.h2,{id:"what-youll-learn",children:"What you'll learn"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"How to start testing a new project in Cypress."}),"\n",(0,s.jsx)(t.li,{children:"What passing and failing tests look like."}),"\n",(0,s.jsx)(t.li,{children:"Testing web navigation, DOM querying, and writing assertions."}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"add-a-test-file",children:"Add a test file"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{src:"https://docs.cypress.io/img/guides/end-to-end-testing/writing-your-first-end-to-end-test/create-new-spec.png",alt:"create-new-spec"})}),"\n",(0,s.jsx)(t.h2,{id:"write-your-first-test",children:"Write your first test"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-ts",children:"describe('My First Test', () => {\r\n  it('Does not do much!', () => {\r\n    expect(true).to.equal(true)\r\n  })\r\n})\n"})}),"\n",(0,s.jsx)(t.h2,{id:"write-a-real-test",children:"Write a real test"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-ts",children:"describe('My First Test', () => {\r\n  it('Gets, types and asserts', () => {\r\n    cy.visit('https://example.cypress.io')\r\n\r\n    cy.contains('type').click()\r\n\r\n    // Should be on a new URL which\r\n    // includes '/commands/actions'\r\n    cy.url().should('include', '/commands/actions')\r\n\r\n    // Get an input, type into it\r\n    cy.get('.action-email').type('fake@email.com')\r\n\r\n    //  Verify that the value has been updated\r\n    cy.get('.action-email').should('have.value', 'fake@email.com')\r\n  })\r\n})\n"})})]})}function u(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>d,x:()=>o});var s=n(96540);const r={},i=s.createContext(r);function d(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);