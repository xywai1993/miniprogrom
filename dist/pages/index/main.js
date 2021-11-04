/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./test-src/pages/index/main.vue?template":
/*!************************************************!*\
  !*** ./test-src/pages/index/main.vue?template ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('');\n\n//# sourceURL=webpack://@yiper.fan/mini-program-builder/./test-src/pages/index/main.vue?");

/***/ }),

/***/ "./test-src/pages/index/main.vue?css":
/*!*******************************************!*\
  !*** ./test-src/pages/index/main.vue?css ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('');\n\n//# sourceURL=webpack://@yiper.fan/mini-program-builder/./test-src/pages/index/main.vue?");

/***/ }),

/***/ "./test-src/pages/index/main.vue":
/*!***************************************!*\
  !*** ./test-src/pages/index/main.vue ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_yiper_otherdemo_miniprogrom_test_src_pages_index_main_vue_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test-src/pages/index/main.vue?template */ \"./test-src/pages/index/main.vue?template\");\n/* harmony import */ var _Users_yiper_otherdemo_miniprogrom_test_src_pages_index_main_vue_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test-src/pages/index/main.vue?css */ \"./test-src/pages/index/main.vue?css\");\n/* harmony import */ var _vue_reactivity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vue/reactivity */ \"./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js\");\n/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! underscore */ \"./node_modules/underscore/modules/index-all.js\");\n/* harmony import */ var _util_test__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/test */ \"./test-src/util/test.js\");\n/* harmony import */ var _server_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../server/index.js */ \"./test-src/server/index.js\");\n\n        \n        \n        \nconst app = getApp();\n\n\n\n\n\nconsole.log(underscore__WEBPACK_IMPORTED_MODULE_2__.max, _util_test__WEBPACK_IMPORTED_MODULE_3__.a);\n\nconsole.log('main.vue');\nconst data = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_5__.reactive)({\n    list1: [],\n    list2: [],\n    page_size: 1,\n    total_page: 1,\n    list: [],\n    title: '宝妈清单',\n    bgColor: '#00000000',\n});\n\nconst d = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_5__.isProxy)(data);\nconsole.log(d);\nPage({\n    data: data,\n    onLoad() {\n        const that = this;\n\n        // Object.keys(data).forEach((val) => {\n        //     effect(() => {\n        //         console.log('val', val, data[val]);\n        //         that.setData({ [val]: data[val] });\n        //     });\n        // });\n\n        (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_5__.effect)(() => {\n            // console.log(1, data);\n            that.setData(data);\n        });\n\n        (0,_server_index_js__WEBPACK_IMPORTED_MODULE_4__.GetMaterials)().then((data) => {\n            // console.log(11, this.createList(data.list));\n\n            this.createGrid(data.list);\n            // this.total_page = Math.ceil(data.total / 20);\n            // this.list = data.list;\n        });\n    },\n\n    changeNum() {\n        // data.textNum = data.textNum + 4;\n        data.arr.push(10);\n    },\n    showMe(event) {\n        console.log(2345);\n        data.show = !data.show;\n    },\n    goType(type, id) {\n        console.log(type);\n        let url = '';\n        switch (type) {\n            case 1:\n                url = 'pic-details';\n                break;\n            case 2:\n                url = 'todo-list';\n                break;\n            case 3:\n                url = 'video-list';\n                break;\n            case 4:\n                url = 'audio-list';\n                break;\n            case 5:\n                url = 'question-list';\n                break;\n            default:\n                break;\n        }\n        goTo(url, { id });\n    },\n    confirm(e) {\n        console.log(e.target.value);\n        (0,_server_index_js__WEBPACK_IMPORTED_MODULE_4__.GetMaterials)('', e.target.value).then((data) => {\n            console.log(data);\n\n            this.createGrid(data.list);\n        });\n    },\n    searchBlur(e) {\n        console.log(e);\n        if (!e.target.value) {\n            (0,_server_index_js__WEBPACK_IMPORTED_MODULE_4__.GetMaterials)().then((data) => {\n                console.log(data);\n                this.createGrid(data.list);\n            });\n        }\n    },\n    createGrid(list) {\n        // const _list = list.reduce((pre, current) => {\n        //     return pre.concat(current);\n        // }, []);\n        const list1 = [];\n        const list2 = [];\n        list.forEach((item, index) => {\n            if (index % 2 === 0) {\n                list1.push(item);\n            } else {\n                list2.push(item);\n            }\n        });\n        data.list1 = list1;\n        data.list2 = list2;\n    },\n});\n\n        \n\n//# sourceURL=webpack://@yiper.fan/mini-program-builder/./test-src/pages/index/main.vue?");

