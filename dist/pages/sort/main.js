/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./test-src/pages/sort/main.vue?template":
/*!***********************************************!*\
  !*** ./test-src/pages/sort/main.vue?template ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('');

/***/ }),

/***/ "./test-src/pages/sort/main.vue?css":
/*!******************************************!*\
  !*** ./test-src/pages/sort/main.vue?css ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('');

/***/ }),

/***/ "./test-src/pages/sort/main.vue":
/*!**************************************!*\
  !*** ./test-src/pages/sort/main.vue ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Users_yiper_otherdemo_miniprogrom_test_src_pages_sort_main_vue_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test-src/pages/sort/main.vue?template */ "./test-src/pages/sort/main.vue?template");
/* harmony import */ var _Users_yiper_otherdemo_miniprogrom_test_src_pages_sort_main_vue_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test-src/pages/sort/main.vue?css */ "./test-src/pages/sort/main.vue?css");
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../server */ "./test-src/server/index.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/utils */ "./test-src/utils/utils.js");

        
        
        
// import { goTo, setUrlQuery, showToast } from '../../utils/utils';




/**
 * category_id: (...)
cover: (...)
icon: (...)
sub_title: (...)
title: (...)
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    data() {
        return {
            sortList: [],
            rightData: [],
            active: 0,
            scrollId: '',
            banner: [],
        };
    },
    created() {},

    methods: {
        go(id) {
            (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.goTo)('sort-secend', { id });
        },
        scroll(e) {
            // console.log(123);
        },
        changeActive(index) {
            this.active = index;
            this.rightData = this.sortList[index].items;
        },
    },
    onLoad() {
        (0,_server__WEBPACK_IMPORTED_MODULE_2__.GetSortList)().then((data) => {
            console.log(data);
            this.sortList = data.list;
            this.changeActive(0);
            // this.rightData = data.list[0].items;
            // this.rightData = data.list.reduce((pre, current) => {
            //     current.items = current.items.map((item) => {
            //         item.id = `id${parseInt(Math.random() * 10000)}`;
            //         return item;
            //     });
            //     return pre.concat(current.items);
            // }, []);
        });

        (0,_server__WEBPACK_IMPORTED_MODULE_2__.GetBanner)().then((data) => {
            this.banner = data.list;
        });
    },
    onShow() {},
});

        

/***/ }),

/***/ "./test-src/server/index.js":
/*!**********************************!*\
  !*** ./test-src/server/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkToken": () => (/* binding */ checkToken),
/* harmony export */   "Login": () => (/* binding */ Login),
/* harmony export */   "GetQiNiuToken": () => (/* binding */ GetQiNiuToken),
/* harmony export */   "UpdateUserInfo": () => (/* binding */ UpdateUserInfo),
/* harmony export */   "GetUserInfo": () => (/* binding */ GetUserInfo),
/* harmony export */   "GetMaterials": () => (/* binding */ GetMaterials),
/* harmony export */   "GetSortList": () => (/* binding */ GetSortList),
/* harmony export */   "GetCollection": () => (/* binding */ GetCollection),
/* harmony export */   "GetLike": () => (/* binding */ GetLike),
/* harmony export */   "GetMaterialsDetails": () => (/* binding */ GetMaterialsDetails),
/* harmony export */   "ToggleLike": () => (/* binding */ ToggleLike),
/* harmony export */   "ToggleFollow": () => (/* binding */ ToggleFollow),
/* harmony export */   "ChangeComplete": () => (/* binding */ ChangeComplete),
/* harmony export */   "GetBanner": () => (/* binding */ GetBanner)
/* harmony export */ });
/* harmony import */ var _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dorequest.js */ "./test-src/utils/dorequest.js");


function checkToken() {
    return (0,_utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest)({
        method: 'get',
        url: '/api/users/check-token',
    });
}

function Login(code, type = 'mini_program') {
    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.post('/api/users/login', { code, type });
}

function GetQiNiuToken() {
    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/qiniu/token');
}

function UpdateUserInfo(data) {
    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.post('/api/users/self/update_info', data);
}

function GetUserInfo() {
    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/users/self/info');
}

function GetMaterials(category_id = '', title = '', page = 1, page_size = 20) {
    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/materials', { title, category_id, page, page_size });
}

function GetSortList() {
    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/material_categories');
}

function GetCollection() {
    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/users/self/follow');
}

function GetLike() {
    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/users/self/like');
}

function GetMaterialsDetails(material_id) {
    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/materials/show', { material_id });
}

function ToggleLike(material_id) {
    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/materials/toggle_like', { material_id });
}

