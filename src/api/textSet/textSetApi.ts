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
}