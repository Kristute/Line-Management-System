!function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=5)}({0:function(e,n,t){"use strict";function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function u(e,n){return $.ajax({type:"Get",url:e,dataType:"json",success:function(e){localStorage.setItem(n,JSON.stringify(e))},error:function(e){console.log(e)}})}function c(e){var n=localStorage.getItem(e);return null!==n?JSON.parse(n):null}function o(e,n){localStorage.setItem(e,JSON.stringify(n))}function a(e){return e.map((function(e){return e.ID})).reduce((function(e,n){return Math.max(e,n)}),0)+1}function l(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=c("line-data");if(null!==t){var r=t.filter((function(n){return n.specialist_id===e}));if(r.length>0){var i=c("line-clients");if(null!==i)return i.filter((function(e){return-1!==r.findIndex((function(n){return n.client_id===e.ID}))&&e.serviced===n}))}}return[]}function f(e){var n,t,r,i,u=c("line-specialists").find((function(n){return n.ID===e}));void 0!==u&&function(e,n){var t=c("line-data"),r=a(t);t.push({ID:r,client_id:e,specialist_id:n}),o("line-data",t)}((n=c("line-clients"),t=n.map((function(e){return e.number})).reduce((function(e,n){return Math.max(e,n)}),0)+1,r=a(n),i=(new Date).getTime(),n.push({ID:r,number:t,createdAt:i,serviced:!1}),o("line-clients",n),r),u.ID)}function d(e){var n=c("line-clients"),t=n.findIndex((function(n){return n.ID===e}));-1!==t&&(n[t].serviced=!0,n[t].endedAt=(new Date).getTime(),o("line-clients",n))}function s(){var e=(new Date).getTime();o("line-clients",c("line-clients").map((function(n){return function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(t,!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(t).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({},n,{createdAt:e,serviced:!1})})))}function p(e){var n=l(e,!0),t=n.reduce((function(e,n){return void 0!==n.endedAt?e+(n.endedAt-n.createdAt):e}),0)/n.length;return Number.isNaN(t)?0:Math.round(t)}function b(e){var n=c("line-clients").find((function(n){return n.number===e}));if(void 0!==n){var t=c("line-data").find((function(e){return e.client_id===n.ID}));if(void 0!==t){var r=p(t.specialist_id),i=l(t.specialist_id).sort((function(e,n){return e.number-n.number})).findIndex((function(e){return e.ID===n.ID}));if(-1!==i)return r*i}}return 0}t.d(n,"e",(function(){return u})),t.d(n,"c",(function(){return l})),t.d(n,"a",(function(){return f})),t.d(n,"f",(function(){return d})),t.d(n,"g",(function(){return s})),t.d(n,"b",(function(){return p})),t.d(n,"d",(function(){return b}))},5:function(e,n,t){"use strict";t.r(n);var r=t(0);$(".js-calculate-time").click((function(){$(".js-calculated-time").remove();var e=$(".js-number")[0].value,n=Object(r.d)(parseInt(e,10)),t=n>0?Math.round(n/1e3/60):0;$(".js-time-remaining").append('<strong class="js-calculated-time">'.concat(t," mins.</strong>"))}))}});