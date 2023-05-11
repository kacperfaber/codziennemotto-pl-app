import {JoinLink} from "./joinLink";
import {withTokenAsync} from "../withToken";
import {JoinLinkApi} from "../../api/joinLink/joinLinkApi";

export class JoinLinkService {
    public static async createJoinLink(textSetId: number): Promise<JoinLink> {
        // TODO: Reset TextSet -> joinLinks.
        return await withTokenAsync(async (token: string) => await JoinLinkApi.createJoinLink(token, textSetId));
    }
}