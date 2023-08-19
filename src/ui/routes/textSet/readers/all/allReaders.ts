import Mithril, {redraw, Vnode} from "mithril";
import {BaseComponent} from "../../../../base/baseComponent";
import {ReaderIncludeUser} from "../../../../../services/reader/reader";
import {ReaderService} from "../../../../../services/reader/readerService";
import m from "mithril";
import {Layout} from "../../../../layout";
import {BaseList} from "../../../../components/base/list/baseList";
import {NoData} from "../../../../components/noData/noData";
import {BaseListItem} from "../../../../components/base/list/item/baseListItem";
import {AppNavigator} from "../../../../appNavigator";
import {t} from "i18next";
import {TextSet} from "../../../../../services/textSet/textSet";
import {TextSetService} from "../../../../../services/textSet/textSetService";
import {DialogManager} from "../../../../base/dialog/dialogManager";

export interface AllReadersAttrs {
    textSetId: number;
}

export function AllReaders(): Mithril.Component<AllReadersAttrs> {
    let readers: undefined | Array<ReaderIncludeUser> = undefined;
    let textSet: TextSet | undefined = undefined;

    const updateReaders = (value: Array<ReaderIncludeUser> | undefined) => {
        readers = value;
        redraw();
    }

    return new class extends BaseComponent<AllReadersAttrs, any> {
        override oninit(vnode: Mithril.Vnode<AllReadersAttrs, any>): any {
            ReaderService.getReaders(vnode.attrs.textSetId)
                .then(data => updateReaders(data))
                .catch(() => updateReaders(undefined));

            TextSetService.getById(vnode.attrs.textSetId)
                .then(data => {textSet = data; redraw()})
                .catch(() => DialogManager.info(t("all.something-wrong"), t("all-readers.could-not-load-data")))

            return super.oninit(vnode);
        }

        override view({attrs}: Vnode<AllReadersAttrs>) {
            return Layout.free(
                readers ?

                    Layout.centerNodes(
                        Layout.withHeader(
                            t("all-readers.title"),
                            t("all-readers.body", {textSet: textSet?.title}) ?? undefined,
                            m("div")
                        ),

                        m(BaseList, {
                            items: readers!!,
                            makeItem: (item: ReaderIncludeUser) => m(BaseListItem, {
                                primary: item.userName,
                                secondary: item.reader.id.toString(),
                                onClick: () => {
                                    AppNavigator.readerById(attrs.textSetId, item.reader.id)
                                }
                            })
                        })
                    )

                    : m(NoData)
            )
        }
    }
}