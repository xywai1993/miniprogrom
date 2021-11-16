const wxEventName = new Set(...['onLoad', 'onShow', 'onHide']);
export function CreatePage(params) {
    const data = Object.assign({}, params, params.data);
    let uiThis = null;

    const p = new Proxy(data, {
        get: function (obj, prop) {
            console.log(typeof obj[prop], prop);
            if (prop === 'onLoad') {
                uiThis = this;
            }

            if (typeof prop === 'function' && !wxEventName.has(prop)) {
                return function (e) {
                    if (e.currentTarget.dataset.eventParams) {
                        const ps = e.currentTarget.dataset.eventParams.split(',');
                        obj[prop].call(this, ...ps, e);
                    } else {
                        obj[prop].call(this, e);
                    }
                };
            }
            return obj[prop];
        },
        set: function (obj, prop, value) {
            console.log({ obj, prop, value });

            obj[prop] = value;
            return true;
        },
    });
    return Page(p);
}
