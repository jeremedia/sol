!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.sol=t():e.sol=t()}(this,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(e,t,n){const{BaseDomain:o}=n(1),i=Object.freeze([1,5,8,7,10,11,12]),s=/\$color\/session\:\S+/,r=Object.freeze(i.reduce((e,t,n)=>(e[n]="$color/session:"+t,e),{})),a=e=>"$color/session:"+e,l=e=>{const t=((e,t)=>{const n=e.split(";");for(const e of n){const[n,o]=e.trim().split("=");if(n===t)return o}return null})(e,"sessionHighlightColor");if(null===t)return null;const n=Number.parseInt(t,10);return Number.isInteger(n)?n<0||n>=i.length?null:n:null},c=e=>i[e]||i[0],d=({rootElement:e=document.documentElement,colorNumber:t})=>{e.style.setProperty("--color--session",`var(--color--brand--${t})`),e.style.setProperty("--color--session--rgb",`var(--color--brand--${t}--rgb)`)};class u{constructor(e={}){this.documentObject=e.documentObject||document,this.rootElement=e.rootElement||this.documentObject.documentElement,this.baseDomain=e.baseDomain||o,this.writeLegacyClass=!1!==e.writeLegacyClass,this.writeVariables=!1!==e.writeVariables,this.colorKey=null,this.sessionColorIsSet()?this.getSessionColor():this.setRandomSessionColor(),this.applySessionColor()}sessionColorIsSet(){return null!==l(this.documentObject.cookie)}getSessionColor(){return this.colorKey=l(this.documentObject.cookie),this.colorKey}setRandomSessionColor(){this.colorKey=Math.floor(Math.random()*i.length),(({colorKey:e,documentObject:t=document,baseDomain:n=o})=>{const i=n(),s=i?"; domain="+i:"";t.cookie=`sessionHighlightColor=${e}; path=/${s};`})({colorKey:this.colorKey,documentObject:this.documentObject,baseDomain:this.baseDomain})}applySessionColor(){const e=c(this.colorKey);var t;this.writeVariables&&d({rootElement:this.rootElement,colorNumber:e}),this.writeLegacyClass&&([...(t=this.rootElement).classList].forEach(e=>{s.test(e)&&t.classList.remove(e)}),this.rootElement.classList.add(a(e)))}}e.exports={__esModule:!0,default:u,SessionColor:u,applySessionColorVariables:d,createSessionColorClass:a,getSessionColorNumber:c,highlightColors:r,readSessionColorKey:l,SESSION_COLOR_COOKIE_KEY:"sessionHighlightColor",SESSION_COLOR_SEQUENCE:i,sessionColorClassRegex:s}},function(e,t){e.exports={BaseDomain:()=>{if(!document.domain)return"";let e=0,t=document.domain;const n=t.split("."),o="_gd"+Date.now();for(;e<n.length-1&&-1===document.cookie.indexOf(`${o}=${o}`);)t=n.slice(-1-++e).join("."),document.cookie=`${o}=${o};domain=${t};`;return document.cookie=`${o}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${t};`,t},DocumentReady:e=>{"loading"!==document.readyState?e():document.addEventListener("DOMContentLoaded",e)},GetElementsList:e=>{if(!e)return[];if("string"==typeof e)return document.querySelectorAll(e);if(e.tagName&&e.querySelectorAll)return[e];let t=[].slice.call(e);return t=t.filter(e=>0!==e.getBoundingClientRect().height),t},IsMobileOrTablet:()=>{const e=/iOS|iPhone|iPad/g.test(navigator.userAgent);return/Android/g.test(navigator.userAgent)||e},WindowHasSize:()=>window.innerHeight>0&&window.innerWidth>0}},function(e,t,n){const{DocumentReady:o}=n(1);let i=!1;const s=Object.freeze({"zh-Hans":"SC","zh-Hant":"TC",ko:"KR",ja:"JP"}),r=e=>s[e]||null,a=({variant:e,weights:t="100;300;400;500;700;900"})=>`https://fonts.googleapis.com/css2?family=Noto+Sans+${e}:wght@${t}`,l=({variant:e,basePath:t="/fonts"})=>`${t.endsWith("/")?t.slice(0,-1):t}/noto-sans-${e.toLowerCase()}.css`,c=(e={})=>{const t=e.getDocument||(()=>document),n=e.getLang||(e=>e.documentElement.getAttribute("lang")||"en"),s=e.provider||"google",c=e.hrefBuilder||(t=>"self-hosted"===s?l({variant:t.variant,basePath:e.basePath}):a({variant:t.variant,weights:e.weights}));return()=>{i||(i=!0,o(()=>{const e=t(),o=n(e),i=r(o);if(!i)return;const s="noto-sans-"+i;if(e.getElementById(s))return;const a=e.createElement("link");a.id=s,a.rel="stylesheet",a.type="text/css",a.href=c({lang:o,variant:i,documentObject:e}),e.head.appendChild(a)}))}},d=(e={})=>{c(e)()};e.exports={__esModule:!0,buildGoogleFontsHref:a,buildSelfHostedHref:l,createAsianFontLoader:c,DEFAULT_FONT_WEIGHTS:"100;300;400;500;700;900",default:d,getAsianFontVariant:r,loadAsianFonts:d,notoSansMappings:s,NOTO_SANS_STYLESHEET_ID_PREFIX:"noto-sans-",resetAsianFontLoaderState:()=>{i=!1}}},function(e,t){const n=e=>{const t=document.createElement("div");t.style.cssText=e,document.documentElement.insertBefore(t,document.documentElement.firstChild);const n={width:t.offsetWidth,height:t.offsetHeight};return document.documentElement.removeChild(t),n},o=(e,t)=>{document.documentElement.style.setProperty(e,` ${t/10}rem`)},i=()=>{const e=n("position: fixed; top: 0; bottom: 0;").height,t=window.innerHeight,i=n("position: fixed; top: 0; height: 100vh").height-Math.min(e,t);o("--vh-offset",i),setTimeout(()=>{window.dispatchEvent(new Event("updatedVHOffset"))},100)},s=()=>{const e=window.innerHeight;o("--visible-height",e),setTimeout(()=>{window.dispatchEvent(new Event("updatedVisibleHeight"))},100)},r=()=>{const e=n("position: fixed; top: 0; width: 100%; height: 200vh;").width,t=window.innerWidth-e;o("--scrollbar-width",t)};class a{constructor(){document.addEventListener("DOMContentLoaded",()=>{r(),s(),i()}),window.addEventListener("load",()=>{setTimeout(s,500),setTimeout(i,500)}),this.orientationChanged=!1,window.addEventListener("orientationchange",()=>{this.orientationChanged=!0,setTimeout(()=>{this.orientationChanged=!1},750)}),window.addEventListener("resize",()=>{r(),s(),this.orientationChanged&&i()})}}e.exports={__esModule:!0,default:a,Viewporter:a,checkElementDims:n,updateScrollbarWidth:r,updateVHOffset:i,updateVisibleHeight:s}},function(e,t,n){const o=n(8),i=(e=document)=>e.body||e.documentElement||e,s=(e=document)=>{i(e).addEventListener("keydown",t=>{(t.which||t.keyCode)===o.TAB&&e.documentElement.classList.add("show-focus")})},r=(e=document)=>{i(e).addEventListener("click",t=>{0===t.clientX&&0===t.clientY||e.documentElement.classList.remove("show-focus")})};class a{constructor(e=document){s(e),r(e)}}e.exports={__esModule:!0,default:a,Focus:a,RemoveFocusOnClick:r,ShowFocusClass:"show-focus",ShowFocusOnTabPress:s}},function(e,t,n){const o=n(7),{GetElementsList:i,IsMobileOrTablet:s,WindowHasSize:r}=n(1);class a{constructor(e){this.className=e||"balance-text",this.resizeTimer=null,this.rotateTimer=null,this.styleSheetCreated=document.querySelectorAll('style[data-owner="balance-text"]').length>0,this.styleSheetCreated||this.createStyleSheet()}initInteraction(){window.addEventListener("load",()=>{r()&&this.balance()}),window.addEventListener("resize",()=>{!s()&&r()&&(clearTimeout(this.resizeTimer),this.resizeTimer=this.balanceWithDelay(100))}),window.addEventListener("orientationchange",()=>{r()&&(clearTimeout(this.rotateTimer),this.rotateTimer=this.balanceWithDelay(100))})}createStyleSheet(e){const t=document.createElement("style");t.setAttribute("type","text/css"),t.setAttribute("data-owner","balance-text"),t.innerHTML="\n      .balance-text\\:measure {\n        -webkit-box-orient: inline-axis !important;\n        -webkit-line-clamp: none        !important;\n        border:             none        !important;\n        box-sizing:         border-box  !important;\n        height:             auto        !important;\n        margin:             initial     !important;\n        max-height:         initial     !important;\n        max-width:          initial     !important;\n        min-height:         initial     !important;\n        min-width:          initial     !important;\n        overflow:           visible     !important;\n        padding:            initial     !important;\n        transform:          none        !important;\n        width:              auto        !important;\n      }\n      .balance-text\\:measure:after,\n      .balance-text\\:measure:before {\n        display: none !important;\n      }\n      .balance-text\\:hold {\n        display: none !important;\n      }\n    ",e&&(t.onload=e),document.head.appendChild(t),this.styleSheetCreated=!0}balance(e){if(e||(e="."+this.className),!this.styleSheetCreated)return void this.createStyleSheet(()=>{this.balance(e)});const t=i(e);t.forEach(e=>{e.setAttribute("data-inline-css",e.style.cssText),e.style.cssText="",e.innerHTML=e.innerHTML.replace(/\u00ad/g,'<span data-owner="balance-text-placeholder-softhyphen"></span>'),e.classList.add("balance-text:measure")}),o(t),t.forEach(e=>{e.classList.remove("balance-text:measure"),e.innerHTML=e.innerHTML.replace(/<span data-owner='balance-text-placeholder-softhyphen'><\/span>/g,"&shy;"),e.style.cssText=e.getAttribute("data-inline-css"),e.removeAttribute("data-inline-css")});[].slice.call(document.getElementsByClassName("balance-text:hold")).forEach(e=>e.classList.remove("balance-text:hold"))}balanceWithDelay(e,t){return setTimeout(()=>{this.balance(t)},e||250)}toggleBalanceTextClass(e){return this.shouldBalanceText(e)?this.className:""}shouldBalanceText(e){return null!==e.replace(/(^\s)|(\s$)/,"").replace(/<nobr>.*<\/nobr>/,"!!nobr!!").match(/(.*(\s|-|–|—|&ndash;|&mdash;).*){2,}/)}}e.exports={__esModule:!0,BalanceTextClass:"balance-text",default:a,MoMABalanceText:a}},function(e,t){class n{constructor(e){this.navEl=e||document.querySelector("nav"),this.setCurrentHeightCSS(),this.navEl&&this.navEl.addEventListener("transitionend",()=>{this.setCurrentHeightCSS()}),window.addEventListener("resize",()=>{this.setCurrentHeightCSS()})}getCurrentHeight(){if(this.navEl){const e=this.navEl.getBoundingClientRect();return e.height+e.top}return 0}setCurrentHeightCSS(){const e=this.getCurrentHeight();document.documentElement.style.setProperty("--nav-height",e+"px")}}e.exports={__esModule:!0,default:n,Nav:n}},function(e,t,n){var o,i,s;i=[],void 0===(s="function"==typeof(o=()=>{let e,t,n;const o={sel:[],el:[]};let i=!1,s=!1;function r(){}function a(e,t){Array.prototype.forEach.call(e,t)}function l(){this.reset()}function c(e){return t.some(t=>t.start<e&&e<t.end)}function d(e,o,i){if(0===i)e.style.whiteSpace=o,n=0,t=[],function e(o,i){if(o.nodeType===o.ELEMENT_NODE)if("nowrap"===window.getComputedStyle(o).whiteSpace){const e=o.outerHTML.length;t.push({start:n,end:n+e}),n+=e}else a(o.childNodes,t=>{e(t,!0)}),i&&(n+=o.outerHTML.length-o.innerHTML.length);else o.nodeType===o.COMMENT_NODE?n+=o.length+7:o.nodeType===o.PROCESSING_INSTRUCTION_NODE?n+=o.length+2:n+=o.length}(e,!1),e.style.whiteSpace="nowrap";else{const e=[];t.forEach(t=>{t.start>i&&e.push({start:t.start-i,end:t.end-i})}),t=e}}function u(e,t,n){const o=(t=t.trim()).split(" ").length;if(t+=" ",o<2)return t;const i=document.createElement("span");i.innerHTML=t,e.appendChild(i);const s=i.offsetWidth;i.parentNode.removeChild(i);const r=Math.floor((n-s)/(o-1));i.style.wordSpacing=r+"px",i.setAttribute("data-owner","balance-text-justify");const a=document.createElement("div");return a.appendChild(i),a.innerHTML}function h(t,n){const o=/([^\S\u00a0]|-|\u2014|\u2013|\u00ad)(?![^<]*>)/g;let i;if(!e)for(e=[],i=o.exec(t);null!==i;)c(i.index)||e.push(i.index),i=o.exec(t);return-1!==e.indexOf(n)}function f(e,t){return 0===t||t===e.length||h(e,t-1)&&!h(e,t)}function p(e,t,n,o,i,s,r){let a;if(t&&"string"==typeof t)for(;;){for(;!f(t,s);)s+=i;if(e.innerHTML=t.substr(0,s),a=e.offsetWidth,i<0){if(a<=o||a<=0||0===s)break}else if(o<=a||n<=a||s===t.length)break;s+=i}r.index=s,r.width=a}function m(e){return e?"string"==typeof e?document.querySelectorAll(e):e.tagName&&e.querySelectorAll?[e]:e:[]}function y(t){a(m(t),t=>{!function(e){let t=e.querySelectorAll('br[data-owner="balance-text-hyphen"]');a(t,e=>{e.outerHTML=""}),t=e.querySelectorAll('br[data-owner="balance-text"]'),a(t,e=>{e.outerHTML=" "});let n=e.querySelectorAll('span[data-owner="balance-text-softhyphen"]');if(n.length>0&&a(n,e=>{const t=document.createTextNode("­");e.parentNode.insertBefore(t,e),e.parentNode.removeChild(e)}),n=e.querySelectorAll('span[data-owner="balance-text-justify"]'),n.length>0){let t="";a(n,e=>{t+=e.textContent,e.parentNode.removeChild(e)}),e.innerHTML=t}}(t);const n=t.style.whiteSpace,o=t.style.float,i=t.style.display,s=t.style.position,r=t.style.lineHeight;t.style.lineHeight="normal";const c=t.offsetWidth,h=t.offsetHeight;t.style.whiteSpace="nowrap",t.style.float="none",t.style.display="inline",t.style.position="static";let f=t.offsetWidth;const m=t.offsetHeight,y="pre-wrap"===n?0:function(e,t){const n=document.createElement("div");n.style.display="block",n.style.position="absolute",n.style.bottom=0,n.style.right=0,n.style.width=0,n.style.height=0,n.style.margin=0,n.style.padding=0,n.style.visibility="hidden",n.style.overflow="hidden";const o=document.createElement("span");o.style.fontSize="2000px",o.innerHTML="&nbsp;",n.appendChild(o),e.appendChild(n);const i=o.getBoundingClientRect();return n.parentNode.removeChild(n),t/(i.height/i.width)}(t,m);if(c>0&&f>c&&f<5e3){let o=t.innerHTML,i="",s="";const r=function(e){return"justify"===(e.currentStyle||window.getComputedStyle(e,null)).textAlign}(t);let a,g,b,w,v,S,x,C=Math.round(h/m),E=0;for(;C>1;)e=null,d(t,n,E),a=Math.round((f+y)/C-y),g=Math.round((o.length+1)/C)-1,b=new l,p(t,o,c,a,-1,g,b),w=new l,g=b.index,p(t,o,c,a,1,g,w),b.reset(),g=w.index,p(t,o,c,a,-1,g,b),v=0===b.index?w.index:c<w.width||b.index===w.index||Math.abs(a-b.width)<Math.abs(w.width-a)?b.index:w.index,s=o.substr(0,v).replace(/\s$/,""),x=Boolean(s.match(/\u00ad$/)),x&&(s=s.replace(/\u00ad$/,'<span data-owner="balance-text-softhyphen">-</span>')),r?i+=u(t,s,c):(i+=s,S=x||Boolean(s.match(/(-|\u2014|\u2013)$/)),i+=S?'<br data-owner="balance-text-hyphen" />':'<br data-owner="balance-text" aria-hidden="true" />'),o=o.substr(v),E=v,C--,t.innerHTML=o,f=t.offsetWidth;t.innerHTML=r?i+u(t,o,c):i+o}t.style.whiteSpace=n,t.style.float=o,t.style.display=i,t.style.position=s,t.style.lineHeight=r})}function g(){const e=m(o.sel.join(","));y(Array.prototype.concat.apply(o.el,e))}function b(){var e;i||(e=g,"loading"!==document.readyState?e():document.addEventListener?document.addEventListener("DOMContentLoaded",e):document.attachEvent("onreadystatechange",()=>{"loading"!==document.readyState&&e()}),window.addEventListener("load",g),window.addEventListener("resize",function(e,t,n,...o){let i;return function(){const s=this;i?clearTimeout(i):n&&e.apply(s,o),i=setTimeout((function(){n||e.apply(s,o),i=null}),t||100)}}(g)),i=!0)}function w(e,t){e?t&&!0===t.watch?function(e){"string"==typeof e?o.sel.push(e):a(m(e),e=>{o.el.push(e)}),b(),g()}(e):t&&!1===t.watch?function(e){"string"==typeof e?o.sel=o.sel.filter(t=>t!==e):(e=m(e),o.el=o.el.filter(t=>-1===e.indexOf(t)))}(e):y(e):s||(o.sel.push(".balance-text"),b(),s=!0)}return l.prototype.reset=function(){this.index=0,this.width=0},w.updateWatched=g,function(){if("undefined"==typeof window)return!1;const{style:e}=document.documentElement;return e.textWrap||e.WebkitTextWrap||e.MozTextWrap||e.MsTextWrap}()?(r.updateWatched=r,r):w})?o.apply(t,i):o)||(e.exports=s)},function(e,t){e.exports=Object.freeze({ENTER:13,ESCAPE:27,LEFT:37,RIGHT:39,SPACEBAR:32,TAB:9})},function(e,t,n){"use strict";n.r(t),n.d(t,"Sol",(function(){return g})),n.d(t,"Focus",(function(){return l.a})),n.d(t,"Modernizr",(function(){return f})),n.d(t,"MoMABalanceText",(function(){return r.a})),n.d(t,"Nav",(function(){return m.a})),n.d(t,"SessionColor",(function(){return h.a})),n.d(t,"Util",(function(){return o})),n.d(t,"Viewporter",(function(){return d.a}));var o={};n.r(o),n.d(o,"BaseDomain",(function(){return i.BaseDomain})),n.d(o,"DocumentReady",(function(){return i.DocumentReady})),n.d(o,"GetElementsList",(function(){return i.GetElementsList})),n.d(o,"IsMobileOrTablet",(function(){return i.IsMobileOrTablet})),n.d(o,"WindowHasSize",(function(){return i.WindowHasSize}));var i=n(1),s=n(5),r=n.n(s),a=n(4),l=n.n(a),c=n(3),d=n.n(c),u=n(0),h=n.n(u);
/*!
 * modernizr v3.5.0
 * Build https://modernizr.com/download?-cssfilters-cssmask-flexbox-touchevents-setclasses-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */
class f{constructor(){!function(e,t,n){var o=[],i=[],s={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout((function(){t(n[e])}),0)},addTest:function(e,t,n){i.push({name:e,fn:t,options:n})},addAsyncTest:function(e){i.push({name:null,fn:e})}},r=function(){};function a(e,t){return typeof e===t}r.prototype=s,r=new r;var l=t.documentElement,c="svg"===l.nodeName.toLowerCase();var d=s._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];function u(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):c?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}
/*!
      {
      "name": "CSS Supports",
      "property": "supports",
      "caniuse": "css-featurequeries",
      "tags": ["css"],
      "builderAliases": ["css_supports"],
      "notes": [{
        "name": "W3 Spec",
        "href": "http://dev.w3.org/csswg/css3-conditional/#at-supports"
      },{
        "name": "Related Github Issue",
        "href": "https://github.com/Modernizr/Modernizr/issues/648"
      },{
        "name": "W3 Info",
        "href": "http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
      }]
      }
      !*/s._prefixes=d;var h="CSS"in e&&"supports"in e.CSS,f="supportsCSS"in e;function p(e,n,o,i){var s,r,a,d,h="modernizr",f=u("div"),p=function(){var e=t.body;return e||((e=u(c?"svg":"body")).fake=!0),e}();if(parseInt(o,10))for(;o--;)(a=u("div")).id=i?i[o]:h+(o+1),f.appendChild(a);return(s=u("style")).type="text/css",s.id="s"+h,(p.fake?p:f).appendChild(s),p.appendChild(f),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(t.createTextNode(e)),f.id=h,p.fake&&(p.style.background="",p.style.overflow="hidden",d=l.style.overflow,l.style.overflow="hidden",l.appendChild(p)),r=n(f,e),p.fake?(p.parentNode.removeChild(p),l.style.overflow=d,l.offsetHeight):f.parentNode.removeChild(f),!!r}r.addTest("supports",h||f);var m=s.testStyles=p;
/*!
      {
      "name": "Touch Events",
      "property": "touchevents",
      "caniuse" : "touch",
      "tags": ["media", "attribute"],
      "notes": [{
        "name": "Touch Events spec",
        "href": "https://www.w3.org/TR/2013/WD-touch-events-20130124/"
      }],
      "warnings": [
        "Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
      ],
      "knownBugs": [
        "False-positive on some configurations of Nokia N900",
        "False-positive on some BlackBerry 6.0 builds – https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
      ]
      }
      !*/r.addTest("touchevents",(function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var o=["@media (",d.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,(function(e){n=9===e.offsetTop}))}return n}));var y=s._config.usePrefixes?"Moz O ms Webkit".split(" "):[];s._cssomPrefixes=y;var g=s._config.usePrefixes?"Moz O ms Webkit".toLowerCase().split(" "):[];function b(e,t){return function(){return e.apply(t,arguments)}}s._domPrefixes=g;var w={elem:u("modernizr")};r._q.push((function(){delete w.elem}));var v={style:w.elem.style};function S(e){return e.replace(/([A-Z])/g,(function(e,t){return"-"+t.toLowerCase()})).replace(/^ms-/,"-ms-")}function x(t,n){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(S(t[o]),n))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+S(t[o])+":"+n+")");return p("@supports ("+(i=i.join(" or "))+") { #modernizr { position: absolute; } }",(function(t){return"absolute"==function(t,n,o){var i;if("getComputedStyle"in e){i=getComputedStyle.call(e,t,n);var s=e.console;if(null!==i)o&&(i=i.getPropertyValue(o));else if(s)s[s.error?"error":"log"].call(s,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}else i=!n&&t.currentStyle&&t.currentStyle[o];return i}(t,null,"position")}))}}function C(e,t,n,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),r=(e+" "+y.join(s+" ")+s).split(" ");return a(t,"string")||a(t,"undefined")?function(e,t,n,o){if(o=!a(o,"undefined")&&o,!a(n,"undefined")){var i=x(e,n);if(!a(i,"undefined"))return i}for(var s,r,l,c,d,h=["modernizr","tspan","samp"];!v.style&&h.length;)s=!0,v.modElem=u(h.shift()),v.style=v.modElem.style;function f(){s&&(delete v.style,delete v.modElem)}for(l=e.length,r=0;r<l;r++)if(c=e[r],d=v.style[c],~(""+c).indexOf("-")&&(c=c.replace(/([a-z])-([a-z])/g,(function(e,t,n){return t+n.toUpperCase()})).replace(/^-/,"")),void 0!==v.style[c]){if(o||a(n,"undefined"))return f(),"pfx"!=t||c;try{v.style[c]=n}catch(e){}if(v.style[c]!=d)return f(),"pfx"!=t||c}return f(),!1}(r,t,o,i):function(e,t,n){var o;for(var i in e)if(e[i]in t)return!1===n?e[i]:a(o=t[e[i]],"function")?b(o,n||t):o;return!1}(r=(e+" "+g.join(s+" ")+s).split(" "),t,n)}function E(e,t,n){return C(e,void 0,void 0,t,n)}r._q.unshift((function(){delete v.style})),s.testAllProps=C,s.testAllProps=E,
