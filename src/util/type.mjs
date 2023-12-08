/**
 * @enum {number}
 */
const JsType = {
    Null: 1,
    Undefined: 2,
    PrimitiveString: 10,
    PrimitiveNumber: 11,
    PrimitiveBoolean: 12,
    PrimitiveBigInt: 13,
    PrimitiveSymbol: 14,

    Function: 100,
    AsyncFunction: 101,
    GeneratorFunction: 102,

    Object: 1000,
    Set: 1002,
    Map: 1003,
    Date: 1004,
    RegExp: 1005,
    Promise: 1006,
    WeakMap: 1007,
    WeakSet: 1008,
    DataView: 1010,
    ReadableStream: 1011,
    WritableStream: 1012,
    ByteLengthQueuingStrategy: 1013,
    CountQueuingStrategy: 1014,
    TransformStream: 1015,

    Error: 1100,
    TypeError: 1101,
    RangeError: 1102,
    SyntaxError: 1103,
    URIError: 1104,
    ReferenceError: 1105,
    EvalError: 1106,
    AggregateError: 1107,

    Buffer: 1200,
    ArrayBuffer: 1201,
    SharedArrayBuffer: 1202,

    String: 1300,
    Number: 1301,
    Boolean: 1302,
    BigInt: 1303,
    Symbol: 1304,

    Array: 2000,

    Int8Array: 2001,
    Uint8Array: 2002,
    Uint8ClampedArray: 2003,
    Int16Array: 2004,
    Uint16Array: 2005,
    Int32Array: 2006,
    Uint32Array: 2007,
    Float32Array: 2008,
    Float64Array: 2009,
    BigInt64Array: 2010,
    BigUint64Array: 2011,
};
const JsTypeMap = new Map([
    [Object.prototype, JsType.Object],
    [Set.prototype, JsType.Set],
    [Map.prototype, JsType.Map],
    [Date.prototype, JsType.Date],
    [RegExp.prototype, JsType.RegExp],
    [Promise.prototype, JsType.Promise],
    [WeakMap.prototype, JsType.WeakMap],
    [WeakSet.prototype, JsType.WeakSet],
    [DataView.prototype, JsType.DataView],
    [ReadableStream.prototype, JsType.ReadableStream],
    [WritableStream.prototype, JsType.WritableStream],
    [ByteLengthQueuingStrategy.prototype, JsType.ByteLengthQueuingStrategy],
    [CountQueuingStrategy.prototype, JsType.CountQueuingStrategy],
    [TransformStream.prototype, JsType.TransformStream],
    [Error.prototype, JsType.Error],
    [TypeError.prototype, JsType.TypeError],
    [RangeError.prototype, JsType.RangeError],
    [SyntaxError.prototype, JsType.SyntaxError],
    [URIError.prototype, JsType.URIError],
    [ReferenceError.prototype, JsType.ReferenceError],
    [EvalError.prototype, JsType.EvalError],
    [AggregateError.prototype, JsType.AggregateError],
    [Buffer.prototype, JsType.Buffer],
    [ArrayBuffer.prototype, JsType.ArrayBuffer],
    [SharedArrayBuffer.prototype, JsType.SharedArrayBuffer],
    [String.prototype, JsType.String],
    [Number.prototype, JsType.Number],
    [Boolean.prototype, JsType.Boolean],
    [BigInt.prototype, JsType.BigInt],
    [Symbol.prototype, JsType.Symbol],
]);

/**
 * Checks if a value is a number.
 *
 * @param {*} [value] - The value to check.
 * @throws {TypeError} If the input value is not a number type.
 */
function assertNumber(value) {
    if (typeof value !== "number") {
        throw new TypeError(`Input value must be a number type, received ${typeof value}`);
    }
}

/**
 * Checks if a value is an array.
 *
 * @param {*} [value] - The value to check.
 * @throws {TypeError} If the input value is not an array type.
 */
function assertArray(value) {
    if (!Array.isArray(value)) {
        throw new TypeError(`Input value must be an array type, received ${typeof value}`);
    }
}

