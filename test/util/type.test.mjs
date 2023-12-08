import { describe, it } from "node:test";
import { typeUtil, typeEnum } from "../../src/util/share.mjs";
import * as assert from "assert";

describe("test the type module", () => {
    describe("test the typeUtil.getJsType function", () => {
        it("should return JsType.Null for null input", () => {
            const result = typeUtil.getJsType(null);
            assert.strictEqual(result, typeEnum.JsType.Null);
        });

        it("should return JsType.Undefined for undefined input", () => {
            const result = typeUtil.getJsType(undefined);
            assert.strictEqual(result, typeEnum.JsType.Undefined);
        });

        it("should return JsType.BigInt when typeof value is 'bigint'", () => {
            const result = typeUtil.getJsType(BigInt(10));
            assert.strictEqual(result, typeEnum.JsType.PrimitiveBigInt);
        });

        it("should return JsType.Number when typeof value is 'number'", () => {
            const result1 = typeUtil.getJsType(42);
            assert.strictEqual(result1, typeEnum.JsType.PrimitiveNumber);

            const result2 = typeUtil.getJsType(Number.MAX_VALUE);
            assert.strictEqual(result2, typeEnum.JsType.PrimitiveNumber);
        });

        it("should return JsType.Boolean when typeof value is 'boolean'", () => {
            const result1 = typeUtil.getJsType(true);
            assert.strictEqual(result1, typeEnum.JsType.PrimitiveBoolean);

            const result2 = typeUtil.getJsType(false);
            assert.strictEqual(result2, typeEnum.JsType.PrimitiveBoolean);
        });

        it("should return JsType.String when typeof value is 'string'", () => {
            const result = typeUtil.getJsType("Hello");
            assert.strictEqual(result, typeEnum.JsType.PrimitiveString);
        });

        it("should return JsType.Symbol when typeof value is 'symbol'", () => {
            const result = typeUtil.getJsType(Symbol("test"));
            assert.strictEqual(result, typeEnum.JsType.PrimitiveSymbol);
        });

        it("should return JsType.Function for normal function", () => {
            const func = () => {};
            const result = typeUtil.getJsType(func);
            assert.strictEqual(result, typeEnum.JsType.Function);
        });

        it("should return JsType.AsyncFunction for AsyncFunction", () => {
            const asyncFunc = async () => {};
            const result = typeUtil.getJsType(asyncFunc);
            assert.strictEqual(result, typeEnum.JsType.AsyncFunction);
        });

        it("should return JsType.GeneratorFunction for GeneratorFunction", () => {
            function* generatorFunc() {}

            const result = typeUtil.getJsType(generatorFunc);
            assert.strictEqual(result, typeEnum.JsType.GeneratorFunction);
        });

        it("should return JsType.Array when value is an array", () => {
            const result = typeUtil.getJsType([1, 2, 3]);
            assert.strictEqual(result, typeEnum.JsType.Array);
        });

        it("should return JsType.Int8Array for Int8Array instance", () => {
            const int8Array = new Int8Array(2);
            const result = typeUtil.getJsType(int8Array);
            assert.strictEqual(result, typeEnum.JsType.Int8Array);
        });

        it("should return JsType.Uint8Array for Uint8Array instance", () => {
            const uint8Array = new Uint8Array(2);
            const result = typeUtil.getJsType(uint8Array);
            assert.strictEqual(result, typeEnum.JsType.Uint8Array);
        });

        it("should return JsType.Uint8ClampedArray for Uint8ClampedArray instance", () => {
            const uint8ClampedArray = new Uint8ClampedArray(2);
            const result = typeUtil.getJsType(uint8ClampedArray);
            assert.strictEqual(result, typeEnum.JsType.Uint8ClampedArray);
        });

        it("should return JsType.Int16Array for Int16Array instance", () => {
            const int16Array = new Int16Array(2);
            const result = typeUtil.getJsType(int16Array);
            assert.strictEqual(result, typeEnum.JsType.Int16Array);
        });

        it("should return JsType.Uint16Array for Uint16Array instance", () => {
            const uint16Array = new Uint16Array(2);
            const result = typeUtil.getJsType(uint16Array);
            assert.strictEqual(result, typeEnum.JsType.Uint16Array);
        });

        it("should return JsType.Int32Array for Int32Array instance", () => {
            const int32Array = new Int32Array(2);
            const result = typeUtil.getJsType(int32Array);
            assert.strictEqual(result, typeEnum.JsType.Int32Array);
        });

        it("should return JsType.Uint32Array for Uint32Array instance", () => {
            const uint32Array = new Uint32Array(2);
            const result = typeUtil.getJsType(uint32Array);
            assert.strictEqual(result, typeEnum.JsType.Uint32Array);
        });

        it("should return JsType.Float32Array for Float32Array instance", () => {
            const float32Array = new Float32Array(2);
            const result = typeUtil.getJsType(float32Array);
            assert.strictEqual(result, typeEnum.JsType.Float32Array);
        });

        it("should return JsType.Float64Array for Float64Array instance", () => {
            const float64Array = new Float64Array(2);
            const result = typeUtil.getJsType(float64Array);
            assert.strictEqual(result, typeEnum.JsType.Float64Array);
        });

        it("should return JsType.BigUint64Array for BigUint64Array instance", () => {
            const bigUint64Array = new BigUint64Array(2);
            assert.strictEqual(typeUtil.getJsType(bigUint64Array), typeEnum.JsType.BigUint64Array);
        });

        it("should return JsType.Set for Set instance", () => {
            const set = new Set();
            const result = typeUtil.getJsType(set);
            assert.strictEqual(result, typeEnum.JsType.Set);
        });

        it("should return JsType.Map for Map instance", () => {
            const map = new Map();
            const result = typeUtil.getJsType(map);
            assert.strictEqual(result, typeEnum.JsType.Map);
        });

        it("should return JsType.Date for Date instance", () => {
            const date = new Date();
            const result = typeUtil.getJsType(date);
            assert.strictEqual(result, typeEnum.JsType.Date);
        });

        it("should return JsType.RegExp for RegExp instance", () => {
            const regex = new RegExp("\\d+");
            const result = typeUtil.getJsType(regex);
            assert.strictEqual(result, typeEnum.JsType.RegExp);
        });

        it("should return JsType.Promise for Promise instance", () => {
            const promise = new Promise(() => {});
            const result = typeUtil.getJsType(promise);
            assert.strictEqual(result, typeEnum.JsType.Promise);
        });

        it("should return JsType.WeakMap for WeakMap instance", () => {
            const weakMap = new WeakMap();
            const result = typeUtil.getJsType(weakMap);
            assert.strictEqual(result, typeEnum.JsType.WeakMap);
        });

        it("should return JsType.WeakSet for WeakSet instance", () => {
            const weakSet = new WeakSet();
            const result = typeUtil.getJsType(weakSet);
            assert.strictEqual(result, typeEnum.JsType.WeakSet);
        });

        it("should return JsType.Proxy for Proxy instance", () => {
            const proxy = new Proxy({}, {});
            const result = typeUtil.getJsType(proxy);
            assert.strictEqual(result, typeEnum.JsType.Object);
        });

        it("should return JsType.DataView for DataView instance", () => {
            const dataView = new DataView(new ArrayBuffer(10));
            const result = typeUtil.getJsType(dataView);
            assert.strictEqual(result, typeEnum.JsType.DataView);
        });

        it("should return JsType.ReadableStream for ReadableStream instance", () => {
            const readableStream = new ReadableStream();
            const result = typeUtil.getJsType(readableStream);
            assert.strictEqual(result, typeEnum.JsType.ReadableStream);
        });

        it("should return JsType.WritableStream for WritableStream instance", () => {
            const writableStream = new WritableStream();
            const result = typeUtil.getJsType(writableStream);
            assert.strictEqual(result, typeEnum.JsType.WritableStream);
        });

        it("should return JsType.ByteLengthQueuingStrategy for ByteLengthQueuingStrategy instance", () => {
            const byteLengthQueuingStrategy = new ByteLengthQueuingStrategy({ highWaterMark: 1024 });
            const result = typeUtil.getJsType(byteLengthQueuingStrategy);
            assert.strictEqual(result, typeEnum.JsType.ByteLengthQueuingStrategy);
        });

        it("should return JsType.CountQueuingStrategy for CountQueuingStrategy instance", () => {
            const countQueuingStrategy = new CountQueuingStrategy({ highWaterMark: 10 });
            const result = typeUtil.getJsType(countQueuingStrategy);
            assert.strictEqual(result, typeEnum.JsType.CountQueuingStrategy);
        });

        it("should return JsType.TransformStream for TransformStream instance", () => {
            const transformStream = new TransformStream();
            const result = typeUtil.getJsType(transformStream);
            assert.strictEqual(result, typeEnum.JsType.TransformStream);
        });

        it("should return JsType.TypeError for TypeError instance", () => {
            const error = new TypeError();
            const result = typeUtil.getJsType(error);
            assert.strictEqual(result, typeEnum.JsType.TypeError);
        });

        it("should return JsType.RangeError for RangeError instance", () => {
            const error = new RangeError();
            const result = typeUtil.getJsType(error);
            assert.strictEqual(result, typeEnum.JsType.RangeError);
        });

        it("should return JsType.SyntaxError for SyntaxError instance", () => {
            const error = new SyntaxError();
            const result = typeUtil.getJsType(error);
            assert.strictEqual(result, typeEnum.JsType.SyntaxError);
        });

        it("should return JsType.URIError for URIError instance", () => {
            const error = new URIError();
            const result = typeUtil.getJsType(error);
            assert.strictEqual(result, typeEnum.JsType.URIError);
        });

        it("should return JsType.ReferenceError for ReferenceError instance", () => {
            const error = new ReferenceError();
            const result = typeUtil.getJsType(error);
            assert.strictEqual(result, typeEnum.JsType.ReferenceError);
        });

        it("should return JsType.EvalError for EvalError instance", () => {
            const error = new EvalError();
            const result = typeUtil.getJsType(error);
            assert.strictEqual(result, typeEnum.JsType.EvalError);
        });
    });

    describe("test the typeUtil.dispatchByType function", () => {
        it("should call callback function for matching type", () => {
            let checkValue;
            typeUtil.dispatchByType(
                42,
                [
                    { type: typeEnum.JsType.PrimitiveNumber, callback: () => (checkValue = true) },
                    { type: typeEnum.JsType.PrimitiveString, callback: () => (checkValue = false) },
                ],
                () => (checkValue = false),
            );
            assert.equal(checkValue, true);
        });

        it("should call callback function for matching type in array", () => {
            let checkValue;
            typeUtil.dispatchByType(
                Symbol("test"),
                [
                    {
                        type: [typeEnum.JsType.PrimitiveSymbol, typeEnum.JsType.PrimitiveBigInt],
                        callback: () => (checkValue = true),
                    },
                    { type: typeEnum.JsType.PrimitiveString, callback: () => (checkValue = false) },
                ],
                () => (checkValue = false),
            );
            assert.strictEqual(checkValue, true);
        });

        it("should call otherCallback when no match is found", () => {
            let checkValue;
            typeUtil.dispatchByType(
                null,
                [{ type: typeEnum.JsType.PrimitiveNumber, callback: () => (checkValue = true) }],
                () => (checkValue = false),
            );
            assert.strictEqual(checkValue, false);
        });

        it("should not call otherCallback when no match is found and otherCallback is not provided", () => {
            let checkValue;
            typeUtil.dispatchByType(undefined, [
                { type: typeEnum.JsType.PrimitiveNumber, callback: () => (checkValue = true) },
            ]);
            assert.strictEqual(checkValue, undefined);
        });
    });
});
