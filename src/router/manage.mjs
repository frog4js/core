import { typeUtil } from "../util/share.mjs";
/**
 *
 * @typedef {{origin: string, callback: function, split: Array<string>}} RouterRule
 * @typedef {{firstLetter: string, routes: Array<RouterRule> }} FirstLetterRule
 * @typedef {{firstLetterRules: Array<FirstLetterRule>, dynamicRules: Array<RouterRule & {firstLetter: string}>, routeSeparator?: string, dynamicSeparator?: string}} RouterManage
 */

/**
 *
 * @param {RouterManage} manage
 * @param {string} route
 */
function getIsDynamicRule(manage, route) {
    return manage.dynamicSeparator && route.indexOf(manage.routeSeparator + manage.dynamicSeparator) !== -1;
}

/**
 *
 * @param {RouterManage} manage
 * @param {Array<string>} split
 */
function getFirstLetter(manage, split) {
    return manage.dynamicSeparator
        ? split
              .map((str) => {
                  if (str.charAt(0) === manage.dynamicSeparator) {
                      return String.fromCharCode(0x10ffff - 1);
                  } else {
                      return str.charAt(0);
                  }
              })
              .join("")
        : split.map((str) => str.charAt(0)).join("");
}

/**
 * @param {RouterManage} manage
 * @param {string} route
 * @return {Array<string>}
 */
function splitRule(manage, route) {
    return manage.routeSeparator ? route.split(manage.routeSeparator) : [route];
}

/**
 *
 * @param {string} str1
 * @param {string} str2
 */
function compareStrings(str1, str2) {
    for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
        const char1 = str1.charCodeAt(i);
        const char2 = str2.charCodeAt(i);
        if (char1 !== char2) {
            return char1 - char2;
        }
    }
    return str1.length - str2.length;
}

/**
 *
 * @param {RouterRule} routerRule
 * @param {RouterManage} manage
 * @param {Array<string>} splitPath
 */
function equalRouter(manage, routerRule, splitPath) {
    if (routerRule.split.length !== splitPath.length) {
        return false;
    }
    let i = -1;
    for (const item of splitPath) {
        i++;
        if (manage.dynamicSeparator && routerRule.split[i].charAt(0) === manage.dynamicSeparator) {
            continue;
        }
        if (routerRule.split[i] !== item) {
            return false;
        }
    }
    return true;
}

/**
 *
 * @param {RouterManage} manage
 * @param {Array<string>} splitPath
 * @param {string} firstLetterSplit
 * @return {RouterRule | undefined}
 */
function binarySearch(manage, splitPath, firstLetterSplit) {
    let left = 0;
    let right = manage.firstLetterRules.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        const compare = compareStrings(manage.firstLetterRules[mid].firstLetter, firstLetterSplit);
        if (compare === 0) {
            for (const routerRule of manage.firstLetterRules[mid].routes) {
                if (equalRouter(manage, routerRule, splitPath)) {
                    return routerRule;
                }
            }
            return;
        } else if (compare < 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
}

/**
 * @param {string} [routeSeparator]
 * @param {string} [dynamicSeparator]
 * @throws {TypeError}
 * @returns {RouterManage}
 */
function create(routeSeparator, dynamicSeparator) {
    routeSeparator ? typeUtil.assertString(routeSeparator) : (routeSeparator = undefined);
    dynamicSeparator ? typeUtil.assertString(dynamicSeparator) : (dynamicSeparator = undefined);
    return {
        routeSeparator: routeSeparator,
        dynamicSeparator: dynamicSeparator,
        firstLetterRules: [],
        dynamicRules: [],
    };
}

/**
 *
 * @param {RouterManage} manage
 * @param {string} route
 * @param {callback} callback
 */
function addRule(manage, route, callback) {
    const split = splitRule(manage, route);
    const isDynamicRule = getIsDynamicRule(manage, route);
    const firstLetter = getFirstLetter(manage, split);
    const routerRule = {
        origin: route,
        split: split,
        callback: callback,
    };
    if (isDynamicRule) {
        routerRule.firstLetter = firstLetter;
        if (manage.dynamicRules.find((item) => item.origin === route)) {
            throw new Error("route is exists");
        }
        manage.dynamicRules.push(routerRule);
    } else {
        const cur = manage.firstLetterRules.find((item) => item.firstLetter === firstLetter);
        if (cur && cur.routes.find((item) => item.origin === route)) {
            throw new Error("route is exists");
        } else if (cur) {
            cur.routes.push(routerRule);
        } else {
            manage.firstLetterRules.push({
                firstLetter: firstLetter,
                routes: [routerRule],
            });
        }
    }
}

/**
 *
 * @param {RouterManage} manage
 * @param {string} route
 */
function removeRule(manage, route) {
    const firstLetter = getFirstLetter(manage, splitRule(manage, route));
    let findIndex = -1;
    const cur = manage.firstLetterRules.find((item) => item.firstLetter === firstLetter);
    findIndex = cur.routes.findIndex((item) => item.origin === route);

    if (findIndex !== -1) {
        cur.slice(findIndex, 1);
        return;
    }
    findIndex = manage.dynamicRules.find((item) => item.origin === route);
    if (findIndex !== -1) {
        manage.dynamicRules.slice(findIndex, 1);
    }
}

/**
 *
 * @param {RouterManage} manage
 */
function resortRules(manage) {
    manage.firstLetterRules.sort((router1, router2) => compareStrings(router1.firstLetter, router2.firstLetter));
    manage.dynamicRules.sort((router1, router2) => compareStrings(router1.firstLetter, router2.firstLetter));
}

/**
 *
 * @param {RouterManage} manage
 * @param {string} path
 * @return {{callback: function, route: string} | undefined}
 */
function matchPath(manage, path) {
    const splitPath = splitRule(manage, path);
    const firstLetterSplit = splitPath.map((str) => str.charAt(0)).join("");
    const routerRule = binarySearch(manage, splitPath, firstLetterSplit);
    if (routerRule) {
        return { callback: routerRule.callback, route: routerRule.origin };
    }
    for (const routerRule of manage.dynamicRules) {
        if (equalRouter(manage, routerRule, splitPath)) {
            return { callback: routerRule.callback, route: routerRule.origin };
        }
    }
}

export { create, addRule, removeRule, resortRules, matchPath };