function ToggleFollow(material_id) {
    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/materials/toggle_follow', { material_id });
}

function ChangeComplete(item_id) {
    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/bar/toggle_complete', { item_id });
}

function GetBanner(type = 'banner') {
    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/ads', { type });
}


/***/ }),

/***/ "./test-src/utils/config.js":
/*!**********************************!*\
  !*** ./test-src/utils/config.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "MATERIAL_TYPE_TEXT": () => (/* binding */ MATERIAL_TYPE_TEXT),
/* harmony export */   "Hosts": () => (/* binding */ Hosts)
/* harmony export */ });
//let host = 'https://kan.dev.douba.cn';

const Hosts = {
    host: 'http://baoma.dev.douba.cn',
    loginHost: 'http://kt-activity.dev.douba.cn',
    // ws: "wss://sale-helper.dev.douba.cn:9502",
    // host: 'https://yfb.km.91douba.com',
    // loginHost: 'https://api.douba.cn',
    // ws: 'wss://yfb.km.91douba.com:9502'
};

if (false) {}

if (false) {}

const config = {
    appid: 'wxa4fea03aaa0cd389',
    version: '0.0.1', //提审版本号
};

// 素材类型
const MATERIAL_TYPE_TEXT = new Map([
    [1, '图文清单'],
    [2, '条目清单'],
    [3, '视频清单'],
    [4, '音频清单'],
]);




/***/ }),

/***/ "./test-src/utils/constant.js":
/*!************************************!*\
  !*** ./test-src/utils/constant.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "constant": () => (/* binding */ constant),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let CONSTANT = 'baoma.dev.constant.';
if (false) {}

function buildStorageKey(key) {
    return CONSTANT + key;
}

const constant = {
    token: buildStorageKey('token'),
    uid: buildStorageKey('uid'),
    hasUserInfo: buildStorageKey('hasUserInfo'),
    qiNiuToken: buildStorageKey('qiNiuToken'),
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (constant);


/***/ }),

/***/ "./test-src/utils/dorequest.js":
/*!*************************************!*\
  !*** ./test-src/utils/dorequest.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "httpRequest": () => (/* binding */ httpRequest),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ "./test-src/utils/constant.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.js */ "./test-src/utils/config.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./test-src/utils/utils.js");
/* harmony import */ var _mini_report_error_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mini-report-error.js */ "./test-src/utils/mini-report-error.js");
/**
 * @author yiper.fan
 * @update 2021年02月02日14:14:54
 */







const failFn = (msg = '网络错误') => {
    wx.showToast({
        title: msg || '网络错误',
        icon: 'none',
    });
};

// function getCurrentPageUrl() {
//     const pages = getCurrentPages(); //获取加载的页面

//     const currentPage = pages[pages.length - 1]; //获取当前页面的对象
//     console.log(currentPage.options);
//     const url = currentPage.route; //当前页面url
//     const options = currentPage.options;
//     return { url, options };
// }

/**
 * promise版本的请求
 * @param {Object} obj
 * @param {string} obj.url - 请求地址
 * @param {string} [obj.method='POST']- 请求方式
 * @param {Object} [obj.data] - 请求数据
 * @param {boolean} [obj.catch=false] - 为true时，不会弹出服务器报的错，需自行处理
 * @param {Number} [obj.original=3] - 1 wx返回的数据 2 服务端返回的数据 3 code为200返回的数据  默认为3
 * @returns {Promise}
 */
