import {withToken} from "../withToken";
import {RegisterApi} from "../../api/register/registerApi";

export class RegisterService {
    public static register(username: string, emailAddress: string, password: string): Promise<void> {
        return RegisterApi.register(username, emailAddress, password);
    }

    public static async confirm(emailAddress: string, code: string): Promise<void> {
        return RegisterApi.confirm(emailAddress, code);
    }
}