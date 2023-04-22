import {AuthResult} from "../../services/auth/authenticationService";
import {Config} from "../../config/config";
import {request} from "mithril";

export class AuthenticationApi {

    static async current(token: string): Promise<User | null> {
        function getUrl(): string {
            return Config.apiUrl + "/current";
        }

        try {
            await request({method: 'GET', headers: {"Authorization": token}, url: getUrl()});
        }

        catch (e) {
            return null;
        }
    }

    static async authenticate(login: string, password: string): Promise<AuthResult | null> {
        function getUrl(): string {
            return Config.apiUrl + "/auth";
        }

        function constructBody(): { login: string, password: string } {
            return {login: login, password: password};
        }

        try {
            const res = await request(
                {
                    method: "POST",
                    url: getUrl(),
                    body: constructBody()
                }
            );

            return res as AuthResult;
        }

        catch (e) {
            return null;
        }

    }
}