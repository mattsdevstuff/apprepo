(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const Ys=()=>{};var qr={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xi=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Qs=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],a=t[n++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Ui={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,a=o?t[i+1]:0,c=i+2<t.length,l=c?t[i+2]:0,d=s>>2,h=(s&3)<<4|a>>4;let u=(a&15)<<2|l>>6,y=l&63;c||(y=64,o||(u=64)),r.push(n[d],n[h],n[u],n[y])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(xi(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Qs(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const l=i<t.length?n[t.charAt(i)]:64;++i;const h=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||a==null||l==null||h==null)throw new Zs;const u=s<<2|a>>4;if(r.push(u),l!==64){const y=a<<4&240|l>>2;if(r.push(y),h!==64){const b=l<<6&192|h;r.push(b)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Zs extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const eo=function(t){const e=xi(t);return Ui.encodeByteArray(e,!0)},$i=function(t){return eo(t).replace(/\./g,"")},Fi=function(t){try{return Ui.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const no=()=>to().__FIREBASE_DEFAULTS__,ro=()=>{if(typeof process>"u"||typeof qr>"u")return;const t=qr.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},io=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Fi(t[1]);return e&&JSON.parse(e)},yr=()=>{try{return Ys()||no()||ro()||io()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},qi=t=>{var e,n;return(n=(e=yr())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},so=t=>{const e=qi(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Hi=()=>{var t;return(t=yr())==null?void 0:t.config},Bi=t=>{var e;return(e=yr())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oo{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lt(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Vi(t){return(await fetch(t,{credentials:"include"})).ok}const tt={};function ao(){const t={prod:[],emulator:[]};for(const e of Object.keys(tt))tt[e]?t.emulator.push(e):t.prod.push(e);return t}function co(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Hr=!1;function Wi(t,e){if(typeof window>"u"||typeof document>"u"||!lt(window.location.host)||tt[t]===e||tt[t]||Hr)return;tt[t]=e;function n(u){return`__firebase__banner__${u}`}const r="__firebase__banner",s=ao().prod.length>0;function o(){const u=document.getElementById(r);u&&u.remove()}function a(u){u.style.display="flex",u.style.background="#7faaf0",u.style.position="fixed",u.style.bottom="5px",u.style.left="5px",u.style.padding=".5em",u.style.borderRadius="5px",u.style.alignItems="center"}function c(u,y){u.setAttribute("width","24"),u.setAttribute("id",y),u.setAttribute("height","24"),u.setAttribute("viewBox","0 0 24 24"),u.setAttribute("fill","none"),u.style.marginLeft="-6px"}function l(){const u=document.createElement("span");return u.style.cursor="pointer",u.style.marginLeft="16px",u.style.fontSize="24px",u.innerHTML=" &times;",u.onclick=()=>{Hr=!0,o()},u}function d(u,y){u.setAttribute("id",y),u.innerText="Learn more",u.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",u.setAttribute("target","__blank"),u.style.paddingLeft="5px",u.style.textDecoration="underline"}function h(){const u=co(r),y=n("text"),b=document.getElementById(y)||document.createElement("span"),B=n("learnmore"),It=document.getElementById(B)||document.createElement("a"),Ae=n("preprendIcon"),Le=document.getElementById(Ae)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(u.created){const An=u.element;a(An),d(It,B);const Xs=l();c(Le,Ae),An.append(Le,b,It,Xs),document.body.appendChild(An)}s?(b.innerText="Preview backend disconnected.",Le.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(Le.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,b.innerText="Preview backend running in this workspace."),b.setAttribute("id",y)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",h):h()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function lo(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(k())}function uo(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ho(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function fo(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function po(){const t=k();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function mo(){try{return typeof indexedDB=="object"}catch{return!1}}function go(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)==null?void 0:s.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yo="FirebaseError";class ee extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=yo,Object.setPrototypeOf(this,ee.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,dt.prototype.create)}}class dt{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?vo(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new ee(i,a,r)}}function vo(t,e){return t.replace(Io,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Io=/\{\$([^}]+)}/g;function _o(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Be(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(Br(s)&&Br(o)){if(!Be(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Br(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function wo(t,e){const n=new Eo(t,e);return n.subscribe.bind(n)}class Eo{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");bo(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=Ln),i.error===void 0&&(i.error=Ln),i.complete===void 0&&(i.complete=Ln);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function bo(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Ln(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H(t){return t&&t._delegate?t._delegate:t}class Te{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const me="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new oo;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Co(e))try{this.getOrInitializeService({instanceIdentifier:me})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=me){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=me){return this.instances.has(e)}getOptions(e=me){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:To(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=me){return this.component?this.component.multipleInstances?e:me:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function To(t){return t===me?void 0:t}function Co(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new So(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var I;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(I||(I={}));const Ao={debug:I.DEBUG,verbose:I.VERBOSE,info:I.INFO,warn:I.WARN,error:I.ERROR,silent:I.SILENT},Lo=I.INFO,Po={[I.DEBUG]:"log",[I.VERBOSE]:"log",[I.INFO]:"info",[I.WARN]:"warn",[I.ERROR]:"error"},Ro=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=Po[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class zi{constructor(e){this.name=e,this._logLevel=Lo,this._logHandler=Ro,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in I))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ao[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,I.DEBUG,...e),this._logHandler(this,I.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,I.VERBOSE,...e),this._logHandler(this,I.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,I.INFO,...e),this._logHandler(this,I.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,I.WARN,...e),this._logHandler(this,I.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,I.ERROR,...e),this._logHandler(this,I.ERROR,...e)}}const No=(t,e)=>e.some(n=>t instanceof n);let Vr,Wr;function Oo(){return Vr||(Vr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Do(){return Wr||(Wr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ji=new WeakMap,rr=new WeakMap,Gi=new WeakMap,Pn=new WeakMap,vr=new WeakMap;function Mo(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(ce(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&ji.set(n,t)}).catch(()=>{}),vr.set(e,t),e}function xo(t){if(rr.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});rr.set(t,e)}let ir={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return rr.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Gi.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ce(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Uo(t){ir=t(ir)}function $o(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Rn(this),e,...n);return Gi.set(r,e.sort?e.sort():[e]),ce(r)}:Do().includes(t)?function(...e){return t.apply(Rn(this),e),ce(ji.get(this))}:function(...e){return ce(t.apply(Rn(this),e))}}function Fo(t){return typeof t=="function"?$o(t):(t instanceof IDBTransaction&&xo(t),No(t,Oo())?new Proxy(t,ir):t)}function ce(t){if(t instanceof IDBRequest)return Mo(t);if(Pn.has(t))return Pn.get(t);const e=Fo(t);return e!==t&&(Pn.set(t,e),vr.set(e,t)),e}const Rn=t=>vr.get(t);function qo(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),a=ce(o);return r&&o.addEventListener("upgradeneeded",c=>{r(ce(o.result),c.oldVersion,c.newVersion,ce(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Ho=["get","getKey","getAll","getAllKeys","count"],Bo=["put","add","delete","clear"],Nn=new Map;function zr(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Nn.get(e))return Nn.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=Bo.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Ho.includes(n)))return;const s=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),i&&c.done]))[0]};return Nn.set(e,s),s}Uo(t=>({...t,get:(e,n,r)=>zr(e,n)||t.get(e,n,r),has:(e,n)=>!!zr(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Wo(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Wo(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const sr="@firebase/app",jr="0.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q=new zi("@firebase/app"),zo="@firebase/app-compat",jo="@firebase/analytics-compat",Go="@firebase/analytics",Ko="@firebase/app-check-compat",Jo="@firebase/app-check",Xo="@firebase/auth",Yo="@firebase/auth-compat",Qo="@firebase/database",Zo="@firebase/data-connect",ea="@firebase/database-compat",ta="@firebase/functions",na="@firebase/functions-compat",ra="@firebase/installations",ia="@firebase/installations-compat",sa="@firebase/messaging",oa="@firebase/messaging-compat",aa="@firebase/performance",ca="@firebase/performance-compat",la="@firebase/remote-config",da="@firebase/remote-config-compat",ua="@firebase/storage",ha="@firebase/storage-compat",fa="@firebase/firestore",pa="@firebase/ai",ma="@firebase/firestore-compat",ga="firebase",ya="12.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const or="[DEFAULT]",va={[sr]:"fire-core",[zo]:"fire-core-compat",[Go]:"fire-analytics",[jo]:"fire-analytics-compat",[Jo]:"fire-app-check",[Ko]:"fire-app-check-compat",[Xo]:"fire-auth",[Yo]:"fire-auth-compat",[Qo]:"fire-rtdb",[Zo]:"fire-data-connect",[ea]:"fire-rtdb-compat",[ta]:"fire-fn",[na]:"fire-fn-compat",[ra]:"fire-iid",[ia]:"fire-iid-compat",[sa]:"fire-fcm",[oa]:"fire-fcm-compat",[aa]:"fire-perf",[ca]:"fire-perf-compat",[la]:"fire-rc",[da]:"fire-rc-compat",[ua]:"fire-gcs",[ha]:"fire-gcs-compat",[fa]:"fire-fst",[ma]:"fire-fst-compat",[pa]:"fire-vertex","fire-js":"fire-js",[ga]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt=new Map,Ia=new Map,ar=new Map;function Gr(t,e){try{t.container.addComponent(e)}catch(n){Q.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ve(t){const e=t.name;if(ar.has(e))return Q.debug(`There were multiple attempts to register component ${e}.`),!1;ar.set(e,t);for(const n of Rt.values())Gr(n,t);for(const n of Ia.values())Gr(n,t);return!0}function Ir(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function x(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _a={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},le=new dt("app","Firebase",_a);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Te("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw le.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht=ya;function Ki(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:or,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw le.create("bad-app-name",{appName:String(i)});if(n||(n=Hi()),!n)throw le.create("no-options");const s=Rt.get(i);if(s){if(Be(n,s.options)&&Be(r,s.config))return s;throw le.create("duplicate-app",{appName:i})}const o=new ko(i);for(const c of ar.values())o.addComponent(c);const a=new wa(n,r,o);return Rt.set(i,a),a}function Ji(t=or){const e=Rt.get(t);if(!e&&t===or&&Hi())return Ki();if(!e)throw le.create("no-app",{appName:t});return e}function de(t,e,n){let r=va[t]??t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Q.warn(o.join(" "));return}Ve(new Te(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea="firebase-heartbeat-database",ba=1,at="firebase-heartbeat-store";let On=null;function Xi(){return On||(On=qo(Ea,ba,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(at)}catch(n){console.warn(n)}}}}).catch(t=>{throw le.create("idb-open",{originalErrorMessage:t.message})})),On}async function Sa(t){try{const n=(await Xi()).transaction(at),r=await n.objectStore(at).get(Yi(t));return await n.done,r}catch(e){if(e instanceof ee)Q.warn(e.message);else{const n=le.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Q.warn(n.message)}}}async function Kr(t,e){try{const r=(await Xi()).transaction(at,"readwrite");await r.objectStore(at).put(e,Yi(t)),await r.done}catch(n){if(n instanceof ee)Q.warn(n.message);else{const r=le.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Q.warn(r.message)}}}function Yi(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ta=1024,Ca=30;class ka{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new La(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Jr();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>Ca){const o=Pa(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Q.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Jr(),{heartbeatsToSend:r,unsentEntries:i}=Aa(this._heartbeatsCache.heartbeats),s=$i(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Q.warn(n),""}}}function Jr(){return new Date().toISOString().substring(0,10)}function Aa(t,e=Ta){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Xr(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Xr(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class La{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return mo()?go().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Sa(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Kr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Kr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Xr(t){return $i(JSON.stringify({version:2,heartbeats:t})).length}function Pa(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ra(t){Ve(new Te("platform-logger",e=>new Vo(e),"PRIVATE")),Ve(new Te("heartbeat",e=>new ka(e),"PRIVATE")),de(sr,jr,t),de(sr,jr,"esm2020"),de("fire-js","")}Ra("");function Qi(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Na=Qi,Zi=new dt("auth","Firebase",Qi());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt=new zi("@firebase/auth");function Oa(t,...e){Nt.logLevel<=I.WARN&&Nt.warn(`Auth (${ht}): ${t}`,...e)}function kt(t,...e){Nt.logLevel<=I.ERROR&&Nt.error(`Auth (${ht}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(t,...e){throw wr(t,...e)}function F(t,...e){return wr(t,...e)}function _r(t,e,n){const r={...Na(),[e]:n};return new dt("auth","Firebase",r).create(e,{appName:t.name})}function _e(t){return _r(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Da(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&j(t,"argument-error"),_r(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function wr(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Zi.create(t,...e)}function f(t,e,...n){if(!t)throw wr(e,...n)}function X(t){const e="INTERNAL ASSERTION FAILED: "+t;throw kt(e),new Error(e)}function Z(t,e){t||X(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cr(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function Ma(){return Yr()==="http:"||Yr()==="https:"}function Yr(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xa(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Ma()||ho()||"connection"in navigator)?navigator.onLine:!0}function Ua(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e,n){this.shortDelay=e,this.longDelay=n,Z(n>e,"Short delay should be less than long delay!"),this.isMobile=lo()||fo()}get(){return xa()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Er(t,e){Z(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;X("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;X("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;X("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fa=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],qa=new ft(3e4,6e4);function br(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Xe(t,e,n,r,i={}){return ts(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=ut({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...s};return uo()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&lt(t.emulatorConfig.host)&&(l.credentials="include"),es.fetch()(await ns(t,t.config.apiHost,n,a),l)})}async function ts(t,e,n){t._canInitEmulator=!1;const r={...$a,...e};try{const i=new Ba(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw _t(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw _t(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw _t(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw _t(t,"user-disabled",o);const d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw _r(t,d,l);j(t,d)}}catch(i){if(i instanceof ee)throw i;j(t,"network-request-failed",{message:String(i)})}}async function Ha(t,e,n,r,i={}){const s=await Xe(t,e,n,r,i);return"mfaPendingCredential"in s&&j(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function ns(t,e,n,r){const i=`${e}${n}?${r}`,s=t,o=s.config.emulator?Er(t.config,i):`${t.config.apiScheme}://${i}`;return Fa.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}class Ba{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(F(this.auth,"network-request-failed")),qa.get())})}}function _t(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=F(t,e,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Va(t,e){return Xe(t,"POST","/v1/accounts:delete",e)}async function Ot(t,e){return Xe(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Wa(t,e=!1){const n=H(t),r=await n.getIdToken(e),i=Sr(r);f(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:nt(Dn(i.auth_time)),issuedAtTime:nt(Dn(i.iat)),expirationTime:nt(Dn(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Dn(t){return Number(t)*1e3}function Sr(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return kt("JWT malformed, contained fewer than 3 sections"),null;try{const i=Fi(n);return i?JSON.parse(i):(kt("Failed to decode base64 JWT payload"),null)}catch(i){return kt("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Qr(t){const e=Sr(t);return f(e,"internal-error"),f(typeof e.exp<"u","internal-error"),f(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ct(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof ee&&za(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function za({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=nt(this.lastLoginAt),this.creationTime=nt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dt(t){var h;const e=t.auth,n=await t.getIdToken(),r=await ct(t,Ot(e,{idToken:n}));f(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const s=(h=i.providerUserInfo)!=null&&h.length?rs(i.providerUserInfo):[],o=Ka(t.providerData,s),a=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!(o!=null&&o.length),l=a?c:!1,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new lr(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(t,d)}async function Ga(t){const e=H(t);await Dt(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Ka(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function rs(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ja(t,e){const n=await ts(t,{},async()=>{const r=ut({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=await ns(t,i,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:r};return t.emulatorConfig&&lt(t.emulatorConfig.host)&&(c.credentials="include"),es.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Xa(t,e){return Xe(t,"POST","/v2/accounts:revokeToken",br(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){f(e.idToken,"internal-error"),f(typeof e.idToken<"u","internal-error"),f(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Qr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){f(e.length!==0,"internal-error");const n=Qr(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(f(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await Ja(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new Me;return r&&(f(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(f(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(f(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Me,this.toJSON())}_performRefresh(){return X("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(t,e){f(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class ${constructor({uid:e,auth:n,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new ja(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new lr(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await ct(this,this.stsTokenManager.getToken(this.auth,e));return f(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Wa(this,e)}reload(){return Ga(this)}_assign(e){this!==e&&(f(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new $({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){f(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Dt(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(x(this.auth.app))return Promise.reject(_e(this.auth));const e=await this.getIdToken();return await ct(this,Va(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,i=n.email??void 0,s=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,d=n.lastLoginAt??void 0,{uid:h,emailVerified:u,isAnonymous:y,providerData:b,stsTokenManager:B}=n;f(h&&B,e,"internal-error");const It=Me.fromJSON(this.name,B);f(typeof h=="string",e,"internal-error"),te(r,e.name),te(i,e.name),f(typeof u=="boolean",e,"internal-error"),f(typeof y=="boolean",e,"internal-error"),te(s,e.name),te(o,e.name),te(a,e.name),te(c,e.name),te(l,e.name),te(d,e.name);const Ae=new $({uid:h,auth:e,email:i,emailVerified:u,displayName:r,isAnonymous:y,photoURL:o,phoneNumber:s,tenantId:a,stsTokenManager:It,createdAt:l,lastLoginAt:d});return b&&Array.isArray(b)&&(Ae.providerData=b.map(Le=>({...Le}))),c&&(Ae._redirectEventId=c),Ae}static async _fromIdTokenResponse(e,n,r=!1){const i=new Me;i.updateFromServerResponse(n);const s=new $({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Dt(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];f(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?rs(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),a=new Me;a.updateFromIdToken(r);const c=new $({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new lr(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zr=new Map;function Y(t){Z(t instanceof Function,"Expected a class definition");let e=Zr.get(t);return e?(Z(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Zr.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}is.type="NONE";const ei=is;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(t,e,n){return`firebase:${t}:${e}:${n}`}class xe{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=At(this.userKey,i.apiKey,s),this.fullPersistenceKey=At("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Ot(this.auth,{idToken:e}).catch(()=>{});return n?$._fromGetAccountInfoResponse(this.auth,n,e):null}return $._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new xe(Y(ei),e,r);const i=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=i[0]||Y(ei);const o=At(r,e.config.apiKey,e.name);let a=null;for(const l of n)try{const d=await l._get(o);if(d){let h;if(typeof d=="string"){const u=await Ot(e,{idToken:d}).catch(()=>{});if(!u)break;h=await $._fromGetAccountInfoResponse(e,u,d)}else h=$._fromJSON(e,d);l!==s&&(a=h),s=l;break}}catch{}const c=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new xe(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new xe(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ti(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(cs(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ss(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ds(e))return"Blackberry";if(us(e))return"Webos";if(os(e))return"Safari";if((e.includes("chrome/")||as(e))&&!e.includes("edge/"))return"Chrome";if(ls(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function ss(t=k()){return/firefox\//i.test(t)}function os(t=k()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function as(t=k()){return/crios\//i.test(t)}function cs(t=k()){return/iemobile/i.test(t)}function ls(t=k()){return/android/i.test(t)}function ds(t=k()){return/blackberry/i.test(t)}function us(t=k()){return/webos/i.test(t)}function Tr(t=k()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Ya(t=k()){var e;return Tr(t)&&!!((e=window.navigator)!=null&&e.standalone)}function Qa(){return po()&&document.documentMode===10}function hs(t=k()){return Tr(t)||ls(t)||us(t)||ds(t)||/windows phone/i.test(t)||cs(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fs(t,e=[]){let n;switch(t){case"Browser":n=ti(k());break;case"Worker":n=`${ti(k())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ht}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ec(t,e={}){return Xe(t,"GET","/v2/passwordPolicy",br(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tc=6;class nc{constructor(e){var r;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??tc,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ni(this),this.idTokenSubscription=new ni(this),this.beforeStateQueue=new Za(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Zi,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Y(n)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await xe.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Ot(this,{idToken:e}),r=await $._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(x(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(s=this.redirectUser)==null?void 0:s._redirectEventId,a=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(r=c.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return f(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Dt(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Ua()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(x(this.app))return Promise.reject(_e(this));const n=e?H(e):null;return n&&f(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&f(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return x(this.app)?Promise.reject(_e(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return x(this.app)?Promise.reject(_e(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Y(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ec(this),n=new nc(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new dt("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await Xa(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Y(e)||this._popupRedirectResolver;f(n,this,"argument-error"),this.redirectPersistenceManager=await xe.create(this,[Y(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(f(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,i);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return f(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=fs(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var n;if(x(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&Oa(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function _n(t){return H(t)}class ni{constructor(e){this.auth=e,this.observer=null,this.addObserver=wo(n=>this.observer=n)}get next(){return f(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ic(t){Cr=t}function sc(t){return Cr.loadJS(t)}function oc(){return Cr.gapiScript}function ac(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cc(t,e){const n=Ir(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(Be(s,e??{}))return i;j(i,"already-initialized")}return n.initialize({options:e})}function lc(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Y);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function dc(t,e,n){const r=_n(t);f(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=ps(e),{host:o,port:a}=uc(e),c=a===null?"":`:${a}`,l={url:`${s}//${o}${c}/`},d=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){f(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),f(Be(l,r.config.emulator)&&Be(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,lt(o)?(Vi(`${s}//${o}${c}`),Wi("Auth",!0)):hc()}function ps(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function uc(t){const e=ps(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:ri(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:ri(o)}}}function ri(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function hc(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return X("not implemented")}_getIdTokenResponse(e){return X("not implemented")}_linkToIdToken(e,n){return X("not implemented")}_getReauthenticationResolver(e){return X("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ue(t,e){return Ha(t,"POST","/v1/accounts:signInWithIdp",br(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fc="http://localhost";class Ce extends ms{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Ce(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):j("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=n;if(!r||!i)return null;const o=new Ce(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ue(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Ue(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ue(e,n)}buildRequest(){const e={requestUri:fc,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ut(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt extends kr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re extends pt{constructor(){super("facebook.com")}static credential(e){return Ce._fromParams({providerId:re.PROVIDER_ID,signInMethod:re.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return re.credentialFromTaggedObject(e)}static credentialFromError(e){return re.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return re.credential(e.oauthAccessToken)}catch{return null}}}re.FACEBOOK_SIGN_IN_METHOD="facebook.com";re.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J extends pt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Ce._fromParams({providerId:J.PROVIDER_ID,signInMethod:J.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return J.credentialFromTaggedObject(e)}static credentialFromError(e){return J.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return J.credential(n,r)}catch{return null}}}J.GOOGLE_SIGN_IN_METHOD="google.com";J.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie extends pt{constructor(){super("github.com")}static credential(e){return Ce._fromParams({providerId:ie.PROVIDER_ID,signInMethod:ie.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ie.credentialFromTaggedObject(e)}static credentialFromError(e){return ie.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ie.credential(e.oauthAccessToken)}catch{return null}}}ie.GITHUB_SIGN_IN_METHOD="github.com";ie.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se extends pt{constructor(){super("twitter.com")}static credential(e,n){return Ce._fromParams({providerId:se.PROVIDER_ID,signInMethod:se.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return se.credentialFromTaggedObject(e)}static credentialFromError(e){return se.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return se.credential(n,r)}catch{return null}}}se.TWITTER_SIGN_IN_METHOD="twitter.com";se.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await $._fromIdTokenResponse(e,r,i),o=ii(r);return new We({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=ii(r);return new We({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function ii(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt extends ee{constructor(e,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Mt.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new Mt(e,n,r,i)}}function gs(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Mt._fromErrorAndOperation(t,s,e,r):s})}async function pc(t,e,n=!1){const r=await ct(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return We._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mc(t,e,n=!1){const{auth:r}=t;if(x(r.app))return Promise.reject(_e(r));const i="reauthenticate";try{const s=await ct(t,gs(r,i,e,t),n);f(s.idToken,r,"internal-error");const o=Sr(s.idToken);f(o,r,"internal-error");const{sub:a}=o;return f(t.uid===a,r,"user-mismatch"),We._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&j(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gc(t,e,n=!1){if(x(t.app))return Promise.reject(_e(t));const r="signIn",i=await gs(t,r,e),s=await We._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}function yc(t,e,n,r){return H(t).onIdTokenChanged(e,n,r)}function vc(t,e,n){return H(t).beforeAuthStateChanged(e,n)}function Ic(t,e,n,r){return H(t).onAuthStateChanged(e,n,r)}function _c(t){return H(t).signOut()}const xt="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(xt,"1"),this.storage.removeItem(xt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wc=1e3,Ec=10;class vs extends ys{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=hs(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);Qa()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Ec):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},wc)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}vs.type="LOCAL";const bc=vs;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is extends ys{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Is.type="SESSION";const _s=Is;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sc(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new wn(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async l=>l(n.origin,s)),c=await Sc(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}wn.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ar(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tc{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const l=Ar("",20);i.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(h){const u=h;if(u.data.eventId===l)switch(u.data.status){case"ack":clearTimeout(d),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(u.data.response);break;default:clearTimeout(d),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(){return window}function Cc(t){z().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ws(){return typeof z().WorkerGlobalScope<"u"&&typeof z().importScripts=="function"}async function kc(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ac(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function Lc(){return ws()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Es="firebaseLocalStorageDb",Pc=1,Ut="firebaseLocalStorage",bs="fbase_key";class mt{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function En(t,e){return t.transaction([Ut],e?"readwrite":"readonly").objectStore(Ut)}function Rc(){const t=indexedDB.deleteDatabase(Es);return new mt(t).toPromise()}function dr(){const t=indexedDB.open(Es,Pc);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Ut,{keyPath:bs})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Ut)?e(r):(r.close(),await Rc(),e(await dr()))})})}async function si(t,e,n){const r=En(t,!0).put({[bs]:e,value:n});return new mt(r).toPromise()}async function Nc(t,e){const n=En(t,!1).get(e),r=await new mt(n).toPromise();return r===void 0?null:r.value}function oi(t,e){const n=En(t,!0).delete(e);return new mt(n).toPromise()}const Oc=800,Dc=3;class Ss{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await dr(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Dc)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ws()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=wn._getInstance(Lc()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,r;if(this.activeServiceWorker=await kc(),!this.activeServiceWorker)return;this.sender=new Tc(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ac()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await dr();return await si(e,xt,"1"),await oi(e,xt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>si(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Nc(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>oi(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=En(i,!1).getAll();return new mt(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Oc)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ss.type="LOCAL";const Mc=Ss;new ft(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ts(t,e){return e?Y(e):(f(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr extends ms{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ue(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ue(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ue(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function xc(t){return gc(t.auth,new Lr(t),t.bypassAuthState)}function Uc(t){const{auth:e,user:n}=t;return f(n,e,"internal-error"),mc(n,new Lr(t),t.bypassAuthState)}async function $c(t){const{auth:e,user:n}=t;return f(n,e,"internal-error"),pc(n,new Lr(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return xc;case"linkViaPopup":case"linkViaRedirect":return $c;case"reauthViaPopup":case"reauthViaRedirect":return Uc;default:j(this.auth,"internal-error")}}resolve(e){Z(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Z(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fc=new ft(2e3,1e4);async function qc(t,e,n){if(x(t.app))return Promise.reject(F(t,"operation-not-supported-in-this-environment"));const r=_n(t);Da(t,e,kr);const i=Ts(r,n);return new ge(r,"signInViaPopup",e,i).executeNotNull()}class ge extends Cs{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,ge.currentPopupAction&&ge.currentPopupAction.cancel(),ge.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return f(e,this.auth,"internal-error"),e}async onExecution(){Z(this.filter.length===1,"Popup operations only handle one event");const e=Ar();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(F(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(F(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ge.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if((r=(n=this.authWindow)==null?void 0:n.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(F(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Fc.get())};e()}}ge.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hc="pendingRedirect",Lt=new Map;class Bc extends Cs{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Lt.get(this.auth._key());if(!e){try{const r=await Vc(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Lt.set(this.auth._key(),e)}return this.bypassAuthState||Lt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Vc(t,e){const n=jc(e),r=zc(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function Wc(t,e){Lt.set(t._key(),e)}function zc(t){return Y(t._redirectPersistence)}function jc(t){return At(Hc,t.config.apiKey,t.name)}async function Gc(t,e,n=!1){if(x(t.app))return Promise.reject(_e(t));const r=_n(t),i=Ts(r,e),o=await new Bc(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kc=600*1e3;class Jc{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Xc(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!ks(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";n.onError(F(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Kc&&this.cachedEventUids.clear(),this.cachedEventUids.has(ai(e))}saveEventToCache(e){this.cachedEventUids.add(ai(e)),this.lastProcessedEventTime=Date.now()}}function ai(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function ks({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Xc(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ks(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yc(t,e={}){return Xe(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qc=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Zc=/^https?/;async function el(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Yc(t);for(const n of e)try{if(tl(n))return}catch{}j(t,"unauthorized-domain")}function tl(t){const e=cr(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!Zc.test(n))return!1;if(Qc.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl=new ft(3e4,6e4);function ci(){const t=z().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function rl(t){return new Promise((e,n)=>{var i,s,o;function r(){ci(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ci(),n(F(t,"network-request-failed"))},timeout:nl.get()})}if((s=(i=z().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((o=z().gapi)!=null&&o.load)r();else{const a=ac("iframefcb");return z()[a]=()=>{gapi.load?r():n(F(t,"network-request-failed"))},sc(`${oc()}?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw Pt=null,e})}let Pt=null;function il(t){return Pt=Pt||rl(t),Pt}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sl=new ft(5e3,15e3),ol="__/auth/iframe",al="emulator/auth/iframe",cl={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ll=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function dl(t){const e=t.config;f(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Er(e,al):`https://${t.config.authDomain}/${ol}`,r={apiKey:e.apiKey,appName:t.name,v:ht},i=ll.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${ut(r).slice(1)}`}async function ul(t){const e=await il(t),n=z().gapi;return f(n,t,"internal-error"),e.open({where:document.body,url:dl(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:cl,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=F(t,"network-request-failed"),a=z().setTimeout(()=>{s(o)},sl.get());function c(){z().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hl={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},fl=500,pl=600,ml="_blank",gl="http://localhost";class li{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function yl(t,e,n,r=fl,i=pl){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...hl,width:r.toString(),height:i.toString(),top:s,left:o},l=k().toLowerCase();n&&(a=as(l)?ml:n),ss(l)&&(e=e||gl,c.scrollbars="yes");const d=Object.entries(c).reduce((u,[y,b])=>`${u}${y}=${b},`,"");if(Ya(l)&&a!=="_self")return vl(e||"",a),new li(null);const h=window.open(e||"",a,d);f(h,t,"popup-blocked");try{h.focus()}catch{}return new li(h)}function vl(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Il="__/auth/handler",_l="emulator/auth/handler",wl=encodeURIComponent("fac");async function di(t,e,n,r,i,s){f(t.config.authDomain,t,"auth-domain-config-required"),f(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:ht,eventId:i};if(e instanceof kr){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",_o(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,h]of Object.entries({}))o[d]=h}if(e instanceof pt){const d=e.getScopes().filter(h=>h!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const c=await t._getAppCheckToken(),l=c?`#${wl}=${encodeURIComponent(c)}`:"";return`${El(t)}?${ut(a).slice(1)}${l}`}function El({config:t}){return t.emulator?Er(t,_l):`https://${t.authDomain}/${Il}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn="webStorageSupport";class bl{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=_s,this._completeRedirectFn=Gc,this._overrideRedirectResult=Wc}async _openPopup(e,n,r,i){var o;Z((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const s=await di(e,n,r,cr(),i);return yl(e,s,Ar())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await di(e,n,r,cr(),i);return Cc(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(Z(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await ul(e),r=new Jc(e);return n.register("authEvent",i=>(f(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Mn,{type:Mn},i=>{var o;const s=(o=i==null?void 0:i[0])==null?void 0:o[Mn];s!==void 0&&n(!!s),j(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=el(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return hs()||os()||Tr()}}const Sl=bl;var ui="@firebase/auth",hi="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tl{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){f(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function kl(t){Ve(new Te("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;f(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:fs(t)},l=new rc(r,i,s,c);return lc(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Ve(new Te("auth-internal",e=>{const n=_n(e.getProvider("auth").getImmediate());return(r=>new Tl(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),de(ui,hi,Cl(t)),de(ui,hi,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Al=300,Ll=Bi("authIdTokenMaxAge")||Al;let fi=null;const Pl=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Ll)return;const i=n==null?void 0:n.token;fi!==i&&(fi=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Pr(t=Ji()){const e=Ir(t,"auth");if(e.isInitialized())return e.getImmediate();const n=cc(t,{popupRedirectResolver:Sl,persistence:[Mc,bc,_s]}),r=Bi("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=Pl(s.toString());vc(n,o,()=>o(n.currentUser)),yc(n,a=>o(a))}}const i=qi("auth");return i&&dc(n,`http://${i}`),n}function Rl(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}ic({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=F("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",Rl().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});kl("Browser");/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const xn=document.querySelector("#dashboard-tool-view"),Un=document.querySelector("#video-creator-tool-view"),$n=document.querySelector("#auto-voiceover-tool-view"),Fn=document.querySelector("#video-editor-tool-view"),Pe=document.querySelector("#sidebar"),Re=document.querySelector("#sidebar-toggle"),$e=document.querySelectorAll(".nav-link");document.querySelector(".header-auth-status");const $t=document.querySelector("#auth-section"),qn=document.querySelector("#google-sign-in-button"),we=document.querySelector(".user-actions"),V=document.querySelector("#user-profile-trigger"),O=document.querySelector("#user-profile-dropdown"),pi=document.querySelector("#user-name"),mi=document.querySelector("#user-profile-picture"),Hn=document.querySelector("#sign-out-button"),rt=document.querySelector("#credit-balance-display"),Bn=document.querySelector("#buy-credits-button"),Ft=document.querySelector("#dashboard-user-info"),qt=document.querySelector("#dashboard-user-profile-picture"),Ht=document.querySelector("#dashboard-user-name"),Bt=document.querySelector("#dashboard-user-email"),gi=document.querySelector("#dashboard-credit-balance"),Vn=document.querySelector("#dashboard-buy-credits-button");document.querySelector("#generator-view");const Qe=document.querySelector("#idea-input"),P=document.querySelector("#generate-ideas-button"),ye=document.querySelector("#prompt-input"),it=document.querySelector("#file-input"),Vt=document.querySelector("#image-preview-container"),Wt=document.querySelector("#image-preview"),Wn=document.querySelector("#clear-image-button"),st=document.querySelector("#generate-button"),zn=document.querySelector(".controls"),w=document.querySelector("#status"),Ne=document.querySelector("#results-gallery"),yi=document.querySelector("#gallery-placeholder"),vi=document.querySelector("#quota-error"),G=document.querySelector("#voiceover-upload-tab"),K=document.querySelector("#voiceover-url-tab"),wt=document.querySelector("#voiceover-upload-content"),Et=document.querySelector("#voiceover-url-content"),ot=document.querySelector("#voiceover-file-input"),S=document.querySelector(".file-drop-zone"),zt=document.querySelector("#voiceover-file-name"),ne=document.querySelector("#voiceover-url-input"),ue=document.querySelector("#voiceover-preview-video"),jt=document.querySelector("#voiceover-preview-placeholder"),R=document.querySelector("#generate-voiceover-button"),Gt=document.querySelector("#voiceover-main-panel"),Kt=document.querySelector("#voiceover-action-panel"),Ee=document.querySelector("#voiceover-processing-panel"),D=document.querySelector("#voiceover-processing-video"),Ii=document.querySelector("#voiceover-status-message"),Jt=document.querySelector("#voiceover-results-panel"),Xt=document.querySelector("#voiceover-final-video"),_i=document.querySelector("#voiceover-download-button"),jn=document.querySelector("#voiceover-start-over-button"),Yt=document.querySelector("#voiceover-generated-script");document.querySelector("#editor-view");const pe=document.querySelector(".editor-body"),Oe=document.querySelector(".media-panel");document.querySelector(".preview-panel");const De=document.querySelector(".tools-panel"),W=document.querySelector("#media-bin"),Gn=document.querySelector("#upload-video-input"),Qt=document.querySelector("#editor-placeholder"),M=document.querySelector("#video-preview-wrapper"),g=document.querySelector("#video-preview"),be=document.querySelector("#play-pause-button"),Kn=document.querySelector("#play-icon"),Jn=document.querySelector("#pause-icon"),wi=document.querySelector("#current-time"),Ei=document.querySelector("#total-duration"),Xn=document.querySelector("#export-video-button"),Fe=document.querySelector("#select-tool-button"),qe=document.querySelector("#split-tool-button"),Se=document.querySelector("#add-text-button"),bt=document.querySelector("#timeline-container"),q=document.querySelector("#timeline-ruler"),He=document.querySelector("#timeline-track-headers"),p=document.querySelector("#timeline-scroll-container"),T=document.querySelector("#timeline-tracks"),ze=document.querySelector("#playhead"),oe=document.querySelector("#split-indicator");document.querySelector("#add-video-track-button");document.querySelector("#add-text-track-button");const St=document.querySelector("#properties-placeholder"),Tt=document.querySelector("#text-properties"),Zt=document.querySelector("#prop-text-content"),en=document.querySelector("#prop-font-family"),tn=document.querySelector("#prop-font-color"),nn=document.querySelector("#prop-font-size"),rn=document.querySelector("#prop-font-size-value"),Ct=document.querySelector("#video-properties"),sn=document.querySelector("#prop-video-volume"),on=document.querySelector("#prop-video-volume-value"),an=document.querySelector("#prop-video-scale"),cn=document.querySelector("#prop-video-scale-value"),ln=document.querySelector("#prop-video-pos-x"),dn=document.querySelector("#prop-video-pos-x-value"),un=document.querySelector("#prop-video-pos-y"),hn=document.querySelector("#prop-video-pos-y-value"),fn=document.querySelector("#prop-video-rotation"),pn=document.querySelector("#prop-video-rotation-value"),Yn=document.querySelector("#reset-transform-button"),ae=document.querySelector("#settings-modal"),Qn=document.querySelector("#sequence-settings-button"),Zn=document.querySelector("#settings-save-button"),er=document.querySelector("#settings-cancel-button"),mn=document.querySelector("#setting-duration"),U=document.querySelector("#error-modal"),bi=document.querySelector("#error-modal-body"),tr=document.querySelector("#error-modal-close"),E=document.querySelector("#credits-modal");document.querySelector("#credits-cancel-button");const Nl=document.querySelectorAll(".buy-button"),Ze=document.querySelector("#modal-credit-balance-display"),Ol=document.querySelector("#resizer-v1"),Dl=document.querySelector("#resizer-v2"),Ml=document.querySelector("#resizer-h");var xl="firebase",Ul="12.1.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */de(xl,Ul,"app");const $l={apiKey:"AIzaSyAcBjgAvyP3HbvRuWinDEtW8jBRsiCBKx4",authDomain:"video-app-194ba.firebaseapp.com",projectId:"video-app-194ba",storageBucket:"video-app-194ba.firebasestorage.app",messagingSenderId:"225357105229",appId:"1:225357105229:web:104d17569750ed4c23f404"},bn=Ki($l);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fl="type.googleapis.com/google.protobuf.Int64Value",ql="type.googleapis.com/google.protobuf.UInt64Value";function As(t,e){const n={};for(const r in t)t.hasOwnProperty(r)&&(n[r]=e(t[r]));return n}function gn(t){if(t==null)return null;if(t instanceof Number&&(t=t.valueOf()),typeof t=="number"&&isFinite(t)||t===!0||t===!1||Object.prototype.toString.call(t)==="[object String]")return t;if(t instanceof Date)return t.toISOString();if(Array.isArray(t))return t.map(e=>gn(e));if(typeof t=="function"||typeof t=="object")return As(t,e=>gn(e));throw new Error("Data cannot be encoded in JSON: "+t)}function je(t){if(t==null)return t;if(t["@type"])switch(t["@type"]){case Fl:case ql:{const e=Number(t.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+t);return e}default:throw new Error("Data cannot be decoded from JSON: "+t)}return Array.isArray(t)?t.map(e=>je(e)):typeof t=="function"||typeof t=="object"?As(t,e=>je(e)):t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rr="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Si={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class A extends ee{constructor(e,n,r){super(`${Rr}/${e}`,n||""),this.details=r,Object.setPrototypeOf(this,A.prototype)}}function Hl(t){if(t>=200&&t<300)return"ok";switch(t){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function yn(t,e){let n=Hl(t),r=n,i;try{const s=e&&e.error;if(s){const o=s.status;if(typeof o=="string"){if(!Si[o])return new A("internal","internal");n=Si[o],r=o}const a=s.message;typeof a=="string"&&(r=a),i=s.details,i!==void 0&&(i=je(i))}}catch{}return n==="ok"?null:new A(n,r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(e,n,r,i){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,x(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=n.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||n.get().then(s=>this.auth=s,()=>{}),this.messaging||r.get().then(s=>this.messaging=s,()=>{}),this.appCheck||i==null||i.get().then(s=>this.appCheck=s,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e==null?void 0:e.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const n=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return n.error?null:n.token}return null}async getContext(e){const n=await this.getAuthToken(),r=await this.getMessagingToken(),i=await this.getAppCheckToken(e);return{authToken:n,messagingToken:r,appCheckToken:i}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur="us-central1",Vl=/^data: (.*?)(?:\n|$)/;function Wl(t){let e=null;return{promise:new Promise((n,r)=>{e=setTimeout(()=>{r(new A("deadline-exceeded","deadline-exceeded"))},t)}),cancel:()=>{e&&clearTimeout(e)}}}class zl{constructor(e,n,r,i,s=ur,o=(...a)=>fetch(...a)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new Bl(e,n,r,i),this.cancelAllRequests=new Promise(a=>{this.deleteService=()=>Promise.resolve(a())});try{const a=new URL(s);this.customDomain=a.origin+(a.pathname==="/"?"":a.pathname),this.region=ur}catch{this.customDomain=null,this.region=s}}_delete(){return this.deleteService()}_url(e){const n=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${n}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${n}.cloudfunctions.net/${e}`}}function jl(t,e,n){const r=lt(e);t.emulatorOrigin=`http${r?"s":""}://${e}:${n}`,r&&(Vi(t.emulatorOrigin),Wi("Functions",!0))}function Gl(t,e,n){const r=i=>Jl(t,e,i,{});return r.stream=(i,s)=>Yl(t,e,i,s),r}async function Kl(t,e,n,r){n["Content-Type"]="application/json";let i;try{i=await r(t,{method:"POST",body:JSON.stringify(e),headers:n})}catch{return{status:0,json:null}}let s=null;try{s=await i.json()}catch{}return{status:i.status,json:s}}async function Ls(t,e){const n={},r=await t.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(n.Authorization="Bearer "+r.authToken),r.messagingToken&&(n["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(n["X-Firebase-AppCheck"]=r.appCheckToken),n}function Jl(t,e,n,r){const i=t._url(e);return Xl(t,i,n,r)}async function Xl(t,e,n,r){n=gn(n);const i={data:n},s=await Ls(t,r),o=r.timeout||7e4,a=Wl(o),c=await Promise.race([Kl(e,i,s,t.fetchImpl),a.promise,t.cancelAllRequests]);if(a.cancel(),!c)throw new A("cancelled","Firebase Functions instance was deleted.");const l=yn(c.status,c.json);if(l)throw l;if(!c.json)throw new A("internal","Response is not valid JSON object.");let d=c.json.data;if(typeof d>"u"&&(d=c.json.result),typeof d>"u")throw new A("internal","Response is missing data field.");return{data:je(d)}}function Yl(t,e,n,r){const i=t._url(e);return Ql(t,i,n,r||{})}async function Ql(t,e,n,r){var u;n=gn(n);const i={data:n},s=await Ls(t,r);s["Content-Type"]="application/json",s.Accept="text/event-stream";let o;try{o=await t.fetchImpl(e,{method:"POST",body:JSON.stringify(i),headers:s,signal:r==null?void 0:r.signal})}catch(y){if(y instanceof Error&&y.name==="AbortError"){const B=new A("cancelled","Request was cancelled.");return{data:Promise.reject(B),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(B)}}}}}}const b=yn(0,null);return{data:Promise.reject(b),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(b)}}}}}}let a,c;const l=new Promise((y,b)=>{a=y,c=b});(u=r==null?void 0:r.signal)==null||u.addEventListener("abort",()=>{const y=new A("cancelled","Request was cancelled.");c(y)});const d=o.body.getReader(),h=Zl(d,a,c,r==null?void 0:r.signal);return{stream:{[Symbol.asyncIterator](){const y=h.getReader();return{async next(){const{value:b,done:B}=await y.read();return{value:b,done:B}},async return(){return await y.cancel(),{done:!0,value:void 0}}}}},data:l}}function Zl(t,e,n,r){const i=(o,a)=>{const c=o.match(Vl);if(!c)return;const l=c[1];try{const d=JSON.parse(l);if("result"in d){e(je(d.result));return}if("message"in d){a.enqueue(je(d.message));return}if("error"in d){const h=yn(0,d);a.error(h),n(h);return}}catch(d){if(d instanceof A){a.error(d),n(d);return}}},s=new TextDecoder;return new ReadableStream({start(o){let a="";return c();async function c(){if(r!=null&&r.aborted){const l=new A("cancelled","Request was cancelled");return o.error(l),n(l),Promise.resolve()}try{const{value:l,done:d}=await t.read();if(d){a.trim()&&i(a.trim(),o),o.close();return}if(r!=null&&r.aborted){const u=new A("cancelled","Request was cancelled");o.error(u),n(u),await t.cancel();return}a+=s.decode(l,{stream:!0});const h=a.split(`
`);a=h.pop()||"";for(const u of h)u.trim()&&i(u.trim(),o);return c()}catch(l){const d=l instanceof A?l:yn(0,null);o.error(d),n(d)}}},cancel(){return t.cancel()}})}const Ti="@firebase/functions",Ci="0.13.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed="auth-internal",td="app-check-internal",nd="messaging-internal";function rd(t){const e=(n,{instanceIdentifier:r})=>{const i=n.getProvider("app").getImmediate(),s=n.getProvider(ed),o=n.getProvider(nd),a=n.getProvider(td);return new zl(i,s,o,a,r)};Ve(new Te(Rr,e,"PUBLIC").setMultipleInstances(!0)),de(Ti,Ci,t),de(Ti,Ci,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function id(t=Ji(),e=ur){const r=Ir(H(t),Rr).getImmediate({identifier:e}),i=so("functions");return i&&sd(r,...i),r}function sd(t,e,n){jl(H(t),e,n)}function gt(t,e,n){return Gl(H(t),e)}rd();const yt=id(bn),od=gt(yt,"startVideoGeneration"),ad=gt(yt,"checkVideoGenerationStatus"),cd=gt(yt,"generateText"),ld=gt(yt,"getCredits"),dd=gt(yt,"createStripeCheckoutSession");async function ud(t,e){var o;let n,r=0;const i=60,s=5e3;for(;r<i;){r++;const a=`Generation in progress... (Polling ${r}/${i})`;console.log(`[BFF] ${a}`),e(a);const{data:c}=await ad({operationName:t});if(n=c,n.done){if(console.log("[BFF] Polling complete. Operation finished.",n),n.error)throw new Error(`Video generation failed: ${n.error.message||"Unknown error"}`);const l=((o=n.response)==null?void 0:o.predictions)||[];if(l.length===0)throw new Error("API operation finished but returned no videos. The prompt may have been filtered for safety.");return console.log(`[BFF] Successfully received ${l.length} video(s).`),l}await new Promise(l=>setTimeout(l,s))}throw new Error(`Video generation timed out after ${i*s/1e3/60} minutes.`)}async function hd(t,e,n,r){try{console.log("[BFF] Sending generation request to server...");const{data:i}=await od({prompt:t,imageBase64:e,aspectRatio:n}),s=i.operationId;if(!s)throw new Error("Server did not return a valid operation ID.");return console.log(`[BFF] Video generation started. Polling with operation ID: ${s}`),await ud(s,r)}catch(i){throw console.error("[BFF] API Call failed.",i),i}}async function fd(t){try{const{data:e}=await cd({idea:t}),n=e.text;if(!n)throw new Error("The AI returned an empty response. Please try a different idea.");return n}catch(e){throw console.error("[BFF] Text Generation API Call failed.",e),e}}async function pd(){try{const{data:t}=await ld();return t.credits}catch(t){throw console.error("Error fetching credits via callable function:",t),new Error("Failed to fetch credits")}}async function md(t){try{const{data:e}=await dd({priceId:t}),n=e.sessionId;if(!n)throw new Error("Server did not return a session ID.");return n}catch(e){throw console.error("[BFF] Stripe checkout session creation failed.",e),e}}async function gd(t,e){console.log("[BFF] Simulating Auto Voiceover generation for URL:",t),await new Promise(i=>setTimeout(i,2e3)),e(1,"Analyzing Video..."),await new Promise(i=>setTimeout(i,3e3)),e(2,"Writing Script...");const n="In a world of digital creation, one tool stands to change everything. Witness the power of AI as it transforms simple clips into cinematic masterpieces. This isn't just editing; it's the future of storytelling, right at your fingertips.";return await new Promise(i=>setTimeout(i,3e3)),e(3,"Generating Audio..."),await new Promise(i=>setTimeout(i,4e3)),e(4,"Finalizing Video..."),{finalVideoUrl:t,script:n}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function yd(t){return new Promise((e,n)=>{const r=new FileReader;r.onload=()=>{const i=r.result;e(i.split(",")[1])},r.onerror=i=>n(i),r.readAsDataURL(t)})}function hr(t){const e=Math.floor(t/60),n=Math.floor(t%60);return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}`}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Sn(){if(!Tt||!Ct||!St)return;const t=C.find(n=>n.id===Ke),e=m.find(n=>n.id===fe);if(t)Tt.style.display="block",Ct.style.display="none",St.style.display="none",Zt&&(Zt.value=t.text),en&&(en.value=t.fontFamily),tn&&(tn.value=t.color),nn&&(nn.value=String(t.fontSize)),rn&&(rn.textContent=String(t.fontSize));else if(e){Tt.style.display="none",Ct.style.display="block",St.style.display="none";const n=e.properties;sn&&(sn.value=String(n.volume*100)),on&&(on.textContent=`${Math.round(n.volume*100)}%`),an&&(an.value=String(n.scale*100)),cn&&(cn.textContent=`${Math.round(n.scale*100)}%`),ln&&(ln.value=String(n.position.x)),dn&&(dn.textContent=`${n.position.x}%`),un&&(un.value=String(n.position.y)),hn&&(hn.textContent=`${n.position.y}%`),fn&&(fn.value=String(n.rotation)),pn&&(pn.textContent=`${n.rotation}°`)}else Tt.style.display="none",Ct.style.display="none",St.style.display="block"}function vd(){const t=C.find(n=>n.id===Ke),e=m.find(n=>n.id===fe);if(t){if(!Zt||!en||!tn||!nn)return;t.text=Zt.value,t.fontFamily=en.value,t.color=tn.value,t.fontSize=parseInt(nn.value,10),rn&&(rn.textContent=String(t.fontSize)),t.element.textContent=t.text,Dr(t),vt(t)}else if(e){if(!sn||!an||!ln||!un||!fn)return;e.properties.volume=parseInt(sn.value,10)/100,e.properties.scale=parseInt(an.value,10)/100,e.properties.position.x=parseInt(ln.value,10),e.properties.position.y=parseInt(un.value,10),e.properties.rotation=parseInt(fn.value,10),on&&(on.textContent=`${Math.round(e.properties.volume*100)}%`),cn&&(cn.textContent=`${Math.round(e.properties.scale*100)}%`),dn&&(dn.textContent=`${e.properties.position.x}%`),hn&&(hn.textContent=`${e.properties.position.y}%`),pn&&(pn.textContent=`${e.properties.rotation}°`),Nr()}}function Id(){const t=m.find(e=>e.id===fe);t&&(t.properties.scale=1,t.properties.position={x:0,y:0},t.properties.rotation=0,Sn(),Nr())}function _d(){document.querySelectorAll("#video-properties input, #video-properties select, #text-properties input, #text-properties select, #text-properties textarea").forEach(e=>{e.addEventListener("input",vd)}),Yn==null||Yn.addEventListener("click",Id)}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function he(){qs(null),Hs(null),document.querySelectorAll(".timeline-clip.is-selected").forEach(t=>t.classList.remove("is-selected")),document.querySelectorAll(".text-overlay.is-selected").forEach(t=>t.classList.remove("is-selected")),Sn()}function wd(t,e){he(),qs(t),e.classList.add("is-selected"),Sn()}function Ps(t,e){he(),Hs(t),e.classList.add("is-selected"),Sn()}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Rs(){M&&(M.style.aspectRatio=Ur.replace(":"," / "),C.forEach(vt))}function Nr(){if(!_||!g)return;const t=_.properties;g.volume=t.volume;const e=`${t.position.x}%`,n=`${t.position.y}%`;g.style.transform=`translate(${e}, ${n}) scale(${t.scale}) rotate(${t.rotation}deg)`}function et(t){!Kn||!Jn||(t?(Kn.style.display="none",Jn.style.display="block"):(Kn.style.display="block",Jn.style.display="none"))}function ve(t,e=0,n=!1){if(!g)return;const r=n||!g.paused;Li(!0),g.pause(),g.src=t.url,Fs(t),Nr(),g.addEventListener("loadeddata",()=>{g&&(g.currentTime=t.sourceStart+e,r&&g.play().catch(i=>{console.error("Playback failed:",i),et(!1)}),Li(!1),L())},{once:!0})}function vt(t){if(!M)return;const e=t.element;e.style.fontFamily=t.fontFamily,e.style.color=t.color;const n=M.offsetHeight,r=t.fontSize/500*n;e.style.fontSize=`${r}px`,e.style.left=t.position.left,e.style.top=t.position.top,e.style.transform="translate(-50%, -50%)"}function Ns(t,e){if(t.preventDefault(),document.body.classList.add("is-dragging-overlay"),!M)return;const n=M.getBoundingClientRect(),r=s=>{const o=s.clientX-n.left,a=s.clientY-n.top,c=Math.max(0,Math.min(o,n.width)),l=Math.max(0,Math.min(a,n.height)),d=c/n.width*100,h=l/n.height*100;e.position.left=`${d}%`,e.position.top=`${h}%`,vt(e)},i=()=>{document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",i),document.body.classList.remove("is-dragging-overlay")};document.addEventListener("mousemove",r),document.addEventListener("mouseup",i)}function Ed(){if(!g)return;let t;const e=Je.find(o=>o.type==="text");e?t=e.id:(t=xs,Hd("text"));const r=_?_.start+(g.currentTime-_.sourceStart):0,i=Math.min(r+4,v),s=zs({start:r,end:i,trackId:t});s&&(s.element.addEventListener("mousedown",o=>Ns(o,s)),M==null||M.appendChild(s.element),vt(s),Ps(s.id,s.clipElement),L())}function bd(){Se==null||Se.addEventListener("click",Ed)}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Tn="select";function nr(t){Tn=t,Fe==null||Fe.classList.toggle("active",t==="select"),qe==null||qe.classList.toggle("active",t==="split"),p==null||p.classList.toggle("split-mode",t==="split"),t!=="split"&&oe&&(oe.style.display="none")}function Sd(t){if(Tn!=="split"||!oe||!p)return;const e=p.getBoundingClientRect(),n=t.clientX-e.left,r=Math.max(0,Math.min(n,e.width));oe.style.left=`${r}px`}function Td(){nr("select"),Fe==null||Fe.addEventListener("click",()=>nr("select")),qe==null||qe.addEventListener("click",()=>nr("split")),p==null||p.addEventListener("mousemove",Sd),p==null||p.addEventListener("mouseenter",()=>{Tn==="split"&&oe&&(oe.style.display="block")}),p==null||p.addEventListener("mouseleave",()=>{oe&&(oe.style.display="none")})}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Or(){if(!q||!p||(q.innerHTML="",v<=0))return;const e=p.offsetWidth/v;let n=1;e<10?n=10:e<40&&(n=5);for(let r=0;r<=v;r+=n){const i=r/v*100;if(i>100)continue;const s=document.createElement("div");s.className="ruler-tick major",s.style.left=`${i}%`;const o=document.createElement("span");o.textContent=hr(r),s.appendChild(o),q.appendChild(s)}}function L(){if(xr||!g)return;let t=0;_&&(t=_.start+(g.currentTime-_.sourceStart)),wi&&(wi.textContent=hr(t)),Ei&&(Ei.textContent=hr(v));const e=v>0?t/v*100:0;if(ze&&(ze.style.left=`${e}%`),C.forEach(n=>{const r=t>=n.start&&t<n.end;n.element.style.display=r?"block":"none"}),document.querySelectorAll(".timeline-clip.video-clip.active").forEach(n=>n.classList.remove("active")),_&&T){const n=T.querySelector(`.video-clip[data-clip-id="${_.id}"]`);n&&n.classList.add("active")}}function Ye(){let t=0;m.forEach(n=>{n.start=t,n.end=t+n.duration,t+=n.duration});const e=t;v<e&&kn(Math.ceil(e)),Or()}function Cd(){g&&(g.pause(),g.src="",g.style.display="none",Qt&&(Qt.style.display="block"),be&&(be.disabled=!0),Se&&(Se.disabled=!0),ze&&(ze.style.display="none"),Fs(null),kn(0),C.forEach(t=>t.element.remove()),C.length=0,Vs("9:16"),Rs(),N(),L())}function kd(t){if(qd(t),fe===t&&he(),m.length===0){Cd();return}(_==null?void 0:_.id)===t&&ve(m[0]),Ye(),N(),L()}async function fr(t,e,n=5,r=0){return new Promise(i=>{const s=document.createElement("video");s.crossOrigin="anonymous";const o=document.createElement("canvas"),a=o.getContext("2d"),c=[];if(!a)return i([]);s.onloadedmetadata=()=>{o.width=s.videoWidth,o.height=s.videoHeight,s.currentTime=r+.01};let l=0;s.onseeked=()=>{if(a.drawImage(s,0,0,o.width,o.height),c.push(o.toDataURL("image/jpeg",.7)),l++,l>=n)s.src="",i(c);else{const d=r+e/(n>1?n-1:1)*l;s.currentTime=Math.min(d,r+e-.01)}},s.onerror=d=>{console.error("Error generating thumbnails.",d),i([])},s.src=t})}function Os(t,e){t.innerHTML="",t.style.padding="0";const n=document.createElement("div");n.className="thumbnail-strip",e.forEach(i=>{const s=document.createElement("div");s.className="thumbnail-frame",s.style.backgroundImage=`url(${i})`,n.appendChild(s)}),t.appendChild(n);const r=document.createElement("button");r.className="remove-clip-btn",r.innerHTML='<i class="fa-solid fa-xmark"></i>',r.onclick=i=>{i.stopPropagation(),kd(parseInt(t.dataset.clipId,10))},t.appendChild(r)}function Dr(t){if(v===0)return;const e=t.start/v*100,n=(t.end-t.start)/v*100;t.clipElement.style.left=`${e}%`,t.clipElement.style.width=`${n}%`;const r=Array.from(t.clipElement.childNodes).find(i=>i.nodeType===Node.TEXT_NODE);r?r.textContent=t.text:t.clipElement.prepend(document.createTextNode(t.text))}function N(){if(!(!T||!He)){if(T.innerHTML="",He.innerHTML="",Je.length===0){T.innerHTML='<div class="timeline-track"><div class="timeline-placeholder">Add a track to get started</div></div>';return}Je.forEach(t=>{const e=document.createElement("div");e.className="track-header";const n=t.type==="video"?"fa-video":"fa-font";e.innerHTML=`<span>${t.type.charAt(0).toUpperCase()}${t.type.slice(1,2)}</span> <i class="fa-solid ${n}"></i>`;const r=document.createElement("button");r.className="delete-track-btn",r.innerHTML="&times;",r.title=`Delete ${t.type} track`,r.dataset.trackId=String(t.id),e.appendChild(r),He.appendChild(e);const i=document.createElement("div");if(i.className="timeline-track",i.dataset.trackId=String(t.id),i.dataset.trackType=t.type,t.type==="video"){const s=m.filter(o=>o.trackId===t.id);s.length===0&&(i.innerHTML='<div class="timeline-placeholder">Drag clips from the Media Bin here</div>'),s.forEach(o=>{const a=document.createElement("div");a.className="timeline-clip video-clip",o.id===fe&&a.classList.add("is-selected"),a.draggable=!0,a.dataset.clipId=String(o.id);const c=o.start/v*100,l=o.duration/v*100;a.style.left=`${c}%`,a.style.width=`${l}%`,o.thumbnails&&o.thumbnails.length>0?Os(a,o.thumbnails):a.textContent=`Loading Clip #${o.id+1}...`;const d=document.createElement("div");d.className="resize-handle left",d.addEventListener("mousedown",u=>Ai(u,o)),a.appendChild(d);const h=document.createElement("div");h.className="resize-handle right",h.addEventListener("mousedown",u=>Ai(u,o)),a.appendChild(h),a.addEventListener("click",()=>wd(o.id,a)),a.addEventListener("dragstart",u=>Pd(u,o)),a.addEventListener("dragend",Rd),i.appendChild(a)})}else C.filter(o=>o.trackId===t.id).forEach(o=>{Dr(o),o.id===Ke&&o.clipElement.classList.add("is-selected"),o.clipElement.addEventListener("mousedown",Ld),o.clipElement.addEventListener("click",()=>Ps(o.id,o.clipElement)),i.appendChild(o.clipElement)});T.appendChild(i)})}}async function Ad(t,e,n){const r=document.createElement("video");r.src=t.url,r.addEventListener("loadedmetadata",async()=>{const i=r.duration,s={...t,trackId:e,duration:i,sourceDuration:i,sourceStart:0,start:0,end:0,thumbnails:[],properties:{volume:1,scale:1,position:{x:0,y:0},rotation:0}};m.length===0&&(Vs("9:16"),kn(Math.ceil(i)),Rs()),Ws(s,n),Ye(),m.length===1&&(ve(m[0]),Qt&&(Qt.style.display="none"),g&&(g.style.display="block"),be&&(be.disabled=!1),Se&&(Se.disabled=!1),ze&&(ze.style.display="block")),N(),L();const o=await fr(s.url,i,5,0);s.thumbnails=o;const a=T==null?void 0:T.querySelector(`.video-clip[data-clip-id="${s.id}"]`);a&&Os(a,o)},{once:!0})}function ki(t){if(Tn==="split"){Dd(t);return}if(t.target.closest(".timeline-clip")||(he(),v===0||!q||!g))return;const n=q.getBoundingClientRect(),r=t.clientX-n.left,s=Math.max(0,Math.min(1,r/n.width))*v,o=m.find(a=>s>=a.start&&s<a.end);if(o){const a=s-o.start;(_==null?void 0:_.id)!==o.id?ve(o,a,!g.paused):(g.currentTime=o.sourceStart+a,L())}}function Ai(t,e){if(t.preventDefault(),t.stopPropagation(),!T)return;const r=t.target.classList.contains("left")?"left":"right";document.body.classList.add("is-resizing");const i=t.clientX,s={start:e.start,duration:e.duration,sourceStart:e.sourceStart},o=l=>l/T.offsetWidth*v,a=l=>{const d=o(l.clientX-i);if(r==="right"){const h=s.duration+d;e.duration=Math.max(.1,Math.min(h,e.sourceDuration-e.sourceStart))}else{let h=d;s.duration-h<.1&&(h=s.duration-.1),s.start+h<0&&(h=-s.start),s.sourceStart+h<0&&(h=-s.sourceStart),e.start=s.start+h,e.sourceStart=s.sourceStart+h,e.duration=s.duration-h}Ye(),N(),L()},c=()=>{document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",c),document.body.classList.remove("is-resizing")};document.addEventListener("mousemove",a),document.addEventListener("mouseup",c)}function Ld(t){const e=t.currentTarget,n=t.target;if(!n.classList.contains("resize-handle"))return;t.preventDefault(),t.stopPropagation();const r=parseInt(e.dataset.overlayId,10),i=C.find(h=>h.id===r);if(!i||!T)return;document.body.classList.add("is-resizing");const s=n.classList.contains("left")?"left":"right",o=t.clientX,a={start:i.start,end:i.end},c=h=>h/T.offsetWidth*v,l=h=>{const u=c(h.clientX-o);if(s==="right"){const y=a.end+u;i.end=Math.max(i.start+.1,Math.min(y,v))}else{const y=a.start+u;i.start=Math.max(0,Math.min(y,i.end-.1))}Dr(i)},d=()=>{document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",d),document.body.classList.remove("is-resizing"),L()};document.addEventListener("mousemove",l),document.addEventListener("mouseup",d)}function Pd(t,e){t.stopPropagation(),t.dataTransfer&&(t.dataTransfer.setData("text/plain",String(e.id)),t.dataTransfer.setData("source","timeline")),Bs(e.id),setTimeout(()=>t.target.classList.add("is-ghost"),0)}function Rd(t){t.target.classList.remove("is-ghost"),Bs(null)}function Mr(){let t=document.getElementById("insertion-marker");return t||(t=document.createElement("div"),t.id="insertion-marker",t.className="insertion-marker",p==null||p.appendChild(t)),t}function Nd(t){var l;if(t.preventDefault(),!p||!T)return;const e=Mr(),r=t.target.closest(".timeline-track");if(document.querySelectorAll(".timeline-track.drop-disallowed").forEach(d=>d.classList.remove("drop-disallowed")),!r){e.style.display="none",Ie(-1);return}if(((l=t.dataTransfer)==null?void 0:l.getData("source"))!=="text"&&r.dataset.trackType==="text"){e.style.display="none",r.classList.add("drop-disallowed"),Ie(-1);return}if(p.classList.add("drop-target-active"),e.style.display="block",e.style.top=`${r.offsetTop}px`,v===0){Ie(0),e.style.left="0px";return}const s=T.offsetWidth,o=t.clientX-T.getBoundingClientRect().left;let a=m.length;for(let d=0;d<m.length;d++){const h=m[d];if(h.id===Ms)continue;const u=(h.start+h.duration/2)/v*s;if(o<u){a=d;break}}Ie(a);let c=0;a<m.length?c=m[a].start/v*s:m.length>0&&(c=m[m.length-1].end/v*s),e.style.left=`${c}px`}function Od(t){var o,a;t.preventDefault(),p==null||p.classList.remove("drop-target-active"),document.querySelectorAll(".timeline-track.drop-disallowed").forEach(c=>c.classList.remove("drop-disallowed")),Mr().style.display="none";const e=(o=t.dataTransfer)==null?void 0:o.getData("source"),n=parseInt((a=t.dataTransfer)==null?void 0:a.getData("text/plain"),10),r=t.target.closest(".timeline-track");if(isNaN(n)||!r)return Ie(-1);const i=parseInt(r.dataset.trackId,10);let s=pr>-1?pr:m.length;if(e==="timeline"){const c=m.find(d=>d.id===n);if(!c)return;c.trackId=i;const l=m.findIndex(d=>d.id===n);m.splice(l,1),l<s&&s--,m.splice(s,0,c),Ye(),N(),L()}else{const c=Ge.find(l=>l.id===n);c&&Ad(c,i,s)}Ie(-1)}function Dd(t){if(v===0||!q)return;const e=t.target.closest(".timeline-clip");if(!e)return;const r=(t.clientX-q.getBoundingClientRect().left)/q.offsetWidth*v;if(e.classList.contains("video-clip")){const i=parseInt(e.dataset.clipId,10);Md(i,r)}else if(e.classList.contains("text-clip")){const i=parseInt(e.dataset.overlayId,10);xd(i,r)}}async function Md(t,e){const n=m.findIndex(c=>c.id===t);if(n===-1)return;const r=m[n];if(e<=r.start+.1||e>=r.end-.1)return;he();const i=e-r.start,s={...r,id:Cn,start:e,end:r.end,duration:r.end-e,sourceStart:r.sourceStart+i,thumbnails:[]};$r(),r.end=e,r.duration=i,r.thumbnails=[],Ws(s,n+1),N(),L();const[o,a]=await Promise.all([fr(r.url,r.duration,5,r.sourceStart),fr(s.url,s.duration,5,s.sourceStart)]);r.thumbnails=o,s.thumbnails=a,N()}function xd(t,e){const n=C.findIndex(o=>o.id===t);if(n===-1)return;const r=C[n];if(e<=r.start+.1||e>=r.end-.1)return;he();const i=r.end;r.end=e;const s=zs({start:e,end:i,trackId:r.trackId});s&&(s.text=r.text,s.fontFamily=r.fontFamily,s.color=r.color,s.fontSize=r.fontSize,s.position={...r.position},s.element.addEventListener("mousedown",o=>Ns(o,s)),M==null||M.appendChild(s.element)),N(),L()}function Ud(){p==null||p.addEventListener("mousedown",ki),q==null||q.addEventListener("mousedown",ki),p==null||p.addEventListener("dragover",Nd),p==null||p.addEventListener("drop",Od),p==null||p.addEventListener("dragleave",t=>{t.relatedTarget&&(p!=null&&p.contains(t.relatedTarget))||(p==null||p.classList.remove("drop-target-active"),document.querySelectorAll(".timeline-track.drop-disallowed").forEach(e=>e.classList.remove("drop-disallowed")),Mr().style.display="none",Ie(-1))})}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ds="",C=[],$d=0,v=0,Ge=[],Cn=0,m=[],_=null,xr=!1,pr=-1,fe=null,Ke=null,Ms=null,Ur="9:16",Je=[{id:0,type:"video"}],xs=1;const Us=t=>Ds=t,Fd=t=>t,kn=t=>v=t,$s=t=>Ge.push(t),$r=()=>Cn++,Fs=t=>_=t,Li=t=>xr=t,Ie=t=>pr=t,qs=t=>fe=t,Hs=t=>Ke=t,Bs=t=>Ms=t,Vs=t=>Ur=t;function Ws(t,e){m.splice(e,0,t)}function qd(t){m=m.filter(e=>e.id!==t)}function Hd(t){Je.push({id:xs++,type:t}),N()}function Bd(t){Je=Je.filter(n=>n.id!==t),m=m.filter(n=>n.trackId!==t),C.filter(n=>n.trackId===t).forEach(n=>n.element.remove()),C=C.filter(n=>n.trackId!==t),fe&&m.every(n=>n.id!==fe)&&he(),Ke&&C.every(n=>n.id!==Ke)&&he(),N()}function zs(t){const e=$d++,n={id:e,trackId:t.trackId,text:"New Caption",start:t.start,end:t.end,element:document.createElement("div"),clipElement:document.createElement("div"),fontFamily:"Google Sans",color:"#ffffff",fontSize:40,position:{top:"50%",left:"50%"}};n.element.className="text-overlay",n.element.textContent=n.text,n.clipElement.className="timeline-clip text-clip",n.clipElement.textContent=n.text,n.clipElement.dataset.overlayId=String(e);const r=document.createElement("div");r.className="resize-handle left",n.clipElement.appendChild(r);const i=document.createElement("div");return i.className="resize-handle right",n.clipElement.appendChild(i),C.push(n),N(),n}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function js(){if(W){if(W.innerHTML="",Ge.length===0){W.innerHTML=`
            <div class="placeholder">
              Add clips from the Generator to see them here.
            </div>`;return}Ge.forEach(t=>{const e=document.createElement("div");e.className="media-clip",e.draggable=!0,e.dataset.clipId=String(t.id);const n=document.createElement("video");n.src=t.url,n.muted=!0,n.loop=!0,n.oncanplay=()=>n.play();const r=document.createElement("div");r.className="media-clip-title",r.textContent=`Clip #${t.id+1}`,e.appendChild(n),e.appendChild(r),W.appendChild(e)})}}async function Vd(t){const e=t.target,n=e.files;if(!(!n||n.length===0)){for(const r of n){if(!r.type.startsWith("video/")){console.warn(`Skipping non-video file: ${r.name}`);continue}const i=URL.createObjectURL(r),s={id:Cn,url:i,blob:r};$r(),$s(s)}js(),e.value=""}}function Wd(t){const e=t.target;e.classList.contains("media-clip")&&t.dataTransfer&&(t.dataTransfer.setData("text/plain",e.dataset.clipId),t.dataTransfer.setData("source","media-bin"),e.classList.add("is-dragging"))}function zd(t){const e=t.target;e.classList.contains("media-clip")&&e.classList.remove("is-dragging")}function jd(){Gn==null||Gn.addEventListener("change",Vd),W==null||W.addEventListener("dragstart",Wd),W==null||W.addEventListener("dragend",zd)}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Pi(t){st&&(st.disabled=t),zn==null||zn.querySelectorAll("input, textarea, select, button").forEach(e=>e.disabled=t),t&&w&&(w.innerHTML=`
      <div>
        <div class="loader"></div>
        <p>Generating video, please wait...</p>
        <p style="font-size: 0.9em; color: var(--text-muted-color)">(This may take a minute or two)</p>
      </div>`,w.style.display="flex")}function Gd(t){w&&(w.innerHTML=`<p class="error">${t}</p>`,w.style.display="flex");let e="An Unknown Error Occurred",n=`<p>An unexpected error occurred:</p><p><code>${t}</code></p>`;bi&&(bi.innerHTML=n);const r=U==null?void 0:U.querySelector(".modal-title");r&&(r.textContent=e),U&&(U.style.display="flex")}function mr(t){gi&&(gi.innerHTML=`<i class="fa-solid fa-coins"></i> ${t}`)}function Gs(t){!xn||!Un||!$n||!Fn||(xn.style.display="none",Un.style.display="none",$n.style.display="none",Fn.style.display="none",t==="dashboard"?xn.style.display="block":t==="video-creator"?Un.style.display="block":t==="auto-voiceover"?$n.style.display="block":t==="video-editor"&&(Fn.style.display="flex",js(),N()),$e==null||$e.forEach(e=>{e.classList.toggle("active",e.getAttribute("data-tool")===t)}))}function Kd(){ae&&mn&&(mn.value=String(v>0?v:15),ae.style.display="flex")}function vn(){ae&&(ae.style.display="none")}function Ks(){E&&((we==null?void 0:we.style.display)==="flex"&&rt&&Ze?(Ze.innerHTML=rt.innerHTML,Ze.style.display="flex"):Ze&&(Ze.style.display="none"),E.style.display="flex",queueMicrotask(()=>{E==null||E.classList.add("show")}))}function Ri(){if(E){E.classList.remove("show");const t=e=>{e.target===E&&!(E!=null&&E.classList.contains("show"))&&(E.style.display="none",E.removeEventListener("transitionend",t))};E.addEventListener("transitionend",t)}}function Jd(){if(mn){const t=parseInt(mn.value,10);if(!isNaN(t)&&t>0&&t<=60){const e=m.reduce((n,r)=>n+r.duration,0);kn(Math.max(t,Math.ceil(e))),Ye(),N(),Or(),L()}else alert("Please enter a valid duration between 1 and 60 seconds.")}vn()}function gr(){U&&(U.style.display="none")}function Xd(){Re==null||Re.addEventListener("click",()=>{Pe==null||Pe.classList.toggle("collapsed");const t=Pe==null?void 0:Pe.classList.contains("collapsed"),e=Re==null?void 0:Re.querySelector("i");e&&(e.className=t?"fa-solid fa-chevron-right":"fa-solid fa-chevron-left")}),$e==null||$e.forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.tool;e&&Gs(e)})}),V==null||V.addEventListener("click",t=>{t.stopPropagation();const e=!(O!=null&&O.classList.contains("show"));O==null||O.classList.toggle("show"),V.setAttribute("aria-expanded",String(e))}),Bn==null||Bn.addEventListener("click",Ks),window.addEventListener("click",t=>{const e=t.target;e.hasAttribute("data-close-modal")&&E!=null&&E.classList.contains("show")&&Ri(),e===ae&&vn(),e===U&&gr(),!(V!=null&&V.contains(e))&&!(O!=null&&O.contains(e))&&(O==null||O.classList.remove("show"),V==null||V.setAttribute("aria-expanded","false"))}),window.addEventListener("keydown",t=>{t.key==="Escape"&&((ae==null?void 0:ae.style.display)!=="none"&&vn(),E!=null&&E.classList.contains("show")&&Ri(),(U==null?void 0:U.style.display)!=="none"&&gr())})}function Yd(){const i=(s,o)=>{s==null||s.addEventListener("mousedown",a=>{a.preventDefault();const c=a.clientX,l=a.clientY,d=u=>{o(u.clientX-c,u.clientY-l)},h=()=>{window.removeEventListener("mousemove",d),window.removeEventListener("mouseup",h),document.body.className=document.body.className.replace(/is-resizing(-\w)?/g,"")};window.addEventListener("mousemove",d),window.addEventListener("mouseup",h)})};i(Ol,s=>{if(document.body.classList.add("is-resizing-v"),!Oe||!pe||!De)return;const o=(Oe.offsetWidth||0)+s;o>=150&&pe.offsetWidth-o-De.offsetWidth>=300&&(Oe.style.width=`${o}px`,Oe.style.flexBasis="auto")}),i(Dl,s=>{if(document.body.classList.add("is-resizing-v"),!De||!pe||!Oe)return;const o=(De.offsetWidth||0)-s;o>=150&&pe.offsetWidth-o-Oe.offsetWidth>=300&&(De.style.width=`${o}px`,De.style.flexBasis="auto")}),i(Ml,(s,o)=>{document.body.classList.add("is-resizing-h");const a=pe==null?void 0:pe.parentElement;if(!a||!bt)return;const c=(bt.offsetHeight||0)-o;c>80&&c<a.offsetHeight-200&&(bt.style.height=`${c}px`,bt.style.flexBasis="auto",C.forEach(vt),Or())})}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Fr=Pr(bn),Qd=new J;async function Zd(t){if(!(!$t||!we||!pi||!mi||!rt)){$t.style.display="none",we.style.display="flex",pi.textContent=t.displayName,mi.src=t.photoURL,Ft&&qt&&Ht&&Bt&&(Ft.style.display="flex",qt.src=t.photoURL,Ht.textContent=t.displayName,Bt.textContent=t.email);try{const e=await pd();console.log("Credits received:",e),rt.innerHTML=`<i class="fa-solid fa-coins"></i> ${e}`,mr(e)}catch(e){console.error("Error fetching credits:",e),rt.innerHTML='<i class="fa-solid fa-coins"></i> --',mr(0)}}}function eu(){!$t||!we||($t.style.display="flex",we.style.display="none",Ft&&qt&&Ht&&Bt&&(Ft.style.display="none",qt.src="",Ht.textContent="",Bt.textContent=""),mr(0))}async function tu(){try{await qc(Fr,Qd)}catch(t){console.error("Sign in error:",t)}}async function nu(){try{await _c(Fr)}catch(t){console.error("Sign out error:",t)}}function ru(){Ic(Fr,t=>{t?Zd(t):eu()}),qn==null||qn.addEventListener("click",tu),Hn==null||Hn.addEventListener("click",nu)}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ni="pk_test_51PLa3cBiRVB8RnGO6pQ9aZ2Y7fGb1fDoSBhyI2T7dG8gY52JqM20Jg7fE6i7w0K4mH3g0i5p1j0w0k1L2g1h0j1l00j1l1k2l3";let In;async function iu(){if(!Pr(bn).currentUser){alert("Please sign in to make a purchase.");return}const n=this.dataset.priceId;if(!n){console.error("No price ID found on button");return}const r=this.innerHTML;this.innerHTML='<div class="loader" style="width: 18px; height: 18px; margin: auto;"></div>',this.disabled=!0;try{const i=await md(n);if(In){const{error:s}=await In.redirectToCheckout({sessionId:i});if(s)throw new Error(s.message)}else throw new Error("Stripe.js has not loaded yet.")}catch(i){console.error("Stripe checkout error:",i),alert(`Could not initiate checkout. ${i instanceof Error?i.message:"Please try again."}`),this.innerHTML=r,this.disabled=!1}}function su(){window.Stripe?In=window.Stripe(Ni):document.addEventListener("DOMContentLoaded",()=>{window.Stripe?In=window.Stripe(Ni):console.error("Stripe.js failed to load.")}),Nl.forEach(t=>{t.addEventListener("click",iu)})}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Oi(t){const e=document.createElement("div");e.className="video-container";const n=document.createElement("video");n.src=t.url,n.autoplay=!0,n.loop=!0,n.controls=!1,n.muted=!0;const r=document.createElement("div");r.className="video-actions";const i=document.createElement("button");i.innerText="Download",i.className="video-action-button",i.onclick=()=>{const o=document.createElement("a");o.href=t.url,o.download=`video-${Date.now()}.mp4`,document.body.appendChild(o),o.click(),document.body.removeChild(o)};const s=document.createElement("button");return s.innerText="Add to Editor",s.className="video-action-button add-to-editor-btn",s.dataset.clipId=String(t.id),Ge.some(o=>o.id===t.id)&&(s.innerText="Added ✓",s.disabled=!0),s.onclick=()=>{Ge.some(o=>o.id===t.id)||$s(t),document.querySelectorAll(`.add-to-editor-btn[data-clip-id='${t.id}']`).forEach(o=>{o.innerText="Added ✓",o.disabled=!0})},r.appendChild(i),r.appendChild(s),e.appendChild(n),e.appendChild(r),e}async function ou(t){if(yi&&(yi.style.display="none"),w&&(w.innerHTML="",w.style.display="block"),t.length===0){w&&(w.innerHTML="<p>No videos were generated. Please try a different prompt.</p>");return}for(const e of t)try{const n=e.bytesBase64Encoded;if(!n)throw new Error("Video is missing base64 data.");const r=`data:video/mp4;base64,${n}`,i=await fetch(r);if(!i.ok)throw new Error(`Failed to fetch video: ${i.statusText}`);const s=await i.blob(),o=URL.createObjectURL(s),a={id:Cn,url:o,blob:s};$r();const c=Oi(a);w==null||w.appendChild(c);const l=Oi(a);Ne==null||Ne.prepend(l)}catch(n){console.error("Error processing video:",n);const r=n instanceof Error?n.message:"Unknown error",i=document.createElement("p");i.textContent=`Could not load video. (${r})`,i.className="error",Ne==null||Ne.prepend(i.cloneNode(!0)),w==null||w.appendChild(i.cloneNode(!0))}}async function au(){if(!Qe)return;const t=Qe.value.trim();if(!t){alert("Please describe your idea in the first text box to generate a detailed prompt."),Qe.focus();return}P&&(P.disabled=!0),Qe.disabled=!0;const e=P==null?void 0:P.innerHTML;P&&(P.innerHTML='<div class="loader"></div> Generating...');try{if(!Pr(bn).currentUser){alert("You must be signed in to generate ideas.");return}const i=await fd(t);ye&&(ye.value=i,ye.focus())}catch(n){console.error("Failed to generate prompt ideas:",n);const r=n instanceof Error?n.message:"Unknown error";alert(`Could not generate a new idea. ${r}`)}finally{P&&(P.disabled=!1,e&&(P.innerHTML=e)),Qe.disabled=!1}}async function cu(){if(!(ye!=null&&ye.value.trim())){alert("Please enter a prompt.");return}Pi(!0),vi&&(vi.style.display="none");try{const t=await hd(ye.value,Ds,Ur,e=>{const n=w==null?void 0:w.querySelector("p");n&&(n.textContent=e)});await ou(t)}catch(t){console.error(t);const e=t instanceof Error?t.message:String(t);Gd(e)}finally{Pi(!1)}}async function lu(t){var n;const e=(n=t.target.files)==null?void 0:n[0];if(e)try{const r=await yd(e);Us(r),Fd(e.type),Wt&&(Wt.src=URL.createObjectURL(e)),Vt&&(Vt.style.display="block")}catch(r){console.error("Error reading file:",r),alert("Could not read the selected file.")}}function du(){it&&(it.value=""),Us(""),Wt&&(Wt.src=""),Vt&&(Vt.style.display="none")}function uu(){st==null||st.addEventListener("click",cu),P==null||P.addEventListener("click",au),it==null||it.addEventListener("change",lu),Wn==null||Wn.addEventListener("click",du)}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ke=null;function Js(){!Gt||!Kt||!Ee||!Jt||!ue||!jt||!ot||!ne||!zt||!R||!Xt||!D||!Yt||(ke=null,Gt.style.display="flex",Kt.style.display="flex",Ee.style.display="none",Jt.style.display="none",ue.src="",ue.style.display="none",jt.style.display="block",ot.value="",ne.value="",zt.textContent="",R.disabled=!0,Xt.src="",D.pause(),D.removeAttribute("src"),Yt.textContent="")}function Di(t,e){if(!Ee||!Ii)return;Ii.textContent=e,Ee.querySelectorAll(".progress-step").forEach(r=>{const i=parseInt(r.dataset.step||"0",10);r.classList.remove("active","completed"),i<t?r.classList.add("completed"):i===t&&r.classList.add("active")})}function Mi(t){if(!(!t||!ue||!jt||!R||!zt)){if(!t.type.startsWith("video/")){alert("Please select a valid video file.");return}if(t.size>20*1024*1024){alert("File is too large. Please select a video under 20MB.");return}ke=URL.createObjectURL(t),ue.src=ke,ue.style.display="block",jt.style.display="none",R.disabled=!1,zt.textContent=t.name}}async function hu(){if(!ke){alert("Please provide a video source first.");return}if(!Gt||!Kt||!Ee||!Jt||!R||!D||!ue||!Yt)return;Gt.style.display="none",Kt.style.display="none",Ee.style.display="block",R.disabled=!0,D.src=ue.src;const t=D.parentElement;if(t){const e=()=>{if(!D)return;const n=D,r=n.videoWidth/n.videoHeight;isFinite(r)&&(t.style.aspectRatio=`${r}`),n.removeEventListener("loadedmetadata",e)};D.addEventListener("loadedmetadata",e)}D.play().catch(console.error);try{Di(0,"Initializing...");const e=await gd(ke,Di);Xt&&(Xt.src=e.finalVideoUrl),_i&&(_i.href=e.finalVideoUrl),Yt.textContent=e.script,Ee.style.display="none",Jt.style.display="block"}catch(e){console.error("Voiceover generation failed:",e),alert(`An error occurred: ${e instanceof Error?e.message:"Unknown error"}`),Js()}finally{D&&D.pause()}}function fu(){G==null||G.addEventListener("click",()=>{G==null||G.classList.add("active"),K==null||K.classList.remove("active"),wt&&(wt.style.display="block"),Et&&(Et.style.display="none")}),K==null||K.addEventListener("click",()=>{K==null||K.classList.add("active"),G==null||G.classList.remove("active"),Et&&(Et.style.display="block"),wt&&(wt.style.display="none")}),ot==null||ot.addEventListener("change",t=>{var n;const e=(n=t.target.files)==null?void 0:n[0];e&&Mi(e)}),S==null||S.addEventListener("dragover",t=>{t.preventDefault(),S==null||S.classList.add("hover")}),S==null||S.addEventListener("dragleave",()=>{S==null||S.classList.remove("hover")}),S==null||S.addEventListener("drop",t=>{var n,r;t.preventDefault(),S==null||S.classList.remove("hover");const e=(r=(n=t.dataTransfer)==null?void 0:n.files)==null?void 0:r[0];e&&Mi(e)}),ne==null||ne.addEventListener("input",()=>{const t=(ne==null?void 0:ne.value.trim())||"";t.startsWith("http")?(ke=t,R&&(R.disabled=!1)):(ke=null,R&&(R.disabled=!0))}),R==null||R.addEventListener("click",hu),jn==null||jn.addEventListener("click",Js)}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function pu(){const t=document.querySelectorAll(".mobile-editor-nav .mobile-nav-btn"),e=document.querySelectorAll(".editor-body .editor-panel");t.forEach(n=>{n.addEventListener("click",()=>{const r=n.dataset.panel;t.forEach(i=>i.classList.remove("active")),n.classList.add("active"),e.forEach(i=>{i.dataset.panelName===r?i.classList.add("mobile-active"):i.classList.remove("mobile-active")})})})}function mu(){document.querySelectorAll(".tool-card").forEach(e=>{e.addEventListener("click",()=>{const n=e.dataset.toolTarget;n&&Gs(n)})}),Vn==null||Vn.addEventListener("click",Ks)}window.addEventListener("DOMContentLoaded",()=>{document.title="AI YouTube Video Creator",mu(),Xd(),ru(),su(),uu(),fu(),jd(),bd(),_d(),Ud(),Td(),Yd(),pu(),be==null||be.addEventListener("click",()=>{if(g)if(g.paused){const t=_?_.start+(g.currentTime-_.sourceStart):0;if(v>0&&Math.abs(t-v)<.1){m.length>0&&ve(m[0],0,!0);return}!_&&m.length>0?ve(m[0],0,!0):_&&g.play().catch(console.error)}else g.pause()}),g==null||g.addEventListener("timeupdate",L),g==null||g.addEventListener("play",()=>et(!0)),g==null||g.addEventListener("pause",()=>et(!1)),g==null||g.addEventListener("ended",()=>{if(xr||!_){et(!1);return}const e=m.findIndex(n=>n.id===_.id)+1;e<m.length?ve(m[e],0,!0):(et(!1),m.length>0&&ve(m[0],0,!1))}),He==null||He.addEventListener("click",t=>{const e=t.target;if(e.classList.contains("delete-track-btn")){const n=parseInt(e.dataset.trackId,10);Bd(n),Ye(),L()}}),Qn==null||Qn.addEventListener("click",Kd),Zn==null||Zn.addEventListener("click",Jd),er==null||er.addEventListener("click",vn),tr==null||tr.addEventListener("click",gr),Xn==null||Xn.addEventListener("click",()=>{alert("Export functionality is not yet implemented!")}),document.body.classList.add("generator-active")});
