import {Config} from "../../config/config";
import {httpRequest} from "../httpRequest";

export class RegisterApi {
    public static register(username: string, emailAddress: string, password: string): Promise<void> {
        const url = `${Config.apiUrl}/register`;
        return httpRequest({method: "POST", body: {username, emailAddress, password}, url});
    }

    public static confirm(emailAddress: string, code: string): Promise<void> {
        const url = `${Config.apiUrl}/register/confirm`;
        return httpRequest({method: 'POST', url, body: {emailAddress, code}});
    }
}