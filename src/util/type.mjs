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
  // routerManage.create()
  if (typeof value !== "string") {
    throw new TypeError(`Input value must be a string type, received ${typeof value}`);
  }
}
export { assertString, assertNumber, assertObject, assertBoolean, assertArray };
