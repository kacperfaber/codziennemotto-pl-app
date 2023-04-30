import {TextSet} from "./textSet";
import {withTokenAsync} from "../withToken";
import {TextSetApi} from "../../api/textSet/textSetApi";
import {TextSetStore} from "../../store/textSet/textSetStore";
import {Text} from "./text";

export class TextSetService {
    static async fetchById(id: number): Promise<TextSet> {
        return withTokenAsync(
            token => TextSetApi.getById(id, token)
        );
    }

    static async fetchMine(): Promise<Array<TextSet>> {
        return withTokenAsync(async (token) => {
            const fetch = await TextSetApi.getMine(token);
            TextSetStore.mine(fetch);
            return fetch;
        });
    }

    static async fetchNotMine(): Promise<Array<TextSet>> {
        return withTokenAsync(async (token) => {
            const fetch = await TextSetApi.getNotMine(token);
            TextSetStore.notMine(fetch);
            return fetch;
        });
    }

    static async getMine(forceRefresh = false): Promise<Array<TextSet>> {
        const mine = TextSetStore.mine();

        if (!mine || forceRefresh) {
            return this.fetchMine();
        }

        return mine;
    }

    static async getNotMine(forceRefresh = false): Promise<Array<TextSet>> {
        const data = TextSetStore.mine();

        if (!data || forceRefresh) {
            return this.fetchNotMine();
        }

        return data;
    }

    /**
     * @param textSetId TextSet's id
     * @param forceRefresh Should refresh
     * @throws Error, if TextSet with id doesn't exist in TextSetStore and is 'forceRefresh'
     * @return Promise of Text, from TextSet from store if defined. If it's not fetch from API.
     */
    static async getAllVisibleTexts(textSetId: number, forceRefresh: boolean = false): Promise<Text[]> {
        const fetchTexts = async (id: number) => await TextSetService.fetchAllVisibleTexts(id);

        const textSet = await TextSetStore.getTextSet(textSetId);

        if (!textSet) {
            if (forceRefresh) throw new Error("Can't refresh TextSet with texts, if TextSet doesn't exist in store.")

            return await fetchTexts(textSetId);
        }

        else {
            if (textSet.texts && !forceRefresh) return textSet.texts;
            textSet.texts = await fetchTexts(textSetId);
            return textSet.texts;
        }
    }

    static async fetchAllVisibleTexts(textSetId: number): Promise<Array<Text>> {
        return withTokenAsync(token => TextSetApi.getAllVisibleTexts(token, textSetId));
    }
}