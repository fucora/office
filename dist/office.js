(function(e,t){if(!e.seajs){var r=e.seajs={version:"2.2.3"},i=r.data={},o=B("Object"),n=B("String"),a=Array.isArray||B("Array"),s=B("Function"),l=B("Undefined"),c=0,u=i.events={};r.on=function(e,t){return(u[e]||(u[e]=[])).push(t),r},r.off=function(e,t){if(!e&&!t)return u=i.events={},r;var o=u[e];if(o)if(t)for(var n=o.length-1;n>=0;n--)o[n]===t&&o.splice(n,1);else delete u[e];return r};var d,f=r.emit=function(e,t){var i,o=u[e];if(o)for(o=o.slice();i=o.shift();)i(t);return r},h=/[^?#]*\//,p=/\/\.\//g,b=/\/[^\/]+\/\.\.\//,g=/([^:\/])\/\//g,m=/^([^\/:]+)(\/.+)$/,v=/{([^{]+)}/g,x=/^\/\/.|:\//,y=/^.*?\/\/.*?\//,w=document,_=P(w.URL),k=w.scripts,E=w.getElementById("seajsnode")||k[k.length-1],A=P(((d=E).hasAttribute?d.src:d.getAttribute("src",4))||_);r.resolve=function(e,t){if(!e)return"";var r,o,a;e=function(e){var t=i.vars;return t&&e.indexOf("{")>-1&&(e=e.replace(v,function(e,r){return n(t[r])?t[r]:e})),e}(e=function(e){var t,r=i.paths;return r&&(t=e.match(m))&&n(r[t[1]])&&(e=r[t[1]]+t[2]),e}(e=function(e){var t=i.alias;return t&&n(t[e])?t[e]:e}(e))),o=(r=e).length-1;var l=Z(e="#"===(a=r.charAt(o))?r.substring(0,o):".js"===r.substring(o-2)||r.indexOf("?")>0||".css"===r.substring(o-3)||"/"===a?r:r+".js",t);return l=function(e){var t=i.map,r=e;if(t)for(var o=0,n=t.length;o<n;o++){var a=t[o];if((r=s(a)?a(e)||e:e.replace(a[0],a[1]))!==e)break}return r}(l)};var j,$,I=w.head||w.getElementsByTagName("head")[0]||w.documentElement,T=I.getElementsByTagName("base")[0],S=/\.css(?:\?|$)/i,O=+navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/(\d+).*/,"$1")<536;r.request=function(e,t,r,o){var n=S.test(e),a=w.createElement(n?"link":"script");r&&(a.charset=r),l(o)||a.setAttribute("crossorigin",o),function(e,t,r,o){var n="onload"in e;function a(){e.onload=e.onerror=e.onreadystatechange=null,r||i.debug||I.removeChild(e),e=null,t()}!r||!O&&n?n?(e.onload=a,e.onerror=function(){f("error",{uri:o,node:e}),a()}):e.onreadystatechange=function(){/loaded|complete/.test(e.readyState)&&a()}:setTimeout(function(){!function e(t,r){var i,o=t.sheet;if(O)o&&(i=!0);else if(o)try{o.cssRules&&(i=!0)}catch(e){"NS_ERROR_DOM_SECURITY_ERR"===e.name&&(i=!0)}setTimeout(function(){i?r():e(t,r)},20)}(e,t)},1)}(a,t,n,e),n?(a.rel="stylesheet",a.href=e):(a.async=!0,a.src=e),j=a,T?I.insertBefore(a,T):I.appendChild(a),j=null};var U,N=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,V=/\\\\/g,z=r.cache={},C={},D={},q={},R=X.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};X.prototype.resolve=function(){for(var e=this.dependencies,t=[],r=0,i=e.length;r<i;r++)t[r]=X.resolve(e[r],this.uri);return t},X.prototype.load=function(){if(!(this.status>=R.LOADING)){this.status=R.LOADING;var e=this.resolve();f("load",e);for(var t,r=this._remain=e.length,i=0;i<r;i++)(t=X.get(e[i])).status<R.LOADED?t._waitings[this.uri]=(t._waitings[this.uri]||0)+1:this._remain--;if(0!==this._remain){var o={};for(i=0;i<r;i++)(t=z[e[i]]).status<R.FETCHING?t.fetch(o):t.status===R.SAVED&&t.load();for(var n in o)o.hasOwnProperty(n)&&o[n]()}else this.onload()}},X.prototype.onload=function(){this.status=R.LOADED,this.callback&&this.callback();var e,t,r=this._waitings;for(e in r)r.hasOwnProperty(e)&&((t=z[e])._remain-=r[e],0===t._remain&&t.onload());delete this._waitings,delete this._remain},X.prototype.fetch=function(e){var t=this.uri;this.status=R.FETCHING;var o={uri:t};f("fetch",o);var n=o.requestUri||t;function a(){r.request(o.requestUri,o.onRequest,o.charset,o.crossorigin)}n&&!D[n]?C[n]?q[n].push(this):(C[n]=!0,q[n]=[this],f("request",o={uri:t,requestUri:n,onRequest:function(){delete C[n],D[n]=!0,U&&(X.save(t,U),U=null);var e,r=q[n];delete q[n];for(;e=r.shift();)e.load()},charset:s(i.charset)?i.charset(n):i.charset,crossorigin:s(i.crossorigin)?i.crossorigin(n):i.crossorigin}),o.requested||(e?e[o.requestUri]=a:a())):this.load()},X.prototype.exec=function(){var e=this;if(e.status>=R.EXECUTING)return e.exports;e.status=R.EXECUTING;var t=e.uri;function r(e){return X.get(r.resolve(e)).exec()}r.resolve=function(e){return X.resolve(e,t)},r.async=function(e,i){return X.use(e,i,t+"_async_"+G()),r};var i=e.factory,o=s(i)?i(r,e.exports={},e):i;return void 0===o&&(o=e.exports),delete e.factory,e.exports=o,e.status=R.EXECUTED,f("exec",e),o},X.resolve=function(e,t){var i={id:e,refUri:t};return f("resolve",i),i.uri||r.resolve(i.id,t)},X.define=function(e,t,r){var i,o,n=arguments.length;1===n?(r=e,e=void 0):2===n&&(r=t,a(e)?(t=e,e=void 0):t=void 0),!a(t)&&s(r)&&(i=r.toString(),o=[],i.replace(V,"").replace(N,function(e,t,r){r&&o.push(r)}),t=o);var l={id:e,uri:X.resolve(e),deps:t,factory:r};if(!l.uri&&w.attachEvent){var c=function(){if(j)return j;if($&&"interactive"===$.readyState)return $;for(var e=I.getElementsByTagName("script"),t=e.length-1;t>=0;t--){var r=e[t];if("interactive"===r.readyState)return $=r}}();c&&(l.uri=c.src)}f("define",l),l.uri?X.save(l.uri,l):U=l},X.save=function(e,t){var r=X.get(e);r.status<R.SAVED&&(r.id=t.id||e,r.dependencies=t.deps||[],r.factory=t.factory,r.status=R.SAVED)},X.get=function(e,t){return z[e]||(z[e]=new X(e,t))},X.use=function(t,r,i){var o=X.get(i,a(t)?t:[t]);o.callback=function(){for(var t=[],i=o.resolve(),n=0,a=i.length;n<a;n++)t[n]=z[i[n]].exec();r&&r.apply(e,t),delete o.callback},o.load()},X.preload=function(e){var t=i.preload,r=t.length;r?X.use(t,function(){t.splice(0,r),X.preload(e)},i.cwd+"_preload_"+G()):e()},r.use=function(e,t){return X.preload(function(){X.use(e,t,i.cwd+"_use_"+G())}),r},X.define.cmd={},e.define=X.define,r.Module=X,i.fetchedList=D,i.cid=G,r.require=function(e){var t=X.get(X.resolve(e));return t.status<R.EXECUTING&&(t.onload(),t.exec()),t.exports};var L,M;i.base=(A.match(/^(.+?\/)(\?\?)?(seajs\/)+/)||["",A])[1],i.dir=A,i.cwd=_,i.charset="utf-8",i.history={},i.preload=(L=[],M=location.search.replace(/(seajs-\w+)(&|$)/g,"$1=1$2"),(M+=" "+w.cookie).replace(/(seajs-\w+)=1/g,function(e,t){L.push(t)}),L),r.config=function(e){for(var t in e){var n=e[t],s=i[t];if(i.history[t]=i.history[t]||[],i.history[t].push(F(n)),s&&o(s))for(var l in n)s[l]=n[l];else a(s)?n=s.concat(n):"base"===t&&("/"!==n.slice(-1)&&(n+="/"),n=Z(n)),i[t]=n}return f("config",e),r}}function B(e){return function(t){return{}.toString.call(t)=="[object "+e+"]"}}function G(){return c++}function P(e){return e.match(h)[0]}function Z(e,t){var r,o=e.charAt(0);if(x.test(e))r=e;else if("."===o)r=function(e){for(e=e.replace(p,"/");e.match(b);)e=e.replace(b,"/");return e=e.replace(g,"$1/")}((t?P(t):i.cwd)+e);else if("/"===o){var n=i.cwd.match(y);r=n?n[0]+e.substring(1):e}else r=i.base+e;return 0===r.indexOf("//")&&(r=location.protocol+r),r}function X(e,t){this.uri=e,this.dependencies=t||[],this.exports=null,this.status=0,this._waitings={},this._remain=0}function F(e){if(o(e)){var t={};for(var r in e)t[r]=e[r];return t}return e}})(this),define("magix5",()=>{let e=0,t=[],r=window,i=document,o=setTimeout,n=encodeURIComponent;function a(){}let s=JSON.stringify,l=i.body,c=Date.now,u="prototype",d=Object[u].toString,f=e=>d.call(e).slice(8,-1),h=e=>"Object"==f(e),p=Array.isArray,b=t=>(t||"mx_")+e++,g=e=>i.getElementById(e),m=(e,t)=>e.innerHTML=t,v=b(),x={rootId:b(),defaultView:v,error(e){throw e}},y=e=>!e||"object"!=typeof e,w=(e,t,r)=>{if(e&&t&&!(r=e==t))try{r=16==(16&t.compareDocumentPosition(e))}catch(e){}return r},{assign:_,keys:k,hasOwnProperty:E}=Object,A=i.head,j=i.createElement("div"),$=j.getAttribute,I=(e,t)=>$.call(e,t),T=(e,t)=>{t&&!T[e]&&(T[e]=1,m(j,`<style>${t}`),A.appendChild(j.firstChild))},S=(e,r,i,o,n)=>{for(n of(r=r||t,p(e)||(e=[e]),p(r)||(r=[r]),e))try{o=n&&n.apply(i,r)}catch(e){x.error(e)}return o},O=(e,t)=>e&&E.call(e,t),U=(e,t)=>{let r,i;if(y(t))"\x1e"==(r=t+"")[0]&&e.has(r)&&(t=e.get(r));else for(r in t)i=t[r],i=U(e,i),t[r]=i;return t},N=(e,t)=>t.a-e.a||t.b-e.b;function V(e,t,r,i){(i=this).a=[],i.b=t||5,i.c=i.b+(e||20),i.d=r}_(V[u],{get(t){let r=this.a["\x1e"+t];return r&&(r.a++,r.b=e++,r=r.c),r},set(t,r){let i=this,o=i.a,n="\x1e"+t,a=o[n],s=i.b;if(!a){if(o.length>=i.c)for(o.sort(N);s--;)(a=o.pop()).a>0&&i.del(a.o);a={d:t},o.push(a),o[n]=a}a.c=r,a.a=1,a.b=e++},del(e){e="\x1e"+e;let t=this.a,r=t[e],i=this.d;r&&(r.a=-1,r.c="",delete t[e],i&&S(i,r.d))},has(e){return O(this.a,"\x1e"+e)}});let z,C={bubbles:!0,cancelable:!0},D=[],q=(e,t,r,i,o,n)=>{let a={a:i,b:r,c:t,d:e,e(e){i?S(r,e,n):r(e)}};D.push(a),e.addEventListener(t,a.e,o)},R=(e,t,r,i,o)=>{for(let n,a=D.length;a--;)if((n=D[a]).c==t&&n.a==i&&n.d==e&&n.b===r){D.splice(a,1),e.removeEventListener(t,n.e,o);break}},L=new V,M=e=>{let t,r,i,o,n,a=L.get(e);if(!a){if(o={},-1==(n=e.indexOf("?")))t=e;else if(t=e.substring(0,n),e=e.substring(n+1))for(n of e.split("&"))[r,i]=n.split("="),o[r]=decodeURIComponent(i||"");L.set(e,a={a:t,b:o})}return{path:a.a,params:_({},a.b)}},B=new V,G=(e,t,r)=>(B.has(e)?r=B.get(e):(r=S(Function(`return ${e}`)),e.indexOf("\x1e")>-1?U(t,r):B.set(e,r)),r),P=(e,t)=>{if(e){let r=[];v==e?(z||(z=Pe.extend()),t(z)):seajs.use(e,(...e)=>{for(let t of e)r.push(t&&t.__esModule&&t.default||t);t&&t(...r)})}else t()};function Z(){}let X=(e,t,r,i,o)=>(Z[u]=t[u],o=new Z,_(o,r),_(e,i),o.constructor=e,e[u]=o,e),F=e=>e;let H,K={fire(e,t){let r,i,o=this,n=o["\x1e"+e],a=0;if(t||(t={}),t.type=e,n)for(r=n.length;a<r;a++)(i=n[a]).f?(i.x=1,S(i.f,t,o),i.x=""):i.x||(n.splice(a--,1),r--);return(n=o[`on${e}`])&&S(n,t,o),o},on(e,t){let r="\x1e"+e;return(this[r]||(this[r]=[])).push({f:t}),this},off(e,t){let r,i="\x1e"+e,o=this,n=o[i];if(t){if(n)for(r of n)if(r.f==t){r.f="";break}}else delete o[i],delete o[`on${e}`];return o}},W={},J=(e,t,r,i)=>{t.indexOf("\x1e")>0&&(i=W[e])&&U(i.a.a,r)},Y=(e,t)=>{O(W,e)||(W[e]=t,te.fire("add",{vframe:t}))},Q=(e,t,r)=>{for(t=e.c;t.length;)(r=t.shift()).r||e.invoke(r.n,r.a),delete t[r.k]},ee=e=>e.b||(e.b=b());function te(e,t){let r=this,i=ee(e);r.id=i,r.root=e,r.pId=t,r.b={},r.d=1,r.c=[],Y(i,r)}_(te,{all:()=>W,byId:e=>W[e],byNode:e=>W[e.b]},K),_(te[u],{mountView(e,t){let r,i,o,n,a,s=this,{id:l,root:c,pId:u}=s;!s.e&&c&&(s.e=1,s.f=c.innerHTML),s.unmountView(),c&&e&&(r=M(e),o=r.path,s.path=e,n=r.params,J(u,e,n),s.g=o,_(n,t),i=s.d,P(o,e=>{if(i==s.d){if(!e)return x.error(Error(`${l} cannot load:${o}`));a=Ge(e),o=new e(l,c,s,n,a),s.a=o,Re(o),S(o.init,n,o),o.g(),o.tmpl||(s.e=0,o.h||o.endUpdate())}}))},unmountView(){let e=this,{a:t,root:r}=e;e.c=[],t&&(e.unmountZone(),e.a=0,t.d>0&&(t.d=0,t.fire("destroy"),t.off("destroy"),Ce(t,1),Re(t,1),t.owner=t.root=null),t.d--,r&&e.e&&m(r,e.f)),e.d++},mountVframe(e,t,r){let i,o=this,n=o.id,a=o.b,s=ee(e);return(i=W[s])||(O(a,s)||(o.h=0),a[s]=s,i=new te(e,n)),i.mountView(t,r),i},mountZone(e){let t,r=this,i=(e=e||r.root).querySelectorAll("[mx-view]");for(t of i)t.a||(t.a=1,r.mountVframe(t,I(t,"mx-view")))},unmountVframe(e,t){let r,i;var o,n;e=e?this.b[t?e:e.b]:this.id,(r=W[e])&&(r.unmountView(),i=r.pId,(n=W[o=e])&&(delete W[o],n.root.a=0,te.fire("remove",{vframe:n}),n.id=n.root=n.pId=n.b=null),(r=W[i])&&O(r.b,e)&&(delete r.b[e],r.h=0))},unmountZone(e){let t,r,i,o=this;for(t in o.b)(i=e?(r=W[t])&&w(r.root,e):1)&&o.unmountVframe(t,1)},parent(e,t){for(t=this,e=e>>>0||1;t&&e--;)t=W[t.pId];return t},children(e){return(e=this).h||(e.h=k(e.b))},invoke(e,t){let r,i,o,n,a,s=this.c;return(i=this.a)&&i.h?r=(o=i[e])&&S(o,t,i):((n=s[a="\x1e"+e])&&(n.r=t===n.a),n={n:e,a:t,k:a},s.push(n),s[a]=n),r}});let re=new V(30,10),ie=/(?:([\w\-]+)\x1e)?([^(]+)\(([\s\S]*)?\)/,oe={},ne={},ae=(e,r)=>{let i,o,n,a,s,c,u,d,f=[],h=e,p=I(e,`mx-${r}`),b=0;if(p&&((s=re.get(p))||(s={v:(s=p.match(ie)||t)[1],n:s[2],i:s[3]},re.set(p,s)),s=_({},s,{r:p})),s&&!s.v||ne[r]){if(!(d=h.c)){for(u=[h];h!=l&&(h=h.parentNode);){if(W[o=h.b]||(o=h.c)){d=o;break}u.push(h)}if(d)for(p of u)p.c=d}if(d){h=e.b,W[h]&&(b=d=h);do{if((i=W[d])&&(c=i.a)){if(a=(n=c.i)[r])for(h=a.length;h--;)n={r:o=a[h],v:d,n:o},o?!b&&e.matches(o)&&f.push(n):b&&f.unshift(n);if(c.tmpl&&!b)break;b=0}}while(i&&(d=i.pId))}}return s&&f.push(s),f},se=e=>{let t,r,i,o,n,a,s,c,{target:u,type:d}=e,f=[];for(;u!=l&&!(e.cancelBubble||(r=u.d)&&r[d]);){if(f.push(u),(t=ae(u,d)).length){f=[];for(let{v:r,r:l,n:f,i:h}of t){if(s!=r){if(s&&e.cancelBubble)break;s=r}(o=(i=W[r])&&i.a)?o.h&&(a=o[n=f+"\x1e"+d])&&(e.eventTarget=u,c=h?G(h,o.a):{},e.params=c,S(a,e,o)):e.stopPropagation()}}u=u.parentNode||l}for(s of f)(r=s.d||(s.d={}))[d]=1},le=(e,t,r)=>{let i=0|oe[e],o=r?-1:1;i&&r!==i||(r?R:q)(l,e,se),oe[e]=i+o,t&&(ne[e]=(0|ne[e])+o)};let ce={"&":"amp","<":"lt",">":"gt",'"':"#34","'":"#39","`":"#96"},ue=/[&<>"'\`]/g,de=e=>""+(null==e?"":e),fe=e=>`&${ce[e]};`,he=e=>de(e).replace(ue,fe),pe={"!":"%21","'":"%27","(":"%28",")":"%29","*":"%2A"},be=e=>pe[e],ge=/[!')(*]/g,me=e=>n(de(e)).replace(ge,be),ve=/[\\'"]/g,xe=e=>de(e).replace(ve,"\\$&"),ye=(e,t,r)=>(e.has(t)||(r="\x1e"+e.size,e.set(t,r),e.set(r,t)),e.get(t)),we=(e,t)=>{let r,i,o=e.j,n=e.k,a=e.owner,s=e.id,l={a:[]},c=e.e,u=e.a,d=r=>{t.a<t.length?we(e,t):(l=t.slice(),t.a=t.length=0,r&&e.fire("domready"),S(l))};if(t.a=t.length,e.k=0,e.j={},n&&e.d>0&&(r=e.tmpl)){for(i of(e.fire("dompatch"),i=r(c,_e,s,de,me,u,ye,xe,p),Se(e.root,e.l,i,l,a,o),e.l=i,l.a))i.g();r&&e.endUpdate(),d(1)}else d()},_e=(e,t,r,i)=>{let o;if(e){t=t||{};let n,a,s,l,c,u,d="",f={},h="<"+e,p="",b=[];if(r)for(l of r)s=l.a,l.b==Ae&&(s=s?he(s):" "),p+=s,u&&l.b==Ae&&u.b==Ae?u.a+=l.a:(l.d&&(f[l.d]=(f[l.d]||0)+1),l.e&&(n=1),u=l,b.push(l));for(a in t)!1!==(s=t[a])&&null!=s?(!0===s&&(t[a]=s=""),"id"==a?d=s:"mx-view"==a&&s&&!d?d=M(s).path:"mxs"==a?d||(d=s):"mxv"==a&&(n=1),"value"==a&&"textarea"==e?p=s:O(Ee,a)||(h+=` ${a}="${he(s)}"`)):delete t[a];c=h,o={a:h+=i?"/>":`>${p}</${e}>`,c:p,d:d,b:e,e:n||O(ke,e),f:c,g:t,h:b,i:f,j:i}}else o={b:t?"\x1e":Ae,a:r+""};return o},ke={input:{value:1,checked:1},textarea:{value:1},option:{selected:1}},Ee={mxs:1,mxv:1};let Ae=e;let je="http://www.w3.org/",$e={svg:`${je}2000/svg`,math:`${je}1998/Math/MathML`},Ie=(e,t,r,i)=>{let o,n,a=0,s=ke[t.b],l=r.g,c=t.g;if(i){if(t)for(o in c)O(s,o)||O(l,o)||(a=1,e.removeAttribute(o));for(o in l)O(s,o)||O(Ee,o)||(n=l[o],t&&c[o]===n||(a=1,e.setAttribute(o,n)))}for(o in s)n=O(l,o)?"value"!=o||l[o]:"value"==o&&"",e[o]!=n&&(a=1,e[o]=n);return a&&delete e.d,a},Te=(e,t,r)=>{let o,n=e.b;return n==Ae?o=i.createTextNode(e.a):(o=i.createElementNS($e[n]||t.namespaceURI,n),Ie(o,0,e,1)&&(r.b=1),m(o,e.c)),o},Se=(e,t,r,i,o,n)=>{if(t){if(t.e||t.c!=r.c){let a,s,l,c,u,d,f=t.h,h=r.h,p=f.length,b=h.length,g=r.i,v=e.childNodes,x={},y=0;for(a=p;a--;)(u=(l=f[a]).d)&&(u=x[u]||(x[u]=[])).push(v[a]);for(a=0;a<b;a++)if(c=h[a],l=f[y++],(u=x[c.d])&&(u=u.pop())){if(u!=v[a]){for(s=y,d=1;s<p;s++,d++)if((l=f[s])&&v[a+d]==u){f.splice(s,1),y--;break}e.insertBefore(u,v[a])}g[l.d]&&g[l.d]--,Oe(u,e,l,c,i,o,n)}else l?x[l.d]&&g[l.d]?(p++,i.b=1,e.insertBefore(Te(c,e,i),v[a]),y--):Oe(v[a],e,l,c,i,o,n):("\x1e"==c.b?m(e,c.a):e.appendChild(Te(c,e,i)),i.b=1);for(a=b;a<p;a++)1==(s=v[b]).nodeType&&o.unmountZone(s),e.removeChild(s)}}else i.b=1,m(e,r.c)},Oe=(e,t,r,i,o,n,a)=>{let s=r.g,l=i.g,c=r.b;if(r.e||r.a!=i.a)if(c==i.b){if(c==Ae)o.b=1,e.nodeValue=i.a;else if("\x1e"==c)o.b=1,m(t,i.a);else if(!s.mxs||s.mxs!=l.mxs){let t,u,d,f,h,p,b,g=l["mx-view"],m=i.c,v=r.f!=i.f,x=O(ke,c)||v,y=W[e.b],w=g&&M(g);if(x&&(x=Ie(e,r,i,v))&&(o.b=1),g&&y&&y.g==w.path&&(f=y.a)){if(p=m!=r.c,b=g!=y.path,d=s.mxv,!p&&!b&&d)for(d of h=d.split(","))if("#"==d||O(a,d)){b=1;break}(b||p||x)&&((d=f.h&&f.m)?(h=w.params,J(y.pId,g,h),y.path=g,S(d,h,f)&&o.a.push(f),t=!f.tmpl):(u=1,t=1))}else t=1,u=y;u&&(o.b=1,y.unmountVframe(0,1)),t&&!i.j&&Se(e,r,i,o,n,a)}}else"\x1e"==r.b?m(t,i.a):(n.unmountZone(e),t.replaceChild(Te(i,t,o),e)),o.b=1},Ue={},Ne=_({get:e=>e?Ue[e]:Ue,set(e){_(Ue,e)}},K),Ve=/^(\$?)([^<]*)<([^>]+)>(?:&(.+))?$/,ze=(e,t,r)=>(e.a?r=e:((r=function(e){S(r.a,e,this)}).a=[e],r.b=1),r.a=r.a.concat(t.a||t),r),Ce=(e,t)=>{let r,i,o=e.c;for(r in o)i=o[r],(t||i.a)&&De(o,r,1)},De=(e,r,i,o)=>{let n,a,s=e[r];return s&&s!=o&&((n=(a=s.b).destroy)&&i&&S(n,t,a),delete e[r]),a},qe=(e,t,r,i,o)=>{i=e[t],e[t]=e[r]=function(...e){(o=this).d>0&&(o.d++,o.fire("rendercall"),Ce(o),S(i,e,o))}},Re=(e,t)=>{let r,{n:i,i:o,o:n,id:a}=e;for(r in i)le(r,o[r],t);for(r of(i=t?R:q,n))i(r.a,r.b,r.c,a,r.d,e)},Le={win:r,doc:i},Me=(e,t,r)=>{let i,o,n,a,s={};for(o of e)for(i in o)n=o[i],a=s[i],"ctor"!=i?(Ve.test(i)&&(a?n=ze(a,n):n.b=1),s[i]=n):r.push(n);for(i in s)O(t,i)||(t[i]=s[i])};function Be(...e){let t=this.a||(this.a=[]);return Me(e,this[u],t),this}let Ge=e=>{if(!e["\x1e"]){e["\x1e"]=[];let t,r,i,o,n,a,s,l,c,d,f,h=e[u],p={},b=[],g={};for(s in(r=h.mixins)&&Me(r,h,e["\x1e"]),h)if(t=h[s],r=s.match(Ve)){if([,a,i,o,f]=r,d={},f)for(l of f=f.split(","))d[l]=!0;for(l of o=o.split(",")){if(n=Le[i],c=1,a){if(n){b.push({c:t,a:n,b:l,d:d});continue}c=2,(n=g[l])||(n=g[l]=[]),n[i]||(n[i]=1,n.push(i))}p[l]=p[l]|c,(n=h[l=i+"\x1e"+l])?n.b&&(t.b?h[l]=ze(t,n):O(h,s)&&(h[l]=t)):h[l]=t}}qe(h,"render","g"),h.n=p,h.o=b,h.i=g,h.m=h.assign}return e["\x1e"]};function Pe(e,t,r,i,o){(o=this).root=t,o.owner=r,o.id=e,o.c={},o.d=1,o.k=1,o.e={id:e},o.a=new Map,o.f=[],o.j={},(e=Pe.a)&&S(e,i,o)}function Ze(){this.id=b("b"),this.a={}}_(Pe,{merge:Be,extend:function e(t,r){let i=this,o=(t=t||{}).ctor,n=[];function a(e,t,r,o,s,l,c,u){i.call(c=this,e,t,r,o,s),(l=a.a)&&S(l,o,c),(u=n.concat(s)).length&&S(u,o,c)}return o&&n.push(o),a.merge=Be,a.extend=e,X(a,i,t,r)}}),_(Pe[u],K,{init:a,render:a,beginUpdate(e,t){(t=this).d>0&&t.h&&t.owner.unmountZone(e)},endUpdate(e,t,r,i){(t=this).d>0&&(i=t.h,t.h=1,(r=t.owner).mountZone(e),i||o(t.wrapAsync(Q),0,r))},wrapAsync(e,t){let r=this,i=r.d;return(...o)=>{if(i>0&&i==r.d)return e.apply(t||r,o)}},capture(e,t,r,i){return i=this.c,t?(De(i,e,1,t),i[e]={b:t,a:r}):t=(i=i[e])&&i.b,t},release(e,t){return De(this.c,e,t)},get(e,t){return t=this.e,e&&(t=t[e]),t},set(e,t){let r,i,o,n=this,a=n.e,s=n.j,l=n.k;for(o in e)r=e[o],i=a[o],y(r)&&i===r||O(t,o)||(s[o]=1,l=1),a[o]=r;return n.k=l,n},digest(e,t,r){let i=this.set(e,t),o=i.f;r&&o.push(r),o.a||we(i,o)},snapshot(){return this.p=s(this.e),this},altered(){let e=this;if(e.p)return e.p!=s(e.e)},translate(e){return U(this.e,e)},parse(e){return G(e,this.a)}}),_(Ze[u],{get(e,t){let r,i=this.a;if(e){let t,r=p(e)?e.slice():(e+"").split(".");for(;(t=r.shift())&&i;)i=i[t];t&&(i=void 0)}return void 0!==t&&(r=f(t))!=f(i)&&(i=t),i},set(e,t){h(e)||(e={[e]:t}),_(this.a,e)}});let Xe=(e,t,r)=>i=>{(r=e[t])&&(delete e[t],S(r,i,r.a))},Fe=(e,t,r,i,o,n)=>{let a=[],s=null,l=0;return function(u,d){let f;l++;let h,p=this,b=p.b,g=b.a;if(a[u+1]=p,d?(s=d,f=1):n.has(g)||(g&&n.set(g,p),b.b=c(),(h=b.c)&&S(h,p,p),f=1),!r.a){let t=l==i;t&&(r.b=0,2==o&&(a[0]=s,S(e,a,r))),1==o&&S(e,[d||null,p,t,u],r)}f&&t.fire("end",{bag:p,error:d})}},He=(e,t,r,i,o)=>{if(e.a)return e;if(e.b)return e.enqueue(He.bind(e,e,t,r,i,o));e.b=1,p(t)||(t=[t]);let n=e.constructor,a=0,s=n.d,l=Fe(r,n,e,t.length,i,n.c);for(let e of t)if(e){let t,[r,i]=n.get(e,o),c=r.b.a,u=l.bind(r,a++);c&&s[c]?s[c].push(u):i?(c&&((t=[u]).a=r,s[c]=t,u=Xe(s,c)),n.e(r,u)):u()}return e};function Ke(){let e=this;e.id=b("s"),e.f=[]}_(Ke[u],{all(e,t){return He(this,e,t,2)},save(e,t){return He(this,e,t,2,1)},one(e,t){return He(this,e,t,1)},enqueue(e){let t=this;return t.a||(t.f.push(e),t.dequeue(t.g)),t},dequeue(...e){let t,r=this;r.b||r.a||(r.b=1,o(()=>{r.b=0,r.a||(t=r.f.shift())&&S(t,r.g=e)},0))},destroy(e){(e=this).a=1,e.f=0}});let We=(e,t,r)=>[s(t),s(e)].join("\x1e"),Je=_({add(e){let t,r=this.h;for(t of(p(e)||(e=[e]),e))if(t){let{name:e,cache:i}=t;t.cache=0|i,r[e]=t}},create(e){let t=this.meta(e),r=0|e.cache||t.cache,i=new Ze;i.set(t),i.b={c:t.after,a:r&&We(t,e)},h(e)&&i.set(e);let o=t.before;return o&&S(o,i,i),this.fire("begin",{bag:i}),i},meta(e){return this.h[e.name||e]||e},get(e,t){let r,i,o=this;return t||(r=o.cached(e)),r||(r=o.create(e),i=1),[r,i]},cached(e){let t,r,i=this,o=i.c,n=i.meta(e),a=0|e.cache||n.cache;if(a&&(r=We(n,e)),r){let e=i.d[r];e?t=e.a:(t=o.get(r))&&c()-t.b.b>a&&(o.del(r),t=0)}return t}},K);Ke.extend=((e,t,r)=>{function i(){Ke.call(this)}return i.e=e,i.c=new V(t,r),i.d={},i.h={},X(i,Ke,null,Je)}),_(a[u],K),a.extend=function e(t,r){let i=this,o=t&&t.ctor;function n(...e){i.apply(this,e),o&&o.apply(this,e)}return n.extend=e,X(n,i,t,r)};let Ye={config:(e,t)=>(t=x,e&&(t=h(e)?_(t,e):t[e]),t),boot(e){_(x,e),((e,t)=>(H||(e=x.rootId,(t=g(e))||(t=l),H=new te(t)),H))().mountView(x.defaultView)},toMap:(e,t)=>{let r,i={};if(e)for(r of e)i[t&&r?r[t]:r]=t?r:1+(0|i[r]);return i},toTry:S,toUrl:(e,t,r)=>{let i,o,a,s=[];for(o in t)i=t[o]+"",(!r||i||O(r,o))&&(i=n(i),s.push(a=o+"="+i));return a&&(e+=(e&&(~e.indexOf("?")?"&":"?"))+s.join("&")),e},parseUrl:M,mix:_,has:O,keys:k,inside:w,applyStyle:T,guid:b,Cache:V,use:P,dispatch:(e,t,r)=>{let i=new Event(t,C);_(i,r),e.dispatchEvent(i)},type:f,View:Pe,State:Ne,Vframe:te,Service:Ke,Event:K,guard:F,node:g};return Ye.default=Ye,Ye});let office=()=>{let e=document.getElementById("boot").src.replace(/\/[^\/]+$/,"/");seajs.config({paths:{views:e+"views"},alias:{magix:"magix5"}}),seajs.use(["magix"],e=>{e.applyStyle("o_","body,h5,input,p,textarea,ul{margin:0;padding:0}ul{list-style-type:none;list-style-image:none}a{text-decoration:none;background-color:transparent}a:active,a:hover{outline-width:0}a:focus{outline:1px dotted}html{-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%;font-size:62.5%}body{font-size:14px;line-height:1.5}body,button,input,select,textarea{font-family:helvetica neue,arial,hiragino sans gb,stheiti,wenquanyi micro hei,sans-serif;-ms-text-autospace:ideograph-alpha ideograph-numeric ideograph-parenthesis;-ms-text-spacing:ideograph-alpha ideograph-numeric ideograph-parenthesis;text-spacing:ideograph-alpha ideograph-numeric ideograph-parenthesis}h5{font-size:14px}img{border-style:none;width:auto\\9;height:auto;max-width:100%;vertical-align:top;-ms-interpolation-mode:bicubic}svg:not(:root){overflow:hidden}button,input,select,textarea{font-family:inherit;font-size:100%;margin:0;vertical-align:middle;*vertical-align:middle}button,input{*overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;-moz-appearance:button;appearance:button;cursor:pointer}button[disabled],input[disabled]{cursor:not-allowed}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0;*height:13px;*width:13px}button::-moz-focus-inner,input::-moz-focus-inner{border-style:none;padding:0}textarea{overflow:auto;resize:vertical}@media screen and (-webkit-min-device-pixel-ratio:0){input{line-height:normal!important}}input::-moz-placeholder,textarea::-moz-placeholder{color:#a9a9a9;opacity:1}label{cursor:pointer}::-webkit-input-placeholder{color:#999}:-ms-input-placeholder{color:#999}::-ms-input-placeholder{color:#999}::placeholder{color:#999}::-moz-selection{background-color:rgba(243,123,99,.6)}::selection{background-color:rgba(243,123,99,.6)}.o_,.oa{caret-color:#fa742b;display:inline-block;height:22px;padding:3px 4px;border-radius:2px;box-sizing:border-box;box-shadow:none;border:1px solid #e6e6e6;background-color:#fff;color:#333;width:140px;vertical-align:middle;max-width:100%;outline:none;transition:border-color .25s}.o_:hover,.oa:hover{border-color:#ccc}.o_:focus,.oa:focus,.ob,.ob:hover{border-color:#fa742b!important}.oa{height:auto}.o_[disabled],.oa[disabled]{background-color:#fbfbfb}.o_[disabled]:hover,.oa[disabled]:hover{cursor:not-allowed;border-color:#e6e6e6}.oc{outline:none;display:inline-block;font-weight:400;text-align:center;vertical-align:middle;cursor:pointer;background-image:none;background-color:#ccc;white-space:nowrap;padding:4px 14px;font-size:14px;line-height:1;border:0;color:#333;border-radius:2px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.oc:focus,.oc:hover{background-color:#a0a0a0;color:#333}.od{background-color:#fa742b;color:#fff}.od:focus,.od:hover{background-color:#bd361b;color:#fff}.oc[disabled]{background-color:#fbfbfb;color:#333}.oc[disabled]:hover{border-color:#e6e6e6;color:#333}"),e.boot({defaultPath:"/index",defaultView:"views/index",rootId:"app",error(e){setTimeout(()=>{throw e},0)}})})};define("views/index",["magix"],(e,t,r)=>{let i,o,n,a={class:"oe"},s={class:"oj"};Object.defineProperty(t,"__esModule",{value:!0});const l=e("magix");l.default.applyStyle("oa",".oe{margin:10px 50px;display:flex;align-items:center;height:50px}.of{height:25px;line-height:25px}.og{width:150px}.oh{width:60px;border-radius:5px;height:23px;padding:0 8px;border:1px solid #a6a6a6;background-color:#f8f8f8}.og:focus,.oh:focus{outline:none}.oi{margin-left:30px}.oj{margin:10px 50px}.ok{width:100%;border-collapse:collapse;table-layout:fixed}.ok td{border:1px solid #666;height:20px;word-break:break-all}.ol{margin-left:5px}.om{display:none}");let c=[1,20],u=/(?:\r\n|\r|\n)/,d=/\t/,f=/[\-#$\^*()+\[\]{}|\\,.?\s]/g;t.default=l.default.View.extend({tmpl:(e,t,r,l)=>{let c,u,d,f,h,p,b,g,m,v,x=[],{cols:y,col:w,chars:_,table:k,id:E}=e;i?c=[i]:(u=[t(0,0,"\u7b2c\uff1a")],c=[i=t("div",{mxs:"o_:_",class:"of"},u)]),u=[];for(let e=y[0];e<=y[1];e++)h=[t(0,0,e)],f=[t("option",{selected:e==w},h)],u.push(...f);if(c.push(t("select",{class:"of og","mx-change":r+"\x1e__b()"},u)),o?c.push(o):(u=[t(0,0,"\u5217\u6309\u5b57\u7b26\uff1a")],c.push(o=t("div",{mxs:"o_:a",class:"of ol"},u))),c.push(t("input",{class:"of oh",value:l(_),"mx-input":r+"\x1e__c()"},0,1)),n?c.push(n):(u=[t(0,0,"\u62c6\u5206")],c.push(n=t("div",{mxs:"o_:b",class:"of ol"},u))),u=[t(0,0,"\u590d\u5236\u8868\u683c\u5185\u5bb9")],p="oc od oi",k||(p+=" om"),c.push(t("button",{"mx-click":r+"\x1e__d()",class:p},u)),x.push(t("div",a,c)),c=[],k){h=[];for(let e=0,r=k.grid,i=r.length;e<i;e++){g=[];for(let i=0,o=r[e],n=o.length;i<n;i++){v=[t(0,0,o[i])],m=[t("td",{style:"width:"+l(100/k.cols)+"%"},v)],g.push(...m)}b=[t("tr",0,g)],h.push(...b)}f=[t("tbody",0,h)],u=[t("table",{class:"ok",id:"result_"+l(E)},f)],c.push(...u)}else u=[t(0,0,"\u8bf7\u7c98\u8d34\u5185\u5bb9")],c.push(...u);return x.push(t("div",s,c)),d="",k&&(d+=" \u7531\u539f"+k.from+"\u884c\u62c6\u5206\u6210"+k.to+"\u884c "),c=[t(0,0,d)],x.push(t("div",s,c)),t(r,0,x)},render(){this.digest({col:5,chars:",\uff0c",cols:c})},___(e){let t=e.split(u),r=[];for(let e of t)if(e&&e.trim()){let t=e.split(d);r.push(t)}return r},__a(e){let t=this.___(e),r={from:t.length,to:0,grid:[]},i=this.get(),o=Math.max((0|i.col)-1,0),n=[],a=new RegExp(`[${(e=>(e+"").replace(f,"\\$&"))(i.chars)}]`);for(let e of t){let t=e[o];if(t&&t.trim()){let r=t.trim().split(a);for(let t of r){let r=e.slice();r[o]=t,n.push(r)}}else n.push(e)}return r.grid=n,r.to=n.length,r},"__b<change>"(e){let t=e.eventTarget,r=t.options[t.selectedIndex];this.digest({col:r.value,table:null})},"__c<input>"(e){let t=e.eventTarget;this.digest({chars:t.value.trim(),table:null})},"__d<click>"(){let e=document.createRange();e.selectNode(l.default.node("result_"+this.id));let t=window.getSelection();t.removeAllRanges(),t.addRange(e),document.execCommand("copy"),t.removeAllRanges(),alert("\u5df2\u590d\u5236")},"$doc<paste>"(e){let t=e.clipboardData.getData("text/plain"),r=this.__a(t);this.digest({table:r})}})});