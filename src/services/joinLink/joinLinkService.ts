import {JoinLink} from "./joinLink";
import {withTokenAsync} from "../withToken";
import {JoinLinkApi} from "../../api/joinLink/joinLinkApi";
import {TextSetStore} from "../../store/textSet/textSetStore";

export class JoinLinkService {
    public static async createJoinLink(textSetId: number): Promise<JoinLink> {
        await TextSetStore.tryResetJoinLinks(textSetId);
        return await withTokenAsync(async (token: string) => await JoinLinkApi.createJoinLink(token, textSetId));
    }

    public static async getJoinLinks(textSetId: number, forceRefresh = false): Promise<Array<JoinLink>> {
        const store = await TextSetStore.getJoinLinks(textSetId);
        return !store || forceRefresh ? JoinLinkService.fetchJoinLinks(textSetId) : store;
    }

    public static async fetchJoinLinks(textSetId: number): Promise<Array<JoinLink>> {
        return await withTokenAsync(async (token) => {
            await TextSetStore.tryResetJoinLinks(textSetId);
            const joinLinks = await JoinLinkApi.fetchJoinLinks(token, textSetId);
            await TextSetStore.setJoinLinks(textSetId, joinLinks);
            return joinLinks;
        })
    }
}