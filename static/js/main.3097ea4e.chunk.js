(this["webpackJsonpdungeon-gen-app"]=this["webpackJsonpdungeon-gen-app"]||[]).push([[0],{14:function(e,t,a){},15:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(5),o=a.n(c),i=a(2),s=a(6),h=a(7),l=a(0),u=["draw","options"];var d=function(e){var t=e.draw,a=e.options,n=Object(h.a)(e,u),c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=r.a.useRef(null);return r.a.useEffect((function(){var n,r=a.current.getContext(t.context||"2d"),c=0;return function t(){c++,e(r,c),n=window.requestAnimationFrame(t)}(),function(){window.cancelAnimationFrame(n)}}),[e,t]),a}(t,a);return Object(l.jsx)("canvas",Object(s.a)({ref:c},n))};var j=function(e){return Object(l.jsx)("header",{children:Object(l.jsx)("h1",{children:"Dungeon Generator"})})},g=a(4);var m=function(e){var t=r.a.useState(25),a=Object(i.a)(t,2),n=(a[0],a[1],r.a.useState(20)),c=Object(i.a)(n,2),o=c[0],s=c[1],h=r.a.useState(20),u=Object(i.a)(h,2),d=u[0],j=u[1],g=r.a.useState(10),m=Object(i.a)(g,2),b=m[0],f=m[1],x=r.a.useState("reg"),v=Object(i.a)(x,2),O=v[0],p=v[1];return Object(l.jsxs)("form",{children:[Object(l.jsxs)("label",{children:["Height: ",d]}),Object(l.jsx)("input",{type:"range",className:"form-range",min:"1",max:"50",step:"1",name:"height",onChange:function(e){var t=e.target,a=(t.name,t.value);j(a)},value:d}),Object(l.jsxs)("label",{children:["Width: ",o]}),Object(l.jsx)("input",{type:"range",className:"form-range",min:"1",max:"50",step:"1",name:"width",onChange:function(e){var t=e.target,a=(t.name,t.value);s(a)},value:o}),Object(l.jsxs)("label",{children:["Max Rooms: ",b]}),Object(l.jsx)("input",{type:"range",className:"form-range",min:"1",max:"100",step:"1",name:"roomCount",onChange:function(e){var t=e.target,a=(t.name,t.value);f(a)},value:b}),Object(l.jsx)("label",{children:"Room Sizes: "}),Object(l.jsxs)("select",{className:"form-select form-select-sm",value:O,onChange:function(e){var t=e.target,a=(t.name,t.value);p(a)},children:[Object(l.jsx)("option",{value:"small",children:"Small (1x1 - 5x5)"}),Object(l.jsx)("option",{value:"reg",children:"Regular (3x3 - 7x7)"}),Object(l.jsx)("option",{value:"large",children:"Large (5x5 - 10x10)"})]}),Object(l.jsx)("button",{type:"button",className:"btn btn-secondary",onClick:function(t){e.changeHeight(d),e.changeWidth(o)},children:"Resize"}),Object(l.jsx)("button",{type:"button",className:"btn btn-primary",onClick:function(){var t,a;"small"===O?(t=1,a=5):"reg"===O?(t=3,a=7):"large"===O?(t=5,a=10):console.log("error: "+O),e.onGenerate(b,t,a)},children:"Generate"})]})};var b=function(){var e=r.a.useState(25),t=Object(i.a)(e,2),a=t[0],n=(t[1],r.a.useState(20)),c=Object(i.a)(n,2),o=c[0],s=c[1],h=r.a.useState(20),u=Object(i.a)(h,2),b=u[0],f=u[1],x=600,v=600,O=[];function p(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return e.x-n*a<t.x+t.width&&e.x+e.width+n*a>t.x&&e.y-n*a<t.y+t.height&&e.y+e.height+n*a>t.y}return Object(l.jsxs)("div",{children:[Object(l.jsx)(j,{}),Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("div",{className:"col",children:Object(l.jsx)(m,{onGenerate:function(e,t,n){for(var r=[],c=[],i=0;i<e;i++){var s=n-t,h=(Math.floor(Math.random()*s)+t)*a,l=(Math.floor(Math.random()*s)+t)*a;c.push({width:h,height:l})}c.forEach((function(e){for(var t=!1,n=0;!t&&n<10;){var c=!0,i=Math.floor(Math.random()*o)*a,s=Math.floor(Math.random()*b)*a;i+e.width<o*a&&s+e.height<b*a?function(){var t={x:i,y:s,width:e.width,height:e.height};null!=r.find((function(e){return p(t,e,1)}))&&(c=!1)}():c=!1,c?(r.push({x:i,y:s,width:e.width,height:e.height}),t=!0):n++}})),O=r},changeWidth:s,changeHeight:f})}),Object(l.jsx)("div",{className:"col",children:Object(l.jsx)(d,{draw:function(e,t){x=a*o,v=a*b;for(var n=new g.a({type:g.a.Types.canvas,width:x,height:v,domElement:e.canvas}),r=0;r<x;r+=a){n.makeLine(r,0,r,v).stroke="DarkGray"}for(var c=0;c<v;c+=a){n.makeLine(0,c,x,c).stroke="DarkGray"}O.forEach((function(e){var t=n.makeRectangle(e.x+e.width/2,e.y+e.height/2,e.width,e.height);t.fill="orangered",t.opacity=.5})),n.update()},options:{context:"2d"},style:{borderStyle:"solid"},width:x,height:v})})]})]})};a(14);o.a.render(Object(l.jsx)(b,{}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.3097ea4e.chunk.js.map