/*!
      {
      "name": "CSS Filters",
      "property": "cssfilters",
      "caniuse": "css-filters",
      "polyfills": ["polyfilter"],
      "tags": ["css"],
      "builderAliases": ["css_filters"],
      "notes": [{
        "name": "MDN article on CSS filters",
        "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/filter"
      }]
      }
      !*/
r.addTest("cssfilters",(function(){if(r.supports)return E("filter","blur(2px)");var e=u("a");return e.style.cssText=d.join("filter:blur(2px); "),!!e.style.length&&(void 0===t.documentMode||t.documentMode>9)})),
/*!
      {
      "name": "Flexbox",
      "property": "flexbox",
      "caniuse": "flexbox",
      "tags": ["css"],
      "notes": [{
        "name": "The _new_ flexbox",
        "href": "http://dev.w3.org/csswg/css3-flexbox"
      }],
      "warnings": [
        "A `true` result for this detect does not imply that the `flex-wrap` property is supported; see the `flexwrap` detect."
      ]
      }
      !*/
r.addTest("flexbox",E("flexBasis","1px",!0)),
/*!
      {
      "name": "CSS Mask",
      "caniuse": "css-masks",
      "property": "cssmask",
      "tags": ["css"],
      "builderAliases": ["css_mask"],
      "notes": [
        {
          "name": "Webkit blog on CSS Masks",
          "href": "https://webkit.org/blog/181/css-masks/"
        },
        {
          "name": "Safari Docs",
          "href": "https://developer.apple.com/library/safari/#documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/Masks/Masks.html"
        },
        {
          "name": "CSS SVG mask",
          "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/mask"
        },
        {
          "name": "Combine with clippaths for awesomeness",
          "href": "https://generic.cx/for/webkit/test.html"
        }
      ]
      }
      !*/
