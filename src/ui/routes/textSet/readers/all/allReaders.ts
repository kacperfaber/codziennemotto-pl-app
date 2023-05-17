import Mithril, {redraw, Vnode} from "mithril";
import {BaseComponent} from "../../../../base/baseComponent";
import {ReaderIncludeUser} from "../../../../../services/reader/reader";
import {ReaderService} from "../../../../../services/reader/readerService";
import m from "mithril";
import {Layout} from "../../../../layout";

export interface AllReadersAttrs {
    textSetId: number;
}

export function AllReaders(): Mithril.Component<AllReadersAttrs> {
    let readers: undefined | Array<ReaderIncludeUser> = undefined;

    const updateReaders = (value: Array<ReaderIncludeUser> | undefined) => {
        readers = value;
        redraw();
    }

    return new class extends BaseComponent<AllReadersAttrs, any> {
        override oninit(vnode: Mithril.Vnode<AllReadersAttrs, any>): any {
            ReaderService.getReaders(vnode.attrs.textSetId)
                .then(data => updateReaders(data))
                .catch(() => updateReaders(undefined));

            return super.oninit(vnode);
        }

        override view({attrs}: Vnode<AllReadersAttrs>) {
            return Layout.free(
                Layout.centerNodes(

                )
            )
        }
    }
}