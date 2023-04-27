import {TextSet} from "../../services/textSet/textSet";
import stream from "mithril/stream";

class _TextSetStore {
    public mine = stream<TextSet[] | undefined>(undefined);
    public notMine = stream<TextSet[] | undefined>(undefined);
}

export const TextSetStore = new _TextSetStore();