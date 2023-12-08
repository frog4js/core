/**
 * @template T
 */
export class Optional {
    /**
     * @type {T}
     */
    value;
    static empty() {
        return new Optional(null);
    }

    /**
     *
     * @param {T} value
     */
    static of(value) {
        if (value === null || value === undefined) {
            throw new Error("value is null or undefined");
        }
        return new Optional(value);
    }

    /**
     *
     * @param {T} value
     */
    static ofNullable(value) {
        return new Optional(value);
    }

    /**
     * @param {T} value
     */
    constructor(value) {
        /**
         * @type {T}
         */
        this.value = value;
    }

    isPresent() {
        return this.value !== null && this.value !== undefined;
    }
}
