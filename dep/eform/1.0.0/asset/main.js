/*! 2016 Baidu Inc. All Rights Reserved */
define("eform/Status",[],function(){var e={VALID:0,VALUE_MISSING:-1,TOOLONG:-2,TOOSHORT:-3,PATTERN_MISMATCH:-4,TYPE_MISMATCH:-5,RANGE_UNDERFLOW:-6,RANGE_OVERFLOW:-7,STEP_MISMATCH:-8,CUSTOM_ERROR:-9};return e}),define("babel-runtime/helpers/possibleConstructorReturn",[],function(){return function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");if("object"==typeof t||"function"==typeof t)return t;else return e}}),define("babel-runtime/helpers/inherits",[],function(){return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);var i=function(){};if(t)i.prototype=t.prototype;e.prototype=new i,e.prototype.constructor=e}}),define("babel-runtime/helpers/classCallCheck",[],function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}return e}),define("eform/Plugin",["require","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","babel-runtime/helpers/classCallCheck","eform-lang"],function(require){var e=require("babel-runtime/helpers/possibleConstructorReturn"),t=require("babel-runtime/helpers/inherits"),i=require("babel-runtime/helpers/classCallCheck"),n=require("eform-lang"),r=n.each,a=function(){function n(e){i(this,n),this.init(e)}return n.prototype.init=function(e){},n.prototype.formatComponent=function(e,t,i){},n.prototype.formatForm=function(e,t){},n.prototype.dispose=function(){},n.create=function(a){var s=function(n){function r(){return i(this,r),e(this,n.apply(this,arguments))}return t(r,n),r}(n);return a=Array.prototype.slice.call(arguments),r(a,function(e,t){r(t,function(e,t){s.prototype[e]=t})}),s},n}();return a}),define("babel-runtime/helpers/toConsumableArray",[],function(){function e(e){for(var t=[],i=0,n=+e.length,r=0;n>r;)t[i++]=e[r++];if(isNaN(n))for(;void 0!==e[r];)t[i++]=e[r++];return t}return e}),define("eform-emitter/HandlerObject",["require","babel-runtime/helpers/classCallCheck"],function(require){function e(e){var t=i.exec(e),n=t[2]?t[2].split(".").sort():[];return n.type=t[1],n}var t=require("babel-runtime/helpers/classCallCheck"),i=/^([^.]*)(?:\.(.+)|)$/,n=function(){function i(n,r,a,s,o){t(this,i),this.type="",this.namespace="",this.handler=null,this.one=!1,this.data=null,this.selector="";var l=e(null==n?"":n);this.type=l.type,this.namespace=l.join("."),this.handler=r,this.one=!!o,this.data=a,this.selector=s}return i.prototype.validate=function(e,t,i,n){return(!e||e===this.type)&&(!t||t===this.handler)&&(!i||i.test(this.namespace))&&(!n||n===this.selector||"**"===n&&this.selector)},i.prototype.packNamespace=function(){return this.namespace?new RegExp("(^|\\.)"+this.namespace.replace(".","\\.(?:.*\\.|)")+"(\\.|$)"):null},i}();return n}),define("eform-emitter/HandlerQueue",["require","babel-runtime/helpers/classCallCheck"],function(require){var e=require("babel-runtime/helpers/classCallCheck"),t=function(){function t(i,n,r){e(this,t),this.delegate=0,this.element=null,this.matches=null,this.parent="",this.handlers=[],this.element=i,this.matches=r||null,this.parent=n||null}return t.prototype.add=function(e){var t=this.handlers;if(e.selector)t.splice(this.delegate++,0,e);else t.push(e)},t.prototype.remove=function(e,t,i,n){for(var r=this.handlers,a=r.length,s="string"!=typeof e;a--;){var o=r[a];if(s&&o===e||!s&&o.validate(e,t,i,n))if(r.splice(a,1),o.selector)this.delegate--}return this.isEmpty()},t.prototype.isEmpty=function(){return!this.handlers.length},t.prototype.queue=function i(e){var t=this.element,n=this.handlers,r=this.delegate,a=this.parent,s=this.matches,i=[];if(r&&a)for(var o=e.target;o!==t;o=o[a]||t){for(var l=[],h={},u=0;r>u;u++){var c=n[u],f=c.selector+"";if("undefined"==typeof h[f])h[f]=s?s(o,f,t):"function"==typeof t.matches?t.matches(o,f):!1;if(h[f])l.push(c)}if(l.length)i.push({elem:o,handlers:l})}if(r<n.length)i.push({elem:t,handlers:n.slice(r)});return i},t}();return t}),define("eform-emitter/HandlerEvent",["require","babel-runtime/helpers/classCallCheck","eform-lang","./HandlerObject"],function(require){function e(){return!1}function t(){return!0}var i=require("babel-runtime/helpers/classCallCheck"),n=require("eform-lang"),r=require("./HandlerObject"),a=n.extend,s=function(){function n(t,s){i(this,n),this.isHandlerEvent=!0,this.isDefaultPrevented=e,this.isPropagationStopped=e,this.isImmediatePropagationStopped=e,this.type="",this.target=null,this.data=null,this.rnamespace=null,this.timeStemp=+new Date,a(this,s);var o=new r(t);this.type=o.type,this.rnamespace=o.packNamespace()}return n.prototype.preventDefault=function(){this.isDefaultPrevented=t},n.prototype.stopPropagation=function(){this.isPropagationStopped=t},n.prototype.stopImmediatePropagation=function(){this.isImmediatePropagationStopped=t,this.stopPropagation()},n}();return s}),define("eform-emitter/propagation",["require","babel-runtime/helpers/toConsumableArray","babel-runtime/helpers/classCallCheck","eform-lang","./HandlerObject","./HandlerQueue","./HandlerEvent"],function(require){var e=require("babel-runtime/helpers/toConsumableArray"),t=require("babel-runtime/helpers/classCallCheck"),i=require("eform-lang"),n=require("./HandlerObject"),r=require("./HandlerQueue"),a=require("./HandlerEvent"),s=i.each,o=i.expando,l=[].slice,h=o("eform-emitter"),u=function(){function i(){t(this,i)}return i.prototype.on=function(e,t,i,a,s){var o=this,l=this[h]=this[h]||{};return e.replace(/\S+/g,function(e){var h=new n(e,t,i,a,s);e=h.type,l[e]=l[e]||new r(o,"parent"),l[e].add(h)}),this},i.prototype.once=function(e,t,i,n){return this.on(e,t,i,n,!0)},i.prototype.off=function(e,t,i){var r=this,a=void 0;if(!e||!(a=this[h]))return delete this[h],this;else return e.replace(/\S+/g,function(e){var o=new n(e),l=o.type;if(!l)return void s(a,function(n){r.off(n+e,t,i)});var h=a[l];if(h){var u=o.packNamespace();if(!u&&!t)return void delete a[l];if(h.remove(l,t,u,i))delete a[l]}}),this},i.prototype.dispatch=function(e,t){var i=e.type||e;if(!e.isHandlerEvent)e=new a(i,"object"==typeof e&&e),i=e.type;e.target=e.target||this,t=l.call(arguments),t[0]=e;var n="on"+i;if(this[n]&&this[n].apply(this,t)===!1)e.preventDefault(),e.stopPropagation();var r=void 0;if(this[h]&&(r=this[h][i])){for(var s=0,o=void 0,u=r.queue(e);(o=u[s++])&&!e.isPropagationStopped();)for(var c=0,f=void 0;(f=o.handlers[c++])&&!e.isImmediatePropagationStopped();)if(!e.rnamespace||e.rnamespace.test(f.namespace)){if(e.data=f.data,f.one)r.remove(f);var d=f.handler,p=d&&d.apply(o.elem,t);if(p===!1)e.preventDefault(),e.stopPropagation()}if(r.isEmpty())delete this[h][i]}return!e.isDefaultPrevented()},i.prototype.emit=function(t,i){if(!t.isHandlerEvent){var n=t.type||t;t=new a(n,"object"==typeof t&&t)}t.target=this,i=l.call(arguments),i[0]=t;for(var r=this;r&&!t.isPropagationStopped();){var s;(s=r).dispatch.apply(s,e(i)),r=r.parent}return!t.isDefaultPrevented()},i.mixin=function(e){return s(i.prototype,function(t,i){e[t]=i}),e[h]=null,e},i}();return u.prototype.bind=u.prototype.on,u.prototype.one=u.prototype.once,u.prototype.un=u.prototype.off,u.prototype.fire=u.prototype.trigger=u.prototype.emit,u}),define("eform-task/Task",["require","babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","eform-lang","eform-emitter"],function(require){var e=require("babel-runtime/helpers/classCallCheck"),t=require("babel-runtime/helpers/possibleConstructorReturn"),i=require("babel-runtime/helpers/inherits"),n=require("eform-lang"),r=require("eform-emitter"),a=n.expando,s=n.guid,o=n.type,l=a("eform-task"),h=function(n){function r(i,a){e(this,r);var o=t(this,n.call(this));return o.fn=null,o.name="",o.description="",o.args=[],o.target=null,o.async=!1,o.running=!1,o.finished=!1,o.successful=!1,o.status=null,o.data=null,a=a||{},o.fn=i,o.name=a.name||s(l),o.description=a.description||"",o.args=a.args||[],o.target=a.target||o,o.async=i.length>o.args.length,o}return i(r,n),r.prototype.start=function(){var e=this;if(!this.running&&!this.finished){this.running=!0;var t=function(t,i){if(e.running){var n=t;if("array"===o(t))n=t[0],i=t[1];else if("object"===o(t))n=t.status,i=t.data||t.msg;if("error"===o(n))i=n+"",n=-(1/0);else if("number"!==o(n))n=n?0:-(1/0);e.finish(n,i)}};try{var i=this.fn.apply(this.target,this.args.concat(t));if(!this.async)if("object"===o(i)&&"function"==typeof i.then)i.then(function(e){t(!0,e)},function(e){t(!1,e)});else t(i)}catch(n){t(n)}}},r.prototype.finish=function(e,t){if(this.finished!==!0){this.finished=!0,this.status=e,t=this.data=null==t?null:t;var i=this.successful=0===e;if(this.running=!1,i)this.fire("success",t);else this.fire("error",{status:e,msg:t});this.fire("finished",i,{status:this.status,data:this.data})}},r.prototype.reset=function(){this.finished=this.successful=this.running=!1,this.data=null},r.prototype.dispose=function(){this.reset(),this.off()},r.success=function(e){return[!0,e]},r.error=function(e){return[!1,e]},r}(r);return h}),define("eform-task/Queue",["require","babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","eform-lang","eform-emitter","./Task"],function(require){function e(e){for(var t=e.length;t>=0;t--)if(null==e[t])e.splice(t,1);else e[t].reset();var i={};return o(e,function(e,t){i[t.name]=e}),i}var t=require("babel-runtime/helpers/classCallCheck"),i=require("babel-runtime/helpers/possibleConstructorReturn"),n=require("babel-runtime/helpers/inherits"),r=require("eform-lang"),a=require("eform-emitter"),s=require("./Task"),o=r.each,l=function(r){function a(e){t(this,a);var n=i(this,r.call(this));return n.target=null,n.args=null,n.force=!1,n.tasks=[],n.taskMap={},n.running=!1,n.index=-1,e=e||{},n.target=e.target||n,n.args=e.args||[],n.force=!!e.force,n}return n(a,r),a.prototype.register=function(e,t,i){var n=this,r=e;if(!(r instanceof s)){if(1===arguments.length)i=e,e=t=null;else if(2===arguments.length)i=t,t=null;r=new s(i,{args:this.args,target:this.target,name:e,description:t})}e=r.name,r.on("finished",function(t,i){if(n.fire("task",e,t,i),n.running&&!n.force&&!t)n.stop(!1);n.tick()});var a=this.taskMap[e];if(null!=a&&(!this.running||this.index<a))this.tasks[a]=r;else this.taskMap[r.name]=this.tasks.length,this.tasks.push(r)},a.prototype.unregister=function(t){var i=this.taskMap[t];if(null!=i){var n=this.tasks[i];if(this.tasks[i]=null,n.dispose(),!this.running)this.taskMap=e(this.tasks)}},a.prototype.tick=function(){if(this.running){if(this.index>=this.tasks.length)return void this.stop(!0);var e=this.tasks[++this.index];if(!e)return void this.tick();else return void e.start()}},a.prototype.start=function(e){var t=void 0;if(!e)this.running=!0,this.tick();else if(t=this.tasks[this.taskMap[e]],t&&!t.running)return void t.start({target:this.target,args:this.args})},a.prototype.stop=function(t){var i=this;if(this.running){if(this.running=!1,null==t)this.fire("cancel");else!function(){var e=0,n=[];if(o(i.tasks,function(t,i){if(i&&i.finished&&!i.successful)e++,n.push(i.name)}),i.fire(!e?"success":"error",n),t)i.fire("finished",!e,n)}();this.index=-1,this.taskMap=e(this.tasks)}},a.prototype.dispose=function(){this.stop(),o(this.tasks,function(e,t){t&&t.dispose()}),this.tasks=this.taskMap=null},a}(a);return l}),define("eform-task/main",["require","./Task","./Queue"],function(require){function e(e,t){return new i(e,t)}function t(e){return new n(e)}var i=require("./Task"),n=require("./Queue"),exports={};exports.task=e,exports.queue=t;var r=i.success,a=i.error;return exports.success=r,exports.error=a,exports}),define("eform-task",["eform-task/main"],function(e){return e}),define("eform/Component",["require","babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","eform-lang","eform-emitter/propagation","eform-task"],function(require){var e=require("babel-runtime/helpers/classCallCheck"),t=require("babel-runtime/helpers/possibleConstructorReturn"),i=require("babel-runtime/helpers/inherits"),n=require("eform-lang"),r=require("eform-emitter/propagation"),a=require("eform-task"),s=n.each,o=n.extend,l=n.merge,h=n.noop,u=n.bind,c=[].slice,f=/^(?:created|inited|attributeChanged|valueChanged|stateChanged|disposed)$/,d=/^on(\w+)$/,p=/^(?:main|props|validity)$/,m={INITED:0,CHANGED:1,VALID:2,INVALID:4,VALIDATING:8,DISABLED:16},g=function(n){function r(i){e(this,r);var a=t(this,n.call(this));return a.main=null,a.validity=null,a.attributes=null,a.setter=null,a.instance=null,a.state=m.INITED,a.queue=null,a.initialize(i||{}),a}return i(r,n),r.prototype.initialize=function(e){var t=this;if(e=e||{},!this.constructor.virtual){if(this.main=this.create(e),!this.main)throw new Error("A main parameter is required!");this.emit("created")}else this.main=null;var i=this.main,n=this.attributes={},a={},c={},m=this.setter={},g=l([],this.constructor.props,e.props);s(g,function(o,l){l=r.createAttribute(l);var f=l.name;if(n[f]=l.defaultValue,f in e){if(n[f]=e[f],i)l.set(i,e[f])}else if(t.constructor.mutiple&&i)s(t.main,function(e,t){var i=l.get(t);if(null!=i&&i!==l.defaultValue)return n[f]=i,!1;else return void 0});else if(i){var d=l.get(i);if(null!=d)n[f]=d}if(l.observe)a[f]={get:u(t.getAttribute,t,f),set:u(t.setAttribute,t,f),enumerable:!0};if(l.check)c[f]=l.check;if(l.set&&l.set!==h)m[f]=l.set}),o(c,this.constructor.validity,e.validity),this.validity=c,this.instance=a,s(e,function(e,i){if(!(e in n)){if(f.test(e)||p.test(e))return void t.on(e,i);if(d.test(e))return void t.on(RegExp.$1,i);else return void(t[e]=i)}}),this.init()},r.prototype.create=function(e){return e.main},r.prototype.init=function(){this.emit("inited")},r.prototype.reset=function(){this.set(null)},r.prototype.validate=function(){var e=this,t=this.getState();if(t!==m.VALID&&t!==m.INVALID&&t!==m.VALIDATING&&t!==m.DISABLED){this.setState(m.VALIDATING);var i=this.queue=a.queue({order:!0,force:!1,args:[this.attributes,this.get()],target:this});s(this.validity,function(e,t){i.register(e,t)}),i.on("task",function(t,i,n){if(!i)e.queue=null,e.setState(m.INVALID,n)}),i.on("success",function(){e.queue=null,e.setState(m.VALID)}),i.start()}},r.prototype.dispose=function(){this.emit("disposed"),this.main=this.queue=this.attributes=null,this.off()},r.prototype.getAttribute=function(e){return this.attributes[e]},r.prototype.setAttribute=function(e,t){var i=this.getAttribute(e);if(i!==t){if(this.attributes[e]=t,this.setter[e])this.setter[e].call(this,this.main,t);if(this.instance[e])this.queue&&this.queue.stop(),this.setState(m.CHANGED),this.emit("attributeChanged",e,t)}},r.prototype.get=function(){return this.getAttribute("value")},r.prototype.set=function(e){var t=this.get();if(t!==e)this.setAttribute("value",e),this.emit("valueChanged",e)},r.prototype.enable=function(){this.setAttribute("disabled",!1)},r.prototype.disable=function(){this.setAttribute("disabled",!0)},r.prototype.getState=function(){var e=this.getAttribute("disabled");return e&&m.DISABLED||this.state},r.prototype.setState=function(e,t){if(e===m.DISABLED)return void this.emit("stateChanged",e,t);if(this.state=e,e===m.VALID)this.emit("success",t);else if(e===m.INVALID)this.emit("error",t);else if(e===m.INITED)this.emit("ready",t);else if(e===m.CHANGED)this.emit("change",t);this.emit("stateChanged",e,t)},r.prototype.getInstance=function(){return this.instance},r.createAttribute=function(e){if("string"==typeof e)e={name:e};var t=o({},r.defaults,e);if(f.test(t.name))throw new Error(t.name+"is not a valid attribute name");if(d.test(t.name))throw new Error(t.name+"is a valid event name and not a valid attribute name");return t},r.mixin=function(e){return e=c.call(arguments),function(t){var i=t.prototype,n=t.validity||{},a=t.props||[],h="virtual"in t,u="mutiple"in t,c="type"in t,f=[],d={},p=r.virtual,m=r.mutiple,g=r.type;return s(e,function(e,t){s(t,function(e,t){if(!u&&"mutiple"===e)m=t;else if(!h&&"virtual"===e)p=t;else if(!c&&"type"===e)g=t;else if("props"===e)l(f,t);else if("validity"===e)o(d,t);else i[e]=i.hasOwnProperty(e)?i[e]:t})}),t.validity=o(d,n),t.props=l(f,a),t.mutiple=u?t.mutiple:m,t.virtual=h?t.virtual:p,t.type=c?t.type:g,t}},r.create=function(n){var a=function(n){function r(){return e(this,r),t(this,n.apply(this,arguments))}return i(r,n),r}(r),s=r.mixin.apply(r,arguments);return s(a)},r}(r);return g.type="component",g.mutiple=!1,g.virtual=!0,g.props=[],g.validity=[],g.States=m,g.defaults={name:"default",get:h,set:h,defaultValue:null,observe:!1,check:null},g}),define("eform/Form",["require","babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","eform-lang","eform-emitter/propagation","./Component"],function(require){var e=require("babel-runtime/helpers/classCallCheck"),t=require("babel-runtime/helpers/possibleConstructorReturn"),i=require("babel-runtime/helpers/inherits"),n=require("eform-lang"),r=require("eform-emitter/propagation"),a=require("./Component"),s=n.type,o=n.each,l=n.extend,h=n.merge,u=n.bind,c={},f=a.States,d=function(n){function r(i,a){e(this,r);var s=t(this,n.call(this));return s.main=null,s.components=null,s.fields=null,s.data=null,s.submitting=!1,s.initialize(i,a||{}),s}return i(r,n),r.prototype.initialize=function(e,t){var i=this;if(!(this.main=e))throw new Error("A main parameter is required!");var n=h([],r.plugins,t.plugins),d=t.fields=t.fields||{},p={};c.traverse(e,function(e,t,i){if(!t)return!0;var n=d[t]=d[t]||{};if(!n.main)n.main=e;else if("array"===s(n.main))n.main.push(e);else n.main=[n.main,e];if(n.elemType&&n.elemType!==i)throw new Error("The elements named `"+t+"` has different type");n.elemType=i,p[t]=n}),o(d,function(e,t){if(!(e in p))t.type=t.type||"component",p[e]=t});var m=h([],r.components,t.components),g={};o(m,function(e,t){g[t.type]=t});var v=this.fields={},y=this.components={},b={};o(p,function(e,r){var s=g[r.type||r.elemType]||a;delete r.type,delete r.elemType;var l=y[e]=new s(r);l.parent=i,l.type=s.type,l.virtual=s.virtual,l.mutiple=s.mutiple,l.name=e,v[e]=c.createInstance(l.getInstance()),l.on("stateChanged",function(n,r){if(r===f.VALID&&i.submitting){var a=!0;if(o(y,function(e,t){var i=t.getState();if(i!==f.VALID&&i!==f.DISABLED)return a=!1;else return void 0}),a)i.submitting=!1,i.submit(!0)}else if(r===f.INVALID)i.submitting=!1;else if((r===f.INITED||r===f.CHANGED)&&(i.submitting||t.immediately))i.validate(e)}),o(n,function(t,i){i.formatComponent(e,l,r)}),b[e]={get:u(l.get,l),set:u(l.set,l),enumerable:!0}});var x=t.data||{};o(x,function(e,t){if(!(e in b))b[e]={value:t,enumerable:!0}}),this.data=c.createModel(b),c.initSubmitEvents(this.main,function(){i.submit()}),c.initResetEvents(this.main,function(){i.reset()}),o(n,function(e,n){n.formatForm(i,t)}),l(this.data,x)},r.prototype.isValid=function(){var e=!0;return o(this.components,function(t,i){var n=i.getState();if(n!==f.VALID&&n!==f.DISABLED)return e=!1;else return void 0}),e},r.prototype.validate=function(e){var t=this;if(e)return void this.components[e].validate();var i=!0;if(o(this.components,function(e,n){var r=n.getState();if(r!==f.VALID&&r!==f.DISABLED)i=!1;if(r===f.INVALID)t.submitting=!1;n.validate()}),i&&this.submitting)this.submitting=!1,this.submit(!0)},r.prototype.submit=function(e){if(e)return void this.fire("submit",this.data);if(!this.submitting)this.submitting=!0,this.validate()},r.prototype.reset=function(e){if(this.submitting=!1,e)this.components[e].reset();else o(this.components,function(e,t){t.reset()});this.fire("reset",this.data)},r.prototype.dispose=function(){this.fire("dispose"),this.off(),o(this.components,function(e,t){t.dispose()}),c.cleanEvents(this.main),this.model=this.data=this.components=this.fields=null},r.useRuntime=function(e){l(r.runtime,e)},r.useComponent=function(e){if("function"===s(e))r.components.push(e);else r.components.push.apply(r.components,e)},r.usePlugin=function(e){if("object"==typeof e&&"length"in e)r.plugins.push.apply(r.plugins,e);else r.plugins.push(e)},r}(r);return d.runtime=c,d.components=[],d.plugins=[],d}),define("eform/main",["require","./Status","./Plugin","./Component","./Form"],function(require){var e=require("./Status"),t=require("./Plugin"),i=require("./Component"),n=require("./Form"),exports={};return exports.Status=e,exports.Plugin=t,exports.Component=i,exports.Form=n,exports}),define("eform",["eform/main"],function(e){return e});