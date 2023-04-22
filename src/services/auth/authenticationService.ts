import {AuthenticationApi} from "../../api/auth/authenticationApi";
import {StorageService} from "../storage/storageService";

export interface AuthResult {
    id: number;
    username: string;
    email: string;
    token: string;
}

class AuthenticationService {
    async authenticate(username: string, password: string): Promise<boolean> {
        const result = await AuthenticationApi.authenticate(username, password);
        if (!result) return false;

        StorageService.setCurrentAuth(result);

        return true;
    }
}