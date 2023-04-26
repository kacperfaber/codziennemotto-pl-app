import {TextSet} from "../../services/textSet/textSet";

class _TextSetStore {
    private mine: Array<TextSet> | undefined = undefined;

    getMine(): Array<TextSet> | undefined {
        return this.mine;
    }

    setMine(d: Array<TextSet> | undefined): void {
        this.mine = d;
    }
}

export const TextSetStore = new _TextSetStore();