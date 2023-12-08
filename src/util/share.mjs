import {
    assertObject,
    assertBoolean,
    assertArray,
    assertString,
    assertNumber,
    getJsType,
    JsType,
    dispatchByType,
} from "./type.mjs";
import {
    getPseudoRandomNumber,
    getTrueRandomNumber,
    getTrueRandomString,
    getPseudoRandomString,
    getUUID,
} from "./random.mjs";
import { getCurrentTimeSeconds, getCurrentTimeMilliseconds } from "./date.mjs";

export const typeUtil = {
    assertObject,
    assertBoolean,
    assertArray,
    assertString,
    assertNumber,
    getJsType,
    dispatchByType,
};
export const typeEnum = { JsType };

export const randomUtil = {
    getPseudoRandomNumber,
    getTrueRandomNumber,
    getTrueRandomString,
    getPseudoRandomString,
    getUUID,
};
export const dateUtil = {
    getCurrentTimeSeconds,
    getCurrentTimeMilliseconds,
};
