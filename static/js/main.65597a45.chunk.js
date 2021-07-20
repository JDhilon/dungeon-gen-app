(this["webpackJsonpdungeon-gen-app"]=this["webpackJsonpdungeon-gen-app"]||[]).push([[0],{16:function(e,t,i){},17:function(e,t,i){"use strict";i.r(t);var a=i(1),n=i.n(a),o=i(7),s=i.n(o),r=i(2),h=i(8),c=i(9),u=i(0),l=["draw","options"];var d=function(e){var t=e.draw,i=e.options,a=Object(c.a)(e,l),o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.a.useRef(null);return n.a.useEffect((function(){var a=i.current.getContext(t.context||"2d");e(a)}),[e,t]),i}(t,i);return Object(u.jsx)("canvas",Object(h.a)({ref:o},a))};var m=function(e){return Object(u.jsx)("header",{children:Object(u.jsx)("h1",{children:"Dungeon Generator"})})},f=i(6);var v=function(e){var t=n.a.useState(25),i=Object(r.a)(t,2),a=(i[0],i[1],n.a.useState(20)),o=Object(r.a)(a,2),s=o[0],h=o[1],c=n.a.useState(20),l=Object(r.a)(c,2),d=l[0],m=l[1],f=n.a.useState(10),v=Object(r.a)(f,2),g=v[0],x=v[1],j=n.a.useState("reg"),b=Object(r.a)(j,2),p=b[0],y=b[1];return Object(u.jsxs)("form",{children:[Object(u.jsxs)("label",{children:["Height: ",d]}),Object(u.jsx)("input",{type:"range",className:"form-range",min:"1",max:"50",step:"1",name:"height",onChange:function(e){var t=e.target,i=(t.name,t.value);m(i)},value:d}),Object(u.jsxs)("label",{children:["Width: ",s]}),Object(u.jsx)("input",{type:"range",className:"form-range",min:"1",max:"50",step:"1",name:"width",onChange:function(e){var t=e.target,i=(t.name,t.value);h(i)},value:s}),Object(u.jsxs)("label",{children:["Max Rooms: ",g]}),Object(u.jsx)("input",{type:"range",className:"form-range",min:"1",max:"100",step:"1",name:"roomCount",onChange:function(e){var t=e.target,i=(t.name,t.value);x(i)},value:g}),Object(u.jsx)("label",{children:"Room Sizes: "}),Object(u.jsxs)("select",{className:"form-select form-select-sm",value:p,onChange:function(e){var t=e.target,i=(t.name,t.value);y(i)},children:[Object(u.jsx)("option",{value:"small",children:"Small (1x1 - 5x5)"}),Object(u.jsx)("option",{value:"reg",children:"Regular (3x3 - 7x7)"}),Object(u.jsx)("option",{value:"large",children:"Large (5x5 - 10x10)"})]}),Object(u.jsx)("button",{type:"button",className:"btn btn-secondary",onClick:function(t){e.changeHeight(d),e.changeWidth(s)},children:"Resize"}),Object(u.jsx)("button",{type:"button",className:"btn btn-primary",onClick:function(){var t,i;"small"===p?(t=1,i=5):"reg"===p?(t=3,i=7):"large"===p?(t=5,i=10):console.log("error: "+p),e.onGenerate(g,t,i,s,d)},children:"Generate"})]})},g=i(3),x=i(4),j=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;Object(g.a)(this,e),this.size=t,this.matrix=[];for(var i=0;i<t;i++){this.matrix.push([]);for(var a=0;a<t;a++)this.matrix[i][a]=0}}return Object(x.a)(e,[{key:"addEdge",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;e>this.size-1||t>this.size-1?console.log("invalid vertex"):e===t?(this.matrix[e][t]=0,this.matrix[t][e]=0):(this.matrix[e][t]=i,this.matrix[t][e]=i)}},{key:"removeEdge",value:function(e,t){e>this.size-1||t>this.size-1?console.log("invalid vertex"):(this.matrix[e][t]=0,this.matrix[t][e]=0)}},{key:"addVertex",value:function(){this.size++,this.matrix.push([]);for(var e=0;e<this.size;e++)this.matrix[e][this.size-1]=0,this.matrix[this.size-1][e]=0}},{key:"printMatrix",value:function(){for(var e=0;e<this.size;e++){for(var t="",i=0;i<this.size;i++)t+=" ".concat(this.matrix[e][i]);console.log(t)}}},{key:"minKey",value:function(e,t){for(var i=Number.MAX_VALUE,a=-1,n=0;n<this.size;n++)!1===t[n]&&e[n]<i&&(i=e[n],a=n);return a}},{key:"primMST",value:function(){if(this.size<=1)return[];for(var e=[],t=[],i=[],a=0;a<this.size;a++)e.push(0),t.push(Number.MAX_VALUE),i.push(!1);t[0]=0,e[0]=-1;for(var n=0;n<this.size-1;n++){var o=this.minKey(t,i);i[o]=!0;for(var s=0;s<this.size;s++)0!==this.matrix[o][s]&&!1===i[s]&&this.matrix[o][s]<t[s]&&(e[s]=o,t[s]=this.matrix[o][s])}return e}}]),e}(),b=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;Object(g.a)(this,e),this.size=t,this.rooms=[],this.paths=new j(t),this.focusedRoom=-1}return Object(x.a)(e,[{key:"checkCollision",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return e.x-i<t.x+t.width&&e.x+e.width+i>t.x&&e.y-i<t.y+t.height&&e.y+e.height+i>t.y}},{key:"distance",value:function(e,t){return Math.sqrt((e[0]-t[0])*(e[0]-t[0])+(e[1]-t[1])*(e[1]-t[1]))}},{key:"generateRooms",value:function(e,t,i,a){for(var n=this,o=[],s=[],r=0;r<this.size;r++){var h=t-e,c=Math.floor(Math.random()*h)+e,u=Math.floor(Math.random()*h)+e;s.push({width:c,height:u})}var l=0;s.forEach((function(e){for(var t=!1,s=0;!t&&s<10;){var r=!0,h=Math.floor(Math.random()*i),c=Math.floor(Math.random()*a);h+e.width<i&&c+e.height<a?function(){var t={x:h,y:c,width:e.width,height:e.height};null!=o.find((function(e){return n.checkCollision(t,e,1)}))&&(r=!1)}():r=!1,r?(o.push({id:l,x:h,y:c,width:e.width,height:e.height,focused:!1}),t=!0,l++):s++}})),this.rooms=o,this.size=l}},{key:"generatePaths",value:function(){var t=this;this.paths=new j(this.size),this.rooms.forEach((function(i,a,n){n.forEach((function(n,o){t.paths.addEdge(a,o,Math.floor(100*t.distance(e.getMidPoint(i),e.getMidPoint(n))))}))}))}},{key:"unsetFocusedRoom",value:function(){-1!==this.focusedRoom&&(this.rooms[this.focusedRoom].focused=!1,this.focusedRoom=-1)}},{key:"setFocusedRoom",value:function(e){this.unsetFocusedRoom(),this.focusedRoom=e,this.rooms[e].focused=!0}}],[{key:"getMidPoint",value:function(e){return[e.x+e.width/2,e.y+e.height/2]}}]),e}();var p=function(){var e=n.a.useState(25),t=Object(r.a)(e,2),i=t[0],a=(t[1],n.a.useState(20)),o=Object(r.a)(a,2),s=o[0],h=o[1],c=n.a.useState(20),l=Object(r.a)(c,2),g=l[0],x=l[1],j=n.a.useState(new b),p=Object(r.a)(j,2),y=p[0],O=p[1],k=n.a.useState(-1),w=Object(r.a)(k,2),z=w[0],M=w[1],R=600,S=600;return Object(u.jsxs)("div",{children:[Object(u.jsx)(m,{}),Object(u.jsxs)("div",{className:"row",children:[Object(u.jsx)("div",{className:"col",children:Object(u.jsx)(v,{onGenerate:function(e,t,i,a,n){var o=new b(e);o.generateRooms(t,i,a,n),o.generatePaths(),o.paths.primMST(),O(o),M(-1)},changeWidth:h,changeHeight:x})}),Object(u.jsxs)("div",{className:"col",children:[Object(u.jsx)(d,{draw:function(e){R=i*s,S=i*g;for(var t=new f.a({type:f.a.Types.canvas,width:R,height:S,domElement:e.canvas}),a=0;a<R;a+=i){t.makeLine(a,0,a,S).stroke="DarkGray"}for(var n=0;n<S;n+=i){t.makeLine(0,n,R,n).stroke="DarkGray"}y.rooms.forEach((function(e){var a=t.makeText(e.id,e.x*i+i/2,e.y*i+i/2);a.size=i,a.stroke="black",a.opacity=.75;var n=t.makeRectangle(e.x*i+e.width*i/2,e.y*i+e.height*i/2,e.width*i,e.height*i);n.fill=e.focused?"blue":"orangered",n.opacity=.5})),y.paths.primMST().forEach((function(e,a){if(-1!==e){var n=b.getMidPoint(y.rooms[a]),o=b.getMidPoint(y.rooms[e]),s=t.makeLine(n[0]*i,n[1]*i,o[0]*i,o[1]*i);s.stroke="Black",s.lineWidth=10}})),t.update()},options:{context:"2d"},style:{borderStyle:"solid"},width:R,height:S,onClick:function(e){var t=e.nativeEvent.layerX,a=e.nativeEvent.layerY,n=y.rooms.findIndex((function(e){return t>e.x*i&&t<e.x*i+e.width*i&&a>e.y*i&&a<e.y*i+e.height*i}));-1===n?(y.unsetFocusedRoom(),M(-1)):(y.setFocusedRoom(n),M(n))}}),Object(u.jsx)("p",{children:-1!==z?function(){var e=y.rooms[z];return"id: "+e.id+"\n x: "+e.x+"\n y: "+e.y+"\n height: "+e.height+"\n width: "+e.width+"\n "}():null})]})]})]})};i(16);s.a.render(Object(u.jsx)(p,{}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.65597a45.chunk.js.map