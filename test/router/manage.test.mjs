import { describe, it, before, beforeEach } from "node:test";
import { routerManage } from "../../src/router/share.mjs";
import * as assert from "assert";
import { matchPath } from "../../src/router/manage.mjs";

describe("test the routerManage module", () => {
  describe("test the create method", () => {
    it("should succeed when using default parameters", function () {
      const routerManageData = routerManage.create();
      assert.equal(routerManageData.dynamicSeparator, undefined);
      assert.equal(routerManageData.ruleSeparator, undefined);
      assert.deepEqual(routerManageData.firstLetterRules, []);
      assert.deepEqual(routerManageData.dynamicRules, []);
    });
    it("should throw a TypeError when the parameter value of ruleSeparator is an invalid value", function () {
      assert.throws(() => routerManage.create(2), new TypeError("Input value must be a string type, received number"));
    });
    it("should throw a TypeError when the parameter value of dynamicSeparator is an invalid value", function () {
      assert.throws(
        () => routerManage.create(undefined, 2),
        new TypeError("Input value must be a string type, received number"),
      );
    });
  });

  describe("test the create method", () => {
    let context = { routerManageData: null };
    beforeEach(() => {
      context.routerManageData = routerManage.create("/", ":");
    });
    it("should succeed when the parameter value of route is 'get/a/b'", function () {
      routerManage.addRule(context.routerManageData, "get/a/b", () => {});
      assert.equal(context.routerManageData.firstLetterRules.length, 1);
      assert.equal(context.routerManageData.dynamicRules.length, 0);
    });
    it("should succeed when the parameter value of route is 'get/a/:b'", function () {
      routerManage.addRule(context.routerManageData, "get/a/:b", () => {});
      assert.equal(context.routerManageData.firstLetterRules.length, 0);
      assert.equal(context.routerManageData.dynamicRules.length, 1);
    });
    it("should throw a TypeError when the parameter value of ruleSeparator is an invalid value", function () {
      assert.throws(() => routerManage.create(2), new TypeError("Input value must be a string type, received number"));
    });
    it("should throw a TypeError when the parameter value of dynamicSeparator is an invalid value", function () {
      assert.throws(
        () => routerManage.create(undefined, 2),
        new TypeError("Input value must be a string type, received number"),
      );
    });
  });
});