/***/ }),

/***/ "./test-src/envList.js":
/*!*****************************!*\
  !*** ./test-src/envList.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"envList\": () => (/* binding */ envList)\n/* harmony export */ });\nconst envList = [\n    {\n        envId: 'development-9gsmsa374b802a58',\n        alias: 'development',\n    },\n];\n\n\n//# sourceURL=webpack://@yiper.fan/mini-program-builder/./test-src/envList.js?");

/***/ }),

/***/ "./test-src/server/index.js":
/*!**********************************!*\
  !*** ./test-src/server/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"checkToken\": () => (/* binding */ checkToken),\n/* harmony export */   \"Login\": () => (/* binding */ Login),\n/* harmony export */   \"GetQiNiuToken\": () => (/* binding */ GetQiNiuToken),\n/* harmony export */   \"UpdateUserInfo\": () => (/* binding */ UpdateUserInfo),\n/* harmony export */   \"GetUserInfo\": () => (/* binding */ GetUserInfo),\n/* harmony export */   \"GetMaterials\": () => (/* binding */ GetMaterials),\n/* harmony export */   \"GetSortList\": () => (/* binding */ GetSortList),\n/* harmony export */   \"GetCollection\": () => (/* binding */ GetCollection),\n/* harmony export */   \"GetLike\": () => (/* binding */ GetLike),\n/* harmony export */   \"GetMaterialsDetails\": () => (/* binding */ GetMaterialsDetails),\n/* harmony export */   \"ToggleLike\": () => (/* binding */ ToggleLike),\n/* harmony export */   \"ToggleFollow\": () => (/* binding */ ToggleFollow),\n/* harmony export */   \"ChangeComplete\": () => (/* binding */ ChangeComplete),\n/* harmony export */   \"GetBanner\": () => (/* binding */ GetBanner)\n/* harmony export */ });\n/* harmony import */ var _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dorequest.js */ \"./test-src/utils/dorequest.js\");\n\n\nfunction checkToken() {\n    return (0,_utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest)({\n        method: 'get',\n        url: '/api/users/check-token',\n    });\n}\n\nfunction Login(code, type = 'mini_program') {\n    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.post('/api/users/login', { code, type });\n}\n\nfunction GetQiNiuToken() {\n    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/qiniu/token');\n}\n\nfunction UpdateUserInfo(data) {\n    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.post('/api/users/self/update_info', data);\n}\n\nfunction GetUserInfo() {\n    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/users/self/info');\n}\n\nfunction GetMaterials(category_id = '', title = '', page = 1, page_size = 20) {\n    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/materials', { title, category_id, page, page_size });\n}\n\nfunction GetSortList() {\n    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/material_categories');\n}\n\nfunction GetCollection() {\n    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/users/self/follow');\n}\n\nfunction GetLike() {\n    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/users/self/like');\n}\n\nfunction GetMaterialsDetails(material_id) {\n    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/materials/show', { material_id });\n}\n\nfunction ToggleLike(material_id) {\n    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/materials/toggle_like', { material_id });\n}\n\nfunction ToggleFollow(material_id) {\n    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/materials/toggle_follow', { material_id });\n}\n\nfunction ChangeComplete(item_id) {\n    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/bar/toggle_complete', { item_id });\n}\n\nfunction GetBanner(type = 'banner') {\n    return _utils_dorequest_js__WEBPACK_IMPORTED_MODULE_0__.httpRequest.get('/api/ads', { type });\n}\n\n\n//# sourceURL=webpack://@yiper.fan/mini-program-builder/./test-src/server/index.js?");

/***/ }),

