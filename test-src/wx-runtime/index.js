const wxEventName = new Set(['onLoad', 'onShow', 'onHide']);

export function CreatePage(params) {
    // const data = Object.assign({}, params);

    let uiThis = null;

    const pageData = new Proxy(params.data, {
        set(target, p, value) {
            console.log('pageData-set', p);
            uiThis.setData({ [p]: value });
            return Reflect.set(target, p, value);
        },
        get(target, p) {
            console.log('pageData-get', p);

            if (target.hasOwnProperty(p)) {
                return Reflect.get(target, p);
            } else if (params.hasOwnProperty(p)) {
                return Reflect.get(params, p, pageData);
            } else {
                return Reflect.get(uiThis, p, pageData);
            }
        },
    });

    const p = new Proxy(params, {
        get: function (obj, prop) {
            // console.log(typeof obj[prop], prop);
            if (prop === 'onLoad') {
                return function (e) {
                    uiThis = this;
                    obj[prop].call(pageData, e);
                };
            }

            if (typeof obj[prop] === 'function') {
                return function (e) {
                    // console.log('proxy', prop, ...arguments);
                    if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.eventParams && String(e.currentTarget.dataset.eventParams)) {
                        const ps = String(e.currentTarget.dataset.eventParams).split(',');
                        console.log('执行这个？？？？');
                        obj[prop].call(pageData, ...ps, ...arguments);
                        // obj[prop](...ps, e);
                    } else {
                        console.log('执行这个');
                        obj[prop].call(pageData, ...arguments);
                    }
                };
            }
            // return obj[prop];
            return Reflect.get(obj, prop);
        },
        set(target, p, value) {
            console.log({ p });
            Reflect.set(target, p, value);
            return true;
        },
    });
    return Page(p);
}

// 详细方法见文档 https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html
const wxComponentFuncName = [
    'setData',
    'hasBehavior',
    'triggerEvent',
    'createSelectorQuery',
    'createIntersectionObserver',
    'createMediaQueryObserver',
    'selectComponent',
];
export function CreateComponent(params) {
    let uiThis = null;

    if (!params.ready) {
        params.ready = function () {};
    }

    const comData = new Proxy(params.data, {
        set(target, p, value) {
            console.log('ComponentData-set', p);

            if (params.data.hasOwnProperty(p)) {
                uiThis.setData({ [p]: value });
            }

            return Reflect.set(target, p, value);
        },
        get(target, p) {
            console.log('ComponentData-get', p);

            // 系统方法原样返回 详细方法见文档 https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html
            if (wxComponentFuncName.indexOf(p) !== -1) {
                // return Reflect.get(uiThis, p, uiThis);
                // console.log(uiThis.setData);
                // return false;
                return uiThis[p].bind(uiThis);
            }
            if (target.hasOwnProperty(p)) {
                return Reflect.get(target, p);
            } else if (params.methods.hasOwnProperty(p)) {
                // 查找是否是methods
                return Reflect.get(comMethod, p, comData);
            } else if (params.properties.hasOwnProperty(p)) {
                //    查找是否是 properties
                // Reflect.get(params.properties, p, comData)
                return Reflect.get(uiThis.properties, p, comData);
            } else {
                // 保底 系统方法属性原样返回
                return Reflect.get(uiThis, p, uiThis);
            }

            // return Reflect.get(target, p);
        },
    });

    const comMethod = new Proxy(params.methods, {
        get(target, p) {
            console.log('ComponentMethods-get', p);

            if (p === 'hasOwnProperty') {
                return Reflect.get(target, p);
            }

            return function (e) {
                if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.eventParams && String(e.currentTarget.dataset.eventParams)) {
                    const ps = String(e.currentTarget.dataset.eventParams).split(',');
                    target[p].call(comData, ...ps, ...arguments);
                } else {
                    target[p].call(comData, ...arguments);
                }
            };
            // return Reflect.get(target, p);
        },
    });

    const p = new Proxy(params, {
        get: function (obj, prop) {
            console.log('Components', typeof obj[prop], prop);
            if (prop === 'ready') {
                return function (e) {
                    uiThis = this;
                    obj[prop].call(comData, e);
                };
            }
            return Reflect.get(obj, prop);
        },
    });

    p.methods = comMethod;
    p.data = comData;
    return Component(p);
}
