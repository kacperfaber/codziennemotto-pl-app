import {JoinLink} from "../../services/joinLink/joinLink";
import {httpRequest} from "../httpRequest";
import {Config} from "../../config/config";

export class JoinLinkApi {
    public static async createJoinLink(token: string, textSetId: number): Promise<JoinLink> {
        const url = `${Config.apiUrl}/text-set/${textSetId}/create-join-link`;
        return await httpRequest({headers: {'Authorization': token}, url, method: 'POST'});
    }

    public static async fetchJoinLinks(token: string, textSetId: number): Promise<Array<JoinLink>> {
        const url = `${Config.apiUrl}/text-set/${textSetId}/join-links`;
        return await httpRequest({headers: {'Authorization': token}, url, method: 'GET'});
    }

    public static async deleteJoinLink(token: string, textSetId: number, joinLinkId: number): Promise<void> {
        const url = `${Config.apiUrl}/text-set/${textSetId}/join-link/${joinLinkId}`;
        return await httpRequest({headers: {'Authorization': token}, url, method: "DELETE"});
    }
}