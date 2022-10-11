(function(){var e={3876:function(e,t,a){"use strict";var n={};a.r(n),a.d(n,{COPY:function(){return z},TRANSLATE:function(){return G}});var r=a(9242),o=a(3396),i=(a(7658),a(7139)),l=a(4870);const u={fileName:"",doc:null,scale:1.6,pageCache:new Map,async getPage(e){if(!this.doc)return;const t=this.doc.numPages;if(!(e>t||e<=0)){if(!this.pageCache.has(e)){const t=await this.doc.getPage(e);this.pageCache.set(e,t)}return this.pageCache.get(e)}}};var c=u,s=a(8003);function d(e){return new Promise(((t,a)=>{const n=new FileReader;n.readAsDataURL(e),n.onload=()=>{t(n.result)},n.onerror=()=>{a()}}))}async function v(e,t){if(!t)return;const a=s.getDocument(t),n=await a.promise;e.doc=n,e.pageCache=new Map}async function f(e,t){if(!t)return;const a=await d(t);if(!a)return;const n=s.getDocument(a),r=await n.promise;e.pageCache=new Map,e.fileName=t.name,e.doc=r}var g={setPdfFromUrl:v,setPdfFromFile:f};function p(e,t){return t in e}function h(e,t){const a=new Map;function n(e,t){return a.has(e)?a.get(e).push(t):a.set(e,[t]),function(){a.set(e,a.get(e).filter((e=>e!==t)))}}const r=new Proxy(Object.assign(e),{set(t,n,o){if(!p(e,n))return!1;t[n]=o;const i=a.get(n);return i&&i.forEach((e=>e(r))),!0}}),o={};return Object.keys(t).forEach((e=>{o[e]=a=>{if(p(t,e)){const n=t[e];n(r,a)}}})),new Proxy({$subscribe:n,...r,...o},{get(e,t){return p(r,t)?r[t]:p(o,t)?o[t]:p(e,t)?e[t]:void 0}})}const E=h(c,g);function m(){return E}var b=(0,o.aZ)({__name:"PdfPage",props:{pageIndex:{type:Number,required:!0}},setup(e){const t=e,a=m(),n=(0,l.iH)(),r=(0,l.iH)(),i=(0,l.iH)();let u,c,d;async function v(e,t){c=await e.getViewport(t),e&&c&&d&&(f(c),g(e,c,d),p(e,c))}function f(e){n.value&&r.value&&(n.value.style.width=e.width+"px",n.value.style.height=e.height+"px",r.value.width=e.width,r.value.height=e.height)}async function g(e,t,a){r.value&&(r.value.width=t.width,r.value.height=t.height);const n={canvasContext:a,viewport:t};await e.render(n).promise}async function p(e,t){i.value&&r.value&&(i.value.innerHTML="",i.value.style.left=r.value.offsetHeight+"px",i.value.style.left=r.value.offsetTop+"px",s.renderTextLayer({textContent:await e.getTextContent(),container:i.value,viewport:t}))}return(0,o.bv)((async()=>{d=r.value?.getContext("2d"),u=await a.getPage(t.pageIndex);const e={scale:a.scale};v(u,e)})),(e,t)=>((0,o.wg)(),(0,o.iD)("div",{ref_key:"$pdfPage",ref:n,class:"pdfPage card"},[(0,o._)("canvas",{ref_key:"$pdfLayer",ref:r,class:"pdfLayer"},null,512),(0,o._)("div",{ref_key:"$textLayer",ref:i,class:"textLayer"},null,512)],512))}}),w=a(89);const k=(0,w.Z)(b,[["__scopeId","data-v-10baafd9"]]);var y=k,T=a(1020);function I(e){const t=e.reduce(((e,t)=>{if("BR"===t.nodeName)return e+" ";const a=t.textContent;return e+a}),""),a=t.replace(/- /g,"");return a}const N=(0,T.Q_)("selection",(()=>{const e=(0,l.iH)();function t(t){e.value=t}function a(){if(e.value){const t=Array(...e.value.cloneContents().childNodes);return I(t)}return""}return{setRange:t,getSelectedText:a,range:e}}));var C={CONTENT_TYPE:"text/plain"},A={MARGIN:{X:0,Y:30}},P={PLACEHOLDER:"번역할 문장을 입력하세요",NAME:"번역기",CLOSE:"닫기",OPEN:"열기",LEFT_TOP:"왼쪽 위로 이동",RIGHT_TOP:"오른쪽 위로 이동"},Y=[{KEY:"ko",NAME:"한국어"},{KEY:"ja",NAME:"일본어"},{KEY:"zh-CN",NAME:"중국어 간체"},{KEY:"zh-TW",NAME:"중국어 번체"},{KEY:"hi",NAME:"힌디어"},{KEY:"en",NAME:"영어"},{KEY:"es",NAME:"스페인어"},{KEY:"fr",NAME:"프랑스어"},{KEY:"de",NAME:"독일어"},{KEY:"pt",NAME:"포르투갈어"},{KEY:"vi",NAME:"베트남어"},{KEY:"id",NAME:"인도네시아어"},{KEY:"fa",NAME:"페르시아어"},{KEY:"ar",NAME:"아랍어"},{KEY:"mm",NAME:"미얀마어"},{KEY:"th",NAME:"태국어"},{KEY:"ru",NAME:"러시아어"},{KEY:"it",NAME:"이탈리아어"}],R={VIEW:P,LANGUAGES:Y,DOMAIN:"https://zd6lygxeki.execute-api.ap-northeast-2.amazonaws.com/memorial-papago",TRANSLATE_URL:"/translate",LATENCY:200},S=a(6265),x=a.n(S);const W=x().create({baseURL:R.DOMAIN});function O(){return W}function U(e,t){return{isSuccess:e,data:t}}const M=O();async function Z(e){if(!e.text)return U(!0,"");try{const t={message:e.text,source:e.source,target:e.target},a=await M.post(R.TRANSLATE_URL,t),n=a.data.body.text.translated;return U(!0,n)}catch(t){return U(!1)}}function L(e,t){let a=null;return function(...n){a&&clearTimeout(a),a=setTimeout((async()=>{a=null,e(...n)}),t)}}const V=(0,T.Q_)("translator",(()=>{const e=(0,l.iH)("en"),t=(0,l.iH)("ko"),a=(0,l.iH)(""),n=(0,l.iH)(""),r=L(s,R.LATENCY);function i(t){e.value=t}function u(e){t.value=e}function c(e){a.value=e}async function s(a){const r={text:a,source:e.value,target:t.value},o=await Z(r);o.isSuccess?n.value=o.data:n.value=""}return(0,o.YP)(a,(e=>{r(e)})),(0,o.YP)(e,(()=>{s(a.value)})),(0,o.YP)(t,(()=>{s(a.value)})),{source:e,target:t,originalText:a,translatedText:n,setOriginalText:c,setSourceLanguage:i,setTargetLanguage:u}})),G={NAME:"번역하기",TYPE:"translate"},z={NAME:"복사",TYPE:"copy"};var j={EVENT_TYPE:"eventType"},B={VIEW:{HEIGHT:60}},D={BASE_X:0,BASE_Y:B.VIEW.HEIGHT},K={VIEW:D,MENUS:n,DATASET:j,SELECT_END_DELAY:50};function H(e){navigator.clipboard.writeText(e)}const Q={class:"selectionPopup"},J={key:0,class:"card"},X=["data-event-type"];var F=(0,o.aZ)({__name:"SelectionPopup",setup(e){const t=V(),a=N();function n(e){const n=e.target,r=n.dataset[K.DATASET.EVENT_TYPE];switch(r){case K.MENUS.TRANSLATE.TYPE:{const e=a.getSelectedText();t.setOriginalText(e);break}case K.MENUS.COPY.TYPE:{const e=a.getSelectedText();H(e);break}}}return(e,t)=>((0,o.wg)(),(0,o.iD)("div",Q,[(0,l.SU)(a).range?((0,o.wg)(),(0,o.iD)("ul",J,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,l.SU)(K).MENUS,(e=>((0,o.wg)(),(0,o.iD)("li",{key:e.TYPE,class:"menu","data-event-type":e.TYPE,onMousedown:n},(0,i.zw)(e.NAME),41,X)))),128))])):(0,o.kq)("",!0)]))}});const q=F;var _=q;function $(e){return function(t){return Math.min(t,e)}}const ee=e=>((0,o.dD)("data-v-57f4daaf"),e=e(),(0,o.Cn)(),e),te={key:1,class:"noPdf"},ae=ee((()=>(0,o._)("p",null,"파일을 불러와주세요",-1))),ne=[ae];var re=(0,o.aZ)({__name:"PdfView",setup(e){const t=m(),a=N(),n=(0,l.iH)([]),r=(0,l.iH)(!1),u=(0,l.iH)(),c=(0,l.iH)(),s=(0,l.iH)(),d=(0,l.iH)(!1);function v(e,t){const a=[];for(let n=1;n<=t;n++)a.push({idx:n,key:`${e}-${n}`});return a}function f(e){const t=e.clipboardData;t&&(t.setData(C.CONTENT_TYPE,a.getSelectedText()),e.preventDefault())}function g(e){const t=p(s.value,u.value.$el),{x:a,y:n}=e,r={x:a-s.value.offsetLeft-K.VIEW.BASE_X+A.MARGIN.X,y:n-s.value.offsetTop-K.VIEW.BASE_Y+A.MARGIN.Y},o=$(t.x),i=$(t.y),l=o(r.x),c=i(r.y);u.value.$el.style.left=`${l}px`,u.value.$el.style.top=`${c}px`}function p(e,t){const a=e.getBoundingClientRect(),n=t.getBoundingClientRect();return{x:a.width-n.width,y:a.height-n.height}}return(0,o.bv)((()=>{c.value.addEventListener("mousedown",(()=>{a.setRange(null),d.value=!1})),document.addEventListener("selectionchange",(()=>{const e=window.getSelection();e&&!e.isCollapsed&&a.setRange(e.getRangeAt(0))})),document.addEventListener("mouseup",(e=>{if(!a.range)return void(d.value=!1);const{clientX:t,clientY:n}=e,{scrollLeft:r,scrollTop:o}=c.value,i={x:t+r,y:n+o};g(i),d.value=!0}))})),t.$subscribe("doc",(e=>{e.doc?(r.value=!0,n.value=v(e.fileName,e.doc.numPages)):r.value=!1})),(e,t)=>((0,o.wg)(),(0,o.iD)("div",{class:"pdfView",ref_key:"$pdfView",ref:c},[r.value?((0,o.wg)(),(0,o.iD)("div",{key:0,class:"pageContainer",ref_key:"$pageContainer",ref:s,onCopy:f},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(n.value,(e=>((0,o.wg)(),(0,o.j4)(y,{key:e.key,pageIndex:e.idx},null,8,["pageIndex"])))),128)),(0,o.Wm)(_,{class:(0,i.C_)(["selectionPopup",{show:d.value}]),ref_key:"$selectionPopup",ref:u},null,8,["class"])],544)):((0,o.wg)(),(0,o.iD)("div",te,ne))],512))}});const oe=(0,w.Z)(re,[["__scopeId","data-v-57f4daaf"]]);var ie=oe,le={TYPE:"application/pdf",EXTENSION:".pdf"};const ue=(0,o.Uk)(" PDF 선택 "),ce=["accept"];var se=(0,o.aZ)({__name:"PdfLoadButton",emits:["load"],setup(e,{emit:t}){function a(e){if(!e.target)return;const a=e.target,r=a.files;!r||r.length<=0||n(r[0])&&t("load",r[0])}function n(e){return e.type===le.TYPE}return(e,t)=>((0,o.wg)(),(0,o.iD)("label",null,[ue,(0,o._)("input",{type:"file",id:"fileLoad",onChange:a,accept:(0,l.SU)(le).EXTENSION},null,40,ce)]))}});const de=(0,w.Z)(se,[["__scopeId","data-v-3e2304cc"]]);var ve=de,fe={LEFT_TOP:"leftTop",RIGHT_TOP:"rightTop"};const ge={class:"translatorTextarea"},pe=["placeholder"],he={class:"translated",disabled:""};var Ee=(0,o.aZ)({__name:"LanguageTranslator",setup(e){const t=V();return(e,a)=>((0,o.wg)(),(0,o.iD)("div",ge,[(0,o.wy)((0,o._)("textarea",{class:"origin",placeholder:(0,l.SU)(R).VIEW.PLACEHOLDER,"onUpdate:modelValue":a[0]||(a[0]=e=>(0,l.SU)(t).originalText=e)},null,8,pe),[[r.nr,(0,l.SU)(t).originalText]]),(0,o._)("div",he,(0,i.zw)((0,l.SU)(t).translatedText),1)]))}});const me=(0,w.Z)(Ee,[["__scopeId","data-v-82da00d6"]]);var be=me;const we={class:"translatorHeader"},ke={class:"name"},ye={class:"translatorLanguageSelect"},Te=["value","selected"],Ie=["value","selected"];var Ne=(0,o.aZ)({__name:"TranslatorView",setup(e){const t=V(),a=(0,l.iH)(fe.RIGHT_TOP),n=(0,l.iH)(!1);function u(e){n.value=e}function c(){u(!n.value)}function s(){a.value===fe.LEFT_TOP?a.value=fe.RIGHT_TOP:a.value=fe.LEFT_TOP}function d(e){const a=e.target;t.setSourceLanguage(a.value)}function v(e){const a=e.target;t.setTargetLanguage(a.value)}return t.$subscribe((()=>{u(!1)})),(e,u)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,i.C_)(["translatorView card",{leftTop:a.value===(0,l.SU)(fe).LEFT_TOP,rightTop:a.value===(0,l.SU)(fe).RIGHT_TOP}])},[(0,o._)("div",we,[(0,o._)("span",ke,(0,i.zw)((0,l.SU)(R).VIEW.NAME),1),(0,o._)("span",null,[(0,o._)("button",{class:"position",onClick:s},(0,i.zw)(a.value===(0,l.SU)(fe).LEFT_TOP?(0,l.SU)(R).VIEW.RIGHT_TOP:(0,l.SU)(R).VIEW.LEFT_TOP),1),(0,o._)("button",{class:"minimize",onClick:c},(0,i.zw)(n.value?(0,l.SU)(R).VIEW.OPEN:(0,l.SU)(R).VIEW.CLOSE),1)])]),(0,o._)("div",ye,[(0,o._)("select",{onChange:d},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,l.SU)(Y),(e=>((0,o.wg)(),(0,o.iD)("option",{key:e.KEY,value:e.KEY,selected:e.KEY===(0,l.SU)(t).source},(0,i.zw)(e.NAME),9,Te)))),128))],32),(0,o._)("select",{onChange:v},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,l.SU)(Y),(e=>((0,o.wg)(),(0,o.iD)("option",{key:e.KEY,value:e.KEY,selected:e.KEY===(0,l.SU)(t).target},(0,i.zw)(e.NAME),9,Ie)))),128))],32)]),(0,o.wy)((0,o.Wm)(be,{class:"translator"},null,512),[[r.F8,!n.value]])],2))}});const Ce=(0,w.Z)(Ne,[["__scopeId","data-v-5faf751c"]]);var Ae=Ce;const Pe={class:"card"},Ye={class:"center"},Re=(0,o._)("b",{class:"appName"},"곰국 뷰어",-1);var Se=(0,o.aZ)({__name:"App",setup(e){const t=m();function a(e){t.setPdfFromFile(e)}return(e,t)=>((0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("header",Pe,[(0,o._)("div",Ye,[Re,(0,o.Wm)(ve,{onLoad:a})])]),(0,o._)("main",null,[(0,o._)("section",null,[(0,o.Wm)(ie),(0,o.Wm)(Ae)])])],64))}});const xe=Se;var We=xe,Oe=a(2483),Ue="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkI4RkE3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkI4Rjk3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU2QTEyNzk3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU2QTEyN0E3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WHowqAAAXNElEQVR42uxda4xd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";const Me={class:"home"},Ze=(0,o._)("img",{alt:"Vue logo",src:Ue},null,-1);function Le(e,t,a,n,r,i){const l=(0,o.up)("HelloWorld");return(0,o.wg)(),(0,o.iD)("div",Me,[Ze,(0,o.Wm)(l,{msg:"Welcome to Your Vue.js + TypeScript App"})])}const Ve={class:"hello"},Ge=(0,o.uE)('<p data-v-6da818a0> For a guide and recipes on how to configure / customize this project,<br data-v-6da818a0> check out the <a href="https://cli.vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>vue-cli documentation</a>. </p><h3 data-v-6da818a0>Installed CLI Plugins</h3><ul data-v-6da818a0><li data-v-6da818a0><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener" data-v-6da818a0>babel</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" target="_blank" rel="noopener" data-v-6da818a0>pwa</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener" data-v-6da818a0>router</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener" data-v-6da818a0>vuex</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener" data-v-6da818a0>eslint</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest" target="_blank" rel="noopener" data-v-6da818a0>unit-jest</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank" rel="noopener" data-v-6da818a0>typescript</a></li></ul><h3 data-v-6da818a0>Essential Links</h3><ul data-v-6da818a0><li data-v-6da818a0><a href="https://vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>Core Docs</a></li><li data-v-6da818a0><a href="https://forum.vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>Forum</a></li><li data-v-6da818a0><a href="https://chat.vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>Community Chat</a></li><li data-v-6da818a0><a href="https://twitter.com/vuejs" target="_blank" rel="noopener" data-v-6da818a0>Twitter</a></li><li data-v-6da818a0><a href="https://news.vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>News</a></li></ul><h3 data-v-6da818a0>Ecosystem</h3><ul data-v-6da818a0><li data-v-6da818a0><a href="https://router.vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>vue-router</a></li><li data-v-6da818a0><a href="https://vuex.vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>vuex</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener" data-v-6da818a0>vue-devtools</a></li><li data-v-6da818a0><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>vue-loader</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener" data-v-6da818a0>awesome-vue</a></li></ul>',7);function ze(e,t,a,n,r,l){return(0,o.wg)(),(0,o.iD)("div",Ve,[(0,o._)("h1",null,(0,i.zw)(e.msg),1),Ge])}var je=(0,o.aZ)({name:"HelloWorld",props:{msg:String}});const Be=(0,w.Z)(je,[["render",ze],["__scopeId","data-v-6da818a0"]]);var De=Be,Ke=(0,o.aZ)({name:"HomeView",components:{HelloWorld:De}});const He=(0,w.Z)(Ke,[["render",Le]]);var Qe=He;const Je=[{path:"/",name:"home",component:Qe},{path:"/about",name:"about",component:()=>a.e(443).then(a.bind(a,5904))}],Xe=(0,Oe.p7)({history:(0,Oe.PO)(""),routes:Je});var Fe=Xe,qe=(0,T.WB)();s.GlobalWorkerOptions.workerSrc=`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${s.version}/pdf.worker.js`,(0,r.ri)(We).use(qe).use(Fe).mount("#app")},3414:function(){},172:function(){},2001:function(){},3779:function(){},6558:function(){},2258:function(){}},t={};function a(n){var r=t[n];if(void 0!==r)return r.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,a),o.exports}a.m=e,function(){var e=[];a.O=function(t,n,r,o){if(!n){var i=1/0;for(s=0;s<e.length;s++){n=e[s][0],r=e[s][1],o=e[s][2];for(var l=!0,u=0;u<n.length;u++)(!1&o||i>=o)&&Object.keys(a.O).every((function(e){return a.O[e](n[u])}))?n.splice(u--,1):(l=!1,o<i&&(i=o));if(l){e.splice(s--,1);var c=r();void 0!==c&&(t=c)}}return t}o=o||0;for(var s=e.length;s>0&&e[s-1][2]>o;s--)e[s]=e[s-1];e[s]=[n,r,o]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,n){return a.f[n](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/about.9d19eb2e.js"}}(),function(){a.miniCssF=function(e){}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="gomguk-viewer-fe:";a.l=function(n,r,o,i){if(e[n])e[n].push(r);else{var l,u;if(void 0!==o)for(var c=document.getElementsByTagName("script"),s=0;s<c.length;s++){var d=c[s];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+o){l=d;break}}l||(u=!0,l=document.createElement("script"),l.charset="utf-8",l.timeout=120,a.nc&&l.setAttribute("nonce",a.nc),l.setAttribute("data-webpack",t+o),l.src=n),e[n]=[r];var v=function(t,a){l.onerror=l.onload=null,clearTimeout(f);var r=e[n];if(delete e[n],l.parentNode&&l.parentNode.removeChild(l),r&&r.forEach((function(e){return e(a)})),t)return t(a)},f=setTimeout(v.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=v.bind(null,l.onerror),l.onload=v.bind(null,l.onload),u&&document.head.appendChild(l)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p=""}(),function(){var e={143:0};a.f.j=function(t,n){var r=a.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var o=new Promise((function(a,n){r=e[t]=[a,n]}));n.push(r[2]=o);var i=a.p+a.u(t),l=new Error,u=function(n){if(a.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var o=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;l.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",l.name="ChunkLoadError",l.type=o,l.request=i,r[1](l)}};a.l(i,u,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,o,i=n[0],l=n[1],u=n[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(r in l)a.o(l,r)&&(a.m[r]=l[r]);if(u)var s=u(a)}for(t&&t(n);c<i.length;c++)o=i[c],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(s)},n=self["webpackChunkgomguk_viewer_fe"]=self["webpackChunkgomguk_viewer_fe"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=a.O(void 0,[998],(function(){return a(3876)}));n=a.O(n)})();
//# sourceMappingURL=app.5be09e44.js.map