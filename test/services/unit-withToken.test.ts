import {withToken, withTokenAsync} from "../../src/services/withToken";
import {StorageService} from "../../src/services/storage/storageService";

describe('withToken.ts', function () {
    describe('withToken', function () {
        test(`does not throw`, async function () {
            const testLambda = () => {
            };

            jest.spyOn(StorageService, 'getCurrentToken').mockReturnValue("test");
            expect(async () => withToken(testLambda)).not.toThrow();
        });

        test(`calls lambda if StorageService.getCurrentToken returned not null`, async function () {
            jest.spyOn(StorageService, 'getCurrentToken').mockReturnValue("test");
            let called = false;
            await withToken(function (x) {
                called = true;
            });
            expect(called).toBe(true);
        });

        test(`don't calls lambda if StorageService.getCurrentToken returned null`, async function () {
            jest.spyOn(StorageService, 'getCurrentToken').mockReturnValue(undefined);
            let called = false;
            await withToken(function (x) {
                called = true;
            });
            expect(called).toBe(false);
        });

        test(`calls lambda using token returned from StorageService.getCurrentToken`, async function () {
            let expected = "exampleToken123";
            jest.spyOn(StorageService, 'getCurrentToken').mockReturnValue(expected);
            await withToken(function (x: string) {
                expect(x).toBe(expected);
            });
        })
    });

    describe('withTokenAsync', function () {
        test("does not throw", async function () {
            jest.spyOn(StorageService, 'getCurrentToken').mockReturnValue(undefined);
            expect(async () => await expect(async () => await withTokenAsync(() => {})))
                .not.toThrow();
        });

        test("lambda called if StorageService.getCurrentToken is not undefined", async function () {
            jest.spyOn(StorageService, 'getCurrentToken').mockReturnValue("abc");
            let called = false;
            await withTokenAsync(() => called = true);
            expect(called).toBeTruthy();
        });

        test("rejects if StorageService.getCurrentToken is undefined", async function () {
            jest.spyOn(StorageService, 'getCurrentToken').mockReturnValue(undefined);
            await expect(async () => await withTokenAsync(() => {})).rejects.toBeDefined();
        });

        test("lambda called with expected value from StorageService.getCurrentToken", async function () {
            const e = "Abcdemognmeot2o3mt";
            jest.spyOn(StorageService, 'getCurrentToken').mockReturnValue(e);
            await withTokenAsync(token => expect(token).toBe(e));
        });
    });
});