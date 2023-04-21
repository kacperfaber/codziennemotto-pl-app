import {request} from "mithril";
import {Config} from "../../config/config";

export interface AuthResult {
    id: number;
    username: string;
    email: string;
    token: string;
}

class AuthenticationService {
    async authenticate(username: string, password: string): Promise<AuthResult | null> {
        function getUrl(): string {
            return Config.apiUrl + "/auth";
        }

        function constructBody(): { login: string, password: string } {
            return {login: username, password: password};
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