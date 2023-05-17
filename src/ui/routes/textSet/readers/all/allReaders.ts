import Mithril, {redraw, Vnode} from "mithril";
import {BaseComponent} from "../../../../base/baseComponent";
import {ReaderIncludeUser} from "../../../../../services/reader/reader";
import {ReaderService} from "../../../../../services/reader/readerService";
import m from "mithril";
import {Layout} from "../../../../layout";
import {BaseList} from "../../../../components/base/list/baseList";
import {NoData} from "../../../../components/noData/noData";
import {BaseListItem} from "../../../../components/base/list/item/baseListItem";

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
                readers ?

                    Layout.centerNodes(
                        m(BaseList, {
                            items: readers!!,
                            makeItem: (item: ReaderIncludeUser) => m(BaseListItem, {
                                primary: item.userName,
                                secondary: item.reader.id.toString(),
                                onClick: () => {
                                    // TODO: Reader view not implemented.
                                    throw "Reader view not implemented";
                                }
                            })
                        })
                    )

                    : m(NoData)
            )
        }
    }
}