(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-cx_list-cx_list"],{"31e7":function(t,i,e){var a=e("ce17");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("0295edb5",a,!0,{sourceMap:!1,shadowMode:!1})},"7edf":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={data:function(){return{data_list:[1,1,1,1,1,1,1,1,1]}},methods:{jump:function(t){var i=this;1!=i.btnkg&&(i.btnkg=1,setTimeout((function(){i.btnkg=0}),1e3),console.log(t.currentTarget.dataset.url),uni.navigateTo({url:t.currentTarget.dataset.url}))}}};i.default=a},"888f":function(t,i,e){"use strict";var a=e("31e7"),n=e.n(a);n.a},"8aa4":function(t,i,e){"use strict";e.r(i);var a=e("7edf"),n=e.n(a);for(var s in a)"default"!==s&&function(t){e.d(i,t,(function(){return a[t]}))}(s);i["default"]=n.a},b9f9:function(t,i,e){"use strict";e.r(i);var a=e("f75e"),n=e("8aa4");for(var s in n)"default"!==s&&function(t){e.d(i,t,(function(){return n[t]}))}(s);e("888f");var o,c=e("f0c5"),l=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,"359432a7",null,!1,a["a"],o);i["default"]=l.exports},ce17:function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,".wrap[data-v-359432a7]{width:100%;min-height:100vh;background:#f5f5f5;padding:%?38?% %?28?%;box-sizing:border-box}.cx_list[data-v-359432a7]{width:100%;background:#fff;box-shadow:0 3px %?18?% 0 hsla(0,0%,74.1%,.18);border-radius:%?10?%;overflow:hidden}.cx_list_tit[data-v-359432a7]{width:100%;height:%?80?%;padding:0 %?28?%;background:#2a78df;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;color:#fff;font-size:16px;box-sizing:border-box}.li_t1[data-v-359432a7]{width:%?422?%}.li_t2[data-v-359432a7]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.li_box[data-v-359432a7]{width:100%}.cx_li[data-v-359432a7]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?80?%;padding:0 %?28?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;background:#fff;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.cx_li .iconfont[data-v-359432a7]{-webkit-box-flex:0;-webkit-flex:none;flex:none;margin-left:10px;color:#dbdbdb}.cx_li[data-v-359432a7]:nth-child(2n){background:#f7f7f7}",""]),t.exports=i},f75e:function(t,i,e){"use strict";var a,n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"wrap"},[e("v-uni-view",{staticClass:"cx_list"},[e("v-uni-view",{staticClass:"cx_list_tit"},[e("v-uni-view",{staticClass:"li_t1"},[t._v("交易时间")]),e("v-uni-view",{staticClass:"li_t2"},[t._v("薪资金额")])],1),e("v-uni-view",{staticClass:"li_box"},t._l(t.data_list,(function(i,a){return e("v-uni-view",{staticClass:"cx_li",attrs:{"data-url":"/pages/details/details?id="+a},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.jump.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"li_t1"},[t._v("2019-02-03")]),e("v-uni-view",{staticClass:"li_t2"},[t._v("12567.56")]),e("v-uni-text",{staticClass:"iconfont iconnext3"})],1)})),1)],1)],1)},s=[];e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return s})),e.d(i,"a",(function(){return a}))}}]);