r.addTest("cssmask",E("maskRepeat","repeat-x",!0));
/*!
      {
      "name": "CSS Custom Properties",
      "property": "csscustomproperties",
      "caniuse": "css-variables",
      "tags": ["css"],
      "builderAliases": ["css_customproperties"],
      "notes": [{
        "name": "MDN",
        "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/--*"
      },{
        "name": "W3 Spec",
        "href": "https://drafts.csswg.org/css-variables/"
      }]
      }
      !*/
var T=e.CSS&&e.CSS.supports.bind(e.CSS)||e.supportsCSS;r.addTest("customproperties",!!T&&(T("--f:0")||T("--f",0))),function(){var e,t,n,s,l,c;for(var d in i)if(i.hasOwnProperty(d)){if(e=[],(t=i[d]).name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(s=a(t.fn,"function")?t.fn():t.fn,l=0;l<e.length;l++)1===(c=e[l].split(".")).length?r[c[0]]=s:(!r[c[0]]||r[c[0]]instanceof Boolean||(r[c[0]]=new Boolean(r[c[0]])),r[c[0]][c[1]]=s),o.push((s?"":"no-")+c.join("-"))}}(),function(e){var t=l.className,n=r._config.classPrefix||"";if(c&&(t=t.baseVal),r._config.enableJSClass){var o=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(o,"$1"+n+"js$2")}r._config.enableClasses&&(t+=" "+n+e.join(" "+n),c?l.className.baseVal=t:l.className=t)}(o),delete s.addTest,delete s.addAsyncTest;for(var L=0;L<r._q.length;L++)r._q[L]();e.Modernizr=r}(window,document)}}var p=n(6),m=n.n(p),y=n(2);class g{constructor(){this.modernizr=new f,this.viewporter=new d.a,this.focus=new l.a,this.sessionColor=new h.a,this.nav=new m.a,this.balanceText=new r.a,this.balanceText.initInteraction()}}Object(y.loadAsianFonts)()}])}));