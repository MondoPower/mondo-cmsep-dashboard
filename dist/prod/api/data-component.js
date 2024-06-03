"use strict";(()=>{var K=Object.create;var R=Object.defineProperty;var X=Object.getOwnPropertyDescriptor;var tt=Object.getOwnPropertyNames;var et=Object.getPrototypeOf,nt=Object.prototype.hasOwnProperty;var rt=(c,f)=>()=>(f||c((f={exports:{}}).exports,f),f.exports);var it=(c,f,M,C)=>{if(f&&typeof f=="object"||typeof f=="function")for(let y of tt(f))!nt.call(c,y)&&y!==M&&R(c,y,{get:()=>f[y],enumerable:!(C=X(f,y))||C.enumerable});return c};var st=(c,f,M)=>(M=c!=null?K(et(c)):{},it(f||!c||!c.__esModule?R(M,"default",{value:c,enumerable:!0}):M,c));var Z=rt((W,U)=>{(function(c,f){typeof W=="object"&&typeof U!="undefined"?U.exports=f():typeof define=="function"&&define.amd?define(f):(c=typeof globalThis!="undefined"?globalThis:c||self).dayjs=f()})(W,function(){"use strict";var c=1e3,f=6e4,M=36e5,C="millisecond",y="second",_="minute",T="hour",v="day",E="week",p="month",q="quarter",D="year",k="date",F="Invalid Date",z=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,V=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,B={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(i){var n=["th","st","nd","rd"],t=i%100;return"["+i+(n[(t-20)%10]||n[t]||n[0])+"]"}},j=function(i,n,t){var r=String(i);return!r||r.length>=n?i:""+Array(n+1-r.length).join(t)+i},Q={s:j,z:function(i){var n=-i.utcOffset(),t=Math.abs(n),r=Math.floor(t/60),e=t%60;return(n<=0?"+":"-")+j(r,2,"0")+":"+j(e,2,"0")},m:function i(n,t){if(n.date()<t.date())return-i(t,n);var r=12*(t.year()-n.year())+(t.month()-n.month()),e=n.clone().add(r,p),s=t-e<0,a=n.clone().add(r+(s?-1:1),p);return+(-(r+(t-e)/(s?e-a:a-e))||0)},a:function(i){return i<0?Math.ceil(i)||0:Math.floor(i)},p:function(i){return{M:p,y:D,w:E,d:v,D:k,h:T,m:_,s:y,ms:C,Q:q}[i]||String(i||"").toLowerCase().replace(/s$/,"")},u:function(i){return i===void 0}},N="en",w={};w[N]=B;var G="$isDayjsObject",P=function(i){return i instanceof L||!(!i||!i[G])},H=function i(n,t,r){var e;if(!n)return N;if(typeof n=="string"){var s=n.toLowerCase();w[s]&&(e=s),t&&(w[s]=t,e=s);var a=n.split("-");if(!e&&a.length>1)return i(a[0])}else{var u=n.name;w[u]=n,e=u}return!r&&e&&(N=e),e||!r&&N},h=function(i,n){if(P(i))return i.clone();var t=typeof n=="object"?n:{};return t.date=i,t.args=arguments,new L(t)},o=Q;o.l=H,o.i=P,o.w=function(i,n){return h(i,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var L=function(){function i(t){this.$L=H(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[G]=!0}var n=i.prototype;return n.parse=function(t){this.$d=function(r){var e=r.date,s=r.utc;if(e===null)return new Date(NaN);if(o.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var a=e.match(z);if(a){var u=a[2]-1||0,d=(a[7]||"0").substring(0,3);return s?new Date(Date.UTC(a[1],u,a[3]||1,a[4]||0,a[5]||0,a[6]||0,d)):new Date(a[1],u,a[3]||1,a[4]||0,a[5]||0,a[6]||0,d)}}return new Date(e)}(t),this.init()},n.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},n.$utils=function(){return o},n.isValid=function(){return this.$d.toString()!==F},n.isSame=function(t,r){var e=h(t);return this.startOf(r)<=e&&e<=this.endOf(r)},n.isAfter=function(t,r){return h(t)<this.startOf(r)},n.isBefore=function(t,r){return this.endOf(r)<h(t)},n.$g=function(t,r,e){return o.u(t)?this[r]:this.set(e,t)},n.unix=function(){return Math.floor(this.valueOf()/1e3)},n.valueOf=function(){return this.$d.getTime()},n.startOf=function(t,r){var e=this,s=!!o.u(r)||r,a=o.p(t),u=function(O,m){var S=o.w(e.$u?Date.UTC(e.$y,m,O):new Date(e.$y,m,O),e);return s?S:S.endOf(v)},d=function(O,m){return o.w(e.toDate()[O].apply(e.toDate("s"),(s?[0,0,0,0]:[23,59,59,999]).slice(m)),e)},l=this.$W,$=this.$M,g=this.$D,A="set"+(this.$u?"UTC":"");switch(a){case D:return s?u(1,0):u(31,11);case p:return s?u(1,$):u(0,$+1);case E:var b=this.$locale().weekStart||0,Y=(l<b?l+7:l)-b;return u(s?g-Y:g+(6-Y),$);case v:case k:return d(A+"Hours",0);case T:return d(A+"Minutes",1);case _:return d(A+"Seconds",2);case y:return d(A+"Milliseconds",3);default:return this.clone()}},n.endOf=function(t){return this.startOf(t,!1)},n.$set=function(t,r){var e,s=o.p(t),a="set"+(this.$u?"UTC":""),u=(e={},e[v]=a+"Date",e[k]=a+"Date",e[p]=a+"Month",e[D]=a+"FullYear",e[T]=a+"Hours",e[_]=a+"Minutes",e[y]=a+"Seconds",e[C]=a+"Milliseconds",e)[s],d=s===v?this.$D+(r-this.$W):r;if(s===p||s===D){var l=this.clone().set(k,1);l.$d[u](d),l.init(),this.$d=l.set(k,Math.min(this.$D,l.daysInMonth())).$d}else u&&this.$d[u](d);return this.init(),this},n.set=function(t,r){return this.clone().$set(t,r)},n.get=function(t){return this[o.p(t)]()},n.add=function(t,r){var e,s=this;t=Number(t);var a=o.p(r),u=function($){var g=h(s);return o.w(g.date(g.date()+Math.round($*t)),s)};if(a===p)return this.set(p,this.$M+t);if(a===D)return this.set(D,this.$y+t);if(a===v)return u(1);if(a===E)return u(7);var d=(e={},e[_]=f,e[T]=M,e[y]=c,e)[a]||1,l=this.$d.getTime()+t*d;return o.w(l,this)},n.subtract=function(t,r){return this.add(-1*t,r)},n.format=function(t){var r=this,e=this.$locale();if(!this.isValid())return e.invalidDate||F;var s=t||"YYYY-MM-DDTHH:mm:ssZ",a=o.z(this),u=this.$H,d=this.$m,l=this.$M,$=e.weekdays,g=e.months,A=e.meridiem,b=function(m,S,x,I){return m&&(m[S]||m(r,s))||x[S].slice(0,I)},Y=function(m){return o.s(u%12||12,m,"0")},O=A||function(m,S,x){var I=m<12?"AM":"PM";return x?I.toLowerCase():I};return s.replace(V,function(m,S){return S||function(x){switch(x){case"YY":return String(r.$y).slice(-2);case"YYYY":return o.s(r.$y,4,"0");case"M":return l+1;case"MM":return o.s(l+1,2,"0");case"MMM":return b(e.monthsShort,l,g,3);case"MMMM":return b(g,l);case"D":return r.$D;case"DD":return o.s(r.$D,2,"0");case"d":return String(r.$W);case"dd":return b(e.weekdaysMin,r.$W,$,2);case"ddd":return b(e.weekdaysShort,r.$W,$,3);case"dddd":return $[r.$W];case"H":return String(u);case"HH":return o.s(u,2,"0");case"h":return Y(1);case"hh":return Y(2);case"a":return O(u,d,!0);case"A":return O(u,d,!1);case"m":return String(d);case"mm":return o.s(d,2,"0");case"s":return String(r.$s);case"ss":return o.s(r.$s,2,"0");case"SSS":return o.s(r.$ms,3,"0");case"Z":return a}return null}(m)||a.replace(":","")})},n.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},n.diff=function(t,r,e){var s,a=this,u=o.p(r),d=h(t),l=(d.utcOffset()-this.utcOffset())*f,$=this-d,g=function(){return o.m(a,d)};switch(u){case D:s=g()/12;break;case p:s=g();break;case q:s=g()/3;break;case E:s=($-l)/6048e5;break;case v:s=($-l)/864e5;break;case T:s=$/M;break;case _:s=$/f;break;case y:s=$/c;break;default:s=$}return e?s:o.a(s)},n.daysInMonth=function(){return this.endOf(p).$D},n.$locale=function(){return w[this.$L]},n.locale=function(t,r){if(!t)return this.$L;var e=this.clone(),s=H(t,r,!0);return s&&(e.$L=s),e},n.clone=function(){return o.w(this.$d,this)},n.toDate=function(){return new Date(this.valueOf())},n.toJSON=function(){return this.isValid()?this.toISOString():null},n.toISOString=function(){return this.$d.toISOString()},n.toString=function(){return this.$d.toUTCString()},i}(),J=L.prototype;return h.prototype=J,[["$ms",C],["$s",y],["$m",_],["$H",T],["$W",v],["$M",p],["$y",D],["$D",k]].forEach(function(i){J[i[1]]=function(n){return this.$g(n,i[0],i[1])}}),h.extend=function(i,n){return i.$i||(i(n,L,h),i.$i=!0),h},h.locale=H,h.isDayjs=P,h.unix=function(i){return h(1e3*i)},h.en=w[N],h.Ls=w,h.p={},h})});var ft=st(Z(),1),at="stats",ot=`https://cmsep-backend.mondopower.com.au/${townName}.json`,ut=6e4;window.addEventListener("alpine:init",()=>{window.Alpine.data(at,function(){return{townName:"",lastUpdated:"",numberOfSystems:"",isExporting:!1,isPreStormResilience:!1,isResilience:!1,gridExportCount:"",isGridConnected:!1,isIslanded:!1,solarGenerating:"",solarCapacity:"",batteryCapacity:"",batteryChargeState:"",init(){this.queryData(),this.initPolling()},async queryData(){try{let f=await(await fetch(ot)).json();console.debug("Data fetched",f)}catch(c){console.error("Error in fetching the data",c)}},initPolling(){try{setInterval(this.queryData,ut)}catch(c){console.error("Error in polling the data",c)}}}})});})();
