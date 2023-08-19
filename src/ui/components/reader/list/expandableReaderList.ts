import Mithril from "mithril";
import m from "mithril";
import {ReaderIncludeUser} from "../../../../services/reader/reader";
import {BaseExpandableList} from "../../base/expandableList/baseExpandableList";
import {BaseExpandableListItem} from "../../base/expandableList/item/baseExpandableListItem";
import {AppNavigator} from "../../../appNavigator";
import {t} from "i18next";

type ReaderListAttrs = {
    textSetId: number;
    readers: Array<ReaderIncludeUser>;
}

export const ExpandableReaderList: Mithril.Component<ReaderListAttrs> = {
    view(vnode: Mithril.Vnode<ReaderListAttrs, Mithril._NoLifecycle<any & {}>>): Mithril.Children | void | null {
        return m(BaseExpandableList, {
            makeItem: (reader: ReaderIncludeUser) => m(BaseExpandableListItem, {
                primary: reader.userName,
                secondary: reader.reader.id.toString(),
                onClick: () => AppNavigator.readerById(vnode.attrs.textSetId, reader.reader.id),
            }),

            items: vnode.attrs.readers,
            button: {
                text: t("all.show_all"),
                onClick: () => AppNavigator.allReaders(vnode.attrs.textSetId)
            }
        })
    }
}