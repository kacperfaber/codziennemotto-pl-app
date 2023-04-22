import {AuthResult} from "../../services/auth/authenticationService";
import {Config} from "../../config/config";
import {httpRequest} from "../httpRequest";
import {User} from "../../services/user/user";

export class AuthenticationApi {

    static async current(token: string): Promise<User | undefined> {
        function getUrl(): string {
            return Config.apiUrl + "/current";
        }

        try {
            return await httpRequest({method: 'GET', headers: {"Authorization": token}, url: getUrl()});
        }

        catch (e) {
            return undefined;
        }
    }

    static async authenticate(login: string, password: string): Promise<AuthResult | undefined> {
        function getUrl(): string {
            return Config.apiUrl + "/auth";
        }

        function constructBody(): { login: string, password: string } {
            return {login: login, password: password};
        }

        try {
            const res = await httpRequest(
                {
                    method: "POST",
                    url: getUrl(),
                    body: constructBody()
                }
            );

            return res as AuthResult;
        }

        catch (e) {
            return undefined;
        }

    }
}