/***/ "./test-src/util/test.js":
/*!*******************************!*\
  !*** ./test-src/util/test.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"a\": () => (/* binding */ a),\n/* harmony export */   \"b\": () => (/* binding */ b),\n/* harmony export */   \"c\": () => (/* binding */ c),\n/* harmony export */   \"d\": () => (/* binding */ d),\n/* harmony export */   \"e\": () => (/* binding */ e),\n/* harmony export */   \"f\": () => (/* binding */ f),\n/* harmony export */   \"g\": () => (/* binding */ g)\n/* harmony export */ });\n/* harmony import */ var _envList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../envList.js */ \"./test-src/envList.js\");\n/* harmony import */ var _test3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test3.js */ \"./test-src/util/test3.js\");\n/* harmony import */ var _test2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./test2.js */ \"./test-src/util/test2.js\");\n\n\n\nconst a = _test2_js__WEBPACK_IMPORTED_MODULE_2__.add;\nconst b = '22';\nconst c = '22';\nconst d = '22';\nconst e = '22';\nconst f = '22';\nconst g = '22';\nconsole.log(_test3_js__WEBPACK_IMPORTED_MODULE_1__.test3);\nconsole.log(_envList_js__WEBPACK_IMPORTED_MODULE_0__.envList);\nconsole.log('helloworld-12333');\n\n\n//# sourceURL=webpack://@yiper.fan/mini-program-builder/./test-src/util/test.js?");

/***/ }),

/***/ "./test-src/util/test2.js":
/*!********************************!*\
  !*** ./test-src/util/test2.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"add\": () => (/* binding */ add)\n/* harmony export */ });\nconst add = (a, b) => a + b;\n\n\n//# sourceURL=webpack://@yiper.fan/mini-program-builder/./test-src/util/test2.js?");

/***/ }),

/***/ "./test-src/util/test3.js":
/*!********************************!*\
  !*** ./test-src/util/test3.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"test3\": () => (/* binding */ test3)\n/* harmony export */ });\nconst test3 = 'tes311';\n\n\n//# sourceURL=webpack://@yiper.fan/mini-program-builder/./test-src/util/test3.js?");

/***/ }),

/***/ "./test-src/utils/config.js":
/*!**********************************!*\
  !*** ./test-src/utils/config.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"config\": () => (/* binding */ config),\n/* harmony export */   \"MATERIAL_TYPE_TEXT\": () => (/* binding */ MATERIAL_TYPE_TEXT),\n/* harmony export */   \"Hosts\": () => (/* binding */ Hosts)\n/* harmony export */ });\n//let host = 'https://kan.dev.douba.cn';\n\nconst Hosts = {\n    host: 'http://baoma.dev.douba.cn',\n    loginHost: 'http://kt-activity.dev.douba.cn',\n    // ws: \"wss://sale-helper.dev.douba.cn:9502\",\n    // host: 'https://yfb.km.91douba.com',\n    // loginHost: 'https://api.douba.cn',\n    // ws: 'wss://yfb.km.91douba.com:9502'\n};\n\nif (false) {}\n\nif (false) {}\n\nconst config = {\n    appid: 'wxa4fea03aaa0cd389',\n    version: '0.0.1', //提审版本号\n};\n\n// 素材类型\nconst MATERIAL_TYPE_TEXT = new Map([\n    [1, '图文清单'],\n    [2, '条目清单'],\n    [3, '视频清单'],\n    [4, '音频清单'],\n]);\n\n\n\n\n//# sourceURL=webpack://@yiper.fan/mini-program-builder/./test-src/utils/config.js?");

/***/ }),

/***/ "./test-src/utils/constant.js":
/*!************************************!*\
  !*** ./test-src/utils/constant.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"constant\": () => (/* binding */ constant),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet CONSTANT = 'baoma.dev.constant.';\nif (false) {}\n\nfunction buildStorageKey(key) {\n    return CONSTANT + key;\n}\n\nconst constant = {\n    token: buildStorageKey('token'),\n    uid: buildStorageKey('uid'),\n    hasUserInfo: buildStorageKey('hasUserInfo'),\n    qiNiuToken: buildStorageKey('qiNiuToken'),\n};\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (constant);\n\n\n//# sourceURL=webpack://@yiper.fan/mini-program-builder/./test-src/utils/constant.js?");

/***/ }),

