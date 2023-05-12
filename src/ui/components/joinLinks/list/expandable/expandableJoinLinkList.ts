import Mithril, {Vnode} from "mithril";
import m from "mithril";
import {JoinLink} from "../../../../../services/joinLink/joinLink";
import {t} from "i18next";
import {BaseExpandableList} from "../../../base/expandableList/baseExpandableList";
import {BaseExpandableListItem} from "../../../base/expandableList/item/baseExpandableListItem";

export interface ExpandableJoinLinkListAttrs {
    joinLinks: Array<JoinLink>;
    showAllOnClick: (() => void) | undefined;
}

export function ExpandableJoinLinkList(): Mithril.Component<ExpandableJoinLinkListAttrs> {
    function createItem(item: JoinLink): Vnode<any, any> {
        return m(BaseExpandableListItem, {onClick: () => {}, secondary: `${item.id}`, primary: item.code})
    }

    return {
        view: (vnode: Vnode<ExpandableJoinLinkListAttrs>) => m(BaseExpandableList, {
            button: {
                text: t("all.show_all"),
                onClick: () => {
                    console.error("joinLink-click not implemented yet.")
                }
            },
            makeItem: (item: JoinLink) => createItem(item),
            items: vnode.attrs.joinLinks
        })
    }
}