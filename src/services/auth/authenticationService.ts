import {AuthenticationApi} from "../../api/auth/authenticationApi";
import {StorageService} from "../storage/storageService";
import {User} from "../user/user";
import {withToken} from "../withToken";
import {UserStore} from "../../store/user/userStore";

export interface AuthResult {
    id: number;
    username: string;
    email: string;
    token: string;
}

export class AuthenticationService {
    // TODO: Replace it with authenticate that returns then/catch instead always then...
    static async authenticate(username: string, password: string): Promise<boolean> {
        const result = await AuthenticationApi.authenticate(username, password);
        if (!result) return false;

        StorageService.setCurrentAuth(result);
        UserStore.current(result satisfies User);

        return true;
    }

    static async current(): Promise<User | undefined> {
        return await withToken(function (token: string) {
            return AuthenticationApi.current(token);
        });
    }

    static async logout(): Promise<void> {
        StorageService.deleteCurrentAuth();
        UserStore.current(undefined);
    }
}