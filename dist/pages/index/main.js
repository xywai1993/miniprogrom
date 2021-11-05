/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./test-src/pages/index/main.vue?template":
/*!************************************************!*\
  !*** ./test-src/pages/index/main.vue?template ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('');

/***/ }),

/***/ "./test-src/pages/index/main.vue?css":
/*!*******************************************!*\
  !*** ./test-src/pages/index/main.vue?css ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('');

/***/ }),

/***/ "./test-src/pages/index/main.vue":
/*!***************************************!*\
  !*** ./test-src/pages/index/main.vue ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_yiper_otherdemo_miniprogrom_test_src_pages_index_main_vue_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test-src/pages/index/main.vue?template */ "./test-src/pages/index/main.vue?template");
/* harmony import */ var _Users_yiper_otherdemo_miniprogrom_test_src_pages_index_main_vue_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test-src/pages/index/main.vue?css */ "./test-src/pages/index/main.vue?css");
/* harmony import */ var _vue_reactivity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vue/reactivity */ "./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js");
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! underscore */ "./node_modules/underscore/modules/index-all.js");
/* harmony import */ var _util_test__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/test */ "./test-src/util/test.js");
/* harmony import */ var _server_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../server/index.js */ "./test-src/server/index.js");

        
        
        
const app = getApp();





console.log(underscore__WEBPACK_IMPORTED_MODULE_2__.max, _util_test__WEBPACK_IMPORTED_MODULE_3__.a);

console.log('main.vue');
const data = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_5__.reactive)({
    list1: [],
    list2: [],
    page_size: 1,
    total_page: 1,
    list: [],
    title: '宝妈清单',
    bgColor: '#00000000',
});

const d = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_5__.isProxy)(data);
console.log(d);
Page({
    data: data,
    onLoad() {
        const that = this;

        // Object.keys(data).forEach((val) => {
        //     effect(() => {
        //         console.log('val', val, data[val]);
        //         that.setData({ [val]: data[val] });
        //     });
        // });

        (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_5__.effect)(() => {
            // console.log(1, data);
            that.setData(data);
        });

        (0,_server_index_js__WEBPACK_IMPORTED_MODULE_4__.GetMaterials)().then((data) => {
            // console.log(11, this.createList(data.list));

            this.createGrid(data.list);
            // this.total_page = Math.ceil(data.total / 20);
            // this.list = data.list;
        });
    },

    changeNum() {
        // data.textNum = data.textNum + 4;
        data.arr.push(10);
    },
    showMe(event) {
        console.log(2345);
        data.show = !data.show;
    },
    goType(type, id) {
        console.log(type);
        let url = '';
        switch (type) {
            case 1:
                url = 'pic-details';
                break;
            case 2:
                url = 'todo-list';
                break;
            case 3:
                url = 'video-list';
                break;
            case 4:
                url = 'audio-list';
                break;
            case 5:
                url = 'question-list';
                break;
            default:
                break;
        }
        goTo(url, { id });
    },
    confirm(e) {
        console.log(e.target.value);
        (0,_server_index_js__WEBPACK_IMPORTED_MODULE_4__.GetMaterials)('', e.target.value).then((da) => {
            this.createGrid(da.list);
            data.page_size = da.page_size;
            data.total_page = da.total_page;
        });
    },
    searchBlur(e) {
        console.log(e);
        if (!e.target.value) {
            (0,_server_index_js__WEBPACK_IMPORTED_MODULE_4__.GetMaterials)().then((data) => {
                console.log(data);
                this.createGrid(data.list);
            });
        }
    },
    createGrid(list) {
        // const _list = list.reduce((pre, current) => {
        //     return pre.concat(current);
        // }, []);
        const list1 = [];
        const list2 = [];
        list.forEach((item, index) => {
            if (index % 2 === 0) {
                list1.push(item);
            } else {
                list2.push(item);
            }
        });
        data.list1 = list1;
        data.list2 = list2;
    },
    onReachBottom() {
        if (data.page_size <= data.total_page) {
            const page = data.page_size + 1;
            console.log(data.page_size);
            (0,_server_index_js__WEBPACK_IMPORTED_MODULE_4__.GetMaterials)('', '', page).then((d) => {
                data.page_size = page;
                data.list = [...data.list, ...d.list];
                this.createGrid(data.list);
            });
        }
    },
});

        

/***/ }),

/***/ "./test-src/envList.js":
/*!*****************************!*\
  !*** ./test-src/envList.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "envList": () => (/* binding */ envList)
/* harmony export */ });
const envList = [
    {
        envId: 'development-9gsmsa374b802a58',
        alias: 'development',
    },
];


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

