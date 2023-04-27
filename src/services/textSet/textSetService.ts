import {TextSet} from "./textSet";
import {withTokenAsync} from "../withToken";
import {TextSetApi} from "../../api/textSet/textSetApi";
import {TextSetStore} from "../../store/textSet/textSetStore";

export class TextSetService {
    static async getById(id: number): Promise<TextSet> {
       return withTokenAsync(
           token => TextSetApi.getById(id, token)
       );
    }

    static async getMine(): Promise<Array<TextSet>> {
        return withTokenAsync(TextSetApi.getMine);
    }

    static async getNotMine(): Promise<Array<TextSet>> {
        return withTokenAsync(async (token) => {
            const mine = await TextSetApi.getNotMine(token);
            TextSetStore.mine(mine);
            return mine;
        });
    }
}