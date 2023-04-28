import {TextSet} from "../../services/textSet/textSet";
import {Config} from "../../config/config";
import {httpRequest} from "../httpRequest";

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

    static async getPastTexts(textSetId: number, token: string): Promise<Array<Text>>
}