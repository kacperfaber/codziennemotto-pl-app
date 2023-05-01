import {TextSet} from "../../services/textSet/textSet";
import {Config} from "../../config/config";
import {httpRequest} from "../httpRequest";
import {Text} from "../../services/textSet/text";
import {Summary} from "../../services/textSet/summary";

export class TextSetApi {
    static async getById(id: number, token: string): Promise<TextSet> {
        function getUrl(textSetId: number) {
            return `${Config.apiUrl}/text-set/${textSetId}`;
        }

        return await httpRequest<TextSet>({
            method: "GET",
            headers: {"Authorization": token},
            url: getUrl(id)
        });
    }

    static async getMine(token: string): Promise<Array<TextSet>> {
        const url = `${Config.apiUrl}/text-set/where-i-am-owner`;
        return await httpRequest({method: 'GET', headers: {'Authorization': token}, url: url});
    }

    static async getNotMine(token: string): Promise<Array<TextSet>> {
        const url = `${Config.apiUrl}/text-set/where-i-am-reader`;
        return await httpRequest({method: 'GET', headers: {'Authorization': token}, url: url});
    }

    static async getAllVisibleTexts(token: string, textSetId: number): Promise<Array<Text>> {
        const url = `${Config.apiUrl}/text-set/${textSetId}/texts/all/visible`;
        return await httpRequest({method: 'GET', headers: {'Authorization': token}, url: url});
    }

    static async fetchSummary(token: string): Promise<Summary> {
        const url = `${Config.apiUrl}/summary`;
        return await httpRequest({method: 'GET', headers: {'Authorization': token}, url: url});
    }
}