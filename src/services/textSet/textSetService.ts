import {TextSet} from "./textSet";
import {withTokenAsync} from "../withToken";
import {TextSetApi} from "../../api/textSet/textSetApi";

export class TextSetService {
    static async getById(id: number): Promise<TextSet> {
       return withTokenAsync(
           token => TextSetApi.getById(id, token)
       );
    }
}