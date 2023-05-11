import {JoinLink} from "./joinLink";
import {withTokenAsync} from "../withToken";
import {JoinLinkApi} from "../../api/joinLink/joinLinkApi";
import {TextSetStore} from "../../store/textSet/textSetStore";

export class JoinLinkService {
    public static async createJoinLink(textSetId: number): Promise<JoinLink> {
        await TextSetStore.tryResetJoinLinks(textSetId);
        return await withTokenAsync(async (token: string) => await JoinLinkApi.createJoinLink(token, textSetId));
    }
}