// [version, graph, lastIndex, type ]

/**
 * {
 *    a: 1,
 *    b: [
 *    {
 *        a: 1, b: 2, c: 5
 *    },
 *     {
 *        a: 3, b: 4, d: 6
 *    },
 *    2,
 *    [1,2]
 *    ],
 *    c: [1,2]
 * }  => {a: 1 , b: {"a": [1,3,"", ""], "b": [2, 4, "", ""], "$.2": 2, "$.3": {"$.0": 1, "$.1": 2}, "c": {"$.0": 1, "$.1": 2} }  }
 * [1, 2, 3] => {"$.0": 1, "$.1": 2, "$.2": 3 }
 *  [
 *  {a: 1, b: [{a: 1, b: 2}, {a: 3, b: 4}] },
 *  {a: 2, b: [{a: 1, b: 2}, {a: 3, b: 4}] },
 *  {a: 3, b: 3}
 *  ]
 *
 *  ===========================
 *  {a: 1, b: 2} => {type: Object, index: {a: {type: number,index: 1 }, b: {type: number,index: 2 }}   }
 *  [{a: 1, b: 2}] => {type: Array, index: {a: {type: number,index: 1 }, b: {type: number,index: 2 }}  }
 *  [1,2] => {type: Array, index: {"$.0": {type: number,index: 1 }, "$.1": {type: number,index: 2 }}   }
 *  [1, {a: 1, b: 2}, 2, {a: 3, b: 4}] => {type: Array, index: {"$.0": {type: number,index: 1 }, "$.2": {type: number,index: 2 }},  a: {type: "arrayP", index: [1, 3] }, b: {type: "arrayP", index: [2, 4] } }
 *
 */

const defaultLen = 10;
/**
 * 创建lmu data
 * @return {Array}  data    数据体
 */
function create() {
  const data = new Array(defaultLen);
  data[0] = 1;
  data[1] = new Map();
  data[2] = [defaultLen];
  return data;
}

function getVersion(data) {
  const version = data[0];
  if (version !== 1) {
    throw new Error("lmu data 'version' value error, must be eq 1");
  }
  return version;
}

/**
 *
 * @param {array}   data
 * @return {Map<string, any>}
 */
function getKeyMap(data) {
  if (!(data[1] instanceof Map)) {
    throw new Error("lmu data 'keyMap' type error,must be an Map");
  }
  return data[1];
}

/**
 * @param {array}   data
 * @return {number}
 */
function getAndSetNextIndex(data) {
  if (!(data[2] instanceof Array)) {
    throw new Error("lmu data 'lastIndex' type error,must be an Array");
  }
  const indexes = data[2];
  if (indexes.length === 1) {
    const index = indexes[0];
    indexes[0]++;
    return index;
  } else {
    return indexes.pop();
  }
}

/**
 *
 * @param {array}   data
 */
function checkData(data) {
  if (!(data instanceof Array)) {
    throw new Error("lmu data type error,must be an Array");
  }
  getVersion(data);
}

/**
 * 根据key获取对应的值
 * @param {Array}   data
 * @param {string}  key
 * @return {undefined | any}
 */
function get(data, key) {
  checkData(data);
  const keyMap = getKeyMap(data);
  const valueIndex = keyMap.get(key);
  if (valueIndex === undefined) {
    return undefined;
  }
  return data[valueIndex];
}

/**
 * 根据key获取对应的值
 * @param {Array}   data
 * @param {string}  key
 * @param {any}  value
 * @return {any}
 */
function set(data, key, value) {
  checkData(data);
  const keyMap = getKeyMap(data);
  const valueIndex = keyMap.get(key);
  if (valueIndex === undefined) {
    const index = getAndSetNextIndex(data);
    data[index] = value;
    keyMap.set(key, index);
    return undefined;
  } else {
    const oldValue = data[valueIndex];
    data[valueIndex] = value;
    return oldValue;
  }
}

/**
 *
 * @param {Array}   data
 * @param {string}  key
 * @param {string}  funcName
 * @param {Array}   args
 * @returns {any}
 */
function getAndCall(data, key, funcName, args) {
  checkData(data);
  const keyMap = getKeyMap(data);
  const valueIndex = keyMap.get(key);
  if (valueIndex === undefined) {
    throw new Error(`key=${key} is not exists`);
  }
  const execFunction = data[valueIndex]?.[funcName];
  if (typeof execFunction !== "function") {
    throw new Error(`funcName=${funcName} is not exists`);
  }
  return data[valueIndex]?.[funcName](...args);
}

function has(data, key) {
  checkData(data);
  const keyMap = getKeyMap(data);
  return keyMap.has(key);
}

function toString(data) {}

export { create, get, set, has, getAndCall };
