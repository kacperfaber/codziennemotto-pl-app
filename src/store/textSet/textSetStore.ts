import {TextSet} from "../../services/textSet/textSet";
import stream from "mithril/stream";
import {Summary} from "../../services/textSet/summary";
import {JoinLink} from "../../services/joinLink/joinLink";
import {Text} from "../../services/textSet/text";
import {Reader, ReaderIncludeUser} from "../../services/reader/reader";

class _TextSetStore {
    public mine = stream<TextSet[] | undefined>(undefined);
    public notMine = stream<TextSet[] | undefined>(undefined);
    public summary = stream<Summary | undefined>(undefined);

    async tryUpdateTextSet(textSetId: number, doUpdate: (t: TextSet) => void): Promise<TextSet | undefined> {
        const textSet = await this.getTextSet(textSetId);
        if (textSet != undefined) doUpdate(textSet);
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

    async findTextInBoth(predicate: (text: Text) => boolean): Promise<{text: Text, textSet: TextSet} | undefined> {
        const all = [...this.mine() ?? [], ...this.notMine() ?? []];
        for (let textSet of all) {
            if (textSet.texts === undefined) continue;

            for (let text of textSet.texts) {
                if (predicate(text)) {
                    return {text, textSet};
                }
            }
        }

        return undefined;
    }

    async findAllTextInBoth(predicate: (text: Text) => boolean): Promise<{text: Text, textSet: TextSet}[]> {
        const all = [...this.mine() ?? [], ...this.notMine() ?? []];
        const toRet: Array<{text: Text, textSet: TextSet}> = [];

        const appendReturnValue = (d: {text: Text, textSet: TextSet}) => {
            toRet.push(d);
        };

        for (let textSet of all) {
            if (textSet.texts === undefined) continue;

            for (let text of textSet.texts) {
                if (predicate(text)) {
                    appendReturnValue({text, textSet});
                }
            }
        }

        return toRet;
    }

    async resetTextsInTextSetById(textSetId: number): Promise<TextSet | undefined> {
        const clearTextSets = (textSet: TextSet) => {
            textSet.texts = undefined;
        }

        return new Promise<TextSet|undefined>(async (resolve) => {
            const textSet = await this.tryUpdateTextSet(textSetId, clearTextSets);
            return resolve(textSet);
        });
    }

    async resetTextSets(): Promise<void> {
        this.mine(undefined);
        this.notMine(undefined);
    }

    async tryResetJoinLinks(textSetId: number): Promise<void> {
        await this.tryUpdateTextSet(textSetId, t => t.joinLinks = undefined);
    }

    async getJoinLinks(textSetId: number): Promise<Array<JoinLink> | undefined> {
        const textSet = await this.getTextSet(textSetId);
        return textSet?.joinLinks;
    }

    async setJoinLinks(textSetId: number, joinLinks: Array<JoinLink> | undefined) {
        await this.tryUpdateTextSet(textSetId, t => t.joinLinks = joinLinks);
    }

    async getTextById(textId: number): Promise<{text: Text, textSet: TextSet} | undefined> {
        return this.findTextInBoth((text) => text.id == textId);
    }

    async resetReaders(textSetId: number){
        await this.tryUpdateTextSet(textSetId, (ts) => ts.readers = undefined);
    }

    async setReaders(textSetId: number, readers: Array<ReaderIncludeUser>) {
        await this.tryUpdateTextSet(textSetId, t => t.readers = readers);
    }

    async getReaders(textSetId: number): Promise<Array<ReaderIncludeUser> | undefined> {
        const textSet = await this.getTextSet(textSetId);
        return textSet?.readers;
    }
}

export const TextSetStore = new _TextSetStore();