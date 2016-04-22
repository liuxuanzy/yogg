/*! 2016 Baidu Inc. All Rights Reserved */
!function(e){function t(e,t){for(var i in t)if(t.hasOwnProperty(i))e[i]=t[i];return e}function i(){this.raw=[],this.length=0}function a(){return"___"+M++}function n(e,t){var i=new Function;i.prototype=t.prototype,e.prototype=new i,e.prototype.constructor=e}function r(e){return H[e]}function s(e){return'"'+e.replace(/\x5C/g,"\\\\").replace(/"/g,'\\"').replace(/\x0A/g,"\\n").replace(/\x09/g,"\\t").replace(/\x0D/g,"\\r")+'"'}function o(e){return e.replace(/[\^\[\]\$\(\)\{\}\?\*\.\+]/g,function(e){return"\\"+e})}function c(e){var t=arguments;return e.replace(/\{([0-9]+)\}/g,function(e,i){return t[i-0+1]})}function p(e){return e=e.replace(/^\s*\*/,""),c('gv({0},["{1}"])',s(e),e.replace(/\[['"]?([^'"]+)['"]?\]/g,function(e,t){return"."+t}).split(".").join('","'))}function l(e,t,i,a,n,r){for(var s=i.length,o=e.split(t),c=0,p=[],l=0,h=o.length;h>l;l++){var d=o[l];if(l){var f=1;for(c++;;){var u=d.indexOf(i);if(0>u){p.push(c>1&&f?t:"",d);break}if(c=a?c-1:0,p.push(c>0&&f?t:"",d.slice(0,u),c>0?i:""),d=d.slice(u+s),f=0,0===c)break}if(0===c)n(p.join("")),r(d),p=[]}else d&&r(d)}if(c>0&&p.length>0)r(t),r(p.join(""))}function h(e,t,i){var a,n=[],r=t.options,o="",c="",d="",f="";if(i)o="ts(",c=")",d=$,f=P,a=r.defaultFilter;return l(e,r.variableOpen,r.variableClose,1,function(e){if(i&&e.indexOf("|")<0&&a)e+="|"+a;var r=e.indexOf("|"),s=(r>0?e.slice(0,r):e).replace(/^\s+/,"").replace(/\s+$/,""),l=r>0?e.slice(r+1):"",u=0===s.indexOf("*"),m=[u?"":o,p(s),u?"":c];if(l){l=h(l,t);for(var y=l.split("|"),_=0,v=y.length;v>_;_++){var g=y[_];if(/^\s*([a-z0-9_-]+)(\((.*)\))?\s*$/i.test(g)){if(m.unshift('fs["'+RegExp.$1+'"]('),RegExp.$3)m.push(",",RegExp.$3);m.push(")")}}}n.push(d,m.join(""),f)},function(e){n.push(d,i?s(e):e,f)}),n.join("")}function d(e,t){this.value=e,this.engine=t}function f(e,t){this.value=e,this.engine=t,this.children=[],this.cloneProps=[]}function u(e,t){var i=e.stack,a=t?i.find(function(e){return e instanceof t}):i.bottom();if(a){for(var n;(n=i.top())!==a;){if(!n.autoClose)throw new Error(n.type+" must be closed manually: "+n.value);n.autoClose(e)}a.close(e)}return a}function m(e,t){if(!/^\s*([a-z0-9\/_-]+)\s*(\(\s*master\s*=\s*([a-z0-9\/_-]+)\s*\))?\s*/i.test(e))throw new Error("Invalid "+this.type+" syntax: "+e);this.master=RegExp.$3,this.name=RegExp.$1,f.call(this,e,t),this.blocks={}}function y(e,t){if(!/^\s*([a-z0-9\/_-]+)\s*$/i.test(e))throw new Error("Invalid "+this.type+" syntax: "+e);this.name=RegExp.$1,f.call(this,e,t),this.cloneProps=["name"]}function _(e,t){if(!/^\s*([a-z0-9\/_-]+)\s*$/i.test(e))throw new Error("Invalid "+this.type+" syntax: "+e);this.name=RegExp.$1,f.call(this,e,t),this.cloneProps=["name","state","blocks"],this.blocks={}}function v(e,t){if(!/^\s*([a-z0-9_]+)\s*=([\s\S]*)$/i.test(e))throw new Error("Invalid "+this.type+" syntax: "+e);this.name=RegExp.$1,this.expr=RegExp.$2,f.call(this,e,t),this.cloneProps=["name","expr"]}function g(e,t){if(!/^\s*([a-z0-9_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(e))throw new Error("Invalid "+this.type+" syntax: "+e);this.name=RegExp.$1,this.args=RegExp.$3,f.call(this,e,t),this.cloneProps=["name","args"]}function D(e,t){if(!/^\s*([a-z0-9\/_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(e))throw new Error("Invalid "+this.type+" syntax: "+e);this.name=RegExp.$1,this.args=RegExp.$3,f.call(this,e,t),this.cloneProps=["name","args"]}function k(e,t){var i=new RegExp(c("^\\s*({0}[\\s\\S]+{1})\\s+as\\s+{0}([0-9a-z_]+){1}\\s*(,\\s*{0}([0-9a-z_]+){1})?\\s*$",o(t.options.variableOpen),o(t.options.variableClose)),"i");if(!i.test(e))throw new Error("Invalid "+this.type+" syntax: "+e);this.list=RegExp.$1,this.item=RegExp.$2,this.index=RegExp.$4,f.call(this,e,t),this.cloneProps=["list","item","index"]}function b(e,t){f.call(this,e,t)}function W(e,t){b.call(this,e,t)}function S(e,t){f.call(this,e,t)}function C(e,t){t.target=e;var i=t.engine,a=e.name;if(i.targets[a])switch(i.options.namingConflict){case"override":i.targets[a]=e,t.targets.push(a);case"ignore":break;default:throw new Error("Target exists: "+a)}else i.targets[a]=e,t.targets.push(a)}function w(e,t){j[e]=t,t.prototype.type=e}function R(e){this.options={commandOpen:"<!--",commandClose:"-->",commandSyntax:/^\s*(\/)?([a-z]+)\s*(?::([\s\S]*))?$/,variableOpen:"${",variableClose:"}",defaultFilter:"html"},this.config(e),this.targets={},this.filters=t({},A)}function x(e,t){function a(){var e;if(h.length>0&&(e=h.join(""))){var i=new d(e,t);if(i.beforeAdd(p),c.top().addChild(i),h=[],t.options.strip&&p.current instanceof f)i.value=e.replace(/^[\x20\t\r]*\n/,"");p.current=i}}var n,r=t.options.commandOpen,s=t.options.commandClose,o=t.options.commandSyntax,c=new i,p={engine:t,targets:[],stack:c,target:null},h=[];return l(e,r,s,0,function(e){var i=o.exec(e);if(i&&(n=j[i[2].toLowerCase()])&&"function"==typeof n){a();var c=p.current;if(t.options.strip&&c instanceof d)c.value=c.value.replace(/\r?\n[\x20\t]*$/,"\n");if(i[1])c=u(p,n);else{if(c=new n(i[3],t),"function"==typeof c.beforeOpen)c.beforeOpen(p);c.open(p)}p.current=c}else if(!/^\s*\/\//.test(e))h.push(r,e,s);n=null},function(e){h.push(e)}),a(),u(p),p.targets}i.prototype={push:function(e){this.raw[this.length++]=e},pop:function(){if(this.length>0){var e=this.raw[--this.length];return this.raw.length=this.length,e}},top:function(){return this.raw[this.length-1]},bottom:function(){return this.raw[0]},find:function(e){for(var t=this.length;t--;){var i=this.raw[t];if(e(i))return i}}};var M=178245,H={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},A={html:function(e){return e.replace(/[&<>"']/g,r)},url:encodeURIComponent,raw:function(e){return e}},E='var r="";',$="r+=",P=";",O="return r;";if("undefined"!=typeof navigator&&/msie\s*([0-9]+)/i.test(navigator.userAgent)&&RegExp.$1-0<8)E="var r=[],ri=0;",$="r[ri++]=",O='return r.join("");';d.prototype={getRendererBody:function(){var e=this.value,t=this.engine.options;if(!e||t.strip&&/^\s*$/.test(e))return"";else return h(e,this.engine,1)},clone:function(){return this}},f.prototype={addChild:function(e){this.children.push(e)},open:function(e){var t=e.stack.top();t&&t.addChild(this),e.stack.push(this)},close:function(e){if(e.stack.top()===this)e.stack.pop()},getRendererBody:function(){for(var e=[],t=this.children,i=0;i<t.length;i++)e.push(t[i].getRendererBody());return e.join("")},clone:function(){for(var e=this.constructor,t=new e(this.value,this.engine),i=0,a=this.children.length;a>i;i++)t.addChild(this.children[i].clone());for(var i=0,a=this.cloneProps.length;a>i;i++){var n=this.cloneProps[i];t[n]=this[n]}return t}};var T='data=data||{};var v={},fs=engine.filters,hg=typeof data.get=="function",gv=function(n,ps){var p=ps[0],d=v[p];if(d==null){if(hg){return data.get(n);}d=data[p];}for(var i=1,l=ps.length;i<l;i++)if(d!=null)d = d[ps[i]];return d;},ts=function(s){if(typeof s==="string"){return s;}if(s==null){s="";}return ""+s;};';n(m,f),n(y,f),n(_,f),n(v,f),n(g,f),n(D,f),n(k,f),n(b,f),n(W,b),n(S,b);var q={READING:1,READED:2,APPLIED:3,READY:4};_.prototype.applyMaster=m.prototype.applyMaster=function(e){function t(e){var a=e.children;if(a instanceof Array)for(var n=0,r=a.length;r>n;n++){var s=a[n];if(s instanceof y&&i[s.name])s=a[n]=i[s.name];t(s)}}if(this.state>=q.APPLIED)return 1;var i=this.blocks,a=this.engine.targets[e];if(a&&a.applyMaster(a.master))return this.children=a.clone().children,t(this),this.state=q.APPLIED,1;else return void 0},m.prototype.isReady=function(){function e(a){for(var n=0,r=a.children.length;r>n;n++){var s=a.children[n];if(s instanceof _){var o=t.targets[s.name];i=i&&o&&o.isReady(t)}else if(s instanceof f)e(s)}}if(this.state>=q.READY)return 1;var t=this.engine,i=1;if(this.applyMaster(this.master))return e(this),i&&(this.state=q.READY),i;else return void 0},m.prototype.getRenderer=function(){if(this.renderer)return this.renderer;if(this.isReady()){var e=new Function("data","engine",[T,E,this.getRendererBody(),O].join("\n")),t=this.engine;return this.renderer=function(i){return e(i,t)},this.renderer}return null},m.prototype.open=function(e){u(e),f.prototype.open.call(this,e),this.state=q.READING,C(this,e)},v.prototype.open=D.prototype.open=function(e){e.stack.top().addChild(this)},y.prototype.open=function(e){f.prototype.open.call(this,e),e.stack.find(function(e){return e.blocks}).blocks[this.name]=this},W.prototype.open=function(e){var t=new S;t.open(e);var i=u(e,b);i.addChild(this),e.stack.push(this)},S.prototype.open=function(e){var t=u(e,b);t.addChild(this),e.stack.push(this)},_.prototype.open=function(e){this.parent=e.stack.top(),this.target=e.target,f.prototype.open.call(this,e),this.state=q.READING},D.prototype.close=v.prototype.close=function(){},_.prototype.close=function(e){f.prototype.close.call(this,e),this.state=q.READED},m.prototype.close=function(e){f.prototype.close.call(this,e),this.state=this.master?q.READED:q.APPLIED,e.target=null},_.prototype.autoClose=function(e){var t=this.parent.children;t.push.apply(t,this.children),this.children.length=0;for(var i in this.blocks)this.target.blocks[i]=this.blocks[i];this.blocks={},this.close(e)},D.prototype.beforeOpen=_.prototype.beforeOpen=v.prototype.beforeOpen=k.prototype.beforeOpen=g.prototype.beforeOpen=y.prototype.beforeOpen=b.prototype.beforeOpen=d.prototype.beforeAdd=function(e){if(!e.stack.bottom()){var t=new m(a(),e.engine);t.open(e)}},_.prototype.getRendererBody=function(){return this.applyMaster(this.name),f.prototype.getRendererBody.call(this)},D.prototype.getRendererBody=function(){return c("{0}engine.render({2},{{3}}){1}",$,P,s(this.name),h(this.args,this.engine).replace(/(^|,)\s*([a-z0-9_]+)\s*=/gi,function(e,t,i){return(t||"")+s(i)+":"}))},v.prototype.getRendererBody=function(){if(this.expr)return c("v[{0}]={1};",s(this.name),h(this.expr,this.engine));else return""},b.prototype.getRendererBody=function(){return c("if({0}){{1}}",h(this.value,this.engine),f.prototype.getRendererBody.call(this))},S.prototype.getRendererBody=function(){return c("}else{{0}",f.prototype.getRendererBody.call(this))},k.prototype.getRendererBody=function(){return c('var {0}={1};if({0} instanceof Array)for (var {4}=0,{5}={0}.length;{4}<{5};{4}++){v[{2}]={4};v[{3}]={0}[{4}];{6}}else if(typeof {0}==="object")for(var {4} in {0}){v[{2}]={4};v[{3}]={0}[{4}];{6}}',a(),h(this.list,this.engine),s(this.index||a()),s(this.item),a(),a(),f.prototype.getRendererBody.call(this))},g.prototype.getRendererBody=function(){var e=this.args;return c("{2}fs[{5}]((function(){{0}{4}{1}})(){6}){3}",E,O,$,P,f.prototype.getRendererBody.call(this),s(this.name),e?","+h(e,this.engine):"")};var j={};w("target",m),w("block",y),w("import",_),w("use",D),w("var",v),w("for",k),w("if",b),w("elif",W),w("else",S),w("filter",g),R.prototype.config=function(e){t(this.options,e)},R.prototype.compile=R.prototype.parse=function(e){if(e){var t=x(e,this);if(t.length)return this.targets[t[0]].getRenderer()}return new Function('return ""')},R.prototype.getRenderer=function(e){var t=this.targets[e];if(t)return t.getRenderer();else return void 0},R.prototype.render=function(e,t){var i=this.getRenderer(e);if(i)return i(t);else return""},R.prototype.addFilter=function(e,t){if("function"==typeof t)this.filters[e]=t};var I=new R;if(I.Engine=R,"object"==typeof exports&&"object"==typeof module)exports=module.exports=I;else if("function"==typeof define&&define.amd)define("etpl/main",[],I);else e.etpl=I}(this),define("etpl",["etpl/main"],function(e){return e});