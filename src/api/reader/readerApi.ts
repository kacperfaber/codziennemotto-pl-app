import {ReaderIncludeUser} from "../../services/reader/reader";
import {Config} from "../../config/config";
import {httpRequest} from "../httpRequest";

export class ReaderApi {
    static async getReaders(token: string, textSetId: number): Promise<Array<ReaderIncludeUser>> {
        const url = `${Config.apiUrl}/text-set/${textSetId}/readers/include-users`;
        return httpRequest({method: 'GET', url, headers: {'Authorization': token}});
    }
}