(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const fs=()=>{};var dr={};/**
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
 */const Qr=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},ps=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],a=t[n++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},ei={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,a=o?t[i+1]:0,c=i+2<t.length,l=c?t[i+2]:0,d=s>>2,h=(s&3)<<4|a>>4;let u=(a&15)<<2|l>>6,y=l&63;c||(y=64,o||(u=64)),r.push(n[d],n[h],n[u],n[y])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Qr(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):ps(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const l=i<t.length?n[t.charAt(i)]:64;++i;const h=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||a==null||l==null||h==null)throw new ms;const u=s<<2|a>>4;if(r.push(u),l!==64){const y=a<<4&240|l>>2;if(r.push(y),h!==64){const w=l<<6&192|h;r.push(w)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class ms extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const gs=function(t){const e=Qr(t);return ei.encodeByteArray(e,!0)},ti=function(t){return gs(t).replace(/\./g,"")},ni=function(t){try{return ei.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function ys(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const vs=()=>ys().__FIREBASE_DEFAULTS__,_s=()=>{if(typeof process>"u"||typeof dr>"u")return;const t=dr.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Is=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ni(t[1]);return e&&JSON.parse(e)},$n=()=>{try{return fs()||vs()||_s()||Is()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},ri=t=>{var e,n;return(n=(e=$n())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},Es=t=>{const e=ri(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},ii=()=>{var t;return(t=$n())==null?void 0:t.config},si=t=>{var e;return(e=$n())==null?void 0:e[`_${t}`]};/**
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
 */class ws{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function ze(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function oi(t){return(await fetch(t,{credentials:"include"})).ok}const Fe={};function bs(){const t={prod:[],emulator:[]};for(const e of Object.keys(Fe))Fe[e]?t.emulator.push(e):t.prod.push(e);return t}function Ss(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let ur=!1;function ai(t,e){if(typeof window>"u"||typeof document>"u"||!ze(window.location.host)||Fe[t]===e||Fe[t]||ur)return;Fe[t]=e;function n(u){return`__firebase__banner__${u}`}const r="__firebase__banner",s=bs().prod.length>0;function o(){const u=document.getElementById(r);u&&u.remove()}function a(u){u.style.display="flex",u.style.background="#7faaf0",u.style.position="fixed",u.style.bottom="5px",u.style.left="5px",u.style.padding=".5em",u.style.borderRadius="5px",u.style.alignItems="center"}function c(u,y){u.setAttribute("width","24"),u.setAttribute("id",y),u.setAttribute("height","24"),u.setAttribute("viewBox","0 0 24 24"),u.setAttribute("fill","none"),u.style.marginLeft="-6px"}function l(){const u=document.createElement("span");return u.style.cursor="pointer",u.style.marginLeft="16px",u.style.fontSize="24px",u.innerHTML=" &times;",u.onclick=()=>{ur=!0,o()},u}function d(u,y){u.setAttribute("id",y),u.innerText="Learn more",u.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",u.setAttribute("target","__blank"),u.style.paddingLeft="5px",u.style.textDecoration="underline"}function h(){const u=Ss(r),y=n("text"),w=document.getElementById(y)||document.createElement("span"),x=n("learnmore"),Qe=document.getElementById(x)||document.createElement("a"),ge=n("preprendIcon"),ye=document.getElementById(ge)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(u.created){const Yt=u.element;a(Yt),d(Qe,x);const hs=l();c(ye,ge),Yt.append(ye,w,Qe,hs),document.body.appendChild(Yt)}s?(w.innerText="Preview backend disconnected.",ye.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(ye.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,w.innerText="Preview backend running in this workspace."),w.setAttribute("id",y)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",h):h()}/**
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
 */function T(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ts(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(T())}function Cs(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ks(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function As(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ps(){const t=T();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Ls(){try{return typeof indexedDB=="object"}catch{return!1}}function Rs(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)==null?void 0:s.message)||"")}}catch(n){e(n)}})}/**
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
 */const Ns="FirebaseError";class G extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Ns,Object.setPrototypeOf(this,G.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,je.prototype.create)}}class je{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Ds(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new G(i,a,r)}}function Ds(t,e){return t.replace(Os,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Os=/\{\$([^}]+)}/g;function Ms(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function ke(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(hr(s)&&hr(o)){if(!ke(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function hr(t){return t!==null&&typeof t=="object"}/**
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
 */function Ge(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function xs(t,e){const n=new Us(t,e);return n.subscribe.bind(n)}class Us{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");$s(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=Zt),i.error===void 0&&(i.error=Zt),i.complete===void 0&&(i.complete=Zt);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function $s(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Zt(){}/**
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
 */function M(t){return t&&t._delegate?t._delegate:t}class pe{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const se="[DEFAULT]";/**
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
 */class Fs{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new ws;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Bs(e))try{this.getOrInitializeService({instanceIdentifier:se})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=se){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=se){return this.instances.has(e)}getOptions(e=se){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Hs(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=se){return this.component?this.component.multipleInstances?e:se:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Hs(t){return t===se?void 0:t}function Bs(t){return t.instantiationMode==="EAGER"}/**
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
 */class Vs{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Fs(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var _;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(_||(_={}));const qs={debug:_.DEBUG,verbose:_.VERBOSE,info:_.INFO,warn:_.WARN,error:_.ERROR,silent:_.SILENT},Ws=_.INFO,zs={[_.DEBUG]:"log",[_.VERBOSE]:"log",[_.INFO]:"info",[_.WARN]:"warn",[_.ERROR]:"error"},js=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=zs[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ci{constructor(e){this.name=e,this._logLevel=Ws,this._logHandler=js,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in _))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?qs[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,_.DEBUG,...e),this._logHandler(this,_.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,_.VERBOSE,...e),this._logHandler(this,_.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,_.INFO,...e),this._logHandler(this,_.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,_.WARN,...e),this._logHandler(this,_.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,_.ERROR,...e),this._logHandler(this,_.ERROR,...e)}}const Gs=(t,e)=>e.some(n=>t instanceof n);let fr,pr;function Ks(){return fr||(fr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Js(){return pr||(pr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const li=new WeakMap,Tn=new WeakMap,di=new WeakMap,Qt=new WeakMap,Fn=new WeakMap;function Xs(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(Q(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&li.set(n,t)}).catch(()=>{}),Fn.set(e,t),e}function Ys(t){if(Tn.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Tn.set(t,e)}let Cn={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Tn.get(t);if(e==="objectStoreNames")return t.objectStoreNames||di.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Q(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Zs(t){Cn=t(Cn)}function Qs(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(en(this),e,...n);return di.set(r,e.sort?e.sort():[e]),Q(r)}:Js().includes(t)?function(...e){return t.apply(en(this),e),Q(li.get(this))}:function(...e){return Q(t.apply(en(this),e))}}function eo(t){return typeof t=="function"?Qs(t):(t instanceof IDBTransaction&&Ys(t),Gs(t,Ks())?new Proxy(t,Cn):t)}function Q(t){if(t instanceof IDBRequest)return Xs(t);if(Qt.has(t))return Qt.get(t);const e=eo(t);return e!==t&&(Qt.set(t,e),Fn.set(e,t)),e}const en=t=>Fn.get(t);function to(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),a=Q(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Q(o.result),c.oldVersion,c.newVersion,Q(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const no=["get","getKey","getAll","getAllKeys","count"],ro=["put","add","delete","clear"],tn=new Map;function mr(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(tn.get(e))return tn.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=ro.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||no.includes(n)))return;const s=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),i&&c.done]))[0]};return tn.set(e,s),s}Zs(t=>({...t,get:(e,n,r)=>mr(e,n)||t.get(e,n,r),has:(e,n)=>!!mr(e,n)||t.has(e,n)}));/**
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
 */class io{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(so(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function so(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const kn="@firebase/app",gr="0.14.1";/**
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
 */const z=new ci("@firebase/app"),oo="@firebase/app-compat",ao="@firebase/analytics-compat",co="@firebase/analytics",lo="@firebase/app-check-compat",uo="@firebase/app-check",ho="@firebase/auth",fo="@firebase/auth-compat",po="@firebase/database",mo="@firebase/data-connect",go="@firebase/database-compat",yo="@firebase/functions",vo="@firebase/functions-compat",_o="@firebase/installations",Io="@firebase/installations-compat",Eo="@firebase/messaging",wo="@firebase/messaging-compat",bo="@firebase/performance",So="@firebase/performance-compat",To="@firebase/remote-config",Co="@firebase/remote-config-compat",ko="@firebase/storage",Ao="@firebase/storage-compat",Po="@firebase/firestore",Lo="@firebase/ai",Ro="@firebase/firestore-compat",No="firebase",Do="12.1.0";/**
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
 */const An="[DEFAULT]",Oo={[kn]:"fire-core",[oo]:"fire-core-compat",[co]:"fire-analytics",[ao]:"fire-analytics-compat",[uo]:"fire-app-check",[lo]:"fire-app-check-compat",[ho]:"fire-auth",[fo]:"fire-auth-compat",[po]:"fire-rtdb",[mo]:"fire-data-connect",[go]:"fire-rtdb-compat",[yo]:"fire-fn",[vo]:"fire-fn-compat",[_o]:"fire-iid",[Io]:"fire-iid-compat",[Eo]:"fire-fcm",[wo]:"fire-fcm-compat",[bo]:"fire-perf",[So]:"fire-perf-compat",[To]:"fire-rc",[Co]:"fire-rc-compat",[ko]:"fire-gcs",[Ao]:"fire-gcs-compat",[Po]:"fire-fst",[Ro]:"fire-fst-compat",[Lo]:"fire-vertex","fire-js":"fire-js",[No]:"fire-js-all"};/**
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
 */const ht=new Map,Mo=new Map,Pn=new Map;function yr(t,e){try{t.container.addComponent(e)}catch(n){z.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ae(t){const e=t.name;if(Pn.has(e))return z.debug(`There were multiple attempts to register component ${e}.`),!1;Pn.set(e,t);for(const n of ht.values())yr(n,t);for(const n of Mo.values())yr(n,t);return!0}function Hn(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function R(t){return t==null?!1:t.settings!==void 0}/**
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
 */const xo={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ee=new je("app","Firebase",xo);/**
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
 */class Uo{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new pe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ee.create("app-deleted",{appName:this._name})}}/**
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
 */const Ke=Do;function ui(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:An,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw ee.create("bad-app-name",{appName:String(i)});if(n||(n=ii()),!n)throw ee.create("no-options");const s=ht.get(i);if(s){if(ke(n,s.options)&&ke(r,s.config))return s;throw ee.create("duplicate-app",{appName:i})}const o=new Vs(i);for(const c of Pn.values())o.addComponent(c);const a=new Uo(n,r,o);return ht.set(i,a),a}function hi(t=An){const e=ht.get(t);if(!e&&t===An&&ii())return ui();if(!e)throw ee.create("no-app",{appName:t});return e}function te(t,e,n){let r=Oo[t]??t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),z.warn(o.join(" "));return}Ae(new pe(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const $o="firebase-heartbeat-database",Fo=1,qe="firebase-heartbeat-store";let nn=null;function fi(){return nn||(nn=to($o,Fo,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(qe)}catch(n){console.warn(n)}}}}).catch(t=>{throw ee.create("idb-open",{originalErrorMessage:t.message})})),nn}async function Ho(t){try{const n=(await fi()).transaction(qe),r=await n.objectStore(qe).get(pi(t));return await n.done,r}catch(e){if(e instanceof G)z.warn(e.message);else{const n=ee.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});z.warn(n.message)}}}async function vr(t,e){try{const r=(await fi()).transaction(qe,"readwrite");await r.objectStore(qe).put(e,pi(t)),await r.done}catch(n){if(n instanceof G)z.warn(n.message);else{const r=ee.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});z.warn(r.message)}}}function pi(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Bo=1024,Vo=30;class qo{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new zo(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=_r();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>Vo){const o=jo(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){z.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=_r(),{heartbeatsToSend:r,unsentEntries:i}=Wo(this._heartbeatsCache.heartbeats),s=ti(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return z.warn(n),""}}}function _r(){return new Date().toISOString().substring(0,10)}function Wo(t,e=Bo){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Ir(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ir(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class zo{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ls()?Rs().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Ho(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return vr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return vr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Ir(t){return ti(JSON.stringify({version:2,heartbeats:t})).length}function jo(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
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
 */function Go(t){Ae(new pe("platform-logger",e=>new io(e),"PRIVATE")),Ae(new pe("heartbeat",e=>new qo(e),"PRIVATE")),te(kn,gr,t),te(kn,gr,"esm2020"),te("fire-js","")}Go("");function mi(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ko=mi,gi=new je("auth","Firebase",mi());/**
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
 */const ft=new ci("@firebase/auth");function Jo(t,...e){ft.logLevel<=_.WARN&&ft.warn(`Auth (${Ke}): ${t}`,...e)}function ct(t,...e){ft.logLevel<=_.ERROR&&ft.error(`Auth (${Ke}): ${t}`,...e)}/**
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
 */function F(t,...e){throw Vn(t,...e)}function D(t,...e){return Vn(t,...e)}function Bn(t,e,n){const r={...Ko(),[e]:n};return new je("auth","Firebase",r).create(e,{appName:t.name})}function ue(t){return Bn(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Xo(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&F(t,"argument-error"),Bn(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Vn(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return gi.create(t,...e)}function f(t,e,...n){if(!t)throw Vn(e,...n)}function q(t){const e="INTERNAL ASSERTION FAILED: "+t;throw ct(e),new Error(e)}function j(t,e){t||q(e)}/**
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
 */function Ln(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function Yo(){return Er()==="http:"||Er()==="https:"}function Er(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
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
 */function Zo(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Yo()||ks()||"connection"in navigator)?navigator.onLine:!0}function Qo(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Je{constructor(e,n){this.shortDelay=e,this.longDelay=n,j(n>e,"Short delay should be less than long delay!"),this.isMobile=Ts()||As()}get(){return Zo()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function qn(t,e){j(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class yi{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;q("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;q("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;q("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const ea={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const ta=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],na=new Je(3e4,6e4);function Wn(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Me(t,e,n,r,i={}){return vi(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=Ge({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...s};return Cs()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&ze(t.emulatorConfig.host)&&(l.credentials="include"),yi.fetch()(await _i(t,t.config.apiHost,n,a),l)})}async function vi(t,e,n){t._canInitEmulator=!1;const r={...ea,...e};try{const i=new ia(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw et(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw et(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw et(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw et(t,"user-disabled",o);const d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Bn(t,d,l);F(t,d)}}catch(i){if(i instanceof G)throw i;F(t,"network-request-failed",{message:String(i)})}}async function ra(t,e,n,r,i={}){const s=await Me(t,e,n,r,i);return"mfaPendingCredential"in s&&F(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function _i(t,e,n,r){const i=`${e}${n}?${r}`,s=t,o=s.config.emulator?qn(t.config,i):`${t.config.apiScheme}://${i}`;return ta.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}class ia{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(D(this.auth,"network-request-failed")),na.get())})}}function et(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=D(t,e,r);return i.customData._tokenResponse=n,i}/**
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
 */async function sa(t,e){return Me(t,"POST","/v1/accounts:delete",e)}async function pt(t,e){return Me(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function He(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function oa(t,e=!1){const n=M(t),r=await n.getIdToken(e),i=zn(r);f(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:He(rn(i.auth_time)),issuedAtTime:He(rn(i.iat)),expirationTime:He(rn(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function rn(t){return Number(t)*1e3}function zn(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return ct("JWT malformed, contained fewer than 3 sections"),null;try{const i=ni(n);return i?JSON.parse(i):(ct("Failed to decode base64 JWT payload"),null)}catch(i){return ct("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function wr(t){const e=zn(t);return f(e,"internal-error"),f(typeof e.exp<"u","internal-error"),f(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function We(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof G&&aa(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function aa({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class ca{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Rn{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=He(this.lastLoginAt),this.creationTime=He(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function mt(t){var h;const e=t.auth,n=await t.getIdToken(),r=await We(t,pt(e,{idToken:n}));f(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const s=(h=i.providerUserInfo)!=null&&h.length?Ii(i.providerUserInfo):[],o=da(t.providerData,s),a=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!(o!=null&&o.length),l=a?c:!1,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Rn(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(t,d)}async function la(t){const e=M(t);await mt(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function da(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Ii(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
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
 */async function ua(t,e){const n=await vi(t,{},async()=>{const r=Ge({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=await _i(t,i,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:r};return t.emulatorConfig&&ze(t.emulatorConfig.host)&&(c.credentials="include"),yi.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function ha(t,e){return Me(t,"POST","/v2/accounts:revokeToken",Wn(t,e))}/**
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
 */class Ee{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){f(e.idToken,"internal-error"),f(typeof e.idToken<"u","internal-error"),f(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):wr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){f(e.length!==0,"internal-error");const n=wr(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(f(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await ua(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new Ee;return r&&(f(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(f(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(f(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ee,this.toJSON())}_performRefresh(){return q("not implemented")}}/**
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
 */function K(t,e){f(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class N{constructor({uid:e,auth:n,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new ca(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Rn(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await We(this,this.stsTokenManager.getToken(this.auth,e));return f(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return oa(this,e)}reload(){return la(this)}_assign(e){this!==e&&(f(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new N({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){f(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await mt(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(R(this.auth.app))return Promise.reject(ue(this.auth));const e=await this.getIdToken();return await We(this,sa(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,i=n.email??void 0,s=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,d=n.lastLoginAt??void 0,{uid:h,emailVerified:u,isAnonymous:y,providerData:w,stsTokenManager:x}=n;f(h&&x,e,"internal-error");const Qe=Ee.fromJSON(this.name,x);f(typeof h=="string",e,"internal-error"),K(r,e.name),K(i,e.name),f(typeof u=="boolean",e,"internal-error"),f(typeof y=="boolean",e,"internal-error"),K(s,e.name),K(o,e.name),K(a,e.name),K(c,e.name),K(l,e.name),K(d,e.name);const ge=new N({uid:h,auth:e,email:i,emailVerified:u,displayName:r,isAnonymous:y,photoURL:o,phoneNumber:s,tenantId:a,stsTokenManager:Qe,createdAt:l,lastLoginAt:d});return w&&Array.isArray(w)&&(ge.providerData=w.map(ye=>({...ye}))),c&&(ge._redirectEventId=c),ge}static async _fromIdTokenResponse(e,n,r=!1){const i=new Ee;i.updateFromServerResponse(n);const s=new N({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await mt(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];f(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Ii(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),a=new Ee;a.updateFromIdToken(r);const c=new N({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Rn(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,l),c}}/**
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
 */const br=new Map;function W(t){j(t instanceof Function,"Expected a class definition");let e=br.get(t);return e?(j(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,br.set(t,e),e)}/**
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
 */class Ei{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Ei.type="NONE";const Sr=Ei;/**
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
 */function lt(t,e,n){return`firebase:${t}:${e}:${n}`}class we{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=lt(this.userKey,i.apiKey,s),this.fullPersistenceKey=lt("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await pt(this.auth,{idToken:e}).catch(()=>{});return n?N._fromGetAccountInfoResponse(this.auth,n,e):null}return N._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new we(W(Sr),e,r);const i=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=i[0]||W(Sr);const o=lt(r,e.config.apiKey,e.name);let a=null;for(const l of n)try{const d=await l._get(o);if(d){let h;if(typeof d=="string"){const u=await pt(e,{idToken:d}).catch(()=>{});if(!u)break;h=await N._fromGetAccountInfoResponse(e,u,d)}else h=N._fromJSON(e,d);l!==s&&(a=h),s=l;break}}catch{}const c=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new we(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new we(s,e,r))}}/**
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
 */function Tr(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ti(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(wi(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ki(e))return"Blackberry";if(Ai(e))return"Webos";if(bi(e))return"Safari";if((e.includes("chrome/")||Si(e))&&!e.includes("edge/"))return"Chrome";if(Ci(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function wi(t=T()){return/firefox\//i.test(t)}function bi(t=T()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Si(t=T()){return/crios\//i.test(t)}function Ti(t=T()){return/iemobile/i.test(t)}function Ci(t=T()){return/android/i.test(t)}function ki(t=T()){return/blackberry/i.test(t)}function Ai(t=T()){return/webos/i.test(t)}function jn(t=T()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function fa(t=T()){var e;return jn(t)&&!!((e=window.navigator)!=null&&e.standalone)}function pa(){return Ps()&&document.documentMode===10}function Pi(t=T()){return jn(t)||Ci(t)||Ai(t)||ki(t)||/windows phone/i.test(t)||Ti(t)}/**
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
 */function Li(t,e=[]){let n;switch(t){case"Browser":n=Tr(T());break;case"Worker":n=`${Tr(T())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ke}/${r}`}/**
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
 */class ma{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function ga(t,e={}){return Me(t,"GET","/v2/passwordPolicy",Wn(t,e))}/**
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
 */const ya=6;class va{constructor(e){var r;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??ya,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class _a{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Cr(this),this.idTokenSubscription=new Cr(this),this.beforeStateQueue=new ma(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=gi,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=W(n)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await we.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await pt(this,{idToken:e}),r=await N._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(R(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(s=this.redirectUser)==null?void 0:s._redirectEventId,a=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(r=c.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return f(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await mt(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Qo()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(R(this.app))return Promise.reject(ue(this));const n=e?M(e):null;return n&&f(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&f(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return R(this.app)?Promise.reject(ue(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return R(this.app)?Promise.reject(ue(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(W(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ga(this),n=new va(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new je("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await ha(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&W(e)||this._popupRedirectResolver;f(n,this,"argument-error"),this.redirectPersistenceManager=await we.create(this,[W(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(f(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,i);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return f(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Li(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var n;if(R(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&Jo(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Wt(t){return M(t)}class Cr{constructor(e){this.auth=e,this.observer=null,this.addObserver=xs(n=>this.observer=n)}get next(){return f(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Gn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Ia(t){Gn=t}function Ea(t){return Gn.loadJS(t)}function wa(){return Gn.gapiScript}function ba(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Sa(t,e){const n=Hn(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(ke(s,e??{}))return i;F(i,"already-initialized")}return n.initialize({options:e})}function Ta(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(W);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ca(t,e,n){const r=Wt(t);f(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Ri(e),{host:o,port:a}=ka(e),c=a===null?"":`:${a}`,l={url:`${s}//${o}${c}/`},d=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){f(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),f(ke(l,r.config.emulator)&&ke(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,ze(o)?(oi(`${s}//${o}${c}`),ai("Auth",!0)):Aa()}function Ri(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function ka(t){const e=Ri(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:kr(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:kr(o)}}}function kr(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Aa(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Ni{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return q("not implemented")}_getIdTokenResponse(e){return q("not implemented")}_linkToIdToken(e,n){return q("not implemented")}_getReauthenticationResolver(e){return q("not implemented")}}/**
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
 */async function be(t,e){return ra(t,"POST","/v1/accounts:signInWithIdp",Wn(t,e))}/**
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
 */const Pa="http://localhost";class me extends Ni{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new me(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):F("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=n;if(!r||!i)return null;const o=new me(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return be(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,be(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,be(e,n)}buildRequest(){const e={requestUri:Pa,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ge(n)}return e}}/**
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
 */class Kn{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Xe extends Kn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class J extends Xe{constructor(){super("facebook.com")}static credential(e){return me._fromParams({providerId:J.PROVIDER_ID,signInMethod:J.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return J.credentialFromTaggedObject(e)}static credentialFromError(e){return J.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return J.credential(e.oauthAccessToken)}catch{return null}}}J.FACEBOOK_SIGN_IN_METHOD="facebook.com";J.PROVIDER_ID="facebook.com";/**
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
 */class V extends Xe{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return me._fromParams({providerId:V.PROVIDER_ID,signInMethod:V.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return V.credentialFromTaggedObject(e)}static credentialFromError(e){return V.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return V.credential(n,r)}catch{return null}}}V.GOOGLE_SIGN_IN_METHOD="google.com";V.PROVIDER_ID="google.com";/**
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
 */class X extends Xe{constructor(){super("github.com")}static credential(e){return me._fromParams({providerId:X.PROVIDER_ID,signInMethod:X.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return X.credentialFromTaggedObject(e)}static credentialFromError(e){return X.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return X.credential(e.oauthAccessToken)}catch{return null}}}X.GITHUB_SIGN_IN_METHOD="github.com";X.PROVIDER_ID="github.com";/**
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
 */class Y extends Xe{constructor(){super("twitter.com")}static credential(e,n){return me._fromParams({providerId:Y.PROVIDER_ID,signInMethod:Y.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Y.credentialFromTaggedObject(e)}static credentialFromError(e){return Y.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Y.credential(n,r)}catch{return null}}}Y.TWITTER_SIGN_IN_METHOD="twitter.com";Y.PROVIDER_ID="twitter.com";/**
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
 */class Pe{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await N._fromIdTokenResponse(e,r,i),o=Ar(r);return new Pe({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=Ar(r);return new Pe({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function Ar(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class gt extends G{constructor(e,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,gt.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new gt(e,n,r,i)}}function Di(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?gt._fromErrorAndOperation(t,s,e,r):s})}async function La(t,e,n=!1){const r=await We(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Pe._forOperation(t,"link",r)}/**
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
 */async function Ra(t,e,n=!1){const{auth:r}=t;if(R(r.app))return Promise.reject(ue(r));const i="reauthenticate";try{const s=await We(t,Di(r,i,e,t),n);f(s.idToken,r,"internal-error");const o=zn(s.idToken);f(o,r,"internal-error");const{sub:a}=o;return f(t.uid===a,r,"user-mismatch"),Pe._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&F(r,"user-mismatch"),s}}/**
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
 */async function Na(t,e,n=!1){if(R(t.app))return Promise.reject(ue(t));const r="signIn",i=await Di(t,r,e),s=await Pe._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}function Da(t,e,n,r){return M(t).onIdTokenChanged(e,n,r)}function Oa(t,e,n){return M(t).beforeAuthStateChanged(e,n)}function Ma(t,e,n,r){return M(t).onAuthStateChanged(e,n,r)}function xa(t){return M(t).signOut()}const yt="__sak";/**
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
 */class Oi{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(yt,"1"),this.storage.removeItem(yt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Ua=1e3,$a=10;class Mi extends Oi{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Pi(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);pa()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,$a):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Ua)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Mi.type="LOCAL";const Fa=Mi;/**
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
 */class xi extends Oi{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}xi.type="SESSION";const Ui=xi;/**
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
 */function Ha(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class zt{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new zt(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async l=>l(n.origin,s)),c=await Ha(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}zt.receivers=[];/**
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
 */function Jn(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class Ba{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const l=Jn("",20);i.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(h){const u=h;if(u.data.eventId===l)switch(u.data.status){case"ack":clearTimeout(d),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(u.data.response);break;default:clearTimeout(d),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function $(){return window}function Va(t){$().location.href=t}/**
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
 */function $i(){return typeof $().WorkerGlobalScope<"u"&&typeof $().importScripts=="function"}async function qa(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Wa(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function za(){return $i()?self:null}/**
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
 */const Fi="firebaseLocalStorageDb",ja=1,vt="firebaseLocalStorage",Hi="fbase_key";class Ye{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function jt(t,e){return t.transaction([vt],e?"readwrite":"readonly").objectStore(vt)}function Ga(){const t=indexedDB.deleteDatabase(Fi);return new Ye(t).toPromise()}function Nn(){const t=indexedDB.open(Fi,ja);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(vt,{keyPath:Hi})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(vt)?e(r):(r.close(),await Ga(),e(await Nn()))})})}async function Pr(t,e,n){const r=jt(t,!0).put({[Hi]:e,value:n});return new Ye(r).toPromise()}async function Ka(t,e){const n=jt(t,!1).get(e),r=await new Ye(n).toPromise();return r===void 0?null:r.value}function Lr(t,e){const n=jt(t,!0).delete(e);return new Ye(n).toPromise()}const Ja=800,Xa=3;class Bi{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Nn(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Xa)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return $i()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=zt._getInstance(za()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,r;if(this.activeServiceWorker=await qa(),!this.activeServiceWorker)return;this.sender=new Ba(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Wa()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Nn();return await Pr(e,yt,"1"),await Lr(e,yt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Pr(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Ka(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Lr(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=jt(i,!1).getAll();return new Ye(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Ja)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Bi.type="LOCAL";const Ya=Bi;new Je(3e4,6e4);/**
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
 */function Vi(t,e){return e?W(e):(f(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Xn extends Ni{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return be(e,this._buildIdpRequest())}_linkToIdToken(e,n){return be(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return be(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Za(t){return Na(t.auth,new Xn(t),t.bypassAuthState)}function Qa(t){const{auth:e,user:n}=t;return f(n,e,"internal-error"),Ra(n,new Xn(t),t.bypassAuthState)}async function ec(t){const{auth:e,user:n}=t;return f(n,e,"internal-error"),La(n,new Xn(t),t.bypassAuthState)}/**
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
 */class qi{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Za;case"linkViaPopup":case"linkViaRedirect":return ec;case"reauthViaPopup":case"reauthViaRedirect":return Qa;default:F(this.auth,"internal-error")}}resolve(e){j(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){j(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const tc=new Je(2e3,1e4);async function nc(t,e,n){if(R(t.app))return Promise.reject(D(t,"operation-not-supported-in-this-environment"));const r=Wt(t);Xo(t,e,Kn);const i=Vi(r,n);return new ae(r,"signInViaPopup",e,i).executeNotNull()}class ae extends qi{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,ae.currentPopupAction&&ae.currentPopupAction.cancel(),ae.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return f(e,this.auth,"internal-error"),e}async onExecution(){j(this.filter.length===1,"Popup operations only handle one event");const e=Jn();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(D(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(D(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ae.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if((r=(n=this.authWindow)==null?void 0:n.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(D(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,tc.get())};e()}}ae.currentPopupAction=null;/**
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
 */const rc="pendingRedirect",dt=new Map;class ic extends qi{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=dt.get(this.auth._key());if(!e){try{const r=await sc(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}dt.set(this.auth._key(),e)}return this.bypassAuthState||dt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function sc(t,e){const n=cc(e),r=ac(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function oc(t,e){dt.set(t._key(),e)}function ac(t){return W(t._redirectPersistence)}function cc(t){return lt(rc,t.config.apiKey,t.name)}async function lc(t,e,n=!1){if(R(t.app))return Promise.reject(ue(t));const r=Wt(t),i=Vi(r,e),o=await new ic(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const dc=600*1e3;class uc{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!hc(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Wi(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";n.onError(D(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=dc&&this.cachedEventUids.clear(),this.cachedEventUids.has(Rr(e))}saveEventToCache(e){this.cachedEventUids.add(Rr(e)),this.lastProcessedEventTime=Date.now()}}function Rr(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Wi({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function hc(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Wi(t);default:return!1}}/**
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
 */async function fc(t,e={}){return Me(t,"GET","/v1/projects",e)}/**
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
 */const pc=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,mc=/^https?/;async function gc(t){if(t.config.emulator)return;const{authorizedDomains:e}=await fc(t);for(const n of e)try{if(yc(n))return}catch{}F(t,"unauthorized-domain")}function yc(t){const e=Ln(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!mc.test(n))return!1;if(pc.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const vc=new Je(3e4,6e4);function Nr(){const t=$().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function _c(t){return new Promise((e,n)=>{var i,s,o;function r(){Nr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Nr(),n(D(t,"network-request-failed"))},timeout:vc.get()})}if((s=(i=$().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((o=$().gapi)!=null&&o.load)r();else{const a=ba("iframefcb");return $()[a]=()=>{gapi.load?r():n(D(t,"network-request-failed"))},Ea(`${wa()}?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw ut=null,e})}let ut=null;function Ic(t){return ut=ut||_c(t),ut}/**
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
 */const Ec=new Je(5e3,15e3),wc="__/auth/iframe",bc="emulator/auth/iframe",Sc={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Tc=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Cc(t){const e=t.config;f(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?qn(e,bc):`https://${t.config.authDomain}/${wc}`,r={apiKey:e.apiKey,appName:t.name,v:Ke},i=Tc.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${Ge(r).slice(1)}`}async function kc(t){const e=await Ic(t),n=$().gapi;return f(n,t,"internal-error"),e.open({where:document.body,url:Cc(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Sc,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=D(t,"network-request-failed"),a=$().setTimeout(()=>{s(o)},Ec.get());function c(){$().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}/**
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
 */const Ac={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Pc=500,Lc=600,Rc="_blank",Nc="http://localhost";class Dr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Dc(t,e,n,r=Pc,i=Lc){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...Ac,width:r.toString(),height:i.toString(),top:s,left:o},l=T().toLowerCase();n&&(a=Si(l)?Rc:n),wi(l)&&(e=e||Nc,c.scrollbars="yes");const d=Object.entries(c).reduce((u,[y,w])=>`${u}${y}=${w},`,"");if(fa(l)&&a!=="_self")return Oc(e||"",a),new Dr(null);const h=window.open(e||"",a,d);f(h,t,"popup-blocked");try{h.focus()}catch{}return new Dr(h)}function Oc(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const Mc="__/auth/handler",xc="emulator/auth/handler",Uc=encodeURIComponent("fac");async function Or(t,e,n,r,i,s){f(t.config.authDomain,t,"auth-domain-config-required"),f(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Ke,eventId:i};if(e instanceof Kn){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Ms(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,h]of Object.entries({}))o[d]=h}if(e instanceof Xe){const d=e.getScopes().filter(h=>h!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const c=await t._getAppCheckToken(),l=c?`#${Uc}=${encodeURIComponent(c)}`:"";return`${$c(t)}?${Ge(a).slice(1)}${l}`}function $c({config:t}){return t.emulator?qn(t,xc):`https://${t.authDomain}/${Mc}`}/**
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
 */const sn="webStorageSupport";class Fc{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ui,this._completeRedirectFn=lc,this._overrideRedirectResult=oc}async _openPopup(e,n,r,i){var o;j((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const s=await Or(e,n,r,Ln(),i);return Dc(e,s,Jn())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await Or(e,n,r,Ln(),i);return Va(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(j(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await kc(e),r=new uc(e);return n.register("authEvent",i=>(f(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(sn,{type:sn},i=>{var o;const s=(o=i==null?void 0:i[0])==null?void 0:o[sn];s!==void 0&&n(!!s),F(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=gc(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Pi()||bi()||jn()}}const Hc=Fc;var Mr="@firebase/auth",xr="1.11.0";/**
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
 */class Bc{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){f(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Vc(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function qc(t){Ae(new pe("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;f(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Li(t)},l=new _a(r,i,s,c);return Ta(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Ae(new pe("auth-internal",e=>{const n=Wt(e.getProvider("auth").getImmediate());return(r=>new Bc(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),te(Mr,xr,Vc(t)),te(Mr,xr,"esm2020")}/**
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
 */const Wc=300,zc=si("authIdTokenMaxAge")||Wc;let Ur=null;const jc=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>zc)return;const i=n==null?void 0:n.token;Ur!==i&&(Ur=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function zi(t=hi()){const e=Hn(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Sa(t,{popupRedirectResolver:Hc,persistence:[Ya,Fa,Ui]}),r=si("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=jc(s.toString());Oa(n,o,()=>o(n.currentUser)),Da(n,a=>o(a))}}const i=ri("auth");return i&&Ca(n,`http://${i}`),n}function Gc(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}Ia({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=D("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",Gc().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});qc("Browser");/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const H=document.querySelector("#generator-tab-button"),B=document.querySelector("#studio-tab-button"),tt=document.querySelector("#studio-notification-badge");document.querySelector(".header-auth-status");const _t=document.querySelector("#auth-section"),on=document.querySelector("#google-sign-in-button"),It=document.querySelector(".user-actions"),an=document.querySelector("#user-profile-trigger"),cn=document.querySelector("#user-profile-dropdown"),$r=document.querySelector("#user-name"),Fr=document.querySelector("#user-profile-picture"),ln=document.querySelector("#sign-out-button");document.querySelector("#credit-balance-display");document.querySelector("#buy-credits-button");const nt=document.querySelector("#generator-view"),Ue=document.querySelector("#idea-input"),A=document.querySelector("#generate-ideas-button"),ce=document.querySelector("#prompt-input"),Be=document.querySelector("#file-input"),Et=document.querySelector("#image-preview-container"),wt=document.querySelector("#image-preview"),dn=document.querySelector("#clear-image-button"),Ve=document.querySelector("#generate-button"),un=document.querySelector(".controls"),E=document.querySelector("#status"),ve=document.querySelector("#results-gallery"),Hr=document.querySelector("#gallery-placeholder"),Br=document.querySelector("#quota-error"),rt=document.querySelector("#editor-view"),ie=document.querySelector(".editor-body"),_e=document.querySelector(".media-panel");document.querySelector(".preview-panel");const Ie=document.querySelector(".tools-panel"),U=document.querySelector("#media-bin"),hn=document.querySelector("#upload-video-input"),bt=document.querySelector("#editor-placeholder"),L=document.querySelector("#video-preview-wrapper"),g=document.querySelector("#video-preview"),he=document.querySelector("#play-pause-button"),fn=document.querySelector("#play-icon"),pn=document.querySelector("#pause-icon"),Vr=document.querySelector("#current-time"),qr=document.querySelector("#total-duration"),mn=document.querySelector("#export-video-button"),Se=document.querySelector("#select-tool-button"),Te=document.querySelector("#split-tool-button"),fe=document.querySelector("#add-text-button"),it=document.querySelector("#timeline-container"),O=document.querySelector("#timeline-ruler"),Ce=document.querySelector("#timeline-track-headers"),p=document.querySelector("#timeline-scroll-container"),b=document.querySelector("#timeline-tracks"),Le=document.querySelector("#playhead"),Z=document.querySelector("#split-indicator"),gn=document.querySelector("#add-video-track-button"),yn=document.querySelector("#add-text-track-button"),st=document.querySelector("#properties-placeholder"),ot=document.querySelector("#text-properties"),St=document.querySelector("#prop-text-content"),Tt=document.querySelector("#prop-font-family"),Ct=document.querySelector("#prop-font-color"),kt=document.querySelector("#prop-font-size"),At=document.querySelector("#prop-font-size-value"),at=document.querySelector("#video-properties"),Pt=document.querySelector("#prop-video-volume"),Lt=document.querySelector("#prop-video-volume-value"),Rt=document.querySelector("#prop-video-scale"),Nt=document.querySelector("#prop-video-scale-value"),Dt=document.querySelector("#prop-video-pos-x"),Ot=document.querySelector("#prop-video-pos-x-value"),Mt=document.querySelector("#prop-video-pos-y"),xt=document.querySelector("#prop-video-pos-y-value"),Ut=document.querySelector("#prop-video-rotation"),$t=document.querySelector("#prop-video-rotation-value"),vn=document.querySelector("#reset-transform-button"),Ft=document.querySelector("#settings-modal"),_n=document.querySelector("#sequence-settings-button"),In=document.querySelector("#settings-save-button"),En=document.querySelector("#settings-cancel-button"),Ht=document.querySelector("#setting-duration"),oe=document.querySelector("#error-modal"),Wr=document.querySelector("#error-modal-body"),wn=document.querySelector("#error-modal-close");document.querySelector("#credits-modal");document.querySelector("#credits-cancel-button");document.querySelectorAll(".buy-button");const Kc=document.querySelector("#resizer-v1"),Jc=document.querySelector("#resizer-v2"),Xc=document.querySelector("#resizer-h");var Yc="firebase",Zc="12.1.0";/**
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
 */te(Yc,Zc,"app");const Qc={apiKey:"AIzaSyAcBjgAvyP3HbvRuWinDEtW8jBRsiCBKx4",authDomain:"video-app-194ba.firebaseapp.com",projectId:"video-app-194ba",storageBucket:"video-app-194ba.firebasestorage.app",messagingSenderId:"225357105229",appId:"1:225357105229:web:104d17569750ed4c23f404"},Yn=ui(Qc);/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Zn=zi(Yn),el=new V;function tl(t){!_t||!It||!$r||!Fr||(_t.style.display="none",It.style.display="flex",$r.textContent=t.displayName,Fr.src=t.photoURL)}function nl(){!_t||!It||(_t.style.display="flex",It.style.display="none")}async function rl(){try{await nc(Zn,el)}catch(t){console.error("Sign in error:",t)}}async function il(){try{await xa(Zn)}catch(t){console.error("Sign out error:",t)}}function sl(){Ma(Zn,t=>{t?tl(t):nl()}),on==null||on.addEventListener("click",rl),ln==null||ln.addEventListener("click",il),an==null||an.addEventListener("click",()=>{if(cn){const t=cn.style.display==="block";cn.style.display=t?"none":"block"}})}/**
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
 */const ol="type.googleapis.com/google.protobuf.Int64Value",al="type.googleapis.com/google.protobuf.UInt64Value";function ji(t,e){const n={};for(const r in t)t.hasOwnProperty(r)&&(n[r]=e(t[r]));return n}function Bt(t){if(t==null)return null;if(t instanceof Number&&(t=t.valueOf()),typeof t=="number"&&isFinite(t)||t===!0||t===!1||Object.prototype.toString.call(t)==="[object String]")return t;if(t instanceof Date)return t.toISOString();if(Array.isArray(t))return t.map(e=>Bt(e));if(typeof t=="function"||typeof t=="object")return ji(t,e=>Bt(e));throw new Error("Data cannot be encoded in JSON: "+t)}function Re(t){if(t==null)return t;if(t["@type"])switch(t["@type"]){case ol:case al:{const e=Number(t.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+t);return e}default:throw new Error("Data cannot be decoded from JSON: "+t)}return Array.isArray(t)?t.map(e=>Re(e)):typeof t=="function"||typeof t=="object"?ji(t,e=>Re(e)):t}/**
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
 */const Qn="functions";/**
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
 */const zr={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class C extends G{constructor(e,n,r){super(`${Qn}/${e}`,n||""),this.details=r,Object.setPrototypeOf(this,C.prototype)}}function cl(t){if(t>=200&&t<300)return"ok";switch(t){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function Vt(t,e){let n=cl(t),r=n,i;try{const s=e&&e.error;if(s){const o=s.status;if(typeof o=="string"){if(!zr[o])return new C("internal","internal");n=zr[o],r=o}const a=s.message;typeof a=="string"&&(r=a),i=s.details,i!==void 0&&(i=Re(i))}}catch{}return n==="ok"?null:new C(n,r,i)}/**
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
 */class ll{constructor(e,n,r,i){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,R(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=n.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||n.get().then(s=>this.auth=s,()=>{}),this.messaging||r.get().then(s=>this.messaging=s,()=>{}),this.appCheck||i==null||i.get().then(s=>this.appCheck=s,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e==null?void 0:e.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const n=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return n.error?null:n.token}return null}async getContext(e){const n=await this.getAuthToken(),r=await this.getMessagingToken(),i=await this.getAppCheckToken(e);return{authToken:n,messagingToken:r,appCheckToken:i}}}/**
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
 */const Dn="us-central1",dl=/^data: (.*?)(?:\n|$)/;function ul(t){let e=null;return{promise:new Promise((n,r)=>{e=setTimeout(()=>{r(new C("deadline-exceeded","deadline-exceeded"))},t)}),cancel:()=>{e&&clearTimeout(e)}}}class hl{constructor(e,n,r,i,s=Dn,o=(...a)=>fetch(...a)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new ll(e,n,r,i),this.cancelAllRequests=new Promise(a=>{this.deleteService=()=>Promise.resolve(a())});try{const a=new URL(s);this.customDomain=a.origin+(a.pathname==="/"?"":a.pathname),this.region=Dn}catch{this.customDomain=null,this.region=s}}_delete(){return this.deleteService()}_url(e){const n=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${n}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${n}.cloudfunctions.net/${e}`}}function fl(t,e,n){const r=ze(e);t.emulatorOrigin=`http${r?"s":""}://${e}:${n}`,r&&(oi(t.emulatorOrigin),ai("Functions",!0))}function pl(t,e,n){const r=i=>gl(t,e,i,{});return r.stream=(i,s)=>vl(t,e,i,s),r}async function ml(t,e,n,r){n["Content-Type"]="application/json";let i;try{i=await r(t,{method:"POST",body:JSON.stringify(e),headers:n})}catch{return{status:0,json:null}}let s=null;try{s=await i.json()}catch{}return{status:i.status,json:s}}async function Gi(t,e){const n={},r=await t.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(n.Authorization="Bearer "+r.authToken),r.messagingToken&&(n["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(n["X-Firebase-AppCheck"]=r.appCheckToken),n}function gl(t,e,n,r){const i=t._url(e);return yl(t,i,n,r)}async function yl(t,e,n,r){n=Bt(n);const i={data:n},s=await Gi(t,r),o=r.timeout||7e4,a=ul(o),c=await Promise.race([ml(e,i,s,t.fetchImpl),a.promise,t.cancelAllRequests]);if(a.cancel(),!c)throw new C("cancelled","Firebase Functions instance was deleted.");const l=Vt(c.status,c.json);if(l)throw l;if(!c.json)throw new C("internal","Response is not valid JSON object.");let d=c.json.data;if(typeof d>"u"&&(d=c.json.result),typeof d>"u")throw new C("internal","Response is missing data field.");return{data:Re(d)}}function vl(t,e,n,r){const i=t._url(e);return _l(t,i,n,r||{})}async function _l(t,e,n,r){var u;n=Bt(n);const i={data:n},s=await Gi(t,r);s["Content-Type"]="application/json",s.Accept="text/event-stream";let o;try{o=await t.fetchImpl(e,{method:"POST",body:JSON.stringify(i),headers:s,signal:r==null?void 0:r.signal})}catch(y){if(y instanceof Error&&y.name==="AbortError"){const x=new C("cancelled","Request was cancelled.");return{data:Promise.reject(x),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(x)}}}}}}const w=Vt(0,null);return{data:Promise.reject(w),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(w)}}}}}}let a,c;const l=new Promise((y,w)=>{a=y,c=w});(u=r==null?void 0:r.signal)==null||u.addEventListener("abort",()=>{const y=new C("cancelled","Request was cancelled.");c(y)});const d=o.body.getReader(),h=Il(d,a,c,r==null?void 0:r.signal);return{stream:{[Symbol.asyncIterator](){const y=h.getReader();return{async next(){const{value:w,done:x}=await y.read();return{value:w,done:x}},async return(){return await y.cancel(),{done:!0,value:void 0}}}}},data:l}}function Il(t,e,n,r){const i=(o,a)=>{const c=o.match(dl);if(!c)return;const l=c[1];try{const d=JSON.parse(l);if("result"in d){e(Re(d.result));return}if("message"in d){a.enqueue(Re(d.message));return}if("error"in d){const h=Vt(0,d);a.error(h),n(h);return}}catch(d){if(d instanceof C){a.error(d),n(d);return}}},s=new TextDecoder;return new ReadableStream({start(o){let a="";return c();async function c(){if(r!=null&&r.aborted){const l=new C("cancelled","Request was cancelled");return o.error(l),n(l),Promise.resolve()}try{const{value:l,done:d}=await t.read();if(d){a.trim()&&i(a.trim(),o),o.close();return}if(r!=null&&r.aborted){const u=new C("cancelled","Request was cancelled");o.error(u),n(u),await t.cancel();return}a+=s.decode(l,{stream:!0});const h=a.split(`
`);a=h.pop()||"";for(const u of h)u.trim()&&i(u.trim(),o);return c()}catch(l){const d=l instanceof C?l:Vt(0,null);o.error(d),n(d)}}},cancel(){return t.cancel()}})}const jr="@firebase/functions",Gr="0.13.0";/**
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
 */const El="auth-internal",wl="app-check-internal",bl="messaging-internal";function Sl(t){const e=(n,{instanceIdentifier:r})=>{const i=n.getProvider("app").getImmediate(),s=n.getProvider(El),o=n.getProvider(bl),a=n.getProvider(wl);return new hl(i,s,o,a,r)};Ae(new pe(Qn,e,"PUBLIC").setMultipleInstances(!0)),te(jr,Gr,t),te(jr,Gr,"esm2020")}/**
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
 */function Tl(t=hi(),e=Dn){const r=Hn(M(t),Qn).getImmediate({identifier:e}),i=Es("functions");return i&&Cl(r,...i),r}function Cl(t,e,n){fl(M(t),e,n)}function er(t,e,n){return pl(M(t),e)}Sl();const tr=Tl(Yn),kl=er(tr,"startVideoGeneration"),Al=er(tr,"checkVideoGenerationStatus"),Pl=er(tr,"generateText");async function Ll(t,e){var o;let n,r=0;const i=60,s=5e3;for(;r<i;){r++;const a=`Generation in progress... (Polling ${r}/${i})`;console.log(`[BFF] ${a}`),e(a);const{data:c}=await Al({operationName:t});if(n=c,n.done){if(console.log("[BFF] Polling complete. Operation finished.",n),n.error)throw new Error(`Video generation failed: ${n.error.message||"Unknown error"}`);const l=((o=n.response)==null?void 0:o.predictions)||[];if(l.length===0)throw new Error("API operation finished but returned no videos. The prompt may have been filtered for safety.");return console.log(`[BFF] Successfully received ${l.length} video(s).`),l}await new Promise(l=>setTimeout(l,s))}throw new Error(`Video generation timed out after ${i*s/1e3/60} minutes.`)}async function Rl(t,e,n,r){try{console.log("[BFF] Sending generation request to server...");const{data:i}=await kl({prompt:t,imageBase64:e,aspectRatio:n}),s=i.operationId;if(!s)throw new Error("Server did not return a valid operation ID.");return console.log(`[BFF] Video generation started. Polling with operation ID: ${s}`),await Ll(s,r)}catch(i){throw console.error("[BFF] API Call failed.",i),i}}async function Nl(t){try{const{data:e}=await Pl({idea:t}),n=e.text;if(!n)throw new Error("The AI returned an empty response. Please try a different idea.");return n}catch(e){throw console.error("[BFF] Text Generation API Call failed.",e),e}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Dl(t){return new Promise((e,n)=>{const r=new FileReader;r.onload=()=>{const i=r.result;e(i.split(",")[1])},r.onerror=i=>n(i),r.readAsDataURL(t)})}function On(t){const e=Math.floor(t/60),n=Math.floor(t%60);return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}`}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Gt(){if(!ot||!at||!st)return;const t=S.find(n=>n.id===De),e=m.find(n=>n.id===re);if(t)ot.style.display="block",at.style.display="none",st.style.display="none",St&&(St.value=t.text),Tt&&(Tt.value=t.fontFamily),Ct&&(Ct.value=t.color),kt&&(kt.value=String(t.fontSize)),At&&(At.textContent=String(t.fontSize));else if(e){ot.style.display="none",at.style.display="block",st.style.display="none";const n=e.properties;Pt&&(Pt.value=String(n.volume*100)),Lt&&(Lt.textContent=`${Math.round(n.volume*100)}%`),Rt&&(Rt.value=String(n.scale*100)),Nt&&(Nt.textContent=`${Math.round(n.scale*100)}%`),Dt&&(Dt.value=String(n.position.x)),Ot&&(Ot.textContent=`${n.position.x}%`),Mt&&(Mt.value=String(n.position.y)),xt&&(xt.textContent=`${n.position.y}%`),Ut&&(Ut.value=String(n.rotation)),$t&&($t.textContent=`${n.rotation}°`)}else ot.style.display="none",at.style.display="none",st.style.display="block"}function Ol(){const t=S.find(n=>n.id===De),e=m.find(n=>n.id===re);if(t){if(!St||!Tt||!Ct||!kt)return;t.text=St.value,t.fontFamily=Tt.value,t.color=Ct.value,t.fontSize=parseInt(kt.value,10),At&&(At.textContent=String(t.fontSize)),t.element.textContent=t.text,ir(t),Ze(t)}else if(e){if(!Pt||!Rt||!Dt||!Mt||!Ut)return;e.properties.volume=parseInt(Pt.value,10)/100,e.properties.scale=parseInt(Rt.value,10)/100,e.properties.position.x=parseInt(Dt.value,10),e.properties.position.y=parseInt(Mt.value,10),e.properties.rotation=parseInt(Ut.value,10),Lt&&(Lt.textContent=`${Math.round(e.properties.volume*100)}%`),Nt&&(Nt.textContent=`${Math.round(e.properties.scale*100)}%`),Ot&&(Ot.textContent=`${e.properties.position.x}%`),xt&&(xt.textContent=`${e.properties.position.y}%`),$t&&($t.textContent=`${e.properties.rotation}°`),nr()}}function Ml(){const t=m.find(e=>e.id===re);t&&(t.properties.scale=1,t.properties.position={x:0,y:0},t.properties.rotation=0,Gt(),nr())}function xl(){document.querySelectorAll("#video-properties input, #video-properties select, #text-properties input, #text-properties select, #text-properties textarea").forEach(e=>{e.addEventListener("input",Ol)}),vn==null||vn.addEventListener("click",Ml)}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ne(){is(null),ss(null),document.querySelectorAll(".timeline-clip.is-selected").forEach(t=>t.classList.remove("is-selected")),document.querySelectorAll(".text-overlay.is-selected").forEach(t=>t.classList.remove("is-selected")),Gt()}function Ul(t,e){ne(),is(t),e.classList.add("is-selected"),Gt()}function Ki(t,e){ne(),ss(t),e.classList.add("is-selected"),Gt()}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Ji(){L&&(L.style.aspectRatio=ar.replace(":"," / "),S.forEach(Ze))}function nr(){if(!I||!g)return;const t=I.properties;g.volume=t.volume;const e=`${t.position.x}%`,n=`${t.position.y}%`;g.style.transform=`translate(${e}, ${n}) scale(${t.scale}) rotate(${t.rotation}deg)`}function $e(t){!fn||!pn||(t?(fn.style.display="none",pn.style.display="block"):(fn.style.display="block",pn.style.display="none"))}function le(t,e=0,n=!1){if(!g)return;const r=n||!g.paused;Xr(!0),g.pause(),g.src=t.url,rs(t),nr(),g.addEventListener("loadeddata",()=>{g&&(g.currentTime=t.sourceStart+e,r&&g.play().catch(i=>{console.error("Playback failed:",i),$e(!1)}),Xr(!1),k())},{once:!0})}function Ze(t){if(!L)return;const e=t.element;e.style.fontFamily=t.fontFamily,e.style.color=t.color;const n=L.offsetHeight,r=t.fontSize/500*n;e.style.fontSize=`${r}px`,e.style.left=t.position.left,e.style.top=t.position.top,e.style.transform="translate(-50%, -50%)"}function Xi(t,e){if(t.preventDefault(),document.body.classList.add("is-dragging-overlay"),!L)return;const n=L.getBoundingClientRect(),r=s=>{const o=s.clientX-n.left,a=s.clientY-n.top,c=Math.max(0,Math.min(o,n.width)),l=Math.max(0,Math.min(a,n.height)),d=c/n.width*100,h=l/n.height*100;e.position.left=`${d}%`,e.position.top=`${h}%`,Ze(e)},i=()=>{document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",i),document.body.classList.remove("is-dragging-overlay")};document.addEventListener("mousemove",r),document.addEventListener("mouseup",i)}function $l(){if(!g)return;let t;const e=Oe.find(o=>o.type==="text");e?t=e.id:(t=es,Un("text"));const r=I?I.start+(g.currentTime-I.sourceStart):0,i=Math.min(r+4,v),s=ls({start:r,end:i,trackId:t});s&&(s.element.addEventListener("mousedown",o=>Xi(o,s)),L==null||L.appendChild(s.element),Ze(s),Ki(s.id,s.clipElement),k())}function Fl(){fe==null||fe.addEventListener("click",$l)}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Kt="select";function bn(t){Kt=t,Se==null||Se.classList.toggle("active",t==="select"),Te==null||Te.classList.toggle("active",t==="split"),p==null||p.classList.toggle("split-mode",t==="split"),t!=="split"&&Z&&(Z.style.display="none")}function Hl(t){if(Kt!=="split"||!Z||!p)return;const e=p.getBoundingClientRect(),n=t.clientX-e.left,r=Math.max(0,Math.min(n,e.width));Z.style.left=`${r}px`}function Bl(){bn("select"),Se==null||Se.addEventListener("click",()=>bn("select")),Te==null||Te.addEventListener("click",()=>bn("split")),p==null||p.addEventListener("mousemove",Hl),p==null||p.addEventListener("mouseenter",()=>{Kt==="split"&&Z&&(Z.style.display="block")}),p==null||p.addEventListener("mouseleave",()=>{Z&&(Z.style.display="none")})}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function rr(){if(!O||!p||(O.innerHTML="",v<=0))return;const e=p.offsetWidth/v;let n=1;e<10?n=10:e<40&&(n=5);for(let r=0;r<=v;r+=n){const i=r/v*100;if(i>100)continue;const s=document.createElement("div");s.className="ruler-tick major",s.style.left=`${i}%`;const o=document.createElement("span");o.textContent=On(r),s.appendChild(o),O.appendChild(s)}}function k(){if(or||!g)return;let t=0;I&&(t=I.start+(g.currentTime-I.sourceStart)),Vr&&(Vr.textContent=On(t)),qr&&(qr.textContent=On(v));const e=v>0?t/v*100:0;if(Le&&(Le.style.left=`${e}%`),S.forEach(n=>{const r=t>=n.start&&t<n.end;n.element.style.display=r?"block":"none"}),document.querySelectorAll(".timeline-clip.video-clip.active").forEach(n=>n.classList.remove("active")),I&&b){const n=b.querySelector(`.video-clip[data-clip-id="${I.id}"]`);n&&n.classList.add("active")}}function xe(){let t=0;m.forEach(n=>{n.start=t,n.end=t+n.duration,t+=n.duration});const e=t;v<e&&Xt(Math.ceil(e)),rr()}function Vl(){g&&(g.pause(),g.src="",g.style.display="none",bt&&(bt.style.display="block"),he&&(he.disabled=!0),fe&&(fe.disabled=!0),Le&&(Le.style.display="none"),rs(null),Xt(0),S.forEach(t=>t.element.remove()),S.length=0,as("9:16"),Ji(),P(),k())}function ql(t){if(id(t),re===t&&ne(),m.length===0){Vl();return}(I==null?void 0:I.id)===t&&le(m[0]),xe(),P(),k()}async function Mn(t,e,n=5,r=0){return new Promise(i=>{const s=document.createElement("video");s.crossOrigin="anonymous";const o=document.createElement("canvas"),a=o.getContext("2d"),c=[];if(!a)return i([]);s.onloadedmetadata=()=>{o.width=s.videoWidth,o.height=s.videoHeight,s.currentTime=r+.01};let l=0;s.onseeked=()=>{if(a.drawImage(s,0,0,o.width,o.height),c.push(o.toDataURL("image/jpeg",.7)),l++,l>=n)s.src="",i(c);else{const d=r+e/(n>1?n-1:1)*l;s.currentTime=Math.min(d,r+e-.01)}},s.onerror=d=>{console.error("Error generating thumbnails.",d),i([])},s.src=t})}function Yi(t,e){t.innerHTML="",t.style.padding="0";const n=document.createElement("div");n.className="thumbnail-strip",e.forEach(i=>{const s=document.createElement("div");s.className="thumbnail-frame",s.style.backgroundImage=`url(${i})`,n.appendChild(s)}),t.appendChild(n);const r=document.createElement("button");r.className="remove-clip-btn",r.innerHTML='<i class="fa-solid fa-xmark"></i>',r.onclick=i=>{i.stopPropagation(),ql(parseInt(t.dataset.clipId,10))},t.appendChild(r)}function ir(t){if(v===0)return;const e=t.start/v*100,n=(t.end-t.start)/v*100;t.clipElement.style.left=`${e}%`,t.clipElement.style.width=`${n}%`;const r=Array.from(t.clipElement.childNodes).find(i=>i.nodeType===Node.TEXT_NODE);r?r.textContent=t.text:t.clipElement.prepend(document.createTextNode(t.text))}function P(){if(!(!b||!Ce)){if(b.innerHTML="",Ce.innerHTML="",Oe.length===0){b.innerHTML='<div class="timeline-track"><div class="timeline-placeholder">Add a track to get started</div></div>';return}Oe.forEach(t=>{const e=document.createElement("div");e.className="track-header";const n=t.type==="video"?"fa-video":"fa-font";e.innerHTML=`<span>${t.type.charAt(0).toUpperCase()}${t.type.slice(1,2)}</span> <i class="fa-solid ${n}"></i>`;const r=document.createElement("button");r.className="delete-track-btn",r.innerHTML="&times;",r.title=`Delete ${t.type} track`,r.dataset.trackId=String(t.id),e.appendChild(r),Ce.appendChild(e);const i=document.createElement("div");if(i.className="timeline-track",i.dataset.trackId=String(t.id),i.dataset.trackType=t.type,t.type==="video"){const s=m.filter(o=>o.trackId===t.id);s.length===0&&(i.innerHTML='<div class="timeline-placeholder">Drag clips from the Media Bin here</div>'),s.forEach(o=>{const a=document.createElement("div");a.className="timeline-clip video-clip",o.id===re&&a.classList.add("is-selected"),a.draggable=!0,a.dataset.clipId=String(o.id);const c=o.start/v*100,l=o.duration/v*100;a.style.left=`${c}%`,a.style.width=`${l}%`,o.thumbnails&&o.thumbnails.length>0?Yi(a,o.thumbnails):a.textContent=`Loading Clip #${o.id+1}...`;const d=document.createElement("div");d.className="resize-handle left",d.addEventListener("mousedown",u=>Jr(u,o)),a.appendChild(d);const h=document.createElement("div");h.className="resize-handle right",h.addEventListener("mousedown",u=>Jr(u,o)),a.appendChild(h),a.addEventListener("click",()=>Ul(o.id,a)),a.addEventListener("dragstart",u=>jl(u,o)),a.addEventListener("dragend",Gl),i.appendChild(a)})}else S.filter(o=>o.trackId===t.id).forEach(o=>{ir(o),o.id===De&&o.clipElement.classList.add("is-selected"),o.clipElement.addEventListener("mousedown",zl),o.clipElement.addEventListener("click",()=>Ki(o.id,o.clipElement)),i.appendChild(o.clipElement)});b.appendChild(i)})}}async function Wl(t,e,n){const r=document.createElement("video");r.src=t.url,r.addEventListener("loadedmetadata",async()=>{const i=r.duration,s={...t,trackId:e,duration:i,sourceDuration:i,sourceStart:0,start:0,end:0,thumbnails:[],properties:{volume:1,scale:1,position:{x:0,y:0},rotation:0}};m.length===0&&(as("9:16"),Xt(Math.ceil(i)),Ji()),cs(s,n),xe(),m.length===1&&(le(m[0]),bt&&(bt.style.display="none"),g&&(g.style.display="block"),he&&(he.disabled=!1),fe&&(fe.disabled=!1),Le&&(Le.style.display="block")),P(),k();const o=await Mn(s.url,i,5,0);s.thumbnails=o;const a=b==null?void 0:b.querySelector(`.video-clip[data-clip-id="${s.id}"]`);a&&Yi(a,o)},{once:!0})}function Kr(t){if(Kt==="split"){Xl(t);return}if(t.target.closest(".timeline-clip")||(ne(),v===0||!O||!g))return;const n=O.getBoundingClientRect(),r=t.clientX-n.left,s=Math.max(0,Math.min(1,r/n.width))*v,o=m.find(a=>s>=a.start&&s<a.end);if(o){const a=s-o.start;(I==null?void 0:I.id)!==o.id?le(o,a,!g.paused):(g.currentTime=o.sourceStart+a,k())}}function Jr(t,e){if(t.preventDefault(),t.stopPropagation(),!b)return;const r=t.target.classList.contains("left")?"left":"right";document.body.classList.add("is-resizing");const i=t.clientX,s={start:e.start,duration:e.duration,sourceStart:e.sourceStart},o=l=>l/b.offsetWidth*v,a=l=>{const d=o(l.clientX-i);if(r==="right"){const h=s.duration+d;e.duration=Math.max(.1,Math.min(h,e.sourceDuration-e.sourceStart))}else{let h=d;s.duration-h<.1&&(h=s.duration-.1),s.start+h<0&&(h=-s.start),s.sourceStart+h<0&&(h=-s.sourceStart),e.start=s.start+h,e.sourceStart=s.sourceStart+h,e.duration=s.duration-h}xe(),P(),k()},c=()=>{document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",c),document.body.classList.remove("is-resizing")};document.addEventListener("mousemove",a),document.addEventListener("mouseup",c)}function zl(t){const e=t.currentTarget,n=t.target;if(!n.classList.contains("resize-handle"))return;t.preventDefault(),t.stopPropagation();const r=parseInt(e.dataset.overlayId,10),i=S.find(h=>h.id===r);if(!i||!b)return;document.body.classList.add("is-resizing");const s=n.classList.contains("left")?"left":"right",o=t.clientX,a={start:i.start,end:i.end},c=h=>h/b.offsetWidth*v,l=h=>{const u=c(h.clientX-o);if(s==="right"){const y=a.end+u;i.end=Math.max(i.start+.1,Math.min(y,v))}else{const y=a.start+u;i.start=Math.max(0,Math.min(y,i.end-.1))}ir(i)},d=()=>{document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",d),document.body.classList.remove("is-resizing"),k()};document.addEventListener("mousemove",l),document.addEventListener("mouseup",d)}function jl(t,e){t.stopPropagation(),t.dataTransfer&&(t.dataTransfer.setData("text/plain",String(e.id)),t.dataTransfer.setData("source","timeline")),os(e.id),setTimeout(()=>t.target.classList.add("is-ghost"),0)}function Gl(t){t.target.classList.remove("is-ghost"),os(null)}function sr(){let t=document.getElementById("insertion-marker");return t||(t=document.createElement("div"),t.id="insertion-marker",t.className="insertion-marker",p==null||p.appendChild(t)),t}function Kl(t){var l;if(t.preventDefault(),!p||!b)return;const e=sr(),r=t.target.closest(".timeline-track");if(document.querySelectorAll(".timeline-track.drop-disallowed").forEach(d=>d.classList.remove("drop-disallowed")),!r){e.style.display="none",de(-1);return}if(((l=t.dataTransfer)==null?void 0:l.getData("source"))!=="text"&&r.dataset.trackType==="text"){e.style.display="none",r.classList.add("drop-disallowed"),de(-1);return}if(p.classList.add("drop-target-active"),e.style.display="block",e.style.top=`${r.offsetTop}px`,v===0){de(0),e.style.left="0px";return}const s=b.offsetWidth,o=t.clientX-b.getBoundingClientRect().left;let a=m.length;for(let d=0;d<m.length;d++){const h=m[d];if(h.id===Qi)continue;const u=(h.start+h.duration/2)/v*s;if(o<u){a=d;break}}de(a);let c=0;a<m.length?c=m[a].start/v*s:m.length>0&&(c=m[m.length-1].end/v*s),e.style.left=`${c}px`}function Jl(t){var o,a;t.preventDefault(),p==null||p.classList.remove("drop-target-active"),document.querySelectorAll(".timeline-track.drop-disallowed").forEach(c=>c.classList.remove("drop-disallowed")),sr().style.display="none";const e=(o=t.dataTransfer)==null?void 0:o.getData("source"),n=parseInt((a=t.dataTransfer)==null?void 0:a.getData("text/plain"),10),r=t.target.closest(".timeline-track");if(isNaN(n)||!r)return de(-1);const i=parseInt(r.dataset.trackId,10);let s=xn>-1?xn:m.length;if(e==="timeline"){const c=m.find(d=>d.id===n);if(!c)return;c.trackId=i;const l=m.findIndex(d=>d.id===n);m.splice(l,1),l<s&&s--,m.splice(s,0,c),xe(),P(),k()}else{const c=Ne.find(l=>l.id===n);c&&Wl(c,i,s)}de(-1)}function Xl(t){if(v===0||!O)return;const e=t.target.closest(".timeline-clip");if(!e)return;const r=(t.clientX-O.getBoundingClientRect().left)/O.offsetWidth*v;if(e.classList.contains("video-clip")){const i=parseInt(e.dataset.clipId,10);Yl(i,r)}else if(e.classList.contains("text-clip")){const i=parseInt(e.dataset.overlayId,10);Zl(i,r)}}async function Yl(t,e){const n=m.findIndex(c=>c.id===t);if(n===-1)return;const r=m[n];if(e<=r.start+.1||e>=r.end-.1)return;ne();const i=e-r.start,s={...r,id:Jt,start:e,end:r.end,duration:r.end-e,sourceStart:r.sourceStart+i,thumbnails:[]};cr(),r.end=e,r.duration=i,r.thumbnails=[],cs(s,n+1),P(),k();const[o,a]=await Promise.all([Mn(r.url,r.duration,5,r.sourceStart),Mn(s.url,s.duration,5,s.sourceStart)]);r.thumbnails=o,s.thumbnails=a,P()}function Zl(t,e){const n=S.findIndex(o=>o.id===t);if(n===-1)return;const r=S[n];if(e<=r.start+.1||e>=r.end-.1)return;ne();const i=r.end;r.end=e;const s=ls({start:e,end:i,trackId:r.trackId});s&&(s.text=r.text,s.fontFamily=r.fontFamily,s.color=r.color,s.fontSize=r.fontSize,s.position={...r.position},s.element.addEventListener("mousedown",o=>Xi(o,s)),L==null||L.appendChild(s.element)),P(),k()}function Ql(){p==null||p.addEventListener("mousedown",Kr),O==null||O.addEventListener("mousedown",Kr),p==null||p.addEventListener("dragover",Kl),p==null||p.addEventListener("drop",Jl),p==null||p.addEventListener("dragleave",t=>{t.relatedTarget&&(p!=null&&p.contains(t.relatedTarget))||(p==null||p.classList.remove("drop-target-active"),document.querySelectorAll(".timeline-track.drop-disallowed").forEach(e=>e.classList.remove("drop-disallowed")),sr().style.display="none",de(-1))})}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Zi="",S=[],ed=0,v=0,Ne=[],Jt=0,qt=0,m=[],I=null,or=!1,xn=-1,re=null,De=null,Qi=null,ar="9:16",Oe=[{id:0,type:"video"}],es=1;const ts=t=>Zi=t,td=t=>t,Xt=t=>v=t,ns=t=>Ne.push(t),cr=()=>Jt++,nd=()=>qt++,rd=()=>qt=0,rs=t=>I=t,Xr=t=>or=t,de=t=>xn=t,is=t=>re=t,ss=t=>De=t,os=t=>Qi=t,as=t=>ar=t;function cs(t,e){m.splice(e,0,t)}function id(t){m=m.filter(e=>e.id!==t)}function Un(t){Oe.push({id:es++,type:t}),P()}function sd(t){Oe=Oe.filter(n=>n.id!==t),m=m.filter(n=>n.trackId!==t),S.filter(n=>n.trackId===t).forEach(n=>n.element.remove()),S=S.filter(n=>n.trackId!==t),re&&m.every(n=>n.id!==re)&&ne(),De&&S.every(n=>n.id!==De)&&ne(),P()}function ls(t){const e=ed++,n={id:e,trackId:t.trackId,text:"New Caption",start:t.start,end:t.end,element:document.createElement("div"),clipElement:document.createElement("div"),fontFamily:"Google Sans",color:"#ffffff",fontSize:40,position:{top:"50%",left:"50%"}};n.element.className="text-overlay",n.element.textContent=n.text,n.clipElement.className="timeline-clip text-clip",n.clipElement.textContent=n.text,n.clipElement.dataset.overlayId=String(e);const r=document.createElement("div");r.className="resize-handle left",n.clipElement.appendChild(r);const i=document.createElement("div");return i.className="resize-handle right",n.clipElement.appendChild(i),S.push(n),P(),n}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ds(){if(U){if(U.innerHTML="",Ne.length===0){U.innerHTML=`
            <div class="placeholder">
              Add clips from the Generator to see them here.
            </div>`;return}Ne.forEach(t=>{const e=document.createElement("div");e.className="media-clip",e.draggable=!0,e.dataset.clipId=String(t.id);const n=document.createElement("video");n.src=t.url,n.muted=!0,n.loop=!0,n.oncanplay=()=>n.play();const r=document.createElement("div");r.className="media-clip-title",r.textContent=`Clip #${t.id+1}`,e.appendChild(n),e.appendChild(r),U.appendChild(e)})}}async function od(t){const e=t.target,n=e.files;if(!(!n||n.length===0)){for(const r of n){if(!r.type.startsWith("video/")){console.warn(`Skipping non-video file: ${r.name}`);continue}const i=URL.createObjectURL(r),s={id:Jt,url:i,blob:r};cr(),ns(s)}ds(),e.value=""}}function ad(t){const e=t.target;e.classList.contains("media-clip")&&t.dataTransfer&&(t.dataTransfer.setData("text/plain",e.dataset.clipId),t.dataTransfer.setData("source","media-bin"),e.classList.add("is-dragging"))}function cd(t){const e=t.target;e.classList.contains("media-clip")&&e.classList.remove("is-dragging")}function ld(){hn==null||hn.addEventListener("change",od),U==null||U.addEventListener("dragstart",ad),U==null||U.addEventListener("dragend",cd)}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Yr(t){Ve&&(Ve.disabled=t),un==null||un.querySelectorAll("input, textarea, select, button").forEach(e=>e.disabled=t),t&&E&&(E.innerHTML=`
      <div>
        <div class="loader"></div>
        <p>Generating video, please wait...</p>
        <p style="font-size: 0.9em; color: var(--text-muted-color)">(This may take a minute or two)</p>
      </div>`,E.style.display="flex")}function dd(t){E&&(E.innerHTML=`<p class="error">${t}</p>`,E.style.display="flex");let e="An Unknown Error Occurred",n=`<p>An unexpected error occurred:</p><p><code>${t}</code></p>`;Wr&&(Wr.innerHTML=n);const r=oe==null?void 0:oe.querySelector(".modal-title");r&&(r.textContent=e),oe&&(oe.style.display="flex")}function Sn(t){t==="generator-view"?(nt&&(nt.style.display="block"),rt&&(rt.style.display="none"),H==null||H.classList.add("active"),B==null||B.classList.remove("active")):(nt&&(nt.style.display="none"),rt&&(rt.style.display="flex"),H==null||H.classList.remove("active"),B==null||B.classList.add("active"),rd(),lr(),ds(),P()),document.body.classList.toggle("generator-active",t==="generator-view")}function lr(){tt&&(qt>0?(tt.style.display="block",tt.textContent=String(qt)):tt.style.display="none")}function ud(){Ft&&Ht&&(Ht.value=String(v>0?v:15),Ft.style.display="flex")}function us(){Ft&&(Ft.style.display="none")}function hd(){if(Ht){const t=parseInt(Ht.value,10);if(!isNaN(t)&&t>0&&t<=60){const e=m.reduce((n,r)=>n+r.duration,0);Xt(Math.max(t,Math.ceil(e))),xe(),P(),rr(),k()}else alert("Please enter a valid duration between 1 and 60 seconds.")}us()}function fd(){oe&&(oe.style.display="none")}function pd(){const i=(s,o)=>{s==null||s.addEventListener("mousedown",a=>{a.preventDefault();const c=a.clientX,l=a.clientY,d=u=>{o(u.clientX-c,u.clientY-l)},h=()=>{window.removeEventListener("mousemove",d),window.removeEventListener("mouseup",h),document.body.className=document.body.className.replace(/is-resizing(-\w)?/g,"")};window.addEventListener("mousemove",d),window.addEventListener("mouseup",h)})};i(Kc,s=>{if(document.body.classList.add("is-resizing-v"),!_e||!ie||!Ie)return;const o=(_e.offsetWidth||0)+s;o>=150&&ie.offsetWidth-o-Ie.offsetWidth>=300&&(_e.style.width=`${o}px`,_e.style.flexBasis="auto")}),i(Jc,s=>{if(document.body.classList.add("is-resizing-v"),!Ie||!ie||!_e)return;const o=(Ie.offsetWidth||0)-s;o>=150&&ie.offsetWidth-o-_e.offsetWidth>=300&&(Ie.style.width=`${o}px`,Ie.style.flexBasis="auto")}),i(Xc,(s,o)=>{document.body.classList.add("is-resizing-h");const a=ie==null?void 0:ie.parentElement;if(!a||!it)return;const c=(it.offsetHeight||0)-o;c>80&&c<a.offsetHeight-200&&(it.style.height=`${c}px`,it.style.flexBasis="auto",S.forEach(Ze),rr())})}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Zr(t){const e=document.createElement("div");e.className="video-container";const n=document.createElement("video");n.src=t.url,n.autoplay=!0,n.loop=!0,n.controls=!1,n.muted=!0;const r=document.createElement("div");r.className="video-actions";const i=document.createElement("button");i.innerText="Download",i.className="video-action-button",i.onclick=()=>{const o=document.createElement("a");o.href=t.url,o.download=`video-${Date.now()}.mp4`,document.body.appendChild(o),o.click(),document.body.removeChild(o)};const s=document.createElement("button");return s.innerText="Add to Editor",s.className="video-action-button add-to-editor-btn",s.dataset.clipId=String(t.id),Ne.some(o=>o.id===t.id)&&(s.innerText="Added ✓",s.disabled=!0),s.onclick=()=>{Ne.some(o=>o.id===t.id)||(ns(t),nd(),lr()),document.querySelectorAll(`.add-to-editor-btn[data-clip-id='${t.id}']`).forEach(o=>{o.innerText="Added ✓",o.disabled=!0})},r.appendChild(i),r.appendChild(s),e.appendChild(n),e.appendChild(r),e}async function md(t){if(Hr&&(Hr.style.display="none"),E&&(E.innerHTML="",E.style.display="block"),t.length===0){E&&(E.innerHTML="<p>No videos were generated. Please try a different prompt.</p>");return}for(const e of t)try{const n=e.bytesBase64Encoded;if(!n)throw new Error("Video is missing base64 data.");const r=`data:video/mp4;base64,${n}`,i=await fetch(r);if(!i.ok)throw new Error(`Failed to fetch video: ${i.statusText}`);const s=await i.blob(),o=URL.createObjectURL(s),a={id:Jt,url:o,blob:s};cr();const c=Zr(a);E==null||E.appendChild(c);const l=Zr(a);ve==null||ve.prepend(l)}catch(n){console.error("Error processing video:",n);const r=n instanceof Error?n.message:"Unknown error",i=document.createElement("p");i.textContent=`Could not load video. (${r})`,i.className="error",ve==null||ve.prepend(i.cloneNode(!0)),E==null||E.appendChild(i.cloneNode(!0))}}async function gd(){if(!Ue)return;const t=Ue.value.trim();if(!t){alert("Please describe your idea in the first text box to generate a detailed prompt."),Ue.focus();return}A&&(A.disabled=!0),Ue.disabled=!0;const e=A==null?void 0:A.innerHTML;A&&(A.innerHTML='<div class="loader"></div> Generating...');try{if(!zi(Yn).currentUser){alert("You must be signed in to generate ideas.");return}const i=await Nl(t);ce&&(ce.value=i,ce.focus())}catch(n){console.error("Failed to generate prompt ideas:",n);const r=n instanceof Error?n.message:"Unknown error";alert(`Could not generate a new idea. ${r}`)}finally{A&&(A.disabled=!1,e&&(A.innerHTML=e)),Ue.disabled=!1}}async function yd(){if(!(ce!=null&&ce.value.trim())){alert("Please enter a prompt.");return}Yr(!0),Br&&(Br.style.display="none");try{const t=await Rl(ce.value,Zi,ar,e=>{const n=E==null?void 0:E.querySelector("p");n&&(n.textContent=e)});await md(t)}catch(t){console.error(t);const e=t instanceof Error?t.message:String(t);dd(e)}finally{Yr(!1)}}async function vd(t){var n;const e=(n=t.target.files)==null?void 0:n[0];if(e)try{const r=await Dl(e);ts(r),td(e.type),wt&&(wt.src=URL.createObjectURL(e)),Et&&(Et.style.display="block")}catch(r){console.error("Error reading file:",r),alert("Could not read the selected file.")}}function _d(){Be&&(Be.value=""),ts(""),wt&&(wt.src=""),Et&&(Et.style.display="none")}function Id(){Ve==null||Ve.addEventListener("click",yd),A==null||A.addEventListener("click",gd),Be==null||Be.addEventListener("change",vd),dn==null||dn.addEventListener("click",_d)}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */window.addEventListener("DOMContentLoaded",()=>{document.title="AI YouTube Shorts Creator",sl(),Id(),ld(),Fl(),xl(),Ql(),Bl(),pd(),H==null||H.addEventListener("click",()=>Sn("generator-view")),B==null||B.addEventListener("click",()=>Sn("editor-view")),he==null||he.addEventListener("click",()=>{if(g)if(g.paused){const t=I?I.start+(g.currentTime-I.sourceStart):0;if(v>0&&Math.abs(t-v)<.1){m.length>0&&le(m[0],0,!0);return}!I&&m.length>0?le(m[0],0,!0):I&&g.play().catch(console.error)}else g.pause()}),g==null||g.addEventListener("timeupdate",k),g==null||g.addEventListener("play",()=>$e(!0)),g==null||g.addEventListener("pause",()=>$e(!1)),g==null||g.addEventListener("ended",()=>{if(or||!I){$e(!1);return}const e=m.findIndex(n=>n.id===I.id)+1;e<m.length?le(m[e],0,!0):($e(!1),m.length>0&&le(m[0],0,!1))}),gn==null||gn.addEventListener("click",()=>Un("video")),yn==null||yn.addEventListener("click",()=>Un("text")),Ce==null||Ce.addEventListener("click",t=>{const e=t.target;if(e.classList.contains("delete-track-btn")){const n=parseInt(e.dataset.trackId,10);sd(n),xe(),k()}}),_n==null||_n.addEventListener("click",ud),In==null||In.addEventListener("click",hd),En==null||En.addEventListener("click",us),wn==null||wn.addEventListener("click",fd),mn==null||mn.addEventListener("click",()=>{alert("Export functionality is not yet implemented!")}),lr(),Sn("generator-view")});
