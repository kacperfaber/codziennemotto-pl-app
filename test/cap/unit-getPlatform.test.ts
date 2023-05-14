import {getPlatform} from "../../src/cap/platform";
import {Capacitor} from "@capacitor/core";

describe("platform.ts", function () {
    describe("getPlatform", function() {
        test("does not throw", function () {
            expect(() => getPlatform()).not.toThrow();
        });

        test("returns value returned by Capactitor.getPlatform: 'web'", function() {
            jest.spyOn(Capacitor, 'getPlatform').mockReturnValue("web");

            expect(getPlatform()).toBe('web');
        });

        test("returns value returned by Capactitor.getPlatform: 'android'", function() {
            jest.spyOn(Capacitor, 'getPlatform').mockReturnValue("android");

            expect(getPlatform()).toBe('android');
        });

        test("returns value returned by Capactitor.getPlatform: 'ios'", function() {
            jest.spyOn(Capacitor, 'getPlatform').mockReturnValue("ios");

            expect(getPlatform()).toBe('ios');
        });

        test(`throws when Capacitor.getPlatform returned not of ios, android, web`, function () {
            jest.spyOn(Capacitor, 'getPlatform').mockReturnValue("test");

            expect(() => getPlatform()).toThrow();
        });
    })
})