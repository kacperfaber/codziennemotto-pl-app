import {withToken} from "../../src/services/withToken";
import {StorageService} from "../../src/services/storage/storageService";

describe('withToken.ts', function () {
    describe('withToken', function () {
        test(`does not throw`, async function () {
            const testLambda = () => {};

            jest.spyOn(StorageService, 'getCurrentToken').mockReturnValue("test");
            expect(async () => withToken(testLambda)).not.toThrow();
        });

        test(`calls lambda if StorageService.getCurrentToken returned not null`, async function () {
            jest.spyOn(StorageService, 'getCurrentToken').mockReturnValue("test");
            let called = false;
            await withToken(function (x) {called = true;});
            expect(called).toBe(true);
        });

        test(`don't calls lambda if StorageService.getCurrentToken returned null`, async function () {
            jest.spyOn(StorageService, 'getCurrentToken').mockReturnValue(undefined);
            let called = false;
            await withToken(function (x) {called = true;});
            expect(called).toBe(false);
        });

        test(`calls lambda using token returned from StorageService.getCurrentToken`, async function() {
            let expected = "exampleToken123";
            jest.spyOn(StorageService, 'getCurrentToken').mockReturnValue(expected);
            await withToken(function (x: string) {
               expect(x).toBe(expected);
            });
        })
    });
});