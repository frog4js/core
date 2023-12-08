import { describe, it, beforeEach } from "node:test";
import { routerManage } from "../../src/router/share.mjs";
import * as assert from "assert";

describe("test the routerManage module", () => {
    describe("test the create function", () => {
        it("should succeed when using default parameters", () => {
            const routerManageData = routerManage.create();
            assert.equal(routerManageData.dynamicSeparator, undefined);
            assert.equal(routerManageData.ruleSeparator, undefined);
            assert.deepEqual(routerManageData.firstLetterRules, []);
            assert.deepEqual(routerManageData.dynamicRules, []);
        });

        it("should throw a TypeError when the parameter value of ruleSeparator is an invalid value", () => {
            assert.throws(
                () => routerManage.create(2),
                new TypeError("Input value must be a string type, received number"),
            );
        });

        it("should throw a TypeError when the parameter value of dynamicSeparator is an invalid value", () => {
            assert.throws(
                () => routerManage.create(undefined, 2),
                new TypeError("Input value must be a string type, received number"),
            );
        });
    });

    describe("test the addRule function", () => {
        let context = { routerManageData: null };
        beforeEach(() => {
            context.routerManageData = routerManage.create("/", ":");
        });

        it("should succeed when the parameter value of route is 'get/a/b'", () => {
            routerManage.addRule(context.routerManageData, "get/a/b", () => {});
            assert.equal(context.routerManageData.firstLetterRules.length, 1);
            assert.equal(context.routerManageData.dynamicRules.length, 0);
        });

        it("should succeed when the parameter value of route is 'get/a/:b'", () => {
            routerManage.addRule(context.routerManageData, "get/a/:b", () => {});
            assert.equal(context.routerManageData.firstLetterRules.length, 0);
            assert.equal(context.routerManageData.dynamicRules.length, 1);
        });
        it("should succeed when the parameter value of route is 'get/a*'", () => {
            routerManage.addRule(context.routerManageData, "get/a/b1", () => {});
            routerManage.addRule(context.routerManageData, "get/a/b2", () => {});
            routerManage.addRule(context.routerManageData, "get/a/b3", () => {});
            assert.equal(context.routerManageData.firstLetterRules.length, 1);
            assert.equal(context.routerManageData.firstLetterRules[0].routes[0].origin, "get/a/b1");
            assert.deepEqual(context.routerManageData.firstLetterRules[0].routes[0].split, ["get", "a", "b1"]);
            assert.equal(context.routerManageData.firstLetterRules[0].routes[1].origin, "get/a/b2");
            assert.deepEqual(context.routerManageData.firstLetterRules[0].routes[1].split, ["get", "a", "b2"]);
            assert.equal(context.routerManageData.firstLetterRules[0].routes[2].origin, "get/a/b3");
            assert.deepEqual(context.routerManageData.firstLetterRules[0].routes[2].split, ["get", "a", "b3"]);
        });

        it("should throw a Error when the parameter value of route is exists", () => {
            routerManage.addRule(context.routerManageData, "get/a/b1", () => {});
            routerManage.addRule(context.routerManageData, "get/a/:b", () => {});
            assert.throws(
                () => routerManage.addRule(context.routerManageData, "get/a/b1", () => {}),
                new Error("route is exists"),
            );
            assert.throws(
                () => routerManage.addRule(context.routerManageData, "get/a/:b", () => {}),
                new Error("route is exists"),
            );
        });
    });

    describe("test the resortRules function", () => {
        let context = { routerManageData: null };
        beforeEach(() => {
            context.routerManageData = routerManage.create("/", ":");
        });

        it("should succeed", () => {
            routerManage.addRule(context.routerManageData, "get/b/a", () => {});
            routerManage.addRule(context.routerManageData, "get/a/b1", () => {});
            routerManage.addRule(context.routerManageData, "get/a1/b2", () => {});
            routerManage.addRule(context.routerManageData, "patch/c/b3", () => {});
            routerManage.addRule(context.routerManageData, "post/a/b3", () => {});

            routerManage.addRule(context.routerManageData, "put/a/:a/b", () => {});
            routerManage.addRule(context.routerManageData, "put/a/:b/a", () => {});
            routerManage.resortRules(context.routerManageData);
            assert.equal(context.routerManageData.firstLetterRules[0].firstLetter, "gab");
            assert.equal(context.routerManageData.firstLetterRules[1].firstLetter, "gba");
            assert.equal(context.routerManageData.firstLetterRules[2].firstLetter, "pab");
            assert.equal(context.routerManageData.firstLetterRules[3].firstLetter, "pcb");
            assert.equal(
                context.routerManageData.dynamicRules[0].firstLetter,
                `pa${String.fromCharCode(0x10ffff - 1)}a`,
            );
            assert.equal(
                context.routerManageData.dynamicRules[1].firstLetter,
                `pa${String.fromCharCode(0x10ffff - 1)}b`,
            );
        });
    });
    describe("test the matchPath function", () => {
        let context = { routerManageData: null };
        beforeEach(() => {
            context.routerManageData = routerManage.create("/", ":");
            routerManage.addRule(context.routerManageData, "get/b/a", () => {});
            routerManage.addRule(context.routerManageData, "get/a/b1", () => {});
            routerManage.addRule(context.routerManageData, "get/a1/b2", () => {});
            routerManage.addRule(context.routerManageData, "patch/c/b3", () => {});
            routerManage.addRule(context.routerManageData, "post/c/b3", () => {});

            routerManage.addRule(context.routerManageData, "put/:a/b", () => {});
            routerManage.addRule(context.routerManageData, "put/:b/a", () => {});
            routerManage.addRule(context.routerManageData, "put/a/a", () => {});
            routerManage.resortRules(context.routerManageData);
        });

        it("should succeed when the parameter value of path is 'get/a1/b2'", () => {
            const path = "get/a1/b2";
            const { route } = routerManage.matchPath(context.routerManageData, path);
            assert.equal(route, path);
        });
        it("should succeed when the parameter value of path is 'post/c/b3'", () => {
            const path = "post/c/b3";
            const { route } = routerManage.matchPath(context.routerManageData, path);
            assert.equal(route, path);
        });
        it("should succeed when the parameter value of path is 'put/a/a'", () => {
            const path = "put/a/a";
            const { route } = routerManage.matchPath(context.routerManageData, path);
            assert.equal(route, path);
        });
        it("should succeed when the parameter value of path is 'put/a/a'", () => {
            const path = "put/a/a";
            const { route } = routerManage.matchPath(context.routerManageData, path);
            assert.equal(route, path);
        });

        it("should succeed when the parameter value of path is 'put/b/a'", () => {
            const path = "put/b/a";
            const { route } = routerManage.matchPath(context.routerManageData, path);
            assert.equal(route, "put/:b/a");
        });
    });
});