/***/ "./test-src/utils/dorequest.js":
/*!*************************************!*\
  !*** ./test-src/utils/dorequest.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"httpRequest\": () => (/* binding */ httpRequest),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ \"./test-src/utils/constant.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.js */ \"./test-src/utils/config.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ \"./test-src/utils/utils.js\");\n/* harmony import */ var _mini_report_error_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mini-report-error.js */ \"./test-src/utils/mini-report-error.js\");\n/**\n * @author yiper.fan\n * @update 2021年02月02日14:14:54\n */\n\n\n\n\n\n\n\nconst failFn = (msg = '网络错误') => {\n    wx.showToast({\n        title: msg || '网络错误',\n        icon: 'none',\n    });\n};\n\n// function getCurrentPageUrl() {\n//     const pages = getCurrentPages(); //获取加载的页面\n\n//     const currentPage = pages[pages.length - 1]; //获取当前页面的对象\n//     console.log(currentPage.options);\n//     const url = currentPage.route; //当前页面url\n//     const options = currentPage.options;\n//     return { url, options };\n// }\n\n/**\n * promise版本的请求\n * @param {Object} obj\n * @param {string} obj.url - 请求地址\n * @param {string} [obj.method='POST']- 请求方式\n * @param {Object} [obj.data] - 请求数据\n * @param {boolean} [obj.catch=false] - 为true时，不会弹出服务器报的错，需自行处理\n * @param {Number} [obj.original=3] - 1 wx返回的数据 2 服务端返回的数据 3 code为200返回的数据  默认为3\n * @returns {Promise}\n */\nconst httpRequest = (obj) => {\n    const params = Object.assign(\n        {\n            need_token: true,\n            method: 'POST',\n            host: _config_js__WEBPACK_IMPORTED_MODULE_1__.Hosts.host,\n            catch: false,\n            original: 3,\n            header: {\n                appid: _config_js__WEBPACK_IMPORTED_MODULE_1__.config.appid,\n            },\n        },\n        obj\n    );\n\n    // url\n    params.url = params.host + params.url;\n\n    // header\n    if (params.method) {\n        params.method = params.method.toUpperCase();\n    } else {\n        params.method = 'POST';\n    }\n\n    if (params.need_token) {\n        // TODO: remove default value\n        let token = wx.getStorageSync(_constant_js__WEBPACK_IMPORTED_MODULE_0__.constant.token);\n        // params.header = Object.assign({ Authorization: token }, params.header);\n        params.header.Authorization = token;\n    }\n\n    return new Promise((resolve, reject) => {\n        params.success = (res) => {\n            if (Number(res.statusCode) === 500) {\n                reject(res);\n                failFn();\n                (0,_mini_report_error_js__WEBPACK_IMPORTED_MODULE_3__.postErrorLog)({ text: '服务器报500！！！！！', type: 2 });\n                return;\n            }\n\n            if (Number(res.data.code) === 401) {\n                (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.setStorageSync)(_constant_js__WEBPACK_IMPORTED_MODULE_0__.constant.token, '');\n\n                //  const { url, options } = getCurrentPageUrl();\n\n                // login().then(() => {\n                //     //todo 可以自动登录后刷新该页面，待定，可能有体验问题\n                //     // wx.redirectTo({ url:'/'+url});\n                //     console.log('token完成');\n                // });\n                reject(res);\n                return;\n            }\n\n            switch (Number(params.original)) {\n                case 1:\n                    resolve(res);\n                    break;\n                case 2:\n                    resolve(res.data);\n                    break;\n                case 3:\n                    if (Number(res.data.code) === 200) {\n                        resolve(res.data.data);\n                    } else {\n                        if (!params.catch) {\n                            failFn(res.data.msg);\n                        }\n                        reject(res.data);\n\n                        (0,_mini_report_error_js__WEBPACK_IMPORTED_MODULE_3__.postErrorLog)({\n                            type: 0,\n                            text: res.data.msg,\n                            other: {\n                                requestUrl: params.url,\n                                requestData: params.data,\n                                responseCode: res.data.code,\n                            },\n                        });\n                    }\n            }\n        };\n\n        params.fail = (data) => {\n            if (params.catch) {\n                reject(data);\n            } else {\n                failFn();\n            }\n\n            (0,_mini_report_error_js__WEBPACK_IMPORTED_MODULE_3__.postErrorLog)({\n                type: 2,\n                text: JSON.stringify(data),\n                other: {\n                    requestUrl: params.url,\n                },\n            });\n        };\n\n        wx.request(params);\n    });\n};\n\nhttpRequest.post = (url, options, other = {}) => {\n    const data = Object.assign(\n        {\n            method: 'post',\n            url,\n            data: options,\n        },\n        other\n    );\n    return httpRequest(data);\n};\n\n/**\n * get请求\n * @param {string} url -请求地址\n * @param {object} options -请求参数\n */\nhttpRequest.get = (url, options, other = {}) => {\n    const data = Object.assign(\n        {\n            method: 'get',\n            url,\n            data: options,\n        },\n        other\n    );\n    return httpRequest(data);\n};\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (httpRequest);\n\n\n//# sourceURL=webpack://@yiper.fan/mini-program-builder/./test-src/utils/dorequest.js?");

