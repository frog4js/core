/**
 *
 * @callback MiddlewareCallback
 * @param {ContextManage} contextManageData
 */

/**
 *
 * @typedef {{callback: function, index: number, tags: Array<string>}} Middleware
 * @typedef {{middles: Array<Middleware>}} MiddlewareManage
 */

/**
 *
 * @return {MiddlewareManage}
 */
function create() {
    return {
        middles: [],
    };
}

/**
 *
 * @param {MiddlewareManage} manage
 * @param {MiddlewareCallback} callback
 * @param {number} index
 * @param {Array<string>} [tags]
 */
function addMiddle(manage, callback, index, tags) {
    manage.middles.push({
        callback: callback,
        index: index,
        tags: tags || [],
    });
}

/**
 *
 * @param {MiddlewareManage} manage
 */
function resortMiddles(manage) {
    manage.middles.sort((middle1, middle2) => {
        return middle1.index - middle2.index;
    });
}
/**
 *
 * @param {MiddlewareManage} manage
 * @param {Array<*>} args
 */
async function execMiddles(manage, args) {
    for (const middle of manage.middles) {
        await middle.callback(...args);
    }
}
/**
 *
 * @param {MiddlewareManage} manage
 * @param {MiddlewareManage} manage1
 */
async function mergeMiddles(manage, manage1) {
    manage.middles.push(...manage1.middles);
}

export { create, addMiddle, execMiddles, resortMiddles, mergeMiddles };
