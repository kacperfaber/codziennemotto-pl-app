import {AuthResult} from "../auth/authenticationService";

export class StorageKeys {
    static readonly auth = "_token_";
}

export class StorageService {
    private static setString(key: string, value: string) {
        window.localStorage.setItem(key, value);
    }

    private static getString(key: string): string | null {
        return window.localStorage.getItem(key);
    }

    private static remove(key: string) {
        window.localStorage.removeItem(key);
    }

    private static setItem(key: string, i: any) {
        window.localStorage.setItem(key, JSON.stringify(i));
    }

    static setCurrentAuth(authResponse: AuthResult) {
        StorageService.setItem(StorageKeys.auth, authResponse);
    }
}