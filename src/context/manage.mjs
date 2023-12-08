import { randomUtil } from "../util/share.mjs";

/**
 * @typedef {Map<string, {isReadOnly: boolean, value: *}>} ContextDataMap
 * @typedef {{id: string, innerData: ContextDataMap, customizationData: ContextDataMap}} ContextManage
 */
const typeEnum = {
    inner: 1,
    customization: 1,
};

/**
 *
 * @return {ContextManage}
 */
function create() {
    return {
        id: randomUtil.getUUID(),
        innerData: new Map(),
        customizationData: new Map(),
    };
}

/**
 *
 * @param {ContextManage} manage
 * @param {string} key
 * @param {*} value
 * @param {boolean} isReadonly
 * @return {boolean}
 */
function setInnerData(manage, key, value, isReadonly = false) {
    return setData(manage, typeEnum.inner, key, value, isReadonly);
}
/**
 *
 * @param {ContextManage} manage
 * @param {string} key
 * @param {*} value
 * @param {boolean} isReadonly
 * @return {boolean}
 */
function setCustomizationData(manage, key, value, isReadonly = false) {
    return setData(manage, typeEnum.customization, key, value, isReadonly);
}
/**
 *
 * @param {ContextManage} manage
 * @param {string} key
 * @return {* | undefined}
 */
function getInnerData(manage, key) {
    return getData(manage, typeEnum.inner, key);
}
/**
 *
 * @param {ContextManage} manage
 * @param {string} key
 * @return {* | undefined}
 */
function getCustomizationData(manage, key) {
    return getData(manage, typeEnum.customization, key);
}

export { create, setInnerData, setCustomizationData, getInnerData, getCustomizationData };

/**
 *
 * @param {ContextManage}manage
 * @param {number} type
 * @return {ContextDataMap}
 */
function getDataByType(manage, type) {
    let dataMap;
    switch (type) {
        case typeEnum.inner:
            dataMap = manage.innerData;
            break;
        case typeEnum.customization:
            dataMap = manage.customizationData;
            break;
        default:
            throw new Error("type is error value");
    }
    return dataMap;
}
/**
 *
 * @param {ContextManage}manage
 * @param {number} type
 * @param {string} key
 * @param {*} value
 * @param {boolean} isReadonly
 * @return {boolean}
 */
function setData(manage, type, key, value, isReadonly) {
    const dataMap = getDataByType(manage, type);
    const mapValue = dataMap.get(key);
    if (!mapValue) {
        dataMap.set(key, {
            value: value,
            isReadOnly: isReadonly,
        });
        return true;
    }
    if (mapValue.isReadOnly) {
        return false;
    }
    mapValue.value = value;
    mapValue.isReadOnly = isReadonly;
    return true;
}

/**
 *
 * @param {ContextManage}manage
 * @param {number} type
 * @param {string} key
 * @return {* | undefined}
 */
function getData(manage, type, key) {
    const dataMap = getDataByType(manage, type);
    const mapValue = dataMap.get(key);
    if (!mapValue) {
        return;
    }
    return mapValue.value;
}