const httpRequest = (obj) => {
    const params = Object.assign(
        {
            need_token: true,
            method: 'POST',
            host: _config_js__WEBPACK_IMPORTED_MODULE_1__.Hosts.host,
            catch: false,
            original: 3,
            header: {
                appid: _config_js__WEBPACK_IMPORTED_MODULE_1__.config.appid,
            },
        },
        obj
    );

    // url
    params.url = params.host + params.url;

    // header
    if (params.method) {
        params.method = params.method.toUpperCase();
    } else {
        params.method = 'POST';
    }

    if (params.need_token) {
        // TODO: remove default value
        let token = wx.getStorageSync(_constant_js__WEBPACK_IMPORTED_MODULE_0__.constant.token);
        // params.header = Object.assign({ Authorization: token }, params.header);
        params.header.Authorization = token;
    }

    return new Promise((resolve, reject) => {
        params.success = (res) => {
            if (Number(res.statusCode) === 500) {
                reject(res);
                failFn();
                (0,_mini_report_error_js__WEBPACK_IMPORTED_MODULE_3__.postErrorLog)({ text: '服务器报500！！！！！', type: 2 });
                return;
            }

            if (Number(res.data.code) === 401) {
                (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.setStorageSync)(_constant_js__WEBPACK_IMPORTED_MODULE_0__.constant.token, '');

                //  const { url, options } = getCurrentPageUrl();

                // login().then(() => {
                //     //todo 可以自动登录后刷新该页面，待定，可能有体验问题
                //     // wx.redirectTo({ url:'/'+url});
                //     console.log('token完成');
                // });
                reject(res);
                return;
            }

            switch (Number(params.original)) {
                case 1:
                    resolve(res);
                    break;
                case 2:
                    resolve(res.data);
                    break;
                case 3:
                    if (Number(res.data.code) === 200) {
                        resolve(res.data.data);
                    } else {
                        if (!params.catch) {
                            failFn(res.data.msg);
                        }
                        reject(res.data);

                        (0,_mini_report_error_js__WEBPACK_IMPORTED_MODULE_3__.postErrorLog)({
                            type: 0,
                            text: res.data.msg,
                            other: {
                                requestUrl: params.url,
                                requestData: params.data,
                                responseCode: res.data.code,
                            },
                        });
                    }
            }
        };

        params.fail = (data) => {
            if (params.catch) {
                reject(data);
            } else {
                failFn();
            }

            (0,_mini_report_error_js__WEBPACK_IMPORTED_MODULE_3__.postErrorLog)({
                type: 2,
                text: JSON.stringify(data),
                other: {
                    requestUrl: params.url,
                },
            });
        };

        wx.request(params);
    });
};

httpRequest.post = (url, options, other = {}) => {
    const data = Object.assign(
        {
            method: 'post',
            url,
            data: options,
        },
        other
    );
    return httpRequest(data);
};

/**
 * get请求
 * @param {string} url -请求地址
 * @param {object} options -请求参数
 */
httpRequest.get = (url, options, other = {}) => {
    const data = Object.assign(
        {
            method: 'get',
            url,
            data: options,
        },
        other
    );
    return httpRequest(data);
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (httpRequest);


/***/ }),

/***/ "./test-src/utils/mini-report-error.js":
/*!*********************************************!*\
  !*** ./test-src/utils/mini-report-error.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postErrorLog": () => (/* binding */ postErrorLog)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./test-src/utils/utils.js");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant */ "./test-src/utils/constant.js");



function getCurrentPageUrl() {
    const pages = getCurrentPages(); //获取加载的页面

    const currentPage = pages[pages.length - 1]; //获取当前页面的对象
    console.log(currentPage.options);
    const url = currentPage.route; //当前页面url
    const options = currentPage.options;
    return { url, options };
}

const platform = '推米小程序';
const isProduction = "development" === 'production';
let lastErrorText = '';

/**
 * 提交error日志
 * @param {string} url https://fanep.cn/api/error-log
 * @param {object} obj - 错误内容
 * @param {string} obj.text - 错误内容
 * @param {string} [obj.platform] - 错误发生的平台
 * @param {number} [obj.sendMail=0] - 是否发送邮件  默认开发环境不发送
 * @param {number} [obj.type=0] 错误程度 0警告 1错误 2严重错误
 * @param {Object} [obj.other] 其他上报信息  任意{key:value}
 * @returns {void}
 */
const postErrorLog = (obj) => {
    //const ua = window.navigator.userAgent;

    if (obj.text === lastErrorText) {
        return;
    }

    if (!isProduction && Math.random() > 0.5) {
        // 开发环境对半上传
        return;
    }

    const { url, options } = getCurrentPageUrl();

    if (!obj.other) {
        obj.other = {};
    }

    Object.assign(obj.other, {
        pageUrl: url,
        pageOptions: options,
        uid: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getStorageSync)(_constant__WEBPACK_IMPORTED_MODULE_1__.constant.uid),
    });
    const data = Object.assign(
        {
            platform: platform,
            sendMail: 0,
            type: 0,
            production: Number(isProduction),
        },
        obj
    );

    try {
        wx.request({
            method: 'POST',
            url: 'https://fanep.cn/api/error-log',
            data: data,
        });
        lastErrorText = obj.text;
    } catch (error) {
        lastErrorText = '';
        console.warn('错误日志提交失败', error);
    }

    // window.onerror = function (e) {
    //     postFn({ ua, text: e, host });
    // };
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["test-src_utils_utils_js"], () => (__webpack_require__("./test-src/pages/sort/main.vue")))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".wxss";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "http://localhost:3333/dist/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			"pages/sort/main": 1
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.O.require = (chunkId) => (installedChunks[chunkId]);
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 			__webpack_require__.O();
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("../../" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			__webpack_require__.e("test-src_utils_utils_js");
/******/ 			return next();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;