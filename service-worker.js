if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const l=e=>r(e,o),f={module:{uri:o},exports:t,require:l};s[o]=Promise.all(i.map((e=>f[e]||l(e)))).then((e=>(n(...e),t)))}}define(["./workbox-79ffe3e0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"gomguk-viewer-fe"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"css/app.38a8ad86.css",revision:null},{url:"index.html",revision:"2d0df8aeab724efd1dfb3f77932e739a"},{url:"js/about.438b1d81.js",revision:null},{url:"js/app.0d549470.js",revision:null},{url:"js/chunk-vendors.fdff7056.js",revision:null},{url:"manifest.json",revision:"109d0aac17f210ee922100d6c4899869"},{url:"robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map
