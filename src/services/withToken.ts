import {StorageService} from "./storage/storageService";

export async function withToken<T>(success: (token: string) => T): Promise<T | undefined> {
    const token = StorageService.getCurrentToken();
    if (!token) return undefined;
    return success(token);
}