/**
 * Checks if a value is an object.
 *
 * @param {*} [value] - The value to check.
 * @throws {TypeError} If the input value is not an object type.
 */
function assertObject(value) {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
        throw new TypeError(`Input value must be an object type, received ${typeof value}`);
    }
}

/**
 * Checks if a value is a boolean.
 *
 * @param {*} [value] - The value to check.
 * @throws {TypeError} If the input value is not a boolean type.
 */
function assertBoolean(value) {
    if (typeof value !== "boolean") {
        throw new TypeError(`Input value must be a boolean type, received ${typeof value}`);
    }
}

/**
 * Checks if a value is a string.
 *
 * @param {*} [value] - The value to check.
 * @throws {TypeError} If the input value is not a string type.
 */
function assertString(value) {
    if (typeof value !== "string") {
        throw new TypeError(`Input value must be a string type, received ${typeof value}`);
    }
}

function getPrototypes(prototype) {
    const prototypes = [];
    while (true) {
        prototype = Object.getPrototypeOf(prototype);
        prototypes.push(prototype);
        if (prototype === Object.prototype) {
            break;
        }
    }
    return prototypes;
}

/**
 *
 * @param {*} value
 * @return {JsType}
 */
function getJsType(value) {
    if (value === null) {
        return JsType.Null;
    }
    if (value === undefined) {
        return JsType.Undefined;
    }
    switch (typeof value) {
        case "bigint":
            return JsType.PrimitiveBigInt;
        case "number":
            return JsType.PrimitiveNumber;
        case "boolean":
            return JsType.PrimitiveBoolean;
        case "string":
            return JsType.PrimitiveString;
        case "symbol":
            return JsType.PrimitiveSymbol;
        case "function":
            if (value.constructor.name === "AsyncFunction") {
                return JsType.AsyncFunction;
            }
            if (value.constructor.name === "GeneratorFunction") {
                return JsType.GeneratorFunction;
            }
            return JsType.Function;
    }
    if (Array.isArray(value)) {
        return JsType.Array;
    }
    if (value instanceof Int8Array) {
        return JsType.Int8Array;
    }
    if (value instanceof Uint8Array) {
        return JsType.Uint8Array;
    }
    if (value instanceof Uint8ClampedArray) {
        return JsType.Uint8ClampedArray;
    }
    if (value instanceof Int16Array) {
        return JsType.Int16Array;
    }
    if (value instanceof Uint16Array) {
        return JsType.Uint16Array;
    }
    if (value instanceof Int32Array) {
        return JsType.Int32Array;
    }
    if (value instanceof Uint32Array) {
        return JsType.Uint32Array;
    }
    if (value instanceof Float32Array) {
        return JsType.Float32Array;
    }
    if (value instanceof Float64Array) {
        return JsType.Float64Array;
    }
    if (value instanceof BigInt64Array) {
        return JsType.BigInt64Array;
    }
    if (value instanceof BigUint64Array) {
        return JsType.BigUint64Array;
    }
    const prototypes = getPrototypes(value);
    for (const prototype of prototypes) {
        const value = JsTypeMap.get(prototype);
        if (value) {
            return value;
        }
    }

    return JsType.Object;
}
/**
 *
 * @param {*} value
 * @param {Array<{type: Array<JsType> | JsType, callback: function}>} rules
 * @param {function} [otherCallback]
 */
function dispatchByType(value, rules, otherCallback) {
    let isMatch = false;
    const jsType = getJsType(value);
    for (let rule of rules) {
        if (jsType === rule.type) {
            isMatch = true;
            rule.callback(jsType);
        }
        if (Array.isArray(rule.type) && rule.type.includes(jsType)) {
            isMatch = true;
            rule.callback(jsType);
        }
    }
    if (!isMatch && otherCallback) {
        otherCallback(jsType);
    }
}
export { assertString, assertNumber, assertObject, assertBoolean, assertArray, getJsType, JsType, dispatchByType };
