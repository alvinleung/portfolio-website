(this["webpackJsonpdesign-explorer"]=this["webpackJsonpdesign-explorer"]||[]).push([[0],[,,,,function(e,t,n){e.exports=n(12)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),i=n(2),a=n.n(i),c=n(1);var u=function(e){var t,n=!1,o=!1,r=1,i=0,a={x:0,y:0},c={x:0,y:0},u={x:0,y:0},s=[],l=[],d=2,f=0,m=0,h=null,g=function(){},v=0,w=Date.now(),x=w,E=!1,y={x:0,y:0};function p(e,t,n){for(var o=0,i=0,a=0,c=0,u=0;u<t.length;u++){O(c,a,t[u].width,t[u].height)&&(n||r<.5?e.drawImage(l[u],c,a,t[u].width,t[u].height):e.drawImage(t[u],c,a)),t[u].height>0&&(i=t[u].height),c+=t[u].width+0,o<d-1?o++:(a+=i+0,i++,c=0,o=0,i=0)}}function O(e,n,o,i){var c=t.width/r,u=t.height/r;return e<a.x+c&&e+o>a.x&&n<a.y+u&&n+i>a.y}function b(e){return{x:e.x/r+a.x,y:e.y/r+a.y}}return function(e){return h=(t=e).getContext("2d"),{initialize:function(e,t,n){d=t,n&&(r=n),l=e.map((function(e){return function(e,t){var n=document.createElement("canvas");return n.width=e.width*t,n.height=e.height*t,n.getContext("2d").drawImage(e,0,0,n.width,n.height),n}(e,.5)})),s=e,function(e){for(var t=0,n=0,o=0,r=0,i=0,a=0;a<e.length;a++){var c=e[a].width,u=e[a].height;u>i&&(i=u),r+=c+0,o<d-1?o++:(r>t&&(t=r),n+=i+0,r=0,i=0,o=0)}o<d-1&&(n+=i+0);f=t,m=n}(e),o=!0},isInitialized:function(){return o},update:function(e,o,l){w=Date.now(),v=.1*(w-x),x=w,function(e,t,o){var s=b(e);if(r+=i=.2*(t-r),0!=i.toFixed(3)){n=!0;var l=b(e),d={x:s.x-l.x,y:s.y-l.y};a.x+=d.x,a.y+=d.y,u.x+=d.x,u.y+=d.y}else n&&g(r),n=!1;if(o){var f=b(e);E||(E=!0,{x:f.x-a.x,y:f.y-a.y},y=f);var m={x:f.x-y.x,y:f.y-y.y};u.x=a.x-m.x,u.y=a.y-m.y}else E=!1;c.x=.2*(u.x-a.x),c.y=.2*(u.y-a.y),a.x+=c.x*v,a.y+=c.y*v}(e,o,l),function(e,t,o,i,u){t.clearRect(0,0,e.width,e.height),t.save(),t.scale(r,r),t.translate(-a.x,-a.y),n||function(){return 0!=c.x.toFixed(2)||0!=c.y.toFixed(2)}()?p(t,o,!0):p(t,o,!1);t.restore(),!1}(t,h,s)},zoomTo:function(e){console.log("zooming to target: "+e)},pointCameraTo:function(e){u.x=e.x,u.y=e.y},getCurrentCameraPos:function(){return{x:a.x,y:a.y}},getDocumentWidth:function(){return f},getDocumentHeight:function(){return m},pointCameraToImage:function(e){var n=e instanceof HTMLImageElement?s.indexOf(e):e;if(s[n]){for(var o=-t.width/r/2,i=0,a=0;a<n;a++)i+=s[a].height+0;u.x=o,u.y=i}else console.warn("Can't find img index "+e)},onPanEnd:function(e){e},onZoomEnd:function(e){g=e},worldToScreenPos:function(e){return function(e){return{x:(e.x-a.x)*r,y:(e.y-a.y)*r}}(e)},screenToWorldPos:function(e){return b(e)}}}(e)};n(9);function s(e,t,n){return e<t?t:e>n?n:e}var l=function(e){var t=e.width,n=e.height,i=Object(o.useState)(!1),a=Object(c.a)(i,2),l=a[0],d=a[1],f=Object(o.useRef)(1),m=Object(o.useRef)(!1),h=Object(o.useRef)({x:0,y:0}),g=Object(o.useState)({x:0,y:0}),v=Object(c.a)(g,2),w=v[0],x=v[1],E=Object(o.useRef)(null),y=Object(o.useRef)(null);function p(){var e=E.current.getBoundingClientRect();x({x:window.scrollX+e.left,y:window.scrollY+e.top})}return Object(o.useEffect)((function(){function e(e){e.touches.length>1&&e.preventDefault()}function t(e){}return E.current.addEventListener("touchstart",e),E.current.addEventListener("touchend",t),function(){E.current.removeEventListener("touchstart",e),E.current.removeEventListener("touchend",t)}}),[]),Object(o.useEffect)((function(){return window.addEventListener("load",p),window.addEventListener("resize",p),window.addEventListener("scroll",p,!0),function(){window.removeEventListener("resize",p),window.removeEventListener("load",p),window.removeEventListener("scroll",p,!0)}}),[]),Object(o.useEffect)((function(){var t=u(E.current),n=0,o=e.sections.map((function(r){var i=new Image,a=r.src;return i.src=a,i.addEventListener("load",(function(){console.log("Viewport loaded image: "+a),n++,e.onProgress&&e.onProgress(Math.floor(n/o.length*100)),n===o.length&&(!0,console.log("All images loaded, initialize ViewportRenderer"),t.initialize(o,e.cols,f.current))})),i}));!function e(n){t.isInitialized()&&t.update(h.current,f.current,m.current),requestAnimationFrame(e)}(),y.current=t}),[]),Object(o.useEffect)((function(){var t=e.sections.findIndex((function(t){return t.title===e.targetSection}));console.log("going to target section: "+e.targetSection),y.current.pointCameraToImage(t)}),[e.targetSection]),Object(o.useEffect)((function(){if(l){var t=function(t){(e.scrollToPan||t.ctrlKey||t.metaKey)&&t.preventDefault()};return window.addEventListener("wheel",t,{passive:!1}),function(){window.removeEventListener("wheel",t)}}}),[l]),Object(o.useEffect)((function(){if(e.targetZoom&&(f.current=e.targetZoom,!l)){var o=y.current.screenToWorldPos({x:t/2,y:n/2});h.current=y.current.worldToScreenPos({x:s(o.x,t/2,y.current.getDocumentWidth()),y:s(o.y,n/2,y.current.getDocumentHeight())})}}),[e.targetZoom]),r.a.createElement("canvas",{style:{touchAction:"none"},onMouseDown:function(e){e.stopPropagation(),e.preventDefault(),m.current=!0},onMouseUp:function(e){m.current=!1},onMouseMove:function(t){h.current={x:t.nativeEvent.pageX-w.x,y:t.nativeEvent.pageY-w.y},m.current&&e.onPan&&e.onPan()},onMouseOver:function(e){d(!0)},onMouseOut:function(e){d(!1)},onWheel:function(t){if(t.nativeEvent.ctrlKey||t.nativeEvent.metaKey){var n=f.current-.005*t.nativeEvent.deltaY;f.current=s(n,.2,1.5),e.onZoom&&e.onZoom(f.current)}else if(e.scrollToPan){var o=y.current.getCurrentCameraPos();y.current.pointCameraTo({x:o.x+5*t.nativeEvent.deltaX/f.current,y:o.y+5*t.nativeEvent.deltaY/f.current})}return!1},ref:E,width:t,height:n})};n(10),n(11);var d=function(e){var t=e.defaultZoomLevel?e.defaultZoomLevel:100,n=Math.floor(e.zoomLevel);return r.a.createElement("div",{className:n===t?"zoom-control":"zoom-control zoom-control--mutated"},r.a.createElement("button",{className:"zoom-control__reset",onClick:function(){e.onZoomChange&&e.onZoomChange(t)}},"Reset Zoom"),r.a.createElement("button",{onClick:function(){var t=n-n%25+25;e.onZoomChange&&e.onZoomChange(t>150?150:t)}},"+"),r.a.createElement("div",{className:"zoom-control__value"},n,"%"),r.a.createElement("button",{onClick:function(){var t=n-n%25-25;e.onZoomChange&&e.onZoomChange(t<20?20:t)}},"-"))};var f={SCROLL:"onScroll",MOUSE_OVER:"onMouseOver",NONE:"none"},m=function(e){var t=e.src,n=e.initialZoom||100,i=Object(o.useState)(e.initialZoom||100),a=Object(c.a)(i,2),u=a[0],s=a[1],m=Object(o.useState)({width:window.innerWidth,height:window.innerHeight}),h=Object(c.a)(m,2),g=h[0],v=h[1],w=Object(o.useState)(""),x=Object(c.a)(w,2),E=x[0],y=x[1],p=e.zoomHintDuration||1e3,O=Object(o.useState)(!1),b=Object(c.a)(O,2),L=b[0],j=b[1],C=Object(o.useRef)(null),z=Object(o.useRef)(!1),S=Object(o.useState)(0),Z=Object(c.a)(S,2),P=Z[0],R=Z[1],T=Object(o.useState)("Getting ready..."),M=Object(c.a)(T,2),A=M[0],D=M[1],N=["Getting ready...","Cleaning up mockup...","Finalising...","Very very final.jpg"],I=Object(o.useRef)(null),H=["Viewing your tasks","Contacting a client","Contacting a helper","Leaderboard","Check in - Before","Check in - During and after","Leaving Reviews"],k=t.map((function(e,t){return{title:H[t],src:e}}));function W(){null!=C.current&&clearTimeout(C.current),L&&j(!1)}function _(t){(function(t){switch(e.zoomHint){case f.SCROLL:return t;case f.MOUSE_OVER:return z.current&&t;case f.NONE:return!1}return!1})(!0)&&(t.ctrlkey&&t.metaKey?j(!1):(j(!0),null!=C.current&&clearTimeout(C.current),C.current=setTimeout((function(){return j(!1)}),p)))}function V(){v({width:I.current.offsetWidth,height:I.current.offsetHeight})}function F(){y(decodeURIComponent(window.location.hash.split("#")[1]))}return Object(o.useEffect)((function(){return window.addEventListener("resize",V),window.addEventListener("hashchange",F),window.addEventListener("scroll",_,!0),function(){window.removeEventListener("resize",V),window.removeEventListener("hashchange",F),window.removeEventListener("scroll",_,!0)}}),[]),Object(o.useEffect)((function(){v({width:I.current.offsetWidth,height:I.current.offsetHeight})}),[I]),r.a.createElement("div",{ref:I,className:"design-explorer-container",onMouseEnter:function(){z.current=!0},onMouseOut:function(){z.current=!1}},r.a.createElement("div",{className:"credit-text"},"Crafted with ReactJS by Alvin Leung"),r.a.createElement(d,{zoomLevel:u,onZoomChange:function(e){s(e)},defaultZoomLevel:n}),r.a.createElement("div",{className:"viewport-container"},r.a.createElement(l,{width:g.width,height:g.height,src:t,sections:k,targetSection:E,targetZoom:u/100,onZoom:function(e){s(100*e),W()},cols:e.cols?e.cols:1,scrollToPan:!!e.scrollToPan&&e.scrollToPan,onProgress:function(e){!function(){var e=Math.round(Math.random()*(N.length-1));D(N[e])}(),R(e)},onPan:function(e){W()}})),r.a.createElement("div",{className:L&&100===P?"zoom-interaction-hint":"zoom-interaction-hint zoom-interaction-hint--hidden"},navigator.platform.indexOf("Win")>-1&&r.a.createElement("span",null,"Hold Ctrl and scroll to zoom in"),navigator.platform.indexOf("Mac")>-1&&r.a.createElement("span",null,"Hold \u2318 and scroll to zoom in")),r.a.createElement("div",{className:100===P?"progress-indicator progress-indicator--hidden":"progress-indicator"},r.a.createElement("div",{className:"spinner"}),r.a.createElement("div",null," ",A)))},h={_mountedList:[],unmountAll:function(){this._mountedList.forEach((function(e){a.a.unmountComponentAtNode(e)}))},mountAll:function(){var e=this;document.querySelectorAll(".design-explorer").forEach((function(t){for(var n=t.querySelectorAll("img"),o=[],i=0;i<n.length;i++)o[i]=n[i].src;var c=parseInt(t.getAttribute("data-cols")||1),u=parseInt(t.getAttribute("data-init-zoom")||100),s=t.getAttribute("data-zoom-hint")||"none",l=t.getAttribute("data-scroll-to-pan")||!1,d=t.getAttribute("data-zoom-hint-duration")||1e3;a.a.render(r.a.createElement(m,{src:o,cols:c,scrollToPan:l,initialZoom:u,zoomHint:s,zoomHintDuration:d}),t),e._mountedList.push(t)}))}};window.DesignExplorer=h,h.mountAll()}],[[4,1,2]]]);
//# sourceMappingURL=main.6ba10658.chunk.js.map