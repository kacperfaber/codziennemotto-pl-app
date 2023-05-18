import {verifyObject} from "../../src/ui/optional";

describe("optional.ts", function () {
    describe("verifyObject", function () {
        test("does not throw", function () {
            expect(() => verifyObject({user: 0})).not.toThrow();
        });

        test("true if object is empty", function () {
            expect(verifyObject({})).toBeTruthy();
        });

        test("true if object contains no undefined or nulls", function () {
            expect(verifyObject({i: 5, test: {}, test2: "Hello"})).toBeTruthy();
        });

        test("false if object contains undefined field", function () {
            expect(verifyObject({i: 5, test: undefined})).toBeFalsy();
        });

        test("false if object contains null field", function () {
            expect(verifyObject({i: 5, test: null})).toBeFalsy();
        });

    });
})