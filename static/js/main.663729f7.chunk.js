(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,function(t,e,n){t.exports=n.p+"static/media/thunderstorm.58ebab15.svg"},function(t,e,n){t.exports=n.p+"static/media/heavy-rain.caa6ed2b.svg"},function(t,e,n){t.exports=n.p+"static/media/light-rain.06661442.svg"},function(t,e,n){t.exports=n.p+"static/media/snow.20ff1fe1.svg"},function(t,e,n){t.exports=n.p+"static/media/clear.a835ff7f.svg"},function(t,e,n){t.exports=n.p+"static/media/cloud.142dc879.svg"},function(t,e,n){t.exports=n.p+"static/media/bus.e574b9b3.svg"},,,function(t,e,n){t.exports=n.p+"static/media/bilibili.a13a87fb.svg"},function(t,e,n){t.exports=n.p+"static/media/umbrella.934ffe5a.svg"},function(t,e,n){t.exports=n.p+"static/media/mask.c11d3a66.svg"},function(t,e,n){t.exports=n.p+"static/media/left.4d5ba73f.svg"},function(t,e,n){t.exports=n.p+"static/media/right.064b03a6.svg"},function(t,e,n){t.exports=n.p+"static/media/check.47e2c3ee.svg"},,function(t,e,n){t.exports=n(37)},,,,,,function(t,e,n){},,function(t,e,n){},,,,function(t,e,n){"use strict";n.r(e);var a,i,r=n(0),o=n.n(r),c=n(17),s=n.n(c),u=(n(31),n(4)),l=n(5),d=n(7),h=n(6),p=n(8),f=(n(33),n(1)),m=n.n(f),b=n(3),v=n(2),g=n(9),w=n.n(g),y=n(10),j=n.n(y),x=n(11),O=n.n(x),k=n(12),E=n.n(k),C=n(13),N=n.n(C),R=n(14),S=n.n(R),W=n(15),A=n.n(W),D=n(18),P=n.n(D);!function(t){t[t.thunderstorm=0]="thunderstorm",t[t.heavyRain=1]="heavyRain",t[t.lightRain=2]="lightRain",t[t.snow=3]="snow",t[t.clear=4]="clear",t[t.cloud=5]="cloud",t[t.bus=6]="bus",t[t.video=7]="video"}(i||(i={}));var L,I,_,q=(a={},Object(v.a)(a,i.thunderstorm,w.a),Object(v.a)(a,i.heavyRain,j.a),Object(v.a)(a,i.lightRain,O.a),Object(v.a)(a,i.snow,E.a),Object(v.a)(a,i.clear,N.a),Object(v.a)(a,i.cloud,S.a),Object(v.a)(a,i.bus,A.a),Object(v.a)(a,i.video,P.a),a),M=function(t){function e(){return Object(u.a)(this,e),Object(d.a)(this,Object(h.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this.props,e=t.color,n=t.icon,a=t.title,i=t.subtitle,r=t.loading,c=t.link,s=t.children;return o.a.createElement("section",{style:{backgroundColor:e}},!r&&o.a.createElement("a",{href:c,target:"_blank"},n&&o.a.createElement("img",{className:"icon",alt:"icon",src:q[n]}),o.a.createElement("h1",null,a),o.a.createElement("h3",null,i)),s)}}]),e}(r.Component);function T(t){return B.apply(this,arguments)}function B(){return(B=Object(b.a)(m.a.mark(function t(e){var n,a,i,r;return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=e===L.toCompany?"work":"home",a=Date.now(),t.next=4,fetch("https://laysent-daily-transport.now.sh/?direction=".concat(n,"&timestamp=").concat(a,"&lat=30.29365&lng=120.16142"));case 4:return i=t.sent,t.next=7,i.json();case 7:return r=t.sent,t.abrupt("return",r);case 9:case"end":return t.stop()}},t,this)}))).apply(this,arguments)}function F(t){var e=new Date;return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function J(){var t=(new Date).getHours();return t<7?I.night:t<11?I.morning:t<14?I.noon:t<18?I.afternoon:t<22?I.evening:I.night}!function(t){t[t.toCompany=0]="toCompany",t[t.fromCompany=1]="fromCompany"}(L||(L={})),(_=I||(I={}))[_.morning=0]="morning",_[_.noon=1]="noon",_[_.afternoon=2]="afternoon",_[_.evening=3]="evening",_[_.night=4]="night";var U,H,Y=function(t){function e(){var t,n;Object(u.a)(this,e);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(n=Object(d.a)(this,(t=Object(h.a)(e)).call.apply(t,[this].concat(i)))).state={buses:[],loading:!0},n.stop=null,n.getBusDetails=Object(b.a)(m.a.mark(function t(){var e,a,i;return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if((e=J())!==I.night){t.next=4;break}return n.setState({buses:[],loading:!1}),t.abrupt("return");case 4:return a=e===I.morning?L.toCompany:L.fromCompany,t.next=7,T(a);case 7:i=t.sent,n.setState({buses:i.map(function(t){return Math.round(t/60)}),loading:!1});case 9:case"end":return t.stop()}},t,this)})),n}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.stop=function(t,e){var n=0,a=null;return a=window.requestAnimationFrame(function i(r){r-n>=e&&(t(),n=r),a=window.requestAnimationFrame(i)}),t(),function(){null!==a&&(window.cancelAnimationFrame(a),a=null)}}(this.getBusDetails,3e4)}},{key:"componentWillUnmount",value:function(){null!==this.stop&&this.stop()}},{key:"render",value:function(){var t=this.state.buses,e="Go Texi";return t.length>0?e="".concat(t[0]," min"):this.state.loading&&(e="-"),o.a.createElement(M,{color:"#f9d171",title:e,subtitle:t.length>1?"".concat(t.slice(1).map(function(t){return"".concat(t," min")}).join("/")):"",icon:i.bus,loading:!1})}}]),e}(r.PureComponent);!function(t){t[t.thunderstorm=0]="thunderstorm",t[t.heavyRain=1]="heavyRain",t[t.lightRain=2]="lightRain",t[t.snow=3]="snow",t[t.clear=4]="clear",t[t.cloud=5]="cloud",t[t.bus=6]="bus"}(H||(H={}));var G=(U={},Object(v.a)(U,H.thunderstorm,w.a),Object(v.a)(U,H.heavyRain,j.a),Object(v.a)(U,H.lightRain,O.a),Object(v.a)(U,H.snow,E.a),Object(v.a)(U,H.clear,N.a),Object(v.a)(U,H.cloud,S.a),Object(v.a)(U,H.bus,A.a),U),$=(r.Component,n(19)),z=n.n($),K=n(20),Q=n.n(K);function V(t){return t>=200&&t<=232?H.thunderstorm:t>=300&&t<=321?H.heavyRain:t>=500&&t<=531?H.lightRain:t>=600&&t<=622?H.snow:800===t?H.clear:t>=801&&t<=804?H.cloud:H.clear}function X(){return Z.apply(this,arguments)}function Z(){return(Z=Object(b.a)(m.a.mark(function t(){var e,n,a;return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return"https://api.openweathermap.org/data/2.5/forecast/daily?lat=30.29365&lon=120.16142&units=metric&cnt=1&appid=d94bcd435b62a031771c35633f9f310a",t.next=3,fetch("https://api.openweathermap.org/data/2.5/forecast/daily?lat=30.29365&lon=120.16142&units=metric&cnt=1&appid=d94bcd435b62a031771c35633f9f310a");case 3:return e=t.sent,t.next=6,e.json();case 6:return n=t.sent,a=n.list[0].temp,t.abrupt("return",{temperature:a,icon:V(n.list[0].weather[0].id),rainy:n.list[0].weather.some(function(t){var e=V(t.id);return e===H.lightRain||e===H.heavyRain})});case 9:case"end":return t.stop()}},t,this)}))).apply(this,arguments)}function tt(){return et.apply(this,arguments)}function et(){return(et=Object(b.a)(m.a.mark(function t(){var e,n;return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return"https://api.waqi.info/feed/@722/?token=877232d674043e76c5ea9037b8772e1aa4dbd702",t.next=3,fetch("https://api.waqi.info/feed/@722/?token=877232d674043e76c5ea9037b8772e1aa4dbd702");case 3:return e=t.sent,t.next=6,e.json();case 6:return n=t.sent,t.abrupt("return",n.data);case 8:case"end":return t.stop()}},t,this)}))).apply(this,arguments)}var nt=function(t){function e(){var t,n;Object(u.a)(this,e);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(n=Object(d.a)(this,(t=Object(h.a)(e)).call.apply(t,[this].concat(i)))).state={weather:{loading:!0,title:"",subtitle:"",rainy:!1,icon:H.clear},air:{loading:!0,aqi:0}},n}return Object(p.a)(e,t),Object(l.a)(e,[{key:"getWeather",value:function(){var t=Object(b.a)(m.a.mark(function t(){var e;return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,X();case 2:e=t.sent,this.setState({weather:{loading:!1,title:(new Date).getHours()<12?e.temperature.morn:e.temperature.eve+" \xb0 C",subtitle:"".concat(e.temperature.night," ~ ").concat(e.temperature.day,"  \xb0 C"),rainy:e.rainy,icon:e.icon}});case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"getAir",value:function(){var t=Object(b.a)(m.a.mark(function t(){var e;return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,tt();case 2:e=t.sent,this.setState({air:{loading:!1,aqi:e.aqi}});case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.getWeather(),this.getAir()}},{key:"render",value:function(){return o.a.createElement(M,Object.assign({color:"#38c9ba"},this.state.weather),this.state.weather.rainy&&o.a.createElement("img",{src:z.a,alt:"bring umbrella",className:"small-icon left-bottom"}),!this.state.air.loading&&o.a.createElement("div",{className:"right-bottom"},Array.from({length:Math.floor(this.state.air.aqi/50)}).map(function(t,e){return o.a.createElement("img",{src:Q.a,alt:"air condition icon",className:"small-icon",key:e})})))}}]),e}(r.PureComponent),at=n(24);function it(){return rt.apply(this,arguments)}function rt(){return(rt=Object(b.a)(m.a.mark(function t(){var e,n;return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://cors-anywhere.herokuapp.com/http://bangumi.bilibili.com/web_api/timeline_global");case 2:return e=t.sent,t.next=5,e.json();case 5:return n=t.sent,t.abrupt("return",n);case 7:case"end":return t.stop()}},t,this)}))).apply(this,arguments)}function ot(){return ct.apply(this,arguments)}function ct(){return(ct=Object(b.a)(m.a.mark(function t(){var e,n,a,i,r;return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,it();case 2:return e=t.sent,n=e.result,a=n.findIndex(function(t){return 1===t.is_today}),i=n.slice(0,a+1),r=i.map(function(t){return t.seasons.filter(function(t){return 1===t.is_published}).map(function(t){var e=t.pub_index,n=/\u7b2c([\d.]+)\u8bdd/.exec(e),a=0;return n&&(a=+n[1]),{date:new Date(1e3*t.pub_ts),episode:e,title:t.title,seasonId:t.season_id,id:t.ep_id,episodeNum:a}})}).reduce(function(t,e){return t.concat(e)},[]),t.abrupt("return",r);case 8:case"end":return t.stop()}},t,this)}))).apply(this,arguments)}var st=n(21),ut=n.n(st),lt=n(22),dt=n.n(lt),ht=n(23),pt=n.n(ht);var ft=function(t){function e(){var t,n;Object(u.a)(this,e);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(n=Object(d.a)(this,(t=Object(h.a)(e)).call.apply(t,[this].concat(i)))).state={watchList:[],index:0},n.videos=null,n.onNext=function(){n.setState({index:n.state.index+1})},n.onPrevious=function(){n.setState({index:n.state.index-1})},n.onWatched=function(){var t=JSON.parse(localStorage.getItem("bilibili")||"{}"),e=n.state.watchList[n.state.index];t[e.seasonId]=e.episodeNum,localStorage.setItem("bilibili",JSON.stringify(t)),n.getPendingWatchList()},n}return Object(p.a)(e,t),Object(l.a)(e,[{key:"getPendingWatchList",value:function(){var t=Object(b.a)(m.a.mark(function t(){var e,a,i,r,o,c;return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([n.e(1).then(n.bind(null,38)).then(function(t){return t.default.video}),this.videos?Promise.resolve(this.videos):ot()]);case 2:e=t.sent,a=Object(at.a)(e,2),i=a[0],r=a[1],this.videos=r,o=JSON.parse(localStorage.getItem("bilibili")||"{}"),c=r.filter(function(t){var e=t.seasonId;return i.bilibili.indexOf(e)>=0}).filter(function(t){var e=t.seasonId;return(o[e]||0)<t.episodeNum}).sort(function(t,e){var n=F(t.date),a=F(e.date);if(n&&!a)return-1;if(!n&&a)return 1;var r=i.bilibili.indexOf(t.seasonId),o=i.bilibili.indexOf(e.seasonId);return r<o?-1:r>o?1:t.episode>e.episode?1:-1}),this.setState({watchList:c,index:0});case 10:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.getPendingWatchList()}},{key:"render",value:function(){var t=this.state.watchList[this.state.index],e=!!t,n=this.state.index>0,a=this.state.index<this.state.watchList.length-1;return o.a.createElement(M,{color:"#6994e3",title:e?"Bilibili":"-",subtitle:e?t.title:"",icon:i.video,loading:!1,link:e?"https://m.bilibili.com/bangumi/play/ep".concat(t.id):void 0},n&&o.a.createElement("button",{className:"icon-button left-top",onClick:this.onPrevious},o.a.createElement("img",{src:ut.a,alt:"previous",className:"small-icon"})),a&&o.a.createElement("button",{className:"icon-button right-top",onClick:this.onNext},o.a.createElement("img",{src:dt.a,alt:"next",className:"small-icon"})),o.a.createElement("button",{className:"icon-button left-bottom",onClick:this.onWatched},o.a.createElement("img",{src:pt.a,alt:"set watched",className:"small-icon"})),o.a.createElement("span",{className:"right-bottom"},e?t.episode:""))}}]),e}(r.PureComponent),mt=function(t){function e(t){var n;return Object(u.a)(this,e),(n=Object(d.a)(this,Object(h.a)(e).call(this,t))).state=void 0,n.updateTime=function(){document.hidden||n.setState({time:J()})},n.state={time:J()},n}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){document.addEventListener("visibilitychange",this.updateTime,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("visibilitychange",this.updateTime)}},{key:"render",value:function(){var t=[];switch(this.state.time){case I.morning:t=[nt,Y,ft];break;case I.noon:t=[ft,nt,Y];break;case I.afternoon:t=[nt,ft,Y];break;case I.evening:t=[Y,ft,nt];break;case I.night:t=[ft,nt,Y]}return o.a.createElement("main",{className:"app"},t.map(function(t){return o.a.createElement(t,{key:t.name})}))}}]),e}(r.PureComponent),bt=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function vt(t,e){navigator.serviceWorker.register(t).then(function(t){t.onupdatefound=function(){var n=t.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),e&&e.onUpdate&&e.onUpdate(t)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(t)))})}}).catch(function(t){console.error("Error during service worker registration:",t)})}s.a.render(o.a.createElement(mt,null),document.getElementById("root")),function(t){if("serviceWorker"in navigator){if(new URL("/daily-dashboard",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/daily-dashboard","/service-worker.js");bt?(function(t,e){fetch(t).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(t){t.unregister().then(function(){window.location.reload()})}):vt(t,e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e,t),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):vt(e,t)})}}()}],[[25,3,2]]]);
//# sourceMappingURL=main.663729f7.chunk.js.map