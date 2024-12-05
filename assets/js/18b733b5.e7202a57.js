"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[1928],{19652:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>d,contentTitle:()=>s,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>l});var n=t(74848),i=t(28453);const r={},s=void 0,o={id:"tools/database/migrate-go",title:"migrate-go",description:"golang-migrate",source:"@site/docs/00700-tools/database/020-migrate-go.md",sourceDirName:"00700-tools/database",slug:"/tools/database/migrate-go",permalink:"/dddtdd-docs/tools/database/migrate-go",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:20,frontMatter:{},sidebar:"docSidebar",previous:{title:"general",permalink:"/dddtdd-docs/tools/database/general"},next:{title:"installation",permalink:"/dddtdd-docs/tools/docker/installation"}},d={},l=[{value:"golang-migrate",id:"golang-migrate",level:2},{value:"Create migrations",id:"create-migrations",level:3},{value:"Run migrations",id:"run-migrations",level:3},{value:"Forcing your database version",id:"forcing-your-database-version",level:3},{value:"Migration Filename Format",id:"migration-filename-format",level:3},{value:"FAQ",id:"faq",level:3},{value:"What does &quot;dirty&quot; database mean",id:"what-does-dirty-database-mean",level:4},{value:"What happens if two programs try and update the database at the same time",id:"what-happens-if-two-programs-try-and-update-the-database-at-the-same-time",level:4}];function c(e){const a={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a.h2,{id:"golang-migrate",children:"golang-migrate"}),"\n",(0,n.jsx)(a.p,{children:(0,n.jsx)(a.a,{href:"https://github.com/golang-migrate/migrate",children:"https://github.com/golang-migrate/migrate"})}),"\n",(0,n.jsx)(a.h3,{id:"create-migrations",children:"Create migrations"}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"migrate create -ext sql -dir db/migrations -seq create_users_table\n"})}),"\n",(0,n.jsx)(a.h3,{id:"run-migrations",children:"Run migrations"}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"migrate -database YOUR_DATABASE_URL -path PATH_TO_YOUR_MIGRATIONS up\n"})}),"\n",(0,n.jsx)(a.h3,{id:"forcing-your-database-version",children:"Forcing your database version"}),"\n",(0,n.jsxs)(a.p,{children:["In case you run a migration that contained an error, migrate will not let you run other migrations on the same database. You will see an error like ",(0,n.jsx)(a.code,{children:"Dirty database version 1. Fix and force version"}),", even when you fix the erred migration"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"migrate -path PATH_TO_YOUR_MIGRATIONS -database YOUR_DATABASE_URL force VERSION\n"})}),"\n",(0,n.jsx)(a.h3,{id:"migration-filename-format",children:"Migration Filename Format"}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-go",children:"{version}_{title}.up.{extension}\n{version}_{title}.down.{extension}\n"})}),"\n",(0,n.jsx)(a.p,{children:"The title of each migration is unused, and is only for readability. Similarly, the extension of the migration files is not checked by the library, and should be an appropriate format for the database in use"}),"\n",(0,n.jsx)(a.h3,{id:"faq",children:"FAQ"}),"\n",(0,n.jsx)(a.p,{children:(0,n.jsx)(a.a,{href:"https://github.com/golang-migrate/migrate/blob/master/FAQ.md",children:"https://github.com/golang-migrate/migrate/blob/master/FAQ.md"})}),"\n",(0,n.jsx)(a.h4,{id:"what-does-dirty-database-mean",children:'What does "dirty" database mean'}),"\n",(0,n.jsx)(a.p,{children:'Before a migration runs, each database sets a dirty flag. Execution stops if a migration fails and the dirty state persists, which prevents attempts to run more migrations on top of a failed migration. You need to manually fix the error and then "force" the expected version'}),"\n",(0,n.jsx)(a.h4,{id:"what-happens-if-two-programs-try-and-update-the-database-at-the-same-time",children:"What happens if two programs try and update the database at the same time"}),"\n",(0,n.jsxs)(a.p,{children:["Database-specific locking features are used by some database drivers to prevent multiple instances of migrate from running migrations at the same time the same database at the same time. For example, the MySQL driver uses the ",(0,n.jsx)(a.code,{children:"GET_LOCK"})," function, while the Postgres driver uses the ",(0,n.jsx)(a.code,{children:"pg_advisory_lock"})," function"]})]})}function h(e={}){const{wrapper:a}={...(0,i.R)(),...e.components};return a?(0,n.jsx)(a,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},28453:(e,a,t)=>{t.d(a,{R:()=>s,x:()=>o});var n=t(96540);const i={},r=n.createContext(i);function s(e){const a=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function o(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),n.createElement(r.Provider,{value:a},e.children)}}}]);