(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var inserted = exports.cache = {}

function noop () {}

exports.insert = function (css) {
  if (inserted[css]) return noop
  inserted[css] = true

  var elem = document.createElement('style')
  elem.setAttribute('type', 'text/css')

  if ('textContent' in elem) {
    elem.textContent = css
  } else {
    elem.styleSheet.cssText = css
  }

  document.getElementsByTagName('head')[0].appendChild(elem)
  return function () {
    document.getElementsByTagName('head')[0].removeChild(elem)
    inserted[css] = false
  }
}

},{}],2:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".sensitile-address-search{display:flex;width:100%;margin-bottom:10px}.sensitile-address-search__input{width:100%;margin-right:10px!important}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  mixins: [window.Storyblok.plugin],
  data: function data() {
    return {
      samples: [],
      isActive: false,
      search: "",
      latitude: "",
      longitude: "",
      error: ""
    };
  },

  methods: {
    initWith: function initWith() {
      return {
        latitude: "",
        longitude: "",
        search: "",
        plugin: "sensitile-address-search"
      };
    },
    pluginCreated: function pluginCreated() {
      this.longitude = this.model.longitude;
      this.latitude = this.model.latitude;
      this.search = this.model.search;
    },
    findLocation: function findLocation() {
      var _this = this;

      var location = {};
      var address = this.search;
      var xhr = new XMLHttpRequest();
      var that = this;
      xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          var response = xhr.response;

          var result = JSON.parse(response);
          var coordinates = result.features.length && result.features[0].geometry.coordinates;
          if (coordinates[0] === undefined) {
            _this.error = "Address not found";
          } else {
            _this.updateLocation(coordinates[1] ? coordinates[1] : 0, coordinates[0] ? coordinates[0] : 0);
            _this.error = "";
          }
        }
      };
      xhr.open("GET", "https://nominatim.openstreetmap.org/search?q=" + address + "&format=geojson", true);
      xhr.send(null);
    },
    updateLocation: function updateLocation(latitude, longitude) {
      this.latitude = latitude;
      this.model.latitude = latitude;
      this.longitude = longitude;
      this.model.longitude = longitude;
    },
    updateLatitude: function updateLatitude() {
      this.model.latitude = this.latitude;
    },
    updateLongitude: function updateLongitude() {
      this.model.longitude = this.longitude;
    },
    updateSearch: function updateSearch() {
      this.model.search = this.search;
    }
  },
  watch: {
    model: {
      deep: true,
      handler: function handler(value) {
        this.$emit("changed-model", value);
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.model)?_c('div',[_c('div',{staticClass:"sensitile-address-search"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.search),expression:"search"}],staticClass:"sensitile-address-search__input",attrs:{"id":"search","type":"text","placeholder":"Search address"},domProps:{"value":(_vm.search)},on:{"keyup":_vm.updateSearch,"input":function($event){if($event.target.composing){ return; }_vm.search=$event.target.value}}}),_vm._v(" "),_c('button',{staticClass:"uk-button uk-button-primary",attrs:{"value":_vm.model.search},on:{"click":_vm.findLocation}},[_vm._v("Search")])]),_vm._v("\n  "+_vm._s(_vm.error)+"\n  "),_c('div',[_c('div',{staticClass:"tree__form-group"},[_c('span',{staticClass:"form__topic"},[_vm._v("Latitude")]),_vm._v(" "),_c('div',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.latitude),expression:"latitude"}],staticClass:"uk-width-1-1",attrs:{"dir":"ltr","type":"text","value":"latitude"},domProps:{"value":(_vm.latitude)},on:{"keyup":_vm.updateLatitude,"input":function($event){if($event.target.composing){ return; }_vm.latitude=$event.target.value}}})])])]),_vm._v(" "),_c('div',[_c('div',{staticClass:"tree__form-group"},[_c('span',{staticClass:"form__topic"},[_vm._v("Longitude")]),_vm._v(" "),_c('div',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.longitude),expression:"longitude"}],staticClass:"uk-width-1-1",attrs:{"dir":"ltr","type":"text","value":"longitude"},domProps:{"value":(_vm.longitude)},on:{"keyup":_vm.updateLongitude,"input":function($event){if($event.target.composing){ return; }_vm.longitude=$event.target.value}}})])])]),_vm._v("If the above latitude and longitude are not correct, or if the address could not be found, they can be corrected manually.\n")]):_vm._e()}
__vue__options__.staticRenderFns = []

},{"vueify/lib/insert-css":1}],3:[function(require,module,exports){
'use strict';

var _Plugin = require('../Plugin.vue');

var _Plugin2 = _interopRequireDefault(_Plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = _Plugin2.default.methods.initWith();

window.storyblok.field_types[init.plugin] = _Plugin2.default;

},{"../Plugin.vue":2}]},{},[3]);