/***/ }),

/***/ "./test-src/utils/mini-report-error.js":
/*!*********************************************!*\
  !*** ./test-src/utils/mini-report-error.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"postErrorLog\": () => (/* binding */ postErrorLog)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./test-src/utils/utils.js\");\n/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant */ \"./test-src/utils/constant.js\");\n\n\n\nfunction getCurrentPageUrl() {\n    const pages = getCurrentPages(); //获取加载的页面\n\n    const currentPage = pages[pages.length - 1]; //获取当前页面的对象\n    console.log(currentPage.options);\n    const url = currentPage.route; //当前页面url\n    const options = currentPage.options;\n    return { url, options };\n}\n\nconst platform = '推米小程序';\nconst isProduction = \"development\" === 'production';\nlet lastErrorText = '';\n\n/**\n * 提交error日志\n * @param {string} url https://fanep.cn/api/error-log\n * @param {object} obj - 错误内容\n * @param {string} obj.text - 错误内容\n * @param {string} [obj.platform] - 错误发生的平台\n * @param {number} [obj.sendMail=0] - 是否发送邮件  默认开发环境不发送\n * @param {number} [obj.type=0] 错误程度 0警告 1错误 2严重错误\n * @param {Object} [obj.other] 其他上报信息  任意{key:value}\n * @returns {void}\n */\nconst postErrorLog = (obj) => {\n    //const ua = window.navigator.userAgent;\n\n    if (obj.text === lastErrorText) {\n        return;\n    }\n\n    if (!isProduction && Math.random() > 0.5) {\n        // 开发环境对半上传\n        return;\n    }\n\n    const { url, options } = getCurrentPageUrl();\n\n    if (!obj.other) {\n        obj.other = {};\n    }\n\n    Object.assign(obj.other, {\n        pageUrl: url,\n        pageOptions: options,\n        uid: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getStorageSync)(_constant__WEBPACK_IMPORTED_MODULE_1__.constant.uid),\n    });\n    const data = Object.assign(\n        {\n            platform: platform,\n            sendMail: 0,\n            type: 0,\n            production: Number(isProduction),\n        },\n        obj\n    );\n\n    try {\n        wx.request({\n            method: 'POST',\n            url: 'https://fanep.cn/api/error-log',\n            data: data,\n        });\n        lastErrorText = obj.text;\n    } catch (error) {\n        lastErrorText = '';\n        console.warn('错误日志提交失败', error);\n    }\n\n    // window.onerror = function (e) {\n    //     postFn({ ua, text: e, host });\n    // };\n};\n\n\n//# sourceURL=webpack://@yiper.fan/mini-program-builder/./test-src/utils/mini-report-error.js?");

/***/ }),

