import {ReaderIncludeUser} from "./reader";
import {TextSetStore} from "../../store/textSet/textSetStore";
import {withTokenAsync} from "../withToken";
import {ReaderApi} from "../../api/reader/readerApi";

export class ReaderService {
    public static async fetchReaders(textSetId: number): Promise<Array<ReaderIncludeUser>> {
        return withTokenAsync(async (token) => {
            const readers = await ReaderApi.getReaders(token, textSetId);
            await TextSetStore.setReaders(textSetId, readers)
            return readers;
        });
    }

    public static async getReaders(textSetId: number, forceRefresh = false): Promise<Array<ReaderIncludeUser>> {
        const readersFromStore = await TextSetStore.getReaders(textSetId);

        if (!readersFromStore || forceRefresh) {
            return ReaderService.fetchReaders(textSetId);
        }

        return readersFromStore;
    }
}