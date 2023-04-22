import {AuthenticationApi} from "../../api/auth/authenticationApi";
import {StorageService} from "../storage/storageService";
import {User} from "../user/user";
import {withToken} from "../withToken";

export interface AuthResult {
    id: number;
    username: string;
    email: string;
    token: string;
}

export class AuthenticationService {
    static async authenticate(username: string, password: string): Promise<boolean> {
        const result = await AuthenticationApi.authenticate(username, password);
        if (!result) return false;

        StorageService.setCurrentAuth(result);

        return true;
    }

    static async current(): Promise<User | undefined> {
        return await withToken(function (token: string) {
            return AuthenticationApi.current(token);
        });
    }
}