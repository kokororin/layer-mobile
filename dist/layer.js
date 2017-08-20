(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["layer"] = factory();
	else
		root["layer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 @Name：layer mobile v2.0 弹层组件移动版
 @Author：贤心
 @Site：http://layer.layui.com/mobie/
 @License：LGPL
 */
__webpack_require__(2);

var win = window;
var doc = document,
    query = 'querySelectorAll',
    claname = 'getElementsByClassName',
    S = function S(s) {
  return doc[query](s);
};

//默认配置
var config = {
  type: 0,
  shade: true,
  shadeClose: true,
  fixed: true,
  anim: 'scale' //默认动画类型
};

var ready = {
  extend: function extend(obj) {
    var newobj = JSON.parse(JSON.stringify(config));
    for (var i in obj) {
      newobj[i] = obj[i];
    }
    return newobj;
  },
  timer: {},
  end: {}
};

//点触事件
ready.touch = function (elem, fn) {
  elem.addEventListener('click', function (e) {
    fn.call(this, e);
  }, false);
};

var index = 0,
    classs = ['layui-m-layer'],
    Layer = function Layer(options) {
  var that = this;
  that.config = ready.extend(options);
  that.view();
};

Layer.prototype.view = function () {
  var that = this,
      config = that.config,
      layerbox = doc.createElement('div');

  that.id = layerbox.id = classs[0] + index;
  layerbox.setAttribute('class', classs[0] + ' ' + classs[0] + (config.type || 0));
  layerbox.setAttribute('index', index);

  //标题区域
  var title = function () {
    var titype = _typeof(config.title) === 'object';
    return config.title ? '<h3 style="' + (titype ? config.title[1] : '') + '">' + (titype ? config.title[0] : config.title) + '</h3>' : '';
  }();

  //按钮区域
  var button = function () {
    typeof config.btn === 'string' && (config.btn = [config.btn]);
    var btns = (config.btn || []).length,
        btndom;
    if (btns === 0 || !config.btn) {
      return '';
    }
    btndom = '<span yes type="1">' + config.btn[0] + '</span>';
    if (btns === 2) {
      btndom = '<span no type="0">' + config.btn[1] + '</span>' + btndom;
    }
    return '<div class="layui-m-layerbtn">' + btndom + '</div>';
  }();

  if (!config.fixed) {
    config.top = config.hasOwnProperty('top') ? config.top : 100;
    config.style = config.style || '';
    config.style += ' top:' + (doc.body.scrollTop + config.top) + 'px';
  }

  if (config.type === 2) {
    config.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (config.content || '') + '</p>';
  }

  if (config.skin) config.anim = 'up';
  if (config.skin === 'msg') config.shade = false;

  layerbox.innerHTML = (config.shade ? '<div ' + (typeof config.shade === 'string' ? 'style="' + config.shade + '"' : '') + ' class="layui-m-layershade"></div>' : '') + '<div class="layui-m-layermain" ' + (!config.fixed ? 'style="position:static;"' : '') + '>' + '<div class="layui-m-layersection">' + '<div class="layui-m-layerchild ' + (config.skin ? 'layui-m-layer-' + config.skin + ' ' : '') + (config.className ? config.className : '') + ' ' + (config.anim ? 'layui-m-anim-' + config.anim : '') + '" ' + (config.style ? 'style="' + config.style + '"' : '') + '>' + title + '<div class="layui-m-layercont">' + config.content + '</div>' + button + '</div>' + '</div>' + '</div>';

  if (!config.type || config.type === 2) {
    var dialogs = doc[claname](classs[0] + config.type),
        dialen = dialogs.length;
    if (dialen >= 1) {
      layer.close(dialogs[0].getAttribute('index'));
    }
  }

  document.body.appendChild(layerbox);
  var elem = that.elem = S('#' + that.id)[0];
  config.success && config.success(elem);

  that.index = index++;
  that.action(config, elem);
};

Layer.prototype.action = function (config, elem) {
  var that = this;

  //自动关闭
  if (config.time) {
    ready.timer[that.index] = setTimeout(function () {
      layer.close(that.index);
    }, config.time * 1000);
  }

  //确认取消
  var btn = function btn() {
    var type = this.getAttribute('type');
    if (type == 0) {
      config.no && config.no();
      layer.close(that.index);
    } else {
      config.yes ? config.yes(that.index) : layer.close(that.index);
    }
  };
  if (config.btn) {
    var btns = elem[claname]('layui-m-layerbtn')[0].children,
        btnlen = btns.length;
    for (var ii = 0; ii < btnlen; ii++) {
      ready.touch(btns[ii], btn);
    }
  }

  //点遮罩关闭
  if (config.shade && config.shadeClose) {
    var shade = elem[claname]('layui-m-layershade')[0];
    ready.touch(shade, function () {
      layer.close(that.index, config.end);
    });
  }

  config.end && (ready.end[that.index] = config.end);
};

win.layer = {
  v: '2.0',
  index: index,

  //核心方法
  open: function open(options) {
    var o = new Layer(options || {});
    return o.index;
  },

  close: function close(index) {
    var ibox = S('#' + classs[0] + index)[0];
    if (!ibox) return;
    ibox.innerHTML = '';
    doc.body.removeChild(ibox);
    clearTimeout(ready.timer[index]);
    delete ready.timer[index];
    typeof ready.end[index] === 'function' && ready.end[index]();
    delete ready.end[index];
  },

  //关闭所有layer层
  closeAll: function closeAll() {
    var boxs = doc[claname](classs[0]);
    for (var i = 0, len = boxs.length; i < len; i++) {
      layer.close(boxs[0].getAttribute('index') | 0);
    }
  }
};

module.exports = layer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!./layer.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!./layer.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".layui-m-layer{position:relative;z-index:19891014}.layui-m-layer *{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.layui-m-layermain,.layui-m-layershade{position:fixed;left:0;top:0;width:100%;height:100%}.layui-m-layershade{background-color:rgba(0,0,0,.7);pointer-events:auto}.layui-m-layermain{display:table;font-family:Helvetica,arial,sans-serif;pointer-events:none}.layui-m-layermain .layui-m-layersection{display:table-cell;vertical-align:middle;text-align:center}.layui-m-layerchild{position:relative;display:inline-block;text-align:left;background-color:#fff;font-size:14px;border-radius:5px;box-shadow:0 0 8px rgba(0,0,0,.1);pointer-events:auto;-webkit-overflow-scrolling:touch;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:.2s;animation-duration:.2s}@-webkit-keyframes layui-m-anim-scale{0%{opacity:0;-webkit-transform:scale(.5);transform:scale(.5)}to{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes layui-m-anim-scale{0%{opacity:0;-webkit-transform:scale(.5);transform:scale(.5)}to{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}.layui-m-anim-scale{animation-name:layui-m-anim-scale;-webkit-animation-name:layui-m-anim-scale}@-webkit-keyframes layui-m-anim-up{0%{opacity:0;-webkit-transform:translateY(800px);transform:translateY(800px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes layui-m-anim-up{0%{opacity:0;-webkit-transform:translateY(800px);transform:translateY(800px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}.layui-m-anim-up{-webkit-animation-name:layui-m-anim-up;animation-name:layui-m-anim-up}.layui-m-layer0 .layui-m-layerchild{width:90%;max-width:640px}.layui-m-layer1 .layui-m-layerchild{border:none;border-radius:0}.layui-m-layer2 .layui-m-layerchild{width:auto;max-width:260px;min-width:40px;border:none;background:none;box-shadow:none;color:#fff}.layui-m-layerchild h3{padding:0 10px;height:60px;line-height:60px;font-size:16px;font-weight:400;border-radius:5px 5px 0 0;text-align:center}.layui-m-layerbtn span,.layui-m-layerchild h3{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.layui-m-layercont{padding:50px 30px;line-height:22px;text-align:center}.layui-m-layer1 .layui-m-layercont{padding:0;text-align:left}.layui-m-layer2 .layui-m-layercont{text-align:center;padding:0;line-height:0}.layui-m-layer2 .layui-m-layercont i{width:25px;height:25px;margin-left:8px;display:inline-block;background-color:#fff;border-radius:100%}.layui-m-layer2 .layui-m-layercont p{margin-top:20px}@-webkit-keyframes layui-m-anim-loading{0%,80%,to{transform:scale(0);-webkit-transform:scale(0)}40%{transform:scale(1);-webkit-transform:scale(1)}}@keyframes layui-m-anim-loading{0%,80%,to{transform:scale(0);-webkit-transform:scale(0)}40%{transform:scale(1);-webkit-transform:scale(1)}}.layui-m-layer2 .layui-m-layercont i{-webkit-animation:layui-m-anim-loading 1.4s infinite ease-in-out;animation:layui-m-anim-loading 1.4s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both}.layui-m-layer2 .layui-m-layercont i:first-child{margin-left:0;-webkit-animation-delay:-.32s;animation-delay:-.32s}.layui-m-layer2 .layui-m-layercont i.layui-m-layerload{-webkit-animation-delay:-.16s;animation-delay:-.16s}.layui-m-layer2 .layui-m-layercont>div{line-height:22px;padding-top:7px;margin-bottom:20px;font-size:14px}.layui-m-layerbtn{display:box;display:-moz-box;display:-webkit-box;width:100%;height:50px;line-height:50px;font-size:0;border-top:1px solid #d0d0d0;background-color:#f2f2f2}.layui-m-layerbtn,.layui-m-layerbtn span{position:relative;text-align:center;border-radius:0 0 5px 5px}.layui-m-layerbtn span{display:block;-moz-box-flex:1;box-flex:1;-webkit-box-flex:1;font-size:14px;cursor:pointer}.layui-m-layerbtn span[yes]{color:#40affe}.layui-m-layerbtn span[no]{border-right:1px solid #d0d0d0;border-radius:0 0 0 5px}.layui-m-layerbtn span:active{background-color:#f6f6f6}.layui-m-layerend{position:absolute;right:7px;top:10px;width:30px;height:30px;border:0;font-weight:400;background:transparent;cursor:pointer;-webkit-appearance:none;font-size:30px}.layui-m-layerend:after,.layui-m-layerend:before{position:absolute;left:5px;top:15px;content:\"\";width:18px;height:1px;background-color:#999;transform:rotate(45deg);-webkit-transform:rotate(45deg);border-radius:3px}.layui-m-layerend:after{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}body .layui-m-layer .layui-m-layer-footer{position:fixed;width:95%;max-width:100%;margin:0 auto;left:0;right:0;bottom:10px;background:none}.layui-m-layer-footer .layui-m-layercont{padding:20px;border-radius:5px 5px 0 0;background-color:hsla(0,0%,100%,.8)}.layui-m-layer-footer .layui-m-layerbtn{display:block;height:auto;background:none;border-top:none}.layui-m-layer-footer .layui-m-layerbtn span{background-color:hsla(0,0%,100%,.8)}.layui-m-layer-footer .layui-m-layerbtn span[no]{color:#fd482c;border-top:1px solid #c2c2c2;border-radius:0 0 5px 5px}.layui-m-layer-footer .layui-m-layerbtn span[yes]{margin-top:10px;border-radius:5px}body .layui-m-layer .layui-m-layer-msg{width:auto;max-width:90%;margin:0 auto;bottom:-150px;background-color:rgba(0,0,0,.7);color:#fff}.layui-m-layer-msg .layui-m-layercont{padding:10px 20px}", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=layer.js.map