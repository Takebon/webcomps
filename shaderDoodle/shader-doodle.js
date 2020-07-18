'use strict';(function(B){"function"===typeof define&&define.amd?define(B):B()})(function(){function B(a){function b(a){console.log(a);k.add(a.targetElement)}function d(b){k.has(b.targetElement)?k.delete(b.targetElement):(b=a.createBufferSource(),b.buffer=a.createBuffer(1,1,a.sampleRate),b.connect(a.destination),b.start(0),"function"===typeof a.resume&&a.resume().then(c),e())}function c(){r.forEach(a=>{a()})}function e(){f.forEach(a=>{a.removeEventListener("touchstart",d);a.removeEventListener("touchmove",
b);a.removeEventListener("touchend",d);a.removeEventListener("mouseup",d)});f.clear();k.clear()}let k=new Set,f=new Set,r=[];return{onStart:function(c){"running"===a.state?(console.log("already"),c()):r.push(c)},register:function(a){a.addEventListener("touchstart",d);a.addEventListener("touchmove",b);a.addEventListener("touchend",d);a.addEventListener("mouseup",d);f.add(a)},dispose:e}}function Y(){function a(a){d[0].value[0]=a.alpha;d[0].value[1]=a.beta;d[0].value[2]=a.gamma}let b=!1,d=JSON.parse(JSON.stringify(I));
return{get ustate(){return d},setup:function(){b||(b=!0,"object"===typeof DeviceOrientationEvent&&"function"===typeof DeviceOrientationEvent.requestPermission?DeviceOrientationEvent.requestPermission().then(c=>{"granted"===c&&window.addEventListener("deviceorientation",a)}).catch(console.error):window.addEventListener("deviceorientation",a))},dispose:function(){window.removeEventListener("deviceorientation",a)}}}function Z(a){let b={},d=a.getExtension.bind(a);return{get:function(a){if(void 0!==b[a])return b[a];
let c=d(a)||d("MOZ_".concat(a))||d("WEBKIT_".concat(a));null===c&&console.warn("<shader-doodle /> ".concat(a," extension not supported."));return b[a]=c}}}function z(){function a(a,b){if(a>m||b>h)a=Math.max(a,m),b=Math.max(b,h),a!==m&&(m=a,c.width=Math.floor(1*m)),b!==h&&(h=b,c.height=Math.floor(1*h))}function b(a){let c=p?(a-p)/1E3:0;p=a;u[0].value+=c;u[1].value=c;u[3].value++;a=new Date;u[2].value[0]=a.getFullYear();u[2].value[1]=a.getMonth()+1;u[2].value[2]=a.getDate();u[2].value[3]=3600*a.getHours()+
60*a.getMinutes()+a.getSeconds()+.001*a.getMilliseconds()}function d(e){if(q.size){b(e);var f=[...u,...k.ustate];q.forEach(b=>b.render(c,a,m,h,1,f));l=requestAnimationFrame(d)}}let c=document.createElementNS("http://www.w3.org/1999/xhtml","canvas"),e=c.getContext("webgl")||c.getContext("experimental-webgl"),k=Y(),f=new (window.AudioContext||window.webkitAudioContext),r=new B(f);f.onStart=r.onStart;let m=0,h=0,l,p,q=new Set,u=JSON.parse(JSON.stringify(J)),t=Z(e);t.get("OES_texture_float");t.get("OES_texture_float_linear");
t.get("OES_texture_half_float");t.get("OES_texture_half_float_linear");e.clearColor(0,0,0,0);return Object.freeze({get gl(){return e},get wa(){return f},addSurface:function(a){r.register(a.dom);a.addClick(k.setup);q.add(a);l||(l=requestAnimationFrame(d))},removeSurface:function(a){q.delete(a)},dispose:function(){q.forEach(a=>a.dispose());q.clear();q=void 0;cancelAnimationFrame(l);k.dispose();r.dispose()}})}function aa(a,b){let d={},c=a.getProgramParameter(b,a.ACTIVE_ATTRIBUTES);for(let e=0;e<c;e++){let {name:c}=
a.getActiveAttrib(b,e);d[c]=a.getAttribLocation(b,c)}return d}function K(a){function b(c){a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,c?a.NEAREST:a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,c?a.NEAREST:a.LINEAR)}let d,c,e=a.createFramebuffer();a.bindFramebuffer(a.FRAMEBUFFER,e);let k=a.createTexture();if(!k)throw Error("createTexture returned null");a.bindTexture(a.TEXTURE_2D,
k);b(!0);a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,k,0);return{get handle(){return e},get texture(){return k},updateTexture:b,bind:function(){a.bindFramebuffer(a.FRAMEBUFFER,e);a.viewport(0,0,d,c)},updateResolution:function(b,e){if(b!==d||e!==c)d=b,c=e,a.bindTexture(a.TEXTURE_2D,k),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,b,e,0,a.RGBA,a.FLOAT,null)},dispose:function(){a.deleteFramebuffer(e);a.deleteTexture(k)}}}function L(a,b,d){b=a.createShader(b);a.shaderSource(b,d);a.compileShader(b);
if(!a.getShaderParameter(b,a.COMPILE_STATUS)){let c=a.getShaderInfoLog(b);a.deleteShader(b);console.warn(c,"\nin shader:\n",d)}return b}function F(a,b){if(a.length!==b.length)return!1;for(let d=0,c=a.length;d<c;d++)if(a[d]!==b[d])return!1;return!0}function G(a,b){for(let d=0,c=b.length;d<c;d++)a[d]=b[d]}function ba(a,b,d,c){a[0]!==c&&(d.uniform1f(b,c),a[0]=c)}function ca(a,b,d,c){a[0]!==c&&(d.uniform1i(b,c),a[0]=c)}function da(a,b,d,c){F(a,c)||(d.uniform2fv(b,c),G(a,c))}function ea(a,b,d,c){F(a,c)||
(d.uniform3fv(b,c),G(a,c))}function fa(a,b,d,c){F(a,c)||(d.uniform4fv(b,c),G(a,c))}function ha(a,b,d,c){a[0]!==c&&(d.uniform1i(b,c),a[0]=c)}function ia(a){switch(a){case 5124:return ca;case 5126:return ba;case 35664:return da;case 35665:return ea;case 35666:return fa;case 35678:case 36198:return ha}}function ja(a,b,d){let c=[],e=ia(b.type);return{get location(){return d},get name(){return b.name},setValue:function(){for(var b=arguments.length,f=Array(b),r=0;r<b;r++)f[r]=arguments[r];e(c,d,a,...f)}}}
function ka(a,b){let d={},c=a.getProgramParameter(b,a.ACTIVE_UNIFORMS);for(let k=0;k<c;k++){var e=a.getActiveUniform(b,k);let c=a.getUniformLocation(b,e.name);e=ja(a,e,c);d[e.name]=e}return d}function la(a,b){if(b){let b=a.match(M);a=a.replace("mainImage","main");a=a.replace(M,"()");a=(b?"#define ".concat(b[1]," gl_FragColor\n#define ").concat(b[2]," gl_FragCoord.xy\n"):"")+a}a=ma(na,b)+a;return"precision highp float;\n"+a}function oa(a,b,d,c){function e(a){let b=v[C(a,f,"name")];b&&b.setValue(C(a,
f,"value"))}function k(b){b.forEach(e);y.forEach(a=>a.update(e));n&&v.u_prevbuffer&&(b=v.u_prevbuffer)&&(b.setValue(w),a.activeTexture(a["TEXTURE".concat(w)]),a.bindTexture(a.TEXTURE_2D,n.texture),n.updateTexture());x.forEach(b=>{v[b.name].setValue(b.u);a.activeTexture(a["TEXTURE".concat(b.u)]);a.bindTexture(a.TEXTURE_2D,b.fbo.texture);b.fbo.updateTexture()})}let f=4<arguments.length&&void 0!==arguments[4]?arguments[4]:!1,r=pa++,m=a.createProgram(),h=a.createBuffer();var l=L(a,a.VERTEX_SHADER,b);
let p=L(a,a.FRAGMENT_SHADER,la(d,f));a.attachShader(m,l);a.attachShader(m,p);a.linkProgram(m);let q,u,t,n,w,g=aa(a,m),v=ka(a,m),x=new Set,y=new Set,H=0;if(!a.getProgramParameter(m,a.LINK_STATUS)){let b=a.getProgramInfoLog(m);console.warn(b)}a.detachShader(m,l);a.detachShader(m,p);a.deleteShader(l);a.deleteShader(p);l=g.position;a.bindBuffer(a.ARRAY_BUFFER,h);a.bufferData(a.ARRAY_BUFFER,c,a.STATIC_DRAW);a.enableVertexAttribArray(l);a.vertexAttribPointer(l,2,a.FLOAT,!1,0,0);return{get id(){return r},
get nodes(){return x},get fbo(){return t},get name(){return q},get u(){return u},render:function(b,c,d){x.size&&x.forEach(a=>a.render(b,c,d));if(t){if(n){let a=t;t=n;n=a;n.bind();n.updateResolution(b,c)}t.updateResolution(b,c);t.bind()}else a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,b,c);a.clear(a.COLOR_BUFFER_BIT);a.useProgram(m);k(d);a.drawArrays(a.TRIANGLES,0,6)},addNode:function(a,b,c){a.toFbo(b,H++,c);x.add(a)},removeNode:function(a){x.delete(a)},addTexture:function(a){y.add(a)},removeTexture:function(a){y.delete(a)},
getTexUnit:function(){return H++},update:k,toFbo:function(b,c,d){q=b;u=c;t=K(a);d&&(n=K(a),w=H++)},dispose:function(){y.forEach(a=>a.dispose());y.clear();a.deleteProgram(m)}}}function N(a,b){function d(){a.getParameter(a.ACTIVE_TEXTURE)!==b&&a.activeTexture(a["TEXTURE".concat(b)])}function c(){d();a.bindTexture(f,r)}function e(b){if("object"===typeof b){Object.assign(m,b);c();var {level:d,internalFormat:e,offsetX:t,offsetY:n,width:k,height:g,border:v,format:p,type:y,flipY:r,buffer:z,pixels:A}=m;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,
r);if(A){{({pixels:b}=m);let c=a.getTexParameter(f,a.TEXTURE_WRAP_S),d=a.getTexParameter(f,a.TEXTURE_WRAP_T),e=a.getTexParameter(f,a.TEXTURE_MIN_FILTER),g=D(b.width)&&D(b.height);c===a.CLAMP_TO_EDGE&&d===a.CLAMP_TO_EDGE&&(e===a.LINEAR||e===a.NEAREST)||g||(l||(l=document.createElement("canvas"),l.width=2**Math.floor(Math.log(b.width)/Math.LN2),l.height=2**Math.floor(Math.log(b.height)/Math.LN2),console.warn("Texture is not power of two ".concat(b.width," x ").concat(b.height,". Resized to ").concat(l.width,
" x ").concat(l.height,";"))),l.getContext("2d").drawImage(b,0,0,l.width,l.height));h=l||b}}"number"===typeof t&&"number"===typeof n?h?a.texSubImage2D(f,d,t,n,p,y,h):a.texSubImage2D(f,d,t,n,k,g,p,y,z):h?a.texImage2D(f,d,e,p,y,h):a.texImage2D(f,d,e,k,g,v,p,y,z);h&&D(h.width)&&D(h.height)&&(b=a.getTexParameter(f,a.TEXTURE_MIN_FILTER),b!==a.LINEAR&&b!==a.NEAREST&&a.generateMipmap(f))}}let k=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},f=a.TEXTURE_2D,r=a.createTexture(),m={},h,l;e(Object.assign({level:0,
internalFormat:a.RGBA,offsetX:null,offsetY:null,width:1,height:1,border:0,format:a.RGBA,type:a.UNSIGNED_BYTE,flipY:!0,buffer:qa,pixels:null},"object"===typeof k?k:{}));return{bind:c,setParameters:function(b){d();b.forEach(b=>{let [c,d]=b;a.texParameteri(f,c,d)})},update:e,dispose:function(){a.deleteTexture(r)}}}function ra(a){return new Promise((b,d)=>{let c=new XMLHttpRequest;c.open("GET",a,!0);c.responseType="arraybuffer";c.onreadystatechange=()=>{c.readyState===XMLHttpRequest.DONE&&(200===c.status||
206===c.status?b(c.response):(console.log(c),d(c.status)))};c.send()})}function sa(a,b){return new Promise((d,c)=>{b.decodeAudioData(a,d,c)})}function ta(a,b,d,c,e,k,f,r){async function m(){g=p.createBufferSource();g.buffer=await sa(await ra(c),p);g.loop=k;g.start();v=!0}function h(){let a=document.querySelector(c);a&&a instanceof HTMLAudioElement&&(w=a,g=p.createMediaElementSource(a))}function l(a,b){a.connect(q);q.connect(b)}e=a.gl;let p=a.wa,q=p.createAnalyser();q.fftSize=1024;let u=new Uint8Array(q.frequencyBinCount),
t=new Uint8Array(q.frequencyBinCount),n=N(e,b,{internalFormat:e.LUMINANCE,width:t.length,height:2,format:e.LUMINANCE,buffer:null});n.setParameters([[e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE],[e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE],[e.TEXTURE_MIN_FILTER,e.NEAREST]]);let w,g,v=!1,x=[{name:d,value:b}];"#"===c[0]?h():c&&m();g&&l(g,p.destination);return{update:function(a){x.forEach(a);if(v||w&&2<w.readyState&&!w.paused&&!w.ended&&w.currentTime)q.getByteFrequencyData(u),q.getByteTimeDomainData(t),n.update({offsetX:0,
offsetY:0,height:1,buffer:u}),n.update({offsetX:0,offsetY:1,height:1,buffer:t})}}}function O(a,b){var d=Object.keys(a);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(a);b&&(c=c.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable}));d.push.apply(d,c)}return d}function P(a){let b=document.createElement("div");b.style.width=b.style.height="1px";b.style.overflow="hidden";b.style.position="absolute";b.style.opacity="0";b.style.pointerEvents="none";b.style.zIndex=
"-1000";b.appendChild(a);document.body.appendChild(b)}function ua(a,b,d,c,e,k,f,r,m,h){function l(){v=0;g=new Image;g.crossOrigin="anonymous";g.onload=p;g.onerror=()=>{console.warn("failed loading src: ".concat(c))};g.src=c}function p(){t();w.setParameters([[n.TEXTURE_WRAP_S,k],[n.TEXTURE_WRAP_T,f],[n.TEXTURE_MIN_FILTER,r],[n.TEXTURE_MAG_FILTER,m]]);w.update({pixels:g})}function q(){t();w.setParameters([[n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE],[n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE],[n.TEXTURE_MIN_FILTER,n.LINEAR]])}
function u(){v=2;let a=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia,b=a=>{g=document.createElement("video");g.width=320;g.height=240;g.autoplay=!0;g.srcObject=a;P(g);q()},c=()=>{navigator.mediaDevices.getUserMedia({video:!0}).then(b).catch(a=>console.log(a.name+": "+a.message))},d=()=>{a({video:!0},b,a=>a)};navigator.mediaDevices&&navigator.mediaDevices.getUserMedia?c():a&&d()}function t(){g&&(x[1].value[0]=g.width,x[1].value[1]=g.height)}let n=a.gl,w=N(n,b),g,v,
x=[{name:d,value:b},{name:d+"_resolution",value:[0,0]}];if(e)u();else if(va.test(c))v=1,g=document.createElement("video"),g.autoplay=!0,g.muted=!0,g.loop=!0,g.playsInline=!0,g.crossOrigin="anonymous",g.src=c,P(g),q(),g.play();else if(wa.test(c))l();else{try{g=document.querySelector(c)}catch(y){console.warn("src: ".concat(c,": invalid selector"))}g?g instanceof HTMLImageElement?(v=0,g.complete?p():g.addEventListener("load",p)):g instanceof HTMLVideoElement?(v=1,q()):g instanceof HTMLCanvasElement?
(v=3,p()):console.warn("src: ".concat(c,": element is not a valid texture source")):console.warn("src: ".concat(c,": no element could be selected"))}return{update:function(a){x.forEach(a);h||(2===v||1===v)&&g instanceof HTMLVideoElement&&g.readyState===g.HAVE_ENOUGH_DATA?w.update({pixels:g}):w.bind()}}}function xa(a,b){function d(a){m.forEach(a=>"function"===typeof a&&a());u=!0;a=Q(a);let {top:b,left:c,height:d}=l;h[2].value[0]=h[2].value[2]=a[0]-Math.floor(c);h[2].value[1]=h[2].value[3]=Math.floor(d)-
(a[1]-Math.floor(b))}function c(a){if(!q){a=Q(a);let {top:b,left:c,height:d}=l;h[1].value[0]=a[0]-Math.floor(c);h[1].value[1]=Math.floor(d)-(a[1]-Math.floor(b));u&&(h[2].value[0]=h[1].value[0],h[2].value[1]=h[1].value[1]);q=!0}}function e(a){u=!1;1===Math.sign(h[2].value[2])&&(h[2].value[2]*=-1);1===Math.sign(h[2].value[3])&&(h[2].value[3]*=-1)}function k(){let a=f.getBoundingClientRect();p=0<=a.top+a.height&&0<=a.left+a.width&&a.bottom-a.height<=(window.innerHeight||document.documentElement.clientHeight)&&
a.right-a.width<=(window.innerWidth||document.documentElement.clientWidth);a.width!==l.width&&(f.width=h[0].value[0]=a.width);a.height!==l.height&&(f.height=h[0].value[1]=a.height);l=a}let f=a instanceof HTMLCanvasElement?a:document.createElementNS("http://www.w3.org/1999/xhtml","canvas"),r=f.getContext("2d"),m=new Set,h=JSON.parse(JSON.stringify(R)),l={},p,q,u;f.addEventListener("mousedown",d);f.addEventListener("mousemove",c);f.addEventListener("mouseup",e);f.addEventListener("mouseout",e);f.addEventListener("touchstart",
d);f.addEventListener("touchmove",c);f.addEventListener("touchend",e);k();return Object.freeze({get dom(){return f},render:function(a,c,d,e,f,m){k();q=!1;if(p&&b){var g=l.width||0;d=l.height||0;c(g,d);b.render(g,d,[...m,...h]);c=g*f;f*=d;r.clearRect(0,0,c,f);r.drawImage(a,0,e-f,c,f,0,0,c,f)}},addClick:function(a){m.add(a)},dispose:function(){m.clear();f.removeEventListener("mousedown",d);f.removeEventListener("mousemove",c);f.removeEventListener("mouseup",e);f.removeEventListener("mouseout",e);f.removeEventListener("touchstart",
d);f.removeEventListener("touchmove",c);f.removeEventListener("touchend",e)}})}var S={render(){return"".concat(this.css(),"\n            ").concat(this.html())},map(a){return{canvas:a.querySelector("canvas")}},html(a){return"<canvas></canvas>"},css(){return"<style>\n      :host {\n        position: relative;\n        display: inline-block;\n        width: 250px;\n        height: 250px;\n      }\n      :host > canvas {\n        position: absolute;\n        top: 0;\n        left: 0;\n        height: 100%;\n        width: 100%;\n        border-radius: inherit;\n       }\n    </style>"}};
let J=[{name:"u_time",toyname:"iTime",type:"float",value:0},{name:"u_delta",toyname:"iTimeDelta",type:"float",value:0},{name:"u_date",toyname:"iDate",type:"vec4",value:[0,0,0,0]},{name:"u_frame",toyname:"iFrame",type:"int",value:0}],R=[{name:"u_resolution",toyname:"iResolution",type:"vec2",value:[0,0]},{name:"u_mouse",toyname:"iCurrentMouse",type:"vec2",value:[0,0]},{name:"u_mousedrag",toyname:"iMouse",type:"vec4",value:[0,0,0,0]}],I=[{name:"u_orientation",toyname:"iOrientation",type:"vec3",value:[0,
0,0]}],na=[...J,...I,...R],M=/\(\s*out\s+vec4\s+(\S+)\s*,\s*in\s+vec2\s+(\S+)\s*\)/,A;z.singleton=function(){A||(A=z());return A};z.resetSingleton=function(){A.dispose();A=z()};class E extends HTMLElement{get renderer(){return z.singleton()}get name(){return this.getAttribute("name")}set name(a){this.setAttribute("name",a)}}var C=(a,b,d)=>{if(!b)return a[d];b="toy".concat(d);return a.hasOwnProperty(b)?a[b]:a[d]},ma=(a,b)=>Object.values(a).reduce((a,c)=>a+"uniform ".concat(C(c,b,"type")," ").concat(C(c,
b,"name"),";\n"),"");let pa=0;var ya=a=>new Promise((b,d)=>{let c=new XMLHttpRequest;c.open("GET",a);c.onreadystatechange=()=>{c.readyState===XMLHttpRequest.DONE&&(200===c.status?b(c.responseText):d(c.status))};c.send()}),T=async a=>a.src?ya(a.src):a.text;let U=new Float32Array([-1,1,1,1,1,-1,-1,1,1,-1,-1,-1]),za=0;class V extends E{disconnectedCallback(){this.program.dispose();this.program=void 0}get shadertoy(){return this.hasAttribute("shadertoy")}set shadertoy(a){a?this.setAttribute("shadertoy",
""):this.removeAttribute("shadertoy")}get prevbuffer(){return this.hasAttribute("prevbuffer")}set prevbuffer(a){a?this.setAttribute("prevbuffer",""):this.removeAttribute("prevbuffer")}get vertices(){let a=this.getAttribute("vertices");if(!a)return U;a=JSON.parse(a);return Array.isArray(a)?new Float32Array(a):U}set vertices(a){a&&Array.isArray(a)&&this.setAttribute("vertices",JSON.stringify(a))}async init(a){a&&!this.name&&(this.name="".concat("u_node").concat(za++));let b=[],d,c;for(let a=0;a<this.children.length;a++){let e=
this.children[a];if(e instanceof E)b.push(e);else switch(e.getAttribute("type")){case "x-shader/x-fragment":c=await T(e);break;case "x-shader/x-vertex":d=await T(e)}}this.program=oa(this.renderer.gl,d||"attribute vec2 position;\nvoid main() {\n  gl_Position = vec4(position, 0.0, 1.0);\n}",c,this.vertices,this.shadertoy);b.forEach(a=>{a.init(this.program)});a&&a.addNode(this.program,this.name,this.prevbuffer)}}customElements.get("sd-node")||customElements.define("sd-node",V);let qa=new Uint8Array([0,
0,0,255]),D=a=>!(a&a-1)&&!!a,Aa=0;class Ba extends E{disconnectedCallback(){this.program.removeTexture(this.texture);this.texture.dispose()}get src(){return this.getAttribute("src")}set src(a){this.setAttribute("src",a)}get autoplay(){return this.hasAttribute("autoplay")}set autoplay(a){a?this.setAttribute("autoplay",""):this.removeAttribute("autoplay")}get loop(){return this.hasAttribute("loop")}set loop(a){a?this.setAttribute("loop",""):this.removeAttribute("loop")}get crossOrigin(){return this.getAttribute("crossorigin")}set crossOrigin(a){this.setAttribute("crossorigin",
a)}get mic(){return this.hasAttribute("mic")}set mic(a){a?this.setAttribute("mic",""):this.removeAttribute("mic")}init(a){this.name||(this.name="".concat("u_audio").concat(Aa++));this.src&&(this.program=a,this.texture=ta(this.renderer,a.getTexUnit(),this.name,this.src,this.mic,this.loop,this.autoplay,this.crossOrigin),a.addTexture(this.texture))}}customElements.get("sd-audio")||customElements.define("sd-audio",Ba);let wa=/\w+\.(jpg|jpeg|png|gif|bmp)(?=\?|$)/i,va=/\w+\.(mp4|3gp|webm|ogv)(?=\?|$)/i,
W={NEAREST:9728,LINEAR:9729},Ca=function(a){for(var b=1;b<arguments.length;b++){var d=null!=arguments[b]?arguments[b]:{};b%2?O(d,!0).forEach(function(b){var c=d[b];b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(d)):O(d).forEach(function(b){Object.defineProperty(a,b,Object.getOwnPropertyDescriptor(d,b))})}return a}({},W,{NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,
NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987}),X={REPEAT:10497,MIRRORED_REPEAT:33648,CLAMP_TO_EDGE:33071},Da=0;class Ea extends E{static get observedAttributes(){return"mag-filter min-filter name src wrap-s wrap-t".split(" ")}disconnectedCallback(){this.program.removeTexture(this.texture);this.texture.dispose()}get forceUpdate(){return this.hasAttribute("force-update")}set forceUpdate(a){a?this.setAttribute("force-update",""):this.removeAttribute("force-update")}get magFilter(){return W[this.getAttribute("mag-filter")]||
9729}get minFilter(){return Ca[this.getAttribute("min-filter")]||9987}get src(){return this.getAttribute("src")}set src(a){this.setAttribute("src",a)}get webcam(){return this.hasAttribute("webcam")}set webcam(a){a?this.setAttribute("webcam",""):this.removeAttribute("webcam")}get wrapS(){return X[this.getAttribute("wrap-s")]||10497}get wrapT(){return X[this.getAttribute("wrap-t")]||10497}init(a){this.name||(this.name="".concat("u_texture").concat(Da++));if(this.src||this.webcam)this.program=a,this.texture=
ua(this.renderer,a.getTexUnit(),this.name,this.src,this.webcam,this.wrapS,this.wrapT,this.minFilter,this.magFilter,this.forceUpdate),a.addTexture(this.texture)}}customElements.get("sd-texture")||customElements.define("sd-texture",Ea);let Fa=new Set(["touchstart","touchmove","touchend"]);var Q=a=>{a=Fa.has(a.type)&&"object"===typeof a.touches[0]?a.touches[0]:a;return[a.clientX||0,a.clientY||0]};class Ga extends V{constructor(){super();this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){setTimeout(()=>
{try{this.init()}catch(a){console.error(a&&a.message||"Error in shader-doodle.")}})}disconnectedCallback(){super.disconnectedCallback();this.renderer.removeSurface(this.surface);this.surface.dispose();this.surface=void 0}async init(){this.shadow.innerHTML=S.render();let a=S.map(this.shadow).canvas;await super.init();this.surface=xa(a,this.program);this.renderer.addSurface(this.surface)}}customElements.get("shader-doodle")||customElements.define("shader-doodle",Ga)})
