/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./test-src/components/list-tag/main.vue?template":
/*!********************************************************!*\
  !*** ./test-src/components/list-tag/main.vue?template ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('');

/***/ }),

/***/ "./test-src/components/list-tag/main.vue?css":
/*!***************************************************!*\
  !*** ./test-src/components/list-tag/main.vue?css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('');

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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************************!*\
  !*** ./test-src/components/list-tag/main.vue ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_yiper_otherdemo_miniprogrom_test_src_components_list_tag_main_vue_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test-src/components/list-tag/main.vue?template */ "./test-src/components/list-tag/main.vue?template");
/* harmony import */ var _Users_yiper_otherdemo_miniprogrom_test_src_components_list_tag_main_vue_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test-src/components/list-tag/main.vue?css */ "./test-src/components/list-tag/main.vue?css");

        
        
        
Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        tagData: {
            type: Object,
            value: {
                material_id: 1,
                title: 'nihao',
                type: 1,
                cover: '',
                like_count: 0,
                category_ids: [],
                author: { nickname: '11', avatar: '22' },
            },
            observer: function (newVal, oldVal) {
                // 属性值变化时执行
            },
        },
    },
    data: {
        // 这里是一些组件内部数据
        someData: {},
    },
    methods: {
        // 这里是一个自定义方法
        customMethod: function () {
            console.log(112233);
        },
    },
    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function () {},
        moved: function () {},
        detached: function () {},
    },
});

// export default {
//     props: {
//         tagData: {
//             type: Object,
//             default: () => {
//                 return {
//                     material_id: 1,
//                     title: '',
//                     type: 1,
//                     cover: '',
//                     like_count: 0,
//                     category_ids: [],
//                     author: { nickname: '', avatar: '' },
//                 };
//             },
//         },
//     },
//     data() {
//         let tag = '';

//         switch (Number(this.tagData.type)) {
//             case 1:
//                 tag = 'tuwen';
//                 break;
//             case 2:
//                 tag = 'tiaomu';
//                 break;
//             case 3:
//                 tag = 'shiping';
//                 break;
//             case 4:
//                 tag = 'yinping';
//                 break;
//             case 5:
//                 tag = 'dati';
//                 break;
//         }
//         return {
//             tag: tag,
//         };
//     },
//     computed: {},
//     methods: {},
// };

        
})();

/******/ })()
;