/***/ "./test-src/utils/utils.js":
/*!*********************************!*\
  !*** ./test-src/utils/utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"goTo\": () => (/* binding */ goTo),\n/* harmony export */   \"showToastP\": () => (/* binding */ showToastP),\n/* harmony export */   \"setSceneQuery\": () => (/* binding */ setSceneQuery),\n/* harmony export */   \"getByteLen\": () => (/* binding */ getByteLen),\n/* harmony export */   \"formatPrice\": () => (/* binding */ formatPrice),\n/* harmony export */   \"formatNumber\": () => (/* binding */ formatNumber),\n/* harmony export */   \"formatTime\": () => (/* binding */ formatTime),\n/* harmony export */   \"wxPromise\": () => (/* binding */ wxPromise),\n/* harmony export */   \"showToast\": () => (/* binding */ showToast),\n/* harmony export */   \"setStorageSync\": () => (/* binding */ setStorageSync),\n/* harmony export */   \"getStorageSync\": () => (/* binding */ getStorageSync),\n/* harmony export */   \"setUrlQuery\": () => (/* binding */ setUrlQuery),\n/* harmony export */   \"previewImage\": () => (/* binding */ previewImage),\n/* harmony export */   \"parseScene\": () => (/* binding */ parseScene),\n/* harmony export */   \"toggleLoading\": () => (/* binding */ toggleLoading),\n/* harmony export */   \"truncationFont\": () => (/* binding */ truncationFont),\n/* harmony export */   \"deepClone\": () => (/* binding */ deepClone),\n/* harmony export */   \"showModal\": () => (/* binding */ showModal),\n/* harmony export */   \"countDown\": () => (/* binding */ countDown),\n/* harmony export */   \"weekDay\": () => (/* binding */ weekDay),\n/* harmony export */   \"monthDay\": () => (/* binding */ monthDay),\n/* harmony export */   \"debounce\": () => (/* binding */ debounce),\n/* harmony export */   \"getUrlSearch\": () => (/* binding */ getUrlSearch)\n/* harmony export */ });\nfunction formatNumber(n) {\n    const str = n.toString();\n    return str[1] ? str : `0${str}`;\n}\n\nfunction formatTime(date = new Date(), split = '/') {\n    const year = date.getFullYear();\n    const month = date.getMonth() + 1;\n    const day = date.getDate();\n\n    const hour = date.getHours();\n    const minute = date.getMinutes();\n    const second = date.getSeconds();\n\n    const t1 = [year, month, day].map(formatNumber).join(split);\n    const t2 = [hour, minute, second].map(formatNumber).join(':');\n    const t3 = [month, day].map(formatNumber).join('-');\n    const t4 = [hour, minute].map(formatNumber).join(':');\n\n    return { ymd: t1, hms: t2, custom: `${t3} ${t4}` };\n}\n\n/**\n *\n * @param {String} url\n * @param {Object} obj\n * @returns {string}\n */\nconst setUrlQuery = function (url, obj = {}) {\n    let p = [];\n    for (let key in obj) {\n        p.push(`${key}=${obj[key]}`);\n    }\n    return `${url}?${p.join('&')}`;\n};\n\n/**\n * 页面跳转\n * @exports goTo\n * @param {String} url\n * @param {Object} [data] - query参数\n * @param {Object} params\n * @param {number} [params.type = 1] - 1 navigateTo 跳转页面 2 redirectTo 关闭当前页面跳转 3 reLaunch 关闭所有页面跳转\n * @param {'packageb'} [params.package ='packageb'] - 分包\n *\n * type 1 navigateTo 跳转页面 2 redirectTo 关闭当前页面跳转 3 reLaunch 关闭所有页面跳转，4 navigateBack\n */\nconst goTo = (url, data = {}, params = {}) => {\n    const pms = Object.assign(\n        {\n            type: 1,\n            data: {},\n        },\n        params\n    );\n    console.log(pms);\n    let fn = null;\n    switch (pms.type) {\n        case 1:\n            fn = wx.navigateTo;\n            break;\n        case 2:\n            fn = wx.redirectTo;\n            break;\n        case 3:\n            fn = wx.reLaunch;\n            break;\n        case 4:\n            wx.navigateBack({\n                delta: 1,\n            });\n            return;\n    }\n\n    let p = [];\n\n    for (let key in data) {\n        p.push(`${key}=${data[key]}`);\n    }\n\n    if (pms.package) {\n        console.log('url:', `/${pms.package}/pages/${url}/main?${p.join('&')}`);\n        console.log(fn);\n        fn({\n            url: `/${pms.package}/pages/${url}/main?${p.join('&')}`,\n        });\n        return;\n    }\n    fn({\n        url: `/pages/${url}/main?${p.join('&')}`,\n    });\n};\n\n/**\n *\n * @param {Function} wxapi  微信API  eg: wx.login\n * @param {Object} obj\n * @returns {Promise<any>}\n */\nconst wxPromise = (wxapi, obj = {}) => {\n    return new Promise((resolve, reject) => {\n        let params = {\n            success(data) {\n                resolve(data);\n            },\n            fail(data) {\n                reject(data);\n            },\n        };\n        Object.assign(params, obj);\n\n        wxapi(params);\n    });\n};\n\n/**\n * 提示框\n * @param title\n * @param {number} duration 延迟消失时间\n */\nconst showToast = function (title, duration = 1500) {\n    wx.showToast({\n        title,\n        icon: 'none',\n        duration,\n        mask: true,\n    });\n};\n\n/**\n * 提示框  promise版本\n * @param title\n * @param icon\n * @param duration\n * @param mask\n *\n */\nfunction showToastP(title, { icon = 'none', duration = 1500, mask = true } = {}) {\n    //wx.showToast({title,icon,duration,mask});\n    return wxPromise(wx.showToast, { title, icon, duration, mask }).then(() => {\n        return new Promise((resolve) => {\n            setTimeout(resolve, duration + 100);\n        });\n    });\n}\n\n/**\n *\n * @param {object} obj\n * @param {string} obj.content - 提示内容\n * @returns {Promise<any | never>}\n */\nconst showModal = function (obj) {\n    return wxPromise(wx.showModal, obj).then((res) => {\n        if (res.confirm) {\n            return Promise.resolve(res);\n        } else {\n            return Promise.reject(res);\n        }\n    });\n};\n\n/**\n * 设置本地数据\n * @exports setStorageSync\n * @param {string} key\n * @param {*} val\n */\nconst setStorageSync = function (key, val) {\n    if (!key) {\n        throw 'setStorageSync: key is null';\n    }\n    wx.setStorageSync(key, val);\n};\n\n/**\n * 获取本地数据\n * @param {String} key\n * @returns {(string | Object | number)}\n */\nconst getStorageSync = function (key) {\n    return wx.getStorageSync(key);\n};\n\n/**\n * 预览图片\n * @param {Array} urls - 图片数组\n * @param {string} current - 当前图片地址\n * @returns {Promise<any>}\n */\nconst previewImage = function (urls, current = urls[0]) {\n    return wxPromise(wx.previewImage, { urls, current });\n};\n\n/**\n * 显示隐藏 loading 菊花\n * @param {number} key - 0或1\n * @param {Object} [params = {title:'xxx',mask:'true'}]\n * @returns {Promise<any>}\n */\nconst toggleLoading = function (key, params = { mask: true }) {\n    if (key) {\n        return wxPromise(wx.showLoading, params);\n    } else {\n        return wxPromise(wx.hideLoading);\n    }\n};\n\n/**\n * 解析二维码中的 Scene\n * @param {string} _sence1 - 类似 uid@1111#channel@33333\n */\nconst parseScene = function (_sence1) {\n    //uid@1111#channel@33333\n    const sence = decodeURIComponent(_sence1);\n    const obj = {};\n    console.log('sence', sence);\n\n    if (sence.indexOf('#') !== -1) {\n        sence.split('#').forEach((item) => {\n            const a = item.split('@');\n            obj[a[0]] = a[1];\n        });\n    } else {\n        const a = sence.split('@');\n        obj[a[0]] = a[1];\n    }\n    return obj;\n};\n\n/**\n * 拼装二维码的 scene参数\n * @param {Object} obj\n * @return {string}\n */\nconst setSceneQuery = function (obj) {\n    let p = [];\n    for (let key in obj) {\n        p.push(`${key}@${obj[key]}`);\n    }\n    return p.join('#');\n};\n\n/**\n * 获取字符串长度 汉字算两个\n * @param {string} val\n * @returns {number}\n */\nconst getByteLen = (val) => {\n    let len = 0;\n    for (let i = 0; i < val.length; i++) {\n        const length = val.charCodeAt(i);\n        if (length >= 0 && length <= 128) {\n            len += 1;\n        } else {\n            len += 2;\n        }\n    }\n    return len;\n};\n\n/**\n * 截取字符串 并添加...\n * @param {string} str\n * @param {number} num\n * @param {boolean} showEllipsis - 是否显示省略号\n * @returns {*}\n */\nconst truncationFont = function (str, num, showEllipsis = true) {\n    if (!str) {\n        return str;\n    }\n\n    let s = '';\n    for (let i of str) {\n        s += i;\n        if (getByteLen(s) > (num - 2) * 2) {\n            break;\n        }\n    }\n\n    return showEllipsis ? (str !== s ? s + '...' : str) : s;\n    // return getByteLen(str) <= num * 2 ? str : showEllipsis ? str.substr(0, num) + '...' : str.substr(0, num);\n};\n\n/**\n * 深度克隆一个Object\n * @param object\n * @returns {any}\n */\nconst deepClone = function (object) {\n    return JSON.parse(JSON.stringify(object));\n};\n\n/**\n *\n * @param {Number} times 秒\n * @param {Function} callback\n * @param {Function} endCallBack\n */\n\nconst countDown = (times, callback, endCallBack = () => {}) => {\n    var timer = null;\n\n    timer = setInterval(function () {\n        var day = 0,\n            hour = 0,\n            minute = 0,\n            second = 0; //时间默认值\n        if (times > 0) {\n            day = Math.floor(times / (60 * 60 * 24));\n            hour = Math.floor(times / (60 * 60)) - day * 24;\n            minute = Math.floor(times / 60) - day * 24 * 60 - hour * 60;\n            second = Math.floor(times) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;\n        }\n        const day2hour = day * 24 + hour;\n        if (day <= 9) day = '0' + day;\n        if (hour <= 9) hour = '0' + hour;\n        if (minute <= 9) minute = '0' + minute;\n        if (second <= 9) second = '0' + second;\n\n        //console.log(times, hour, minute, second);\n        callback({ day, hour, minute, second, day2hour });\n        times--;\n        if (times <= 0) {\n            clearInterval(timer);\n            endCallBack();\n        }\n    }, 1000);\n    return timer;\n};\n\n/**\n * 格式化价格\n * @param {number} price 价格\n * @param {number} discount 折扣率 %\n * @param {number} toFix - toFix 格式化小数点后几位\n * @returns {string}\n */\nconst formatPrice = function (price, discount = 100, toFix = 2) {\n    return ((price * discount) / 10000).toFixed(toFix);\n};\n\n\n\n/**\n * 返回当天所在的一周\n * @param {string} date 日期字符串\n * @returns {Object}\n */\n\nconst weekDay = (date) => {\n    const time = new Date(date);\n    const week = time.getDay();\n    const before = new Date(date);\n    before.setDate(before.getDate() - week);\n    const after = new Date(date);\n    after.setDate(after.getDate() + (6 - week));\n    console.log(formatTime(before).ymd, formatTime(after).ymd);\n    return {\n        afterYMD: formatTime(after).ymd,\n        beforeYMD: formatTime(before).ymd,\n        after,\n        before,\n    };\n};\n\n/**\n * 返回当天所在的一周\n * @param {string} date 日期字符串\n * @returns {Object}\n */\n\nconst monthDay = (dateString) => {\n    const date = new Date(dateString);\n    const month = date.getMonth();\n    const before = new Date(date.getFullYear(), month, 1);\n\n    //tips 获取当月最大的天数 new Date(2018,12,0) 即可获取12月份最大的天数\n    const after = new Date(date.getFullYear(), month + 1, 0);\n\n    console.log(formatTime(before).ymd, formatTime(after).ymd);\n    return {\n        afterYMD: formatTime(after).ymd,\n        beforeYMD: formatTime(before).ymd,\n        after,\n        before,\n    };\n};\n\n/**\n *\n * 控制执行频率\n * @param func {Function} 要执行的方法\n * @param wait {number}  间隔时间\n * @param immediate {Boolean}  布尔值    true 间隔前执行   false 间隔后执行\n * @returns {Function}  返回要执行的方法\n */\nconst debounce = function (func, wait, immediate) {\n    let timeout, args, context, timestamp, result;\n\n    const later = function () {\n        console.log(1111, new Date().getTime(), timestamp);\n        var last = new Date().getTime() - timestamp;\n\n        if (last < wait && last >= 0) {\n            timeout = setTimeout(later, wait - last);\n        } else {\n            timeout = null;\n            if (!immediate) {\n                result = func.apply(context, args);\n                if (!timeout) context = args = null;\n            }\n        }\n    };\n\n    return function () {\n        context = this;\n        args = arguments;\n        timestamp = new Date().getTime();\n        const callNow = immediate && !timeout;\n        console.log(timeout);\n        if (!timeout) timeout = setTimeout(later, wait);\n        if (callNow) {\n            result = func.apply(context, args);\n            context = args = null;\n        }\n\n        return result;\n    };\n};\n\n/**\n * 获取自定义的URL的search参数\n * @param {string} url - 自定义的URL\n * @return {Object}\n */\nconst getUrlSearch = function (url) {\n    const href = url.split('?');\n    console.log(href, 'href', href.length, href.length === 2);\n    const obj = {};\n    if (href.length === 2) {\n        const arr = href[1].split('&');\n        for (let i = 0; i < arr.length; i++) {\n            let ar = arr[i].split('=');\n            obj[ar[0]] = ar[1];\n        }\n    }\n    return obj;\n};\n\n\n//# sourceURL=webpack://@yiper.fan/mini-program-builder/./test-src/utils/utils.js?");

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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_vue_reactivity_dist_reactivity_esm-bundler_js","vendors-node_modules_underscore_modules_index-all_js"], () => (__webpack_require__("./test-src/pages/index/main.vue")))
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
/******/ 			"pages/index/main": 1
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
/******/ 			__webpack_require__.e("vendors-node_modules_vue_reactivity_dist_reactivity_esm-bundler_js");
/******/ 			__webpack_require__.e("vendors-node_modules_underscore_modules_index-all_js");
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