/***/ "./test-src/util/test.js":
/*!*******************************!*\
  !*** ./test-src/util/test.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ a),
/* harmony export */   "b": () => (/* binding */ b),
/* harmony export */   "c": () => (/* binding */ c),
/* harmony export */   "d": () => (/* binding */ d),
/* harmony export */   "e": () => (/* binding */ e),
/* harmony export */   "f": () => (/* binding */ f),
/* harmony export */   "g": () => (/* binding */ g)
/* harmony export */ });
/* harmony import */ var _envList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../envList.js */ "./test-src/envList.js");
/* harmony import */ var _test3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test3.js */ "./test-src/util/test3.js");
/* harmony import */ var _test2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./test2.js */ "./test-src/util/test2.js");



const a = _test2_js__WEBPACK_IMPORTED_MODULE_2__.add;
const b = '22';
const c = '22';
const d = '22';
const e = '22';
const f = '22';
const g = '22';
console.log(_test3_js__WEBPACK_IMPORTED_MODULE_1__.test3);
console.log(_envList_js__WEBPACK_IMPORTED_MODULE_0__.envList);
console.log('helloworld-12333');


/***/ }),

/***/ "./test-src/util/test2.js":
/*!********************************!*\
  !*** ./test-src/util/test2.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": () => (/* binding */ add)
/* harmony export */ });
const add = (a, b) => a + b;


/***/ }),

/***/ "./test-src/util/test3.js":
/*!********************************!*\
  !*** ./test-src/util/test3.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "test3": () => (/* binding */ test3)
/* harmony export */ });
const test3 = 'tes311';


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


/***/ }),

/***/ "./test-src/utils/utils.js":
/*!*********************************!*\
  !*** ./test-src/utils/utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "goTo": () => (/* binding */ goTo),
/* harmony export */   "showToastP": () => (/* binding */ showToastP),
/* harmony export */   "setSceneQuery": () => (/* binding */ setSceneQuery),
/* harmony export */   "getByteLen": () => (/* binding */ getByteLen),
/* harmony export */   "formatPrice": () => (/* binding */ formatPrice),
/* harmony export */   "formatNumber": () => (/* binding */ formatNumber),
/* harmony export */   "formatTime": () => (/* binding */ formatTime),
/* harmony export */   "wxPromise": () => (/* binding */ wxPromise),
/* harmony export */   "showToast": () => (/* binding */ showToast),
/* harmony export */   "setStorageSync": () => (/* binding */ setStorageSync),
/* harmony export */   "getStorageSync": () => (/* binding */ getStorageSync),
/* harmony export */   "setUrlQuery": () => (/* binding */ setUrlQuery),
/* harmony export */   "previewImage": () => (/* binding */ previewImage),
/* harmony export */   "parseScene": () => (/* binding */ parseScene),
/* harmony export */   "toggleLoading": () => (/* binding */ toggleLoading),
/* harmony export */   "truncationFont": () => (/* binding */ truncationFont),
/* harmony export */   "deepClone": () => (/* binding */ deepClone),
/* harmony export */   "showModal": () => (/* binding */ showModal),
/* harmony export */   "countDown": () => (/* binding */ countDown),
/* harmony export */   "weekDay": () => (/* binding */ weekDay),
/* harmony export */   "monthDay": () => (/* binding */ monthDay),
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "getUrlSearch": () => (/* binding */ getUrlSearch)
/* harmony export */ });
function formatNumber(n) {
    const str = n.toString();
    return str[1] ? str : `0${str}`;
}

function formatTime(date = new Date(), split = '/') {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const t1 = [year, month, day].map(formatNumber).join(split);
    const t2 = [hour, minute, second].map(formatNumber).join(':');
    const t3 = [month, day].map(formatNumber).join('-');
    const t4 = [hour, minute].map(formatNumber).join(':');

    return { ymd: t1, hms: t2, custom: `${t3} ${t4}` };
}

/**
 *
 * @param {String} url
 * @param {Object} obj
 * @returns {string}
 */
const setUrlQuery = function (url, obj = {}) {
    let p = [];
    for (let key in obj) {
        p.push(`${key}=${obj[key]}`);
    }
    return `${url}?${p.join('&')}`;
};

/**
 * 页面跳转
 * @exports goTo
 * @param {String} url
 * @param {Object} [data] - query参数
 * @param {Object} params
 * @param {number} [params.type = 1] - 1 navigateTo 跳转页面 2 redirectTo 关闭当前页面跳转 3 reLaunch 关闭所有页面跳转
 * @param {'packageb'} [params.package ='packageb'] - 分包
 *
 * type 1 navigateTo 跳转页面 2 redirectTo 关闭当前页面跳转 3 reLaunch 关闭所有页面跳转，4 navigateBack
 */
