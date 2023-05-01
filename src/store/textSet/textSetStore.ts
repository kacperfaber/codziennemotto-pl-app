import {TextSet} from "../../services/textSet/textSet";
import stream from "mithril/stream";
import {Summary} from "../../services/textSet/summary";

class _TextSetStore {
    public mine = stream<TextSet[] | undefined>(undefined);
    public notMine = stream<TextSet[] | undefined>(undefined);
    public summary = stream<Summary | undefined>(undefined);

    async tryUpdateTextSet(textSetId: number, doUpdate: (t: TextSet) => void): Promise<TextSet | undefined> {
        const textSet = await this.getTextSet(textSetId);
        if(textSet != undefined) doUpdate(textSet);
        return textSet;
    }

    private async getTextSetFromList(textSetId: number, list: TextSet[] | undefined): Promise<TextSet | undefined> {
        return list?.find(x => x.id == textSetId);
    }

    async getTextSetFromMine(textSetId: number): Promise<TextSet | undefined> {
        return this.getTextSetFromList(textSetId, this.mine());
    }

    async getTextSetFromNotMine(textSetId: number): Promise<TextSet | undefined> {
        return this.getTextSetFromList(textSetId, this.notMine());
    }


    async getTextSet(textSetId: number): Promise<TextSet | undefined> {
        const textSetFromMine = await this.getTextSetFromMine(textSetId);
        const textSetFromNotMine = await this.getTextSetFromNotMine(textSetId);
        if (textSetFromMine != undefined) return textSetFromMine;
        return textSetFromNotMine;
    }
}

export const TextSetStore = new _TextSetStore();