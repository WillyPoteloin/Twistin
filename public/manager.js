!function(){"use strict";var n="undefined"==typeof window?global:window;if("function"!=typeof n.require){var r={},e={},t={}.hasOwnProperty,i={},o=function(n,r){var e=0;r&&(r.indexOf(!1)&&(e="components/".length),r.indexOf("/",e)>0&&(r=r.substring(e,r.indexOf("/",e))));var t=i[n+"/index.js"]||i[r+"/deps/"+n+"/index.js"];return t?"components/"+t.substring(0,t.length-".js".length):n},u=function(){var n=/^\.\.?(\/|$)/;return function(r,e){var t,i,o=[];t=(n.test(e)?r+"/"+e:e).split("/");for(var u=0,a=t.length;a>u;u++)i=t[u],".."===i?o.pop():"."!==i&&""!==i&&o.push(i);return o.join("/")}}(),a=function(n){return n.split("/").slice(0,-1).join("/")},l=function(r){return function(e){var t=u(a(r),e);return n.require(t,r)}},f=function(n,r){var t={id:n,exports:{}};return e[n]=t,r(t.exports,l(n),t),t.exports},p=function(n,i){var a=u(n,".");if(null==i&&(i="/"),a=o(n,i),t.call(e,a))return e[a].exports;if(t.call(r,a))return f(a,r[a]);var l=u(a,"./index");if(t.call(e,l))return e[l].exports;if(t.call(r,l))return f(l,r[l]);throw new Error('Cannot find module "'+n+'" from "'+i+'"')};p.alias=function(n,r){i[r]=n},p.register=p.define=function(n,e){if("object"==typeof n)for(var i in n)t.call(n,i)&&(r[i]=n[i]);else r[n]=e},p.list=function(){var n=[];for(var e in r)t.call(r,e)&&n.push(e);return n},p.brunch=!0,n.require=p}}(),angular.module("app",["ngRoute"]);var app=angular.module("app");app.value("keyword","");var app=angular.module("app");app.config(function(n){n.when("/",{templateUrl:"views/manager/home.html"}).when("/home",{redirectTo:"/"}).when("/404",{templateUrl:"views/404.html"}).otherwise({redirectTo:"/404"})});
//# sourceMappingURL=public/manager.js.map
//# sourceMappingURL=manager.js.map