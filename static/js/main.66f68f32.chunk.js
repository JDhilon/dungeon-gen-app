(this["webpackJsonpdungeon-gen-app"]=this["webpackJsonpdungeon-gen-app"]||[]).push([[0],{16:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),o=a(7),r=a.n(o),s=a(2),c=a(6),h=a(0);var u=function(e){return Object(h.jsx)("p",{children:e.data})},l=a(8),d=a(9),m=["draw","options"];var f=function(e){var t=e.draw,a=e.options,n=Object(d.a)(e,m),o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=i.a.useRef(null);return i.a.useEffect((function(){var n=a.current.getContext(t.context||"2d");e(n)}),[e,t]),a}(t,a);return Object(h.jsx)("canvas",Object(l.a)({ref:o},n))};var v=function(e){return Object(h.jsx)("header",{children:Object(h.jsx)("h1",{children:"Dungeon Generator"})})};var x=function(e){var t=i.a.useState(25),a=Object(s.a)(t,2),n=(a[0],a[1],i.a.useState(20)),o=Object(s.a)(n,2),r=o[0],c=o[1],u=i.a.useState(20),l=Object(s.a)(u,2),d=l[0],m=l[1],f=i.a.useState(10),v=Object(s.a)(f,2),x=v[0],j=v[1],g=i.a.useState("reg"),b=Object(s.a)(g,2),p=b[0],O=b[1],y=i.a.useState("sparse"),E=Object(s.a)(y,2),k=E[0],w=E[1];return Object(h.jsxs)("form",{children:[Object(h.jsxs)("label",{children:["Height: ",d]}),Object(h.jsx)("input",{type:"range",className:"form-range",min:"1",max:"50",step:"1",name:"height",onChange:function(e){var t=e.target,a=(t.name,t.value);m(a)},value:d}),Object(h.jsxs)("label",{children:["Width: ",r]}),Object(h.jsx)("input",{type:"range",className:"form-range",min:"1",max:"50",step:"1",name:"width",onChange:function(e){var t=e.target,a=(t.name,t.value);c(a)},value:r}),Object(h.jsxs)("label",{children:["Max Rooms: ",x]}),Object(h.jsx)("input",{type:"range",className:"form-range",min:"1",max:"100",step:"1",name:"roomCount",onChange:function(e){var t=e.target,a=(t.name,t.value);j(a)},value:x}),Object(h.jsx)("label",{children:"Room Sizes: "}),Object(h.jsxs)("select",{className:"form-select form-select-sm",value:p,onChange:function(e){var t=e.target,a=(t.name,t.value);O(a)},children:[Object(h.jsx)("option",{value:"small",children:"Small (1x1 - 5x5)"}),Object(h.jsx)("option",{value:"reg",children:"Regular (3x3 - 7x7)"}),Object(h.jsx)("option",{value:"large",children:"Large (5x5 - 10x10)"})]}),Object(h.jsx)("label",{children:"Connectivity: "}),Object(h.jsxs)("select",{className:"form-select form-select-sm",value:k,onChange:function(e){var t=e.target,a=(t.name,t.value);w(a)},children:[Object(h.jsx)("option",{value:"linear",children:"Linear"}),Object(h.jsx)("option",{value:"sparse",children:"Sparse"}),Object(h.jsx)("option",{value:"normal",children:"Normal"}),Object(h.jsx)("option",{value:"dense",children:"Dense"}),Object(h.jsx)("option",{value:"complete",children:"Complete"})]}),Object(h.jsx)("button",{type:"button",className:"btn btn-secondary",onClick:function(t){e.changeHeight(d),e.changeWidth(r)},children:"Resize"}),Object(h.jsx)("button",{type:"button",className:"btn btn-primary",onClick:function(){var t,a;"small"===p?(t=1,a=5):"reg"===p?(t=3,a=7):"large"===p?(t=5,a=10):console.log("error: "+p),e.onGenerate(x,t,a,r,d,k)},children:"Generate"})]})},j=a(3),g=a(4),b=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;Object(j.a)(this,e),this.size=t,this.matrix=[],this.mst=[];for(var a=0;a<t;a++){this.matrix.push([]),this.mst.push([]);for(var n=0;n<t;n++)this.matrix[a][n]=0,this.mst[a][n]=0}}return Object(g.a)(e,[{key:"addEdge",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;e>this.size-1||t>this.size-1?console.log("invalid vertex"):e===t?(this.matrix[e][t]=0,this.matrix[t][e]=0):(this.matrix[e][t]=a,this.matrix[t][e]=a)}},{key:"removeEdge",value:function(e,t){e>this.size-1||t>this.size-1?console.log("invalid vertex"):(this.matrix[e][t]=0,this.matrix[t][e]=0)}},{key:"addVertex",value:function(){this.size++,this.matrix.push([]);for(var e=0;e<this.size;e++)this.matrix[e][this.size-1]=0,this.matrix[this.size-1][e]=0}},{key:"printMatrix",value:function(){for(var e=0;e<this.size;e++){for(var t="",a=0;a<this.size;a++)t+=" ".concat(this.matrix[e][a]);console.log(t)}}},{key:"minKey",value:function(e,t){for(var a=Number.MAX_VALUE,n=-1,i=0;i<this.size;i++)!1===t[i]&&e[i]<a&&(a=e[i],n=i);return n}},{key:"primMST",value:function(){var e=this;if(this.size<=1)return[];for(var t=[],a=[],n=[],i=0;i<this.size;i++)t.push(0),a.push(Number.MAX_VALUE),n.push(!1);a[0]=0,t[0]=-1;for(var o=0;o<this.size-1;o++){var r=this.minKey(a,n);n[r]=!0;for(var s=0;s<this.size;s++)0!==this.matrix[r][s]&&!1===n[s]&&this.matrix[r][s]<a[s]&&(t[s]=r,a[s]=this.matrix[r][s])}t.forEach((function(t,a){-1!==t&&(e.mst[a][t]=1,e.mst[t][a]=1)})),this.matrix.forEach((function(t,a){t.forEach((function(t,n){0!==t&&(1===e.mst[a][n]?e.addEdge(a,n,1):e.addEdge(a,n,Math.random()))}))}))}}]),e}(),p=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;Object(j.a)(this,e),this.size=t,this.rooms=[],this.paths=new b(t),this.focusedRoom=-1}return Object(g.a)(e,[{key:"checkCollision",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return e.x-a<t.x+t.width&&e.x+e.width+a>t.x&&e.y-a<t.y+t.height&&e.y+e.height+a>t.y}},{key:"distance",value:function(e,t){return Math.sqrt((e[0]-t[0])*(e[0]-t[0])+(e[1]-t[1])*(e[1]-t[1]))}},{key:"generateRooms",value:function(e,t,a,n){for(var i=this,o=[],r=[],s=0;s<this.size;s++){var c=t-e,h=Math.floor(Math.random()*c)+e,u=Math.floor(Math.random()*c)+e;r.push({width:h,height:u})}var l=0;r.forEach((function(e){for(var t=!1,r=0;!t&&r<10;){var s=!0,c=Math.floor(Math.random()*a),h=Math.floor(Math.random()*n);c+e.width<a&&h+e.height<n?function(){var t={x:c,y:h,width:e.width,height:e.height};null!=o.find((function(e){return i.checkCollision(t,e,1)}))&&(s=!1)}():s=!1,s?(o.push({id:l,x:c,y:h,width:e.width,height:e.height,focused:!1}),t=!0,l++):r++}})),this.rooms=o,this.size=l}},{key:"generatePaths",value:function(t){var a=this,n=new b(this.size),i=Number.MIN_VALUE;this.rooms.forEach((function(t,o,r){r.forEach((function(r,s){var c=Math.floor(100*a.distance(e.getMidPoint(t),e.getMidPoint(r)));c>i&&(i=c),n.addEdge(o,s,c)}))})),n.primMST(),"sparse"===t?n.matrix.forEach((function(e,t){e.forEach((function(e,a){e<.9&&n.removeEdge(t,a)}))})):"normal"===t?n.matrix.forEach((function(e,t){e.forEach((function(e,a){e<.8&&n.removeEdge(t,a)}))})):"dense"===t?n.matrix.forEach((function(e,t){e.forEach((function(e,a){e<.7&&n.removeEdge(t,a)}))})):"complete"===t||n.matrix.forEach((function(e,t){e.forEach((function(e,a){e<1&&n.removeEdge(t,a)}))})),this.paths=n}},{key:"unsetFocusedRoom",value:function(){-1!==this.focusedRoom&&(this.rooms[this.focusedRoom].focused=!1,this.focusedRoom=-1)}},{key:"setFocusedRoom",value:function(e){this.unsetFocusedRoom(),this.focusedRoom=e,this.rooms[e].focused=!0}}],[{key:"getMidPoint",value:function(e){return[e.x+e.width/2,e.y+e.height/2]}}]),e}();var O=function(){var e=i.a.useState(25),t=Object(s.a)(e,2),a=t[0],n=(t[1],i.a.useState(20)),o=Object(s.a)(n,2),r=o[0],l=o[1],d=i.a.useState(20),m=Object(s.a)(d,2),j=m[0],g=m[1],b=i.a.useState(new p),O=Object(s.a)(b,2),y=O[0],E=O[1],k=i.a.useState(-1),w=Object(s.a)(k,2),z=w[0],M=w[1],R=600,S=600;return Object(h.jsxs)("div",{children:[Object(h.jsx)(v,{}),Object(h.jsxs)("div",{className:"row",children:[Object(h.jsx)("div",{className:"col",children:Object(h.jsx)(x,{onGenerate:function(e,t,a,n,i,o){var r=new p(e);r.generateRooms(t,a,n,i),r.generatePaths(o),E(r),M(-1)},changeWidth:l,changeHeight:g})}),Object(h.jsxs)("div",{className:"col",children:[Object(h.jsx)(f,{draw:function(e){R=a*r,S=a*j;for(var t=new c.a({type:c.a.Types.canvas,width:R,height:S,domElement:e.canvas}),n=0;n<R;n+=a){t.makeLine(n,0,n,S).stroke="DarkGray"}for(var i=0;i<S;i+=a){t.makeLine(0,i,R,i).stroke="DarkGray"}y.rooms.forEach((function(e){var n=t.makeText(e.id,e.x*a+a/2,e.y*a+a/2);n.size=a,n.stroke="black",n.opacity=.75;var i=t.makeRectangle(e.x*a+e.width*a/2,e.y*a+e.height*a/2,e.width*a,e.height*a);i.fill=e.focused?"blue":"orangered",i.opacity=.5})),y.paths.matrix.forEach((function(e,n){e.forEach((function(e,i){if(0!==e){var o=p.getMidPoint(y.rooms[n]),r=p.getMidPoint(y.rooms[i]),s=t.makeLine(o[0]*a,o[1]*a,r[0]*a,r[1]*a);s.stroke=1===e?"Black":"Blue",s.lineWidth=10}}))})),t.update()},options:{context:"2d"},style:{borderStyle:"solid"},width:R,height:S,onClick:function(e){var t=e.nativeEvent.layerX,n=e.nativeEvent.layerY,i=y.rooms.findIndex((function(e){return t>e.x*a&&t<e.x*a+e.width*a&&n>e.y*a&&n<e.y*a+e.height*a}));-1===i?(y.unsetFocusedRoom(),M(-1)):(y.setFocusedRoom(i),M(i))}}),-1!==z?Object(h.jsx)(u,{data:function(){var e=y.rooms[z];return"id: "+e.id+"\n x: "+e.x+"\n y: "+e.y+"\n height: "+e.height+"\n width: "+e.width+"\n "}()}):null]})]})]})};a(16);r.a.render(Object(h.jsx)(O,{}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.66f68f32.chunk.js.map