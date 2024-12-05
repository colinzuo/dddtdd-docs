"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[7649],{39914:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>d,contentTitle:()=>i,default:()=>a,frontMatter:()=>l,metadata:()=>c,toc:()=>u});var s=t(74848),o=t(28453);const l={},i=void 0,c={id:"frontend/vue3/element-plus/components/basic/button",title:"button",description:"button.ts",source:"@site/docs/00200-frontend/vue3/element-plus/components/0100-basic/0020-button.md",sourceDirName:"00200-frontend/vue3/element-plus/components/0100-basic",slug:"/frontend/vue3/element-plus/components/basic/button",permalink:"/dddtdd-docs/frontend/vue3/element-plus/components/basic/button",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:20,frontMatter:{},sidebar:"docSidebar",previous:{title:"icon",permalink:"/dddtdd-docs/frontend/vue3/element-plus/components/basic/icon"},next:{title:"button-group",permalink:"/dddtdd-docs/frontend/vue3/element-plus/components/basic/button-group"}},d={},u=[{value:"button.ts",id:"buttonts",level:2},{value:"use-button.ts",id:"use-buttonts",level:2},{value:"button-custom.ts",id:"button-customts",level:2},{value:"button.vue",id:"buttonvue",level:2},{value:"\u6309\u72b6\u6001\u8bbe\u7f6e button attribute",id:"\u6309\u72b6\u6001\u8bbe\u7f6e-button-attribute",level:3},{value:"\u6309\u7528\u6237\u8f93\u5165render",id:"\u6309\u7528\u6237\u8f93\u5165render",level:3}];function r(n){const e={code:"code",h2:"h2",h3:"h3",li:"li",pre:"pre",ul:"ul",...(0,o.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h2,{id:"buttonts",children:"button.ts"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"buttonTypes"}),"\n",(0,s.jsx)(e.li,{children:"buttonNativeTypes"}),"\n",(0,s.jsx)(e.li,{children:"buttonProps"}),"\n",(0,s.jsx)(e.li,{children:"buttonEmits"}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"use-buttonts",children:"use-button.ts"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-ts",children:"  return {\n    _disabled,\n    _size,\n    _type,\n    _ref,\n    shouldAddSpace,\n    handleClick,\n  }\n"})}),"\n",(0,s.jsx)(e.h2,{id:"button-customts",children:"button-custom.ts"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-ts",children:"  const _disabled = useDisabled()\n  const ns = useNamespace('button')\n\n        const hoverBgColor = props.dark\n          ? darken(color, 30)\n          : color.tint(30).toString()\n        const textColor = color.isDark()\n          ? `var(${ns.cssVarName('color-white')})`\n          : `var(${ns.cssVarName('color-black')})`\n"})}),"\n",(0,s.jsx)(e.h2,{id:"buttonvue",children:"button.vue"}),"\n",(0,s.jsx)(e.h3,{id:"\u6309\u72b6\u6001\u8bbe\u7f6e-button-attribute",children:"\u6309\u72b6\u6001\u8bbe\u7f6e button attribute"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-ts",children:"    :class=\"[\n      ns.b(),\n      ns.m(_type),\n      ns.m(_size),\n      ns.is('disabled', _disabled),\n      ns.is('loading', loading),\n      ns.is('plain', plain),\n      ns.is('round', round),\n      ns.is('circle', circle),\n      ns.is('text', text),\n      ns.is('link', link),\n      ns.is('has-bg', bg),\n    ]\"\n    :disabled=\"_disabled || loading\"\n    :autofocus=\"autofocus\"\n    :type=\"nativeType\"\n    :style=\"buttonStyle\"\n    @click=\"handleClick\"    \n"})}),"\n",(0,s.jsx)(e.h3,{id:"\u6309\u7528\u6237\u8f93\u5165render",children:"\u6309\u7528\u6237\u8f93\u5165render"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-ts",children:'    <template v-if="loading">\n      <slot v-if="$slots.loading" name="loading" />\n      <el-icon v-else :class="ns.is(\'loading\')">\n        <component :is="loadingIcon" />\n      </el-icon>\n    </template>\n    <el-icon v-else-if="icon || $slots.icon">\n      <component :is="icon" v-if="icon" />\n      <slot v-else name="icon" />\n    </el-icon>\n    <span\n      v-if="$slots.default"\n      :class="{ [ns.em(\'text\', \'expand\')]: shouldAddSpace }"\n    >\n      <slot />\n    </span>\n'})})]})}function a(n={}){const{wrapper:e}={...(0,o.R)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(r,{...n})}):r(n)}},28453:(n,e,t)=>{t.d(e,{R:()=>i,x:()=>c});var s=t(96540);const o={},l=s.createContext(o);function i(n){const e=s.useContext(l);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:i(n.components),s.createElement(l.Provider,{value:e},n.children)}}}]);