const goTo = (url, data = {}, params = {}) => {
    const pms = Object.assign(
        {
            type: 1,
            data: {},
        },
        params
    );
    console.log(pms);
    let fn = null;
    switch (pms.type) {
        case 1:
            fn = wx.navigateTo;
            break;
        case 2:
            fn = wx.redirectTo;
            break;
        case 3:
            fn = wx.reLaunch;
            break;
        case 4:
            wx.navigateBack({
                delta: 1,
            });
            return;
    }

    let p = [];

    for (let key in data) {
        p.push(`${key}=${data[key]}`);
    }

    if (pms.package) {
        console.log('url:', `/${pms.package}/pages/${url}/main?${p.join('&')}`);
        console.log(fn);
        fn({
            url: `/${pms.package}/pages/${url}/main?${p.join('&')}`,
        });
        return;
    }
    fn({
        url: `/pages/${url}/main?${p.join('&')}`,
    });
};

/**
 *
 * @param {Function} wxapi  微信API  eg: wx.login
 * @param {Object} obj
 * @returns {Promise<any>}
 */
const wxPromise = (wxapi, obj = {}) => {
    return new Promise((resolve, reject) => {
        let params = {
            success(data) {
                resolve(data);
            },
            fail(data) {
                reject(data);
            },
        };
        Object.assign(params, obj);

        wxapi(params);
    });
};

/**
 * 提示框
 * @param title
 * @param {number} duration 延迟消失时间
 */
const showToast = function (title, duration = 1500) {
    wx.showToast({
        title,
        icon: 'none',
        duration,
        mask: true,
    });
};

/**
 * 提示框  promise版本
 * @param title
 * @param icon
 * @param duration
 * @param mask
 *
 */
function showToastP(title, { icon = 'none', duration = 1500, mask = true } = {}) {
    //wx.showToast({title,icon,duration,mask});
    return wxPromise(wx.showToast, { title, icon, duration, mask }).then(() => {
        return new Promise((resolve) => {
            setTimeout(resolve, duration + 100);
        });
    });
}

/**
 *
 * @param {object} obj
 * @param {string} obj.content - 提示内容
 * @returns {Promise<any | never>}
 */
const showModal = function (obj) {
    return wxPromise(wx.showModal, obj).then((res) => {
        if (res.confirm) {
            return Promise.resolve(res);
        } else {
            return Promise.reject(res);
        }
    });
};

/**
 * 设置本地数据
 * @exports setStorageSync
 * @param {string} key
 * @param {*} val
 */
const setStorageSync = function (key, val) {
    if (!key) {
        throw 'setStorageSync: key is null';
    }
    wx.setStorageSync(key, val);
};

/**
 * 获取本地数据
 * @param {String} key
 * @returns {(string | Object | number)}
 */
const getStorageSync = function (key) {
    return wx.getStorageSync(key);
};

/**
 * 预览图片
 * @param {Array} urls - 图片数组
 * @param {string} current - 当前图片地址
 * @returns {Promise<any>}
 */
const previewImage = function (urls, current = urls[0]) {
    return wxPromise(wx.previewImage, { urls, current });
};

/**
 * 显示隐藏 loading 菊花
 * @param {number} key - 0或1
 * @param {Object} [params = {title:'xxx',mask:'true'}]
 * @returns {Promise<any>}
 */
const toggleLoading = function (key, params = { mask: true }) {
    if (key) {
        return wxPromise(wx.showLoading, params);
    } else {
        return wxPromise(wx.hideLoading);
    }
};

/**
 * 解析二维码中的 Scene
 * @param {string} _sence1 - 类似 uid@1111#channel@33333
 */
const parseScene = function (_sence1) {
    //uid@1111#channel@33333
    const sence = decodeURIComponent(_sence1);
    const obj = {};
    console.log('sence', sence);

    if (sence.indexOf('#') !== -1) {
        sence.split('#').forEach((item) => {
            const a = item.split('@');
            obj[a[0]] = a[1];
        });
    } else {
        const a = sence.split('@');
        obj[a[0]] = a[1];
    }
    return obj;
};

/**
 * 拼装二维码的 scene参数
 * @param {Object} obj
 * @return {string}
 */
const setSceneQuery = function (obj) {
    let p = [];
    for (let key in obj) {
        p.push(`${key}@${obj[key]}`);
    }
    return p.join('#');
};

/**
 * 获取字符串长度 汉字算两个
 * @param {string} val
 * @returns {number}
 */
const getByteLen = (val) => {
    let len = 0;
    for (let i = 0; i < val.length; i++) {
        const length = val.charCodeAt(i);
        if (length >= 0 && length <= 128) {
            len += 1;
        } else {
            len += 2;
        }
    }
    return len;
};

/**
 * 截取字符串 并添加...
 * @param {string} str
 * @param {number} num
 * @param {boolean} showEllipsis - 是否显示省略号
 * @returns {*}
 */
const truncationFont = function (str, num, showEllipsis = true) {
    if (!str) {
        return str;
    }

    let s = '';
    for (let i of str) {
        s += i;
        if (getByteLen(s) > (num - 2) * 2) {
            break;
        }
    }

    return showEllipsis ? (str !== s ? s + '...' : str) : s;
    // return getByteLen(str) <= num * 2 ? str : showEllipsis ? str.substr(0, num) + '...' : str.substr(0, num);
};

/**
 * 深度克隆一个Object
 * @param object
 * @returns {any}
 */
const deepClone = function (object) {
    return JSON.parse(JSON.stringify(object));
};

/**
 *
 * @param {Number} times 秒
 * @param {Function} callback
 * @param {Function} endCallBack
 */

const countDown = (times, callback, endCallBack = () => {}) => {
    var timer = null;

    timer = setInterval(function () {
        var day = 0,
            hour = 0,
            minute = 0,
            second = 0; //时间默认值
        if (times > 0) {
            day = Math.floor(times / (60 * 60 * 24));
            hour = Math.floor(times / (60 * 60)) - day * 24;
            minute = Math.floor(times / 60) - day * 24 * 60 - hour * 60;
            second = Math.floor(times) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
        }
        const day2hour = day * 24 + hour;
        if (day <= 9) day = '0' + day;
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;

        //console.log(times, hour, minute, second);
        callback({ day, hour, minute, second, day2hour });
        times--;
        if (times <= 0) {
            clearInterval(timer);
            endCallBack();
        }
    }, 1000);
    return timer;
};

/**
 * 格式化价格
 * @param {number} price 价格
 * @param {number} discount 折扣率 %
 * @param {number} toFix - toFix 格式化小数点后几位
 * @returns {string}
 */
const formatPrice = function (price, discount = 100, toFix = 2) {
    return ((price * discount) / 10000).toFixed(toFix);
};



/**
 * 返回当天所在的一周
 * @param {string} date 日期字符串
 * @returns {Object}
 */

const weekDay = (date) => {
    const time = new Date(date);
    const week = time.getDay();
    const before = new Date(date);
    before.setDate(before.getDate() - week);
    const after = new Date(date);
    after.setDate(after.getDate() + (6 - week));
    console.log(formatTime(before).ymd, formatTime(after).ymd);
    return {
        afterYMD: formatTime(after).ymd,
        beforeYMD: formatTime(before).ymd,
        after,
        before,
    };
};

/**
 * 返回当天所在的一周
 * @param {string} date 日期字符串
 * @returns {Object}
 */

const monthDay = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth();
    const before = new Date(date.getFullYear(), month, 1);

    //tips 获取当月最大的天数 new Date(2018,12,0) 即可获取12月份最大的天数
    const after = new Date(date.getFullYear(), month + 1, 0);

    console.log(formatTime(before).ymd, formatTime(after).ymd);
    return {
        afterYMD: formatTime(after).ymd,
        beforeYMD: formatTime(before).ymd,
        after,
        before,
    };
};

/**
 *
 * 控制执行频率
 * @param func {Function} 要执行的方法
 * @param wait {number}  间隔时间
 * @param immediate {Boolean}  布尔值    true 间隔前执行   false 间隔后执行
 * @returns {Function}  返回要执行的方法
 */
const debounce = function (func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    const later = function () {
        console.log(1111, new Date().getTime(), timestamp);
        var last = new Date().getTime() - timestamp;

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function () {
        context = this;
        args = arguments;
        timestamp = new Date().getTime();
        const callNow = immediate && !timeout;
        console.log(timeout);
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
};

/**
 * 获取自定义的URL的search参数
 * @param {string} url - 自定义的URL
 * @return {Object}
 */
const getUrlSearch = function (url) {
    const href = url.split('?');
    console.log(href, 'href', href.length, href.length === 2);
    const obj = {};
    if (href.length === 2) {
        const arr = href[1].split('&');
        for (let i = 0; i < arr.length; i++) {
            let ar = arr[i].split('=');
            obj[ar[0]] = ar[1];
        }
    }
    return obj;
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