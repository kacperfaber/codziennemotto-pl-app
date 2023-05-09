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
        const url = `${Config.apiUrl}/text-set/summary`;
        return await httpRequest({method: 'GET', headers: {'Authorization': token}, url: url});
    }

    static async deleteText(token: string, textSetId: number, textId: number): Promise<void> {
        const url = `${Config.apiUrl}/text-set/${textSetId}/${textId}`;
        return await httpRequest({method: 'DELETE', headers: {'Authorization': token}, url: url});
    }

    static async createTextSet(token: string, title: string, description: string): Promise<TextSet> {
        const url = `${Config.apiUrl}/text-set/create-new`;
        const body = {title, description};
        return await httpRequest({method: 'POST', headers: {'Authorization': token}, url: url, body: body})
    }

    static async createText(token: string, textSetId: number, data: {text: string, date: string | null, order: number}): Promise<Text> {
        const url = `${Config.apiUrl}/text-set/${textSetId}/add`;
        return await httpRequest({method: 'PUT', url, body: data, headers: {'Authorization': token}});
    }

    static async deleteTextSet(token: string, textSetId: number): Promise<void> {
        const url = `${Config.apiUrl}/text-set/${textSetId}`
        return await httpRequest({method: 'DELETE', url, headers: {'Authorization': token}});
    }
}