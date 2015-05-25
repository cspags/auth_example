!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var n={},t={},i={}.hasOwnProperty,r={},o=function(e,n){var t=0;n&&(n.indexOf(!1)&&(t="components/".length),n.indexOf("/",t)>0&&(n=n.substring(t,n.indexOf("/",t))));var i=r[e+"/index.js"]||r[n+"/deps/"+e+"/index.js"];return i?"components/"+i.substring(0,i.length-".js".length):e},s=function(){var e=/^\.\.?(\/|$)/;return function(n,t){var i,r,o=[];i=(e.test(t)?n+"/"+t:t).split("/");for(var s=0,a=i.length;a>s;s++)r=i[s],".."===r?o.pop():"."!==r&&""!==r&&o.push(r);return o.join("/")}}(),a=function(e){return e.split("/").slice(0,-1).join("/")},u=function(n){return function(t){var i=s(a(n),t);return e.require(i,n)}},c=function(e,n){var i={id:e,exports:{}};return t[e]=i,n(i.exports,u(e),i),i.exports},l=function(e,r){var a=s(e,".");if(null==r&&(r="/"),a=o(e,r),i.call(t,a))return t[a].exports;if(i.call(n,a))return c(a,n[a]);var u=s(a,"./index");if(i.call(t,u))return t[u].exports;if(i.call(n,u))return c(u,n[u]);throw new Error('Cannot find module "'+e+'" from "'+r+'"')};l.alias=function(e,n){r[n]=e},l.register=l.define=function(e,t){if("object"==typeof e)for(var r in e)i.call(e,r)&&(n[r]=e[r]);else n[e]=t},l.list=function(){var e=[];for(var t in n)i.call(n,t)&&e.push(t);return e},l.brunch=!0,e.require=l}}(),function(){"use strict";var e="undefined"!=typeof window?window:global;if("function"!=typeof e.require){var n={},t={},i=function(e,n){return{}.hasOwnProperty.call(e,n)},r=function(e,n){var t,i,r=[];t=/^\.\.?(\/|$)/.test(n)?[e,n].join("/").split("/"):n.split("/");for(var o=0,s=t.length;s>o;o++)i=t[o],".."===i?r.pop():"."!==i&&""!==i&&r.push(i);return r.join("/")},o=function(e){return e.split("/").slice(0,-1).join("/")},s=function(n){return function(t){var i=o(n),s=r(i,t);return e.require(s,n)}},a=function(e,n){var i={id:e,exports:{}};return t[e]=i,n(i.exports,s(e),i),i.exports},u=function(e,o){var s=r(e,".");if(null==o&&(o="/"),i(t,s))return t[s].exports;if(i(n,s))return a(s,n[s]);var u=r(s,"./index");if(i(t,u))return t[u].exports;if(i(n,u))return a(u,n[u]);throw new Error('Cannot find module "'+e+'" from "'+o+'"')},c=function(e,t){if("object"==typeof e)for(var r in e)i(e,r)&&(n[r]=e[r]);else n[e]=t},l=function(){var e=[];for(var t in n)i(n,t)&&e.push(t);return e};e.require=u,e.require.define=c,e.require.register=c,e.require.list=l,e.require.brunch=!0}}(),require.define({phoenix:function(e,n,t){"use strict";var i=function(e,n,t){n&&Object.defineProperties(e,n),t&&Object.defineProperties(e.prototype,t)},r=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")},o={connecting:0,open:1,closing:2,closed:3},s={closed:"closed",errored:"errored",joined:"joined",joining:"joining"},a={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},u=function(){function e(n,t,i){r(this,e),this.chan=n,this.event=t,this.payload=i||{},this.receivedResp=null,this.afterHook=null,this.recHooks=[],this.sent=!1}return i(e,null,{send:{value:function(){var e=this,n=this.chan.socket.makeRef();this.refEvent=this.chan.replyEventName(n),this.receivedResp=null,this.sent=!1,this.chan.on(this.refEvent,function(n){e.receivedResp=n,e.matchReceive(n),e.cancelRefEvent(),e.cancelAfter()}),this.startAfter(),this.sent=!0,this.chan.socket.push({topic:this.chan.topic,event:this.event,payload:this.payload,ref:n})},writable:!0,configurable:!0},receive:{value:function(e,n){return this.receivedResp&&this.receivedResp.status===e&&n(this.receivedResp.response),this.recHooks.push({status:e,callback:n}),this},writable:!0,configurable:!0},after:{value:function(e,n){if(this.afterHook)throw"only a single after hook can be applied to a push";var t=null;return this.sent&&(t=setTimeout(n,e)),this.afterHook={ms:e,callback:n,timer:t},this},writable:!0,configurable:!0},matchReceive:{value:function(e){var n=e.status,t=e.response;e.ref;this.recHooks.filter(function(e){return e.status===n}).forEach(function(e){return e.callback(t)})},writable:!0,configurable:!0},cancelRefEvent:{value:function(){this.chan.off(this.refEvent)},writable:!0,configurable:!0},cancelAfter:{value:function(){this.afterHook&&(clearTimeout(this.afterHook.timer),this.afterHook.timer=null)},writable:!0,configurable:!0},startAfter:{value:function(){var e=this;if(this.afterHook){var n=function(){e.cancelRefEvent(),e.afterHook.callback()};this.afterHook.timer=setTimeout(n,this.afterHook.ms)}},writable:!0,configurable:!0}}),e}(),c=e.Channel=function(){function e(n,t,i){var o=this;r(this,e),this.state=s.closed,this.topic=n,this.params=t||{},this.socket=i,this.bindings=[],this.joinedOnce=!1,this.joinPush=new u(this,a.join,this.params),this.pushBuffer=[],this.joinPush.receive("ok",function(){o.state=s.joined}),this.onClose(function(){o.state=s.closed,o.socket.remove(o)}),this.onError(function(e){o.state=s.errored,setTimeout(function(){return o.rejoinUntilConnected()},o.socket.reconnectAfterMs)}),this.on(a.reply,function(e){o.trigger(o.replyEventName(e.ref),e)})}return i(e,null,{rejoinUntilConnected:{value:function(){var e=this;this.state===s.errored&&(this.socket.isConnected()?this.rejoin():setTimeout(function(){return e.rejoinUntilConnected()},this.socket.reconnectAfterMs))},writable:!0,configurable:!0},join:{value:function(){if(this.joinedOnce)throw"tried to join mulitple times. 'join' can only be called a singe time per channel instance";return this.joinedOnce=!0,this.sendJoin(),this.joinPush},writable:!0,configurable:!0},onClose:{value:function(e){this.on(a.close,e)},writable:!0,configurable:!0},onError:{value:function(e){this.on(a.error,function(n){return e(n)})},writable:!0,configurable:!0},on:{value:function(e,n){this.bindings.push({event:e,callback:n})},writable:!0,configurable:!0},off:{value:function(e){this.bindings=this.bindings.filter(function(n){return n.event!==e})},writable:!0,configurable:!0},canPush:{value:function(){return this.socket.isConnected()&&this.state===s.joined},writable:!0,configurable:!0},push:{value:function(e,n){if(!this.joinedOnce)throw"tried to push '"+e+"' to '"+this.topic+"' before joining. Use chan.join() before pushing events";var t=new u(this,e,n);return this.canPush()?t.send():this.pushBuffer.push(t),t},writable:!0,configurable:!0},leave:{value:function(){var e=this;return this.push(a.leave).receive("ok",function(){e.trigger(a.close,"leave")})},writable:!0,configurable:!0},isMember:{value:function(e){return this.topic===e},writable:!0,configurable:!0},sendJoin:{value:function(){this.state=s.joining,this.joinPush.send()},writable:!0,configurable:!0},rejoin:{value:function(){this.sendJoin(),this.pushBuffer.forEach(function(e){return e.send()}),this.pushBuffer=[]},writable:!0,configurable:!0},trigger:{value:function(e,n){this.bindings.filter(function(n){return n.event===e}).map(function(e){return e.callback(n)})},writable:!0,configurable:!0},replyEventName:{value:function(e){return"chan_reply_"+e},writable:!0,configurable:!0}}),e}(),l=(e.Socket=function(){function e(n){var t=void 0===arguments[1]?{}:arguments[1];r(this,e),this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.reconnectTimer=null,this.channels=[],this.sendBuffer=[],this.ref=0,this.transport=t.transport||window.WebSocket||l,this.heartbeatIntervalMs=t.heartbeatIntervalMs||3e4,this.reconnectAfterMs=t.reconnectAfterMs||5e3,this.logger=t.logger||function(){},this.longpoller_timeout=t.longpoller_timeout||2e4,this.endPoint=this.expandEndpoint(n)}return i(e,null,{protocol:{value:function(){return location.protocol.match(/^https/)?"wss":"ws"},writable:!0,configurable:!0},expandEndpoint:{value:function(e){return"/"!==e.charAt(0)?e:"/"===e.charAt(1)?""+this.protocol()+":"+e:""+this.protocol()+"://"+location.host+e},writable:!0,configurable:!0},disconnect:{value:function(e,n,t){this.conn&&(this.conn.onclose=function(){},n?this.conn.close(n,t||""):this.conn.close(),this.conn=null),e&&e()},writable:!0,configurable:!0},connect:{value:function(){var e=this;this.disconnect(function(){e.conn=new e.transport(e.endPoint),e.conn.timeout=e.longpoller_timeout,e.conn.onopen=function(){return e.onConnOpen()},e.conn.onerror=function(n){return e.onConnError(n)},e.conn.onmessage=function(n){return e.onConnMessage(n)},e.conn.onclose=function(n){return e.onConnClose(n)}})},writable:!0,configurable:!0},log:{value:function(e){this.logger(e)},writable:!0,configurable:!0},onOpen:{value:function(e){this.stateChangeCallbacks.open.push(e)},writable:!0,configurable:!0},onClose:{value:function(e){this.stateChangeCallbacks.close.push(e)},writable:!0,configurable:!0},onError:{value:function(e){this.stateChangeCallbacks.error.push(e)},writable:!0,configurable:!0},onMessage:{value:function(e){this.stateChangeCallbacks.message.push(e)},writable:!0,configurable:!0},onConnOpen:{value:function(){var e=this;this.flushSendBuffer(),clearInterval(this.reconnectTimer),this.conn.skipHeartbeat||(clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(function(){return e.sendHeartbeat()},this.heartbeatIntervalMs)),this.stateChangeCallbacks.open.forEach(function(e){return e()})},writable:!0,configurable:!0},onConnClose:{value:function(e){var n=this;this.log("WS close:"),this.log(e),this.triggerChanError(),clearInterval(this.reconnectTimer),clearInterval(this.heartbeatTimer),this.reconnectTimer=setInterval(function(){return n.connect()},this.reconnectAfterMs),this.stateChangeCallbacks.close.forEach(function(n){return n(e)})},writable:!0,configurable:!0},onConnError:{value:function(e){this.log("WS error:"),this.log(e),this.triggerChanError(),this.stateChangeCallbacks.error.forEach(function(n){return n(e)})},writable:!0,configurable:!0},triggerChanError:{value:function(){this.channels.forEach(function(e){return e.trigger(a.error)})},writable:!0,configurable:!0},connectionState:{value:function(){switch(this.conn&&this.conn.readyState){case o.connecting:return"connecting";case o.open:return"open";case o.closing:return"closing";default:return"closed"}},writable:!0,configurable:!0},isConnected:{value:function(){return"open"===this.connectionState()},writable:!0,configurable:!0},remove:{value:function(e){this.channels=this.channels.filter(function(n){return!n.isMember(e.topic)})},writable:!0,configurable:!0},chan:{value:function n(e,t){var n=new c(e,t,this);return this.channels.push(n),n},writable:!0,configurable:!0},push:{value:function(e){var n=this,t=function(){return n.conn.send(JSON.stringify(e))};this.isConnected()?t():this.sendBuffer.push(t)},writable:!0,configurable:!0},makeRef:{value:function(){var e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()},writable:!0,configurable:!0},sendHeartbeat:{value:function(){this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.makeRef()})},writable:!0,configurable:!0},flushSendBuffer:{value:function(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(function(e){return e()}),this.sendBuffer=[])},writable:!0,configurable:!0},onConnMessage:{value:function(e){this.log("message received:"),this.log(e);var n=JSON.parse(e.data),t=n.topic,i=n.event,r=n.payload;this.channels.filter(function(e){return e.isMember(t)}).forEach(function(e){return e.trigger(i,r)}),this.stateChangeCallbacks.message.forEach(function(e){e(t,i,r)})},writable:!0,configurable:!0}}),e}(),e.LongPoller=function(){function e(n){r(this,e),this.retryInMs=5e3,this.endPoint=null,this.token=null,this.sig=null,this.skipHeartbeat=!0,this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.upgradeEndpoint=this.normalizeEndpoint(n),this.pollEndpoint=this.upgradeEndpoint+(/\/$/.test(n)?"poll":"/poll"),this.readyState=o.connecting,this.poll()}return i(e,null,{normalizeEndpoint:{value:function(e){return e.replace("ws://","http://").replace("wss://","https://")},writable:!0,configurable:!0},endpointURL:{value:function(){return this.pollEndpoint+("?token="+encodeURIComponent(this.token)+"&sig="+encodeURIComponent(this.sig))},writable:!0,configurable:!0},closeAndRetry:{value:function(){this.close(),this.readyState=o.connecting},writable:!0,configurable:!0},ontimeout:{value:function(){this.onerror("timeout"),this.closeAndRetry()},writable:!0,configurable:!0},poll:{value:function(){var e=this;(this.readyState===o.open||this.readyState===o.connecting)&&f.request("GET",this.endpointURL(),"application/json",null,this.timeout,this.ontimeout.bind(this),function(n){if(n){var t=n.status,i=n.token,r=n.sig,s=n.messages;e.token=i,e.sig=r}else var t=0;switch(t){case 200:s.forEach(function(n){return e.onmessage({data:JSON.stringify(n)})}),e.poll();break;case 204:e.poll();break;case 410:e.readyState=o.open,e.onopen(),e.poll();break;case 0:case 500:e.onerror(),e.closeAndRetry();break;default:throw"unhandled poll status "+t}})},writable:!0,configurable:!0},send:{value:function(e){var n=this;f.request("POST",this.endpointURL(),"application/json",e,this.timeout,this.onerror.bind(this,"timeout"),function(e){e&&200===e.status||(n.onerror(status),n.closeAndRetry())})},writable:!0,configurable:!0},close:{value:function(e,n){this.readyState=o.closed,this.onclose()},writable:!0,configurable:!0}}),e}()),f=e.Ajax=function(){function e(){r(this,e)}return i(e,{request:{value:function(e,n,t,i,r,o,s){if(window.XDomainRequest){var a=new XDomainRequest;this.xdomainRequest(a,e,n,i,r,o,s)}else{var a=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");this.xhrRequest(a,e,n,t,i,r,o,s)}},writable:!0,configurable:!0},xdomainRequest:{value:function(e,n,t,i,r,o,s){var a=this;e.timeout=r,e.open(n,t),e.onload=function(){var n=a.parseJSON(e.responseText);s&&s(n)},o&&(e.ontimeout=o),e.onprogress=function(){},e.send(i)},writable:!0,configurable:!0},xhrRequest:{value:function(e,n,t,i,r,o,s,a){var u=this;e.timeout=o,e.open(n,t,!0),e.setRequestHeader("Content-Type",i),e.onerror=function(){a&&a(null)},e.onreadystatechange=function(){if(e.readyState===u.states.complete&&a){var n=u.parseJSON(e.responseText);a(n)}},s&&(e.ontimeout=s),e.send(r)},writable:!0,configurable:!0},parseJSON:{value:function(e){return e&&""!==e?JSON.parse(e):null},writable:!0,configurable:!0}}),e}();f.states={complete:4},Object.defineProperty(e,"__esModule",{value:!0})}}),"object"!=typeof window||window.Phoenix||(window.Phoenix=require("phoenix")),require.register("web/static/js/app",function(e,n,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=(n("phoenix"),{});e["default"]=i,t.exports=e["default"]});