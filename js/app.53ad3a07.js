(function(){var e={7777:function(e,t,n){"use strict";var a={};n.r(a),n.d(a,{COPY:function(){return _},HIGHLIGHT:function(){return q},TRANSLATE:function(){return F}});var i=n(9242),r=n(3396),s=(n(7658),n(7139)),o=n(4870),l=n(8003),u=n(1020);function c(e){return new Promise(((t,n)=>{const a=new FileReader;a.readAsDataURL(e),a.onload=()=>{t(a.result)},a.onerror=()=>{n()}}))}var d=n(2482),h=n(878),g=n(8829),v=n(2575),f={DATASET:{TOKEN_NUM:"tokenNum",LINE_NUM:"lineNum",BOTTOM:"bottom",RIGHT:"right",LEFT:"left",TOP:"top"}};function p(e,t){e&&(e.width=t.width,e.height=t.height)}var E=new WeakMap;class m{constructor(e,t){(0,h.Z)(this,E,{writable:!0,value:void 0}),(0,d.Z)(this,"viewport",(0,o.iH)()),(0,v.Z)(this,E,e),this.viewport=(0,o.iH)((0,g.Z)(this,E).getViewport(t))}async renderPdfLayer(e){const t=e.getContext("2d");if(!t)return;if(!this.viewport.value)return;p(e,this.size);const n={canvasContext:t,viewport:this.viewport.value};await(0,g.Z)(this,E).render(n).promise}async renderTextLayer(e){e instanceof HTMLElement&&(e.innerHTML=""),this.viewport.value&&l.renderTextLayer({textContent:await(0,g.Z)(this,E).getTextContent(),container:e,viewport:this.viewport.value})}addTokenInfo(e){const t=[...e.childNodes],n=e.getBoundingClientRect();let a=1,i=1;t.forEach((e=>{const t=e;if("BR"===t.nodeName)a++,i=1;else{const e=t.getBoundingClientRect();t.dataset[f.DATASET.TOKEN_NUM]=`${i}`,t.dataset[f.DATASET.LINE_NUM]=`${a}`,t.dataset[f.DATASET.RIGHT]=""+(e.right-n.left),t.dataset[f.DATASET.BOTTOM]=""+(e.bottom-n.top),t.dataset[f.DATASET.LEFT]=""+(e.left-n.left),t.dataset[f.DATASET.TOP]=""+(e.top-n.top),i++}}))}updateViewport(e){this.viewport.value=(0,g.Z)(this,E).getViewport(e)}get pageNum(){return(0,g.Z)(this,E).pageNumber}get size(){return{width:this.viewport.value?.width||0,height:this.viewport.value?.height||0}}async createPdfLayer(){const e=document.createElement("canvas");return await this.renderPdfLayer(e),e}async createTextLayerFragment(){const e=document.createDocumentFragment();return await this.renderTextLayer(e),e}}const w=(0,u.Q_)("pdf",(()=>{const e=(0,o.iH)(),t=new Map,n=(0,o.qj)({scale:1.6}),a=(0,o.iH)(0),i=(0,o.iH)("");async function s(e){return t.get(e)}async function u(t){e.value=t}async function d(e){t.clear();for(let a=1;a<=e.numPages;a++){const i=await e.getPage(a),r=new m(i,n);t.set(a,r)}}async function h(e){const t=await c(e);if(!t)return;const n=(0,l.getDocument)(t),a=await n.promise;return a}function g(){n.scale=Math.round(10*n.scale+1)/10}function v(){n.scale=Math.round(10*n.scale-1)/10}return(0,r.YP)(e,(async e=>{if(t.clear(),!e)return;const n=await h(e);n&&(await d(n),i.value=e.name||"",a.value=n.numPages)})),(0,r.YP)(n,(e=>{t.forEach((t=>t.updateViewport(e)))})),{setPdfFile:u,getPage:s,increaseScale:g,decreaseScale:v,pageMap:t,pdfFile:e,fileName:i,numPages:a,viewportOption:n}}));var y={LINE_END_HYPHEN:"-",SPACE:" "};function N(e){return e.reduce(((e,t)=>t.endsWith(y.LINE_END_HYPHEN)?e+t.slice(0,-1):e+t+y.SPACE),"")}function T(e){if(!e.commonAncestorContainer)return-1;let t=e.commonAncestorContainer;if("#text"===t.nodeName){const e=t.parentElement;t=e.parentElement}const n=t.dataset["pageIndex"];if(!n)return-1;const a=parseInt(n,10);return a}function b(e){const{startContainer:t,endContainer:n}=e;return"#text"===t.nodeName&&"#text"===n.nodeName}function I(e,t){const n=e.firstChild;if(!n)return 0;const a=new Range;a.setStart(n,0),a.setEnd(n,t);const{width:i}=a.getBoundingClientRect();return i}function k(e,t){const n=e.firstChild;if(!n)return 0;const a=n.wholeText,i=new Range;i.setStart(n,t),i.setEnd(n,a.length);const{width:r}=i.getBoundingClientRect();return r}class A{constructor(e,t){(0,d.Z)(this,"$el",void 0),(0,d.Z)(this,"startOffset",void 0),(0,d.Z)(this,"endOffset",void 0),this.$el=e,t&&(this.startOffset=t.start??0,this.endOffset=t.end??e.textContent?.length)}getText(){const e=this.startOffset,t=this.endOffset;return this.$el.textContent?.slice(e,t)}get left(){const e=this.$el.dataset[f.DATASET.LEFT],t=Number(e);return this.startOffset?t+I(this.$el,this.startOffset):t}get right(){const e=this.$el.dataset[f.DATASET.RIGHT],t=Number(e);return this.endOffset?t-k(this.$el,this.endOffset):t}get top(){const e=this.$el.dataset[f.DATASET.TOP];return Number(e)}get bottom(){const e=this.$el.dataset[f.DATASET.BOTTOM];return Number(e)}get lineNum(){const e=this.$el.dataset[f.DATASET.LINE_NUM];return e?parseInt(e,10):-1}get tokenNum(){const e=this.$el.dataset[f.DATASET.TOKEN_NUM];return e?parseInt(e,10):-1}}function x(e){const{startContainer:t,startOffset:n,endContainer:a,endOffset:i}=e,r=[...e.cloneContents().childNodes],s=e.commonAncestorContainer;return"#text"===s.nodeName&&s.parentElement?[new A(s.parentElement,{start:n,end:i})]:r.filter((e=>"SPAN"===e.nodeName)).map(((e,r,s)=>0===r?new A(t.parentElement,{start:n}):r===s.length-1?new A(a.parentElement,{end:i}):new A(e)))}class P{constructor(){(0,d.Z)(this,"startPoint",{x:1/0,y:1/0}),(0,d.Z)(this,"endPoint",{x:0,y:0})}setStartPos(e){this.startPoint=e}setEndPos(e){this.endPoint=e}setLeft(e){this.startPoint.x=e}setRight(e){this.endPoint.x=e}setTop(e){this.startPoint.y=e}setBottom(e){this.endPoint.y=e}get height(){return Math.max(this.endPoint.y-this.startPoint.y,0)}get width(){return Math.max(this.endPoint.x-this.startPoint.x,0)}get top(){return this.startPoint.y}get bottom(){return this.endPoint.y}get left(){return this.startPoint.x}get right(){return this.endPoint.x}}class S{constructor(e){(0,d.Z)(this,"lineNum",void 0),(0,d.Z)(this,"rect",new P),(0,d.Z)(this,"tokens",[]),this.lineNum=e}addToken(e){this.tokens.push(e),this.rect.setStartPos({x:Math.min(this.rect.left,e.left),y:Math.min(this.rect.top,e.top)}),this.rect.setEndPos({x:Math.max(this.rect.right,e.right),y:Math.max(this.rect.bottom,e.bottom)})}getText(){return this.tokens.reduce(((e,t)=>e+t.getText()),"")}get firstToken(){return this.tokens[0]}get lastToken(){return this.tokens[this.tokens.length-1]}}function C(e){if(e.collapsed)return[];const t=x(e),n=t.reduce(((e,t)=>{const n=t.lineNum;return e.has(n)||e.set(n,new S(n)),e.get(n)?.addToken(t),e}),new Map);return[...n.values()]}const R=(0,u.Q_)("selection",(()=>{const e=(0,o.iH)(),t=(0,o.iH)([]),n=(0,o.iH)(-1),a=(0,o.iH)(!1);function i(t){e.value=t}function s(){if(!a.value)return"";const e=t.value.map((e=>e.getText())),n=N(e);return n}return(0,r.YP)(e,(e=>{if(!e)return t.value=[],void(a.value=!1);b(e)&&(t.value=C(e),n.value=T(e),a.value=t.value.length>0)})),{setRange:i,getSelectedText:s,selectedPageIndex:n,isSelectionExist:a,selectedLines:t,range:e}}));var L=(0,r.aZ)({__name:"SelectionLayer",props:{pageIndex:{type:Number,required:!0}},setup(e){const t=e,n=R(),a=(0,o.iH)(),i=(0,o.iH)(null);function s(){i.value&&a.value&&i.value.clearRect(0,0,a.value.width,a.value.height)}function l(e){e.forEach((e=>{if(!i.value)return;const{left:t,top:n,width:a,height:r}=e.rect;i.value.beginPath(),i.value.rect(t,n,a,r),i.value.fillStyle="red",i.value.fill()}))}return(0,r.bv)((async()=>{a.value&&(i.value=a.value.getContext("2d"))})),n.$subscribe(((e,n)=>{const{selectedPageIndex:a,isSelectionExist:i,selectedLines:r}=n;i&&a===t.pageIndex?(s(),r&&l(r)):s()})),(e,t)=>((0,r.wg)(),(0,r.iD)("canvas",{ref_key:"$selectionLayer",ref:a,class:"selectionLayer"},null,512))}});const Y=L;var O=Y;const M=(0,u.Q_)("highlight",(()=>{const e=(0,o.iH)([]);function t(t){e.value.push(t)}return{highlightList:e,addHighlight:t}}));var Z=(0,r.aZ)({__name:"HighlightLayer",props:{pageIndex:{type:Number,required:!0},width:{type:Number,required:!0},height:{type:Number,required:!0}},setup(e){const t=e,n=M(),a=(0,o.iH)(),i=(0,r.Fl)((()=>a.value?a.value.getContext("2d"):null)),s=(0,r.Fl)((()=>n.highlightList.filter((e=>e.pageNum===t.pageIndex))));function l(e){e.forEach((e=>{const t=e.getRange();if(!t)return;const n=C(t);u(n,e.color)}))}function u(e,t){e.forEach((e=>{if(!i.value)return;const{left:n,top:a,width:r,height:s}=e.rect;i.value.beginPath(),i.value.rect(n,a,r,s),i.value.fillStyle=t.code,i.value.fill()}))}return(0,r.YP)(s,(()=>{l(s.value)})),(0,r.YP)(t,(()=>{if(!a.value)return;const e={width:t.width,height:t.height};p(a.value,e),l(s.value)})),(e,t)=>((0,r.wg)(),(0,r.iD)("canvas",{ref_key:"$highlightLayer",ref:a,class:"highlightLayer"},null,512))}});const W=Z;var H=W;function D(e){if(!e)return;const t=e.getContext("2d");if(!t)return;const{width:n,height:a}=t.canvas,i=t.getImageData(0,0,n,a),r=document.createElement("canvas");return r.width=n,r.height=a,r.getContext("2d")?.putImageData(i,0,0),r}function U(e,t){let n=null;return function(...a){n&&clearTimeout(n),n=setTimeout((async()=>{n=null,e(...a)}),t)}}function V(e,t){e&&(e.style.width=Math.floor(t.width)+"px",e.style.height=Math.floor(t.height)+"px")}function G(e,t,n){if(!e)return;const a=e.getContext("2d");a?.scale(t.width/n.width,t.height/n.height)}var z={TYPE:"application/pdf",EXTENSION:".pdf",RENDER_LATENCY:300,ROOT_MARGIN:"100% 0%"};const B=["data-page-index"];var K=(0,r.aZ)({__name:"PdfPage",props:{pageIndex:{type:Number,required:!0},viewportId:{type:String,required:!1}},setup(e){const t=e,n=(0,o.iH)(!1),a=(0,o.iH)(!1),i=w(),l=(0,o.iH)(),u=(0,o.iH)(),c=(0,o.iH)(),d=(0,o.iH)(),h=(0,o.iH)(),g=(0,o.iH)(),v=(0,r.Fl)((()=>c.value?c.value.getContext("2d"):null)),f=(0,r.Fl)((()=>d.value?d.value.getContext("2d"):null)),E=(0,o.iH)({width:0,height:0}),m=U((async e=>{await N(e),n.value=!1}),z.RENDER_LATENCY);async function y(e){n.value=!0,T(e),m(e)}async function N(e){V(l.value,e),p(h.value.$el,e),await b(e),await A(e),E.value=e}function T(e){const t=D(c.value);p(d.value,e),G(d.value,e,E.value),t&&I(t)}async function b(e){const n=await i.getPage(t.pageIndex);if(!n)return;p(c.value,e);const a=await n.createPdfLayer();k(a)}function I(e){f.value&&f.value.drawImage(e,0,0)}function k(e){v.value&&v.value.drawImage(e,0,0)}async function A(e){const n=await i.getPage(t.pageIndex);if(!n||!u.value)return;V(u.value,e);const a=await n.createTextLayerFragment();u.value.innerHTML="",u.value.appendChild(a),n.addTokenInfo(u.value)}return(0,r.bv)((async()=>{const e=await i.getPage(t.pageIndex);if(!e)return;V(l.value,e.size);const n=new IntersectionObserver((async([e])=>{a.value=e.isIntersecting}),{root:t.viewportId?document.getElementById(t.viewportId):null,threshold:0,rootMargin:z.ROOT_MARGIN});l.value&&n.observe(l.value),(0,r.YP)(e.viewport,(async()=>{if(!a.value)return;const t=e.size;V(l.value,t),await y(t)}))})),(0,r.YP)(a,(async()=>{if(!a.value)return;const e=await i.getPage(t.pageIndex);e&&(e.size.width===E.value.width&&e.size.height===E.value.height||await N(e.size))})),(t,a)=>((0,r.wg)(),(0,r.iD)("div",{ref_key:"$pdfPage",ref:l,class:"pdfPage card"},[(0,r._)("canvas",{ref_key:"$highResolutionLayer",ref:c,class:"highResolutionLayer"},null,512),(0,r._)("canvas",{ref_key:"$lowResolutionLayer",ref:d,class:(0,s.C_)(["lowResolutionLayer",{show:n.value}])},null,2),(0,r._)("div",{ref_key:"$textLayer",ref:u,class:"textLayer","data-page-index":e.pageIndex},null,8,B),(0,r.Wm)(O,{class:"selectionLayer",ref_key:"$selectionLayer",ref:h,pageIndex:e.pageIndex},null,8,["pageIndex"]),(0,r.Wm)(H,{class:(0,s.C_)(["highlightLayer",{hide:n.value}]),ref_key:"$highlightLayer",ref:g,pageIndex:e.pageIndex,width:E.value.width,height:E.value.height},null,8,["pageIndex","width","height","class"])],512))}}),j=n(89);const Q=(0,j.Z)(K,[["__scopeId","data-v-4dd10b8a"]]);var J=Q,X={CONTENT_TYPE:"text/plain"};const F={NAME:"번역하기",TYPE:"translate"},_={NAME:"복사",TYPE:"copy"},q={NAME:"강조",TYPE:"highlight"};var $={MARGIN:{X:0,Y:30}},ee={EVENT_TYPE:"eventType"},te={MENUS:a,VIEW:$,DATASET:ee},ne={NAME:"번역기",CLOSE:"닫기",OPEN:"열기",SHOW_ORIGIN:"원본 보기",SHOW_TRANSLATED:"번역 보기"},ae=[{KEY:"ko",NAME:"한국어"},{KEY:"ja",NAME:"일본어"},{KEY:"zh-CN",NAME:"중국어 간체"},{KEY:"zh-TW",NAME:"중국어 번체"},{KEY:"hi",NAME:"힌디어"},{KEY:"en",NAME:"영어"},{KEY:"es",NAME:"스페인어"},{KEY:"fr",NAME:"프랑스어"},{KEY:"de",NAME:"독일어"},{KEY:"pt",NAME:"포르투갈어"},{KEY:"vi",NAME:"베트남어"},{KEY:"id",NAME:"인도네시아어"},{KEY:"fa",NAME:"페르시아어"},{KEY:"ar",NAME:"아랍어"},{KEY:"mm",NAME:"미얀마어"},{KEY:"th",NAME:"태국어"},{KEY:"ru",NAME:"러시아어"},{KEY:"it",NAME:"이탈리아어"}],ie={VIEW:ne,LANGUAGES:ae,DOMAIN:"https://zd6lygxeki.execute-api.ap-northeast-2.amazonaws.com/memorial-papago",TRANSLATE_URL:"/translate",LATENCY:200},re=n(6265),se=n.n(re);const oe=se().create({baseURL:ie.DOMAIN});function le(){return oe}function ue(e,t){return{isSuccess:e,data:t}}const ce=le();async function de(e){if(!e.text)return ue(!0,"");try{const t={message:e.text,source:e.source,target:e.target},n=await ce.post(ie.TRANSLATE_URL,t),a=n.data.body.text.translated;return ue(!0,a)}catch(t){return ue(!1)}}const he=(0,u.Q_)("translator",(()=>{const e=(0,o.iH)("en"),t=(0,o.iH)("ko"),n=(0,o.iH)(""),a=(0,o.iH)(""),i=U(c,ie.LATENCY);function s(t){e.value=t}function l(e){t.value=e}function u(e){n.value=e}async function c(n){const i={text:n,source:e.value,target:t.value},r=await de(i);r.isSuccess?a.value=r.data:a.value=""}return(0,r.YP)(n,(e=>{i(e)})),(0,r.YP)(e,(()=>{c(n.value)})),(0,r.YP)(t,(()=>{c(n.value)})),{source:e,target:t,originalText:n,translatedText:a,setOriginalText:u,setSourceLanguage:s,setTargetLanguage:l}}));function ge(e){navigator.clipboard.writeText(e)}class ve{constructor(e,t,n){(0,d.Z)(this,"red",0),(0,d.Z)(this,"green",0),(0,d.Z)(this,"blue",0),this.red=e,this.green=t,this.blue=n}get code(){const e=("00"+this.red.toString(16)).slice(-2),t=("00"+this.green.toString(16)).slice(-2),n=("00"+this.blue.toString(16)).slice(-2);return`#${e}${t}${n}`}}(0,d.Z)(ve,"YELLOW",new ve(179,143,14));class fe{constructor(e,t){(0,d.Z)(this,"pageNum",void 0),(0,d.Z)(this,"startLine",void 0),(0,d.Z)(this,"startToken",void 0),(0,d.Z)(this,"startOffset",void 0),(0,d.Z)(this,"endLine",void 0),(0,d.Z)(this,"endToken",void 0),(0,d.Z)(this,"endOffset",void 0),(0,d.Z)(this,"color",ve.YELLOW),this.pageNum=e,this.startLine=0,this.endLine=0;const n=x(t),a=n[0],i=n[n.length-1];a&&(this.startLine=a.lineNum,this.startToken=a.tokenNum,this.startOffset=a.startOffset),i&&(this.endLine=i.lineNum,this.endToken=i.tokenNum,this.endOffset=i.endOffset)}getRange(){const e=new Range,t=document.querySelector(`.textLayer[data-page-index="${this.pageNum}"] span[data-line-num="${this.startLine}"][data-token-num="${this.startToken}"]`),n=document.querySelector(`.textLayer[data-page-index="${this.pageNum}"] span[data-line-num="${this.endLine}"][data-token-num="${this.endToken}"]`);if(t?.firstChild&&n?.firstChild)return e.setStart(t.firstChild,this.startOffset||0),e.setEnd(n.firstChild,this.endOffset||0),e}}const pe={class:"selectionPopup"},Ee={key:0,class:"card"},me=["data-event-type"];var we=(0,r.aZ)({__name:"SelectionPopup",setup(e){const t=he(),n=R(),a=M();function i(e){const t=e.target,n=t.dataset[te.DATASET.EVENT_TYPE];switch(n){case te.MENUS.TRANSLATE.TYPE:l();break;case te.MENUS.COPY.TYPE:u();break;case te.MENUS.HIGHLIGHT.TYPE:c();break}}function l(){const e=n.getSelectedText();t.setOriginalText(e)}function u(){const e=n.getSelectedText();ge(e)}function c(){const{range:e,selectedPageIndex:t}=n;if(!e)return;const i=new fe(t,e);a.addHighlight(i)}return(e,t)=>((0,r.wg)(),(0,r.iD)("div",pe,[(0,o.SU)(n).isSelectionExist?((0,r.wg)(),(0,r.iD)("ul",Ee,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)((0,o.SU)(te).MENUS,(e=>((0,r.wg)(),(0,r.iD)("li",{key:e.TYPE,class:"menu","data-event-type":e.TYPE,onMousedown:i},(0,s.zw)(e.NAME),41,me)))),128))])):(0,r.kq)("",!0)]))}});const ye=we;var Ne=ye,Te={VIEW:{HEIGHT:60}},be={BASE_X:0,BASE_Y:Te.VIEW.HEIGHT},Ie={VIEW:be,SELECT_END_DELAY:50};function ke(e){return function(t){return Math.min(t,e)}}function Ae(){const e=window.getSelection();e&&(e.empty?e.empty():e.removeAllRanges&&e.removeAllRanges())}function xe(e){const t=e[0],n=e[e.length-1];if(!t||!n)return;const a=new Range,i=t.firstToken,r=i?.startOffset,s=n.lastToken,o=s?.endOffset;if(!i.$el||!s.$el)return;a.setStart(i.$el.firstChild,r),a.setEnd(s.$el.firstChild,o);const l=document.getSelection();l&&(Ae(),l.addRange(a))}const Pe=e=>((0,r.dD)("data-v-1c58f86c"),e=e(),(0,r.Cn)(),e),Se={class:"header"},Ce={key:1,class:"noPdf"},Re=Pe((()=>(0,r._)("p",null,"파일을 불러와주세요",-1))),Le=[Re];var Ye=(0,r.aZ)({__name:"PdfView",setup(e){const t=w(),n=R(),a=(0,o.iH)(),l=(0,o.iH)(),u=(0,o.iH)(),c=(0,o.iH)(!1),d=(0,o.iH)([]),h=(0,r.Fl)((()=>Math.floor(100*t.viewportOption.scale)));function g(){n.setRange(null),Ae(),c.value=!1}function v(){const e=window.getSelection();e&&!e.isCollapsed&&n.setRange(e.getRangeAt(0))}function f(e){if(!n.range)return void(c.value=!1);const{clientX:t,clientY:a}=e,{scrollLeft:i,scrollTop:r}=l.value,s={x:t+i,y:a+r};E(s),c.value=!0,xe(n.selectedLines)}function p(e){const t=e.clipboardData;t&&(t.setData(X.CONTENT_TYPE,n.getSelectedText()),e.preventDefault())}function E(e){const t=m(u.value,a.value.$el),{x:n,y:i}=e,r={x:n-u.value.offsetLeft-Ie.VIEW.BASE_X+te.VIEW.MARGIN.X,y:i-u.value.offsetTop-Ie.VIEW.BASE_Y+te.VIEW.MARGIN.Y},s=ke(t.x),o=ke(t.y),l=s(r.x),c=o(r.y);a.value.$el.style.left=`${l}px`,a.value.$el.style.top=`${c}px`}function m(e,t){const n=e.getBoundingClientRect(),a=t.getBoundingClientRect();return{x:n.width-a.width,y:n.height-a.height}}function y(){t.increaseScale()}function N(){t.decreaseScale()}return(0,r.bv)((()=>{l.value.addEventListener("mousedown",g),document.addEventListener("selectionchange",v),document.addEventListener("mouseup",f)})),t.$subscribe(((e,{numPages:t})=>{d.value=[];for(let n=1;n<=t;n++)d.value.push(n)})),(e,n)=>((0,r.wg)(),(0,r.iD)("div",{id:"pdfView",ref_key:"$pdfView",ref:l},[(0,r.wy)((0,r._)("div",Se,[(0,r._)("button",{onClick:N},"-"),(0,r._)("span",null,(0,s.zw)((0,o.SU)(h))+"%",1),(0,r._)("button",{onClick:y},"+")],512),[[i.F8,d.value.length>0]]),d.value.length>0?((0,r.wg)(),(0,r.iD)("div",{key:0,class:"pageContainer",ref_key:"$pageContainer",ref:u,onCopy:p},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(d.value,(e=>((0,r.wg)(),(0,r.j4)(J,{key:(0,o.SU)(t).fileName+e,"page-index":e,"viewport-id":"pdfView"},null,8,["page-index"])))),128)),(0,r.Wm)(Ne,{class:(0,s.C_)(["selectionPopup",{show:c.value}]),ref_key:"$selectionPopup",ref:a},null,8,["class"])],544)):((0,r.wg)(),(0,r.iD)("div",Ce,Le))],512))}});const Oe=(0,j.Z)(Ye,[["__scopeId","data-v-1c58f86c"]]);var Me=Oe;const Ze=(0,r.Uk)(" PDF 선택 "),We=["accept"];var He=(0,r.aZ)({__name:"PdfLoadButton",emits:["load"],setup(e,{emit:t}){function n(e){if(!e.target)return;const n=e.target,i=n.files;!i||i.length<=0||a(i[0])&&t("load",i[0])}function a(e){return e.type===z.TYPE}return(e,t)=>((0,r.wg)(),(0,r.iD)("label",null,[Ze,(0,r._)("input",{type:"file",id:"fileLoad",onChange:n,accept:(0,o.SU)(z).EXTENSION},null,40,We)]))}});const De=(0,j.Z)(He,[["__scopeId","data-v-3e2304cc"]]);var Ue=De;const Ve={class:"translatorTextarea"},Ge={class:"translated",disabled:""};var ze=(0,r.aZ)({__name:"LanguageTranslator",setup(e){const t=he(),n=(0,o.iH)(!1);function a(){n.value=!n.value}return(e,i)=>((0,r.wg)(),(0,r.iD)("div",Ve,[(0,r._)("button",{onClick:a},(0,s.zw)(n.value?(0,o.SU)(ie).VIEW.SHOW_TRANSLATED:(0,o.SU)(ie).VIEW.SHOW_ORIGIN),1),(0,r._)("div",Ge,(0,s.zw)(n.value?(0,o.SU)(t).originalText:(0,o.SU)(t).translatedText),1)]))}});const Be=(0,j.Z)(ze,[["__scopeId","data-v-639b9a85"]]);var Ke=Be;const je={class:"translatorView card"},Qe={class:"translatorHeader"},Je={class:"translatorLanguageSelect"},Xe=["value","selected"],Fe=["value","selected"];var _e=(0,r.aZ)({__name:"TranslatorView",setup(e){const t=he(),n=(0,o.iH)(!1);function a(e){const n=e.target;t.setSourceLanguage(n.value)}function l(e){const n=e.target;t.setTargetLanguage(n.value)}return(e,u)=>((0,r.wg)(),(0,r.iD)("div",je,[(0,r._)("div",Qe,[(0,r._)("div",Je,[(0,r._)("select",{onChange:a},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)((0,o.SU)(ae),(e=>((0,r.wg)(),(0,r.iD)("option",{key:e.KEY,value:e.KEY,selected:e.KEY===(0,o.SU)(t).source},(0,s.zw)(e.NAME),9,Xe)))),128))],32),(0,r._)("select",{onChange:l},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)((0,o.SU)(ae),(e=>((0,r.wg)(),(0,r.iD)("option",{key:e.KEY,value:e.KEY,selected:e.KEY===(0,o.SU)(t).target},(0,s.zw)(e.NAME),9,Fe)))),128))],32)])]),(0,r.wy)((0,r.Wm)(Ke,{class:"translator"},null,512),[[i.F8,!n.value]])]))}});const qe=(0,j.Z)(_e,[["__scopeId","data-v-f0a32680"]]);var $e=qe;const et={class:"card"},tt={class:"center"},nt=(0,r._)("b",{class:"appName"},"곰국 뷰어",-1);var at=(0,r.aZ)({__name:"App",setup(e){const t=w();function n(e){t.setPdfFile(e)}return(e,t)=>((0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("header",et,[(0,r._)("div",tt,[nt,(0,r.Wm)(Ue,{onLoad:n})])]),(0,r._)("main",null,[(0,r._)("section",null,[(0,r.Wm)(Me,{class:"pdfView"}),(0,r.Wm)($e,{class:"translatorView"})])])],64))}});const it=at;var rt=it,st=n(2483),ot="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkI4RkE3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkI4Rjk3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU2QTEyNzk3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU2QTEyN0E3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WHowqAAAXNElEQVR42uxda4xd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";const lt={class:"home"},ut=(0,r._)("img",{alt:"Vue logo",src:ot},null,-1);function ct(e,t,n,a,i,s){const o=(0,r.up)("HelloWorld");return(0,r.wg)(),(0,r.iD)("div",lt,[ut,(0,r.Wm)(o,{msg:"Welcome to Your Vue.js + TypeScript App"})])}const dt={class:"hello"},ht=(0,r.uE)('<p data-v-6da818a0> For a guide and recipes on how to configure / customize this project,<br data-v-6da818a0> check out the <a href="https://cli.vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>vue-cli documentation</a>. </p><h3 data-v-6da818a0>Installed CLI Plugins</h3><ul data-v-6da818a0><li data-v-6da818a0><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener" data-v-6da818a0>babel</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" target="_blank" rel="noopener" data-v-6da818a0>pwa</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener" data-v-6da818a0>router</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener" data-v-6da818a0>vuex</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener" data-v-6da818a0>eslint</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest" target="_blank" rel="noopener" data-v-6da818a0>unit-jest</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank" rel="noopener" data-v-6da818a0>typescript</a></li></ul><h3 data-v-6da818a0>Essential Links</h3><ul data-v-6da818a0><li data-v-6da818a0><a href="https://vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>Core Docs</a></li><li data-v-6da818a0><a href="https://forum.vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>Forum</a></li><li data-v-6da818a0><a href="https://chat.vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>Community Chat</a></li><li data-v-6da818a0><a href="https://twitter.com/vuejs" target="_blank" rel="noopener" data-v-6da818a0>Twitter</a></li><li data-v-6da818a0><a href="https://news.vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>News</a></li></ul><h3 data-v-6da818a0>Ecosystem</h3><ul data-v-6da818a0><li data-v-6da818a0><a href="https://router.vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>vue-router</a></li><li data-v-6da818a0><a href="https://vuex.vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>vuex</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener" data-v-6da818a0>vue-devtools</a></li><li data-v-6da818a0><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener" data-v-6da818a0>vue-loader</a></li><li data-v-6da818a0><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener" data-v-6da818a0>awesome-vue</a></li></ul>',7);function gt(e,t,n,a,i,o){return(0,r.wg)(),(0,r.iD)("div",dt,[(0,r._)("h1",null,(0,s.zw)(e.msg),1),ht])}var vt=(0,r.aZ)({name:"HelloWorld",props:{msg:String}});const ft=(0,j.Z)(vt,[["render",gt],["__scopeId","data-v-6da818a0"]]);var pt=ft,Et=(0,r.aZ)({name:"HomeView",components:{HelloWorld:pt}});const mt=(0,j.Z)(Et,[["render",ct]]);var wt=mt;const yt=[{path:"/",name:"home",component:wt},{path:"/about",name:"about",component:()=>n.e(443).then(n.bind(n,5904))}],Nt=(0,st.p7)({history:(0,st.PO)(""),routes:yt});var Tt=Nt,bt=(0,u.WB)();l.GlobalWorkerOptions.workerSrc=`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${l.version}/pdf.worker.js`,(0,i.ri)(rt).use(bt).use(Tt).mount("#app")},3414:function(){},172:function(){},2001:function(){},3779:function(){},6558:function(){},2258:function(){}},t={};function n(a){var i=t[a];if(void 0!==i)return i.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,n),r.exports}n.m=e,function(){var e=[];n.O=function(t,a,i,r){if(!a){var s=1/0;for(c=0;c<e.length;c++){a=e[c][0],i=e[c][1],r=e[c][2];for(var o=!0,l=0;l<a.length;l++)(!1&r||s>=r)&&Object.keys(n.O).every((function(e){return n.O[e](a[l])}))?a.splice(l--,1):(o=!1,r<s&&(s=r));if(o){e.splice(c--,1);var u=i();void 0!==u&&(t=u)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[a,i,r]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,a){return n.f[a](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/about.9d19eb2e.js"}}(),function(){n.miniCssF=function(e){}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="gomguk-viewer-fe:";n.l=function(a,i,r,s){if(e[a])e[a].push(i);else{var o,l;if(void 0!==r)for(var u=document.getElementsByTagName("script"),c=0;c<u.length;c++){var d=u[c];if(d.getAttribute("src")==a||d.getAttribute("data-webpack")==t+r){o=d;break}}o||(l=!0,o=document.createElement("script"),o.charset="utf-8",o.timeout=120,n.nc&&o.setAttribute("nonce",n.nc),o.setAttribute("data-webpack",t+r),o.src=a),e[a]=[i];var h=function(t,n){o.onerror=o.onload=null,clearTimeout(g);var i=e[a];if(delete e[a],o.parentNode&&o.parentNode.removeChild(o),i&&i.forEach((function(e){return e(n)})),t)return t(n)},g=setTimeout(h.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=h.bind(null,o.onerror),o.onload=h.bind(null,o.onload),l&&document.head.appendChild(o)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p=""}(),function(){var e={143:0};n.f.j=function(t,a){var i=n.o(e,t)?e[t]:void 0;if(0!==i)if(i)a.push(i[2]);else{var r=new Promise((function(n,a){i=e[t]=[n,a]}));a.push(i[2]=r);var s=n.p+n.u(t),o=new Error,l=function(a){if(n.o(e,t)&&(i=e[t],0!==i&&(e[t]=void 0),i)){var r=a&&("load"===a.type?"missing":a.type),s=a&&a.target&&a.target.src;o.message="Loading chunk "+t+" failed.\n("+r+": "+s+")",o.name="ChunkLoadError",o.type=r,o.request=s,i[1](o)}};n.l(s,l,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,a){var i,r,s=a[0],o=a[1],l=a[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(i in o)n.o(o,i)&&(n.m[i]=o[i]);if(l)var c=l(n)}for(t&&t(a);u<s.length;u++)r=s[u],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(c)},a=self["webpackChunkgomguk_viewer_fe"]=self["webpackChunkgomguk_viewer_fe"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(7777)}));a=n.O(a)})();
//# sourceMappingURL=app.53ad3a07.js.map