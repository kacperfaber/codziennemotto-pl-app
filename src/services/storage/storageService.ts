import {AuthResult} from "../auth/authenticationService";

export class StorageKeys {
    static readonly auth = "_token_";
}

export class StorageService {
    private static setString(key: string, value: string) {
        window.localStorage.setItem(key, value);
    }

    private static getString(key: string): string | undefined {
        return window.localStorage.getItem(key) ?? undefined;
    }

    private static remove(key: string) {
        window.localStorage.removeItem(key);
    }

    private static setItem(key: string, i: any) {
        window.localStorage.setItem(key, JSON.stringify(i));
    }
    
    private static getItem<T>(key: string): T | undefined {
        const item = window.localStorage.getItem(key);
        if (!item) return undefined;
        return JSON.parse(item) as T;
    }

    static setCurrentAuth(authResponse: AuthResult) {
        StorageService.setItem(StorageKeys.auth, authResponse);
    }
    
    static getCurrentAuth(): AuthResult | undefined {
        return StorageService.getItem(StorageKeys.auth);
    }
    
    static getCurrentToken(): string | undefined {
        const auth = StorageService.getCurrentAuth();
        return auth?.token;
    }
}