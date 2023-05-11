import {JoinLink} from "../../services/joinLink/joinLink";
import {httpRequest} from "../httpRequest";
import {Config} from "../../config/config";

export class JoinLinkApi {
    public static async createJoinLink(token: string, textSetId: number): Promise<JoinLink> {
        const url = `${Config.apiUrl}/text-set/${textSetId}/create-join-link`;
        return await httpRequest({headers: {'Authorization': token}, url, method: 'POST'});
    }
}