import {StorageService} from "./storage/storageService";

export async function withToken<T>(success: (token: string) => T): Promise<T | undefined> {
    const token = StorageService.getCurrentToken();
    if (!token) return undefined;
    return success(token);
}

export async function withTokenAsync<T>(success: (token: string) => T): Promise<T> {
    return new Promise(
        (resolve, reject) => {
            const token = StorageService.getCurrentToken();
            if (!token) {
                reject(new Error("No token defined. Promise rejected."));
                return;
            }
            const res = success(token);
            resolve(res);
        }
    );
}