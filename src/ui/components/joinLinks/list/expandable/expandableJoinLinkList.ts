import Mithril, {Vnode} from "mithril";
import m from "mithril";
import {JoinLink} from "../../../../../services/joinLink/joinLink";
import {t} from "i18next";
import {BaseExpandableList} from "../../../base/expandableList/baseExpandableList";
import {BaseExpandableListItem} from "../../../base/expandableList/item/baseExpandableListItem";
import {AppNavigator} from "../../../../appNavigator";

export interface ExpandableJoinLinkListAttrs {
    joinLinks: Array<JoinLink>;
    showAllOnClick: (() => void) | undefined;
}

export function ExpandableJoinLinkList(): Mithril.Component<ExpandableJoinLinkListAttrs> {
    function createItem(item: JoinLink): Vnode<any, any> {
        return m(BaseExpandableListItem, {onClick: () => {alert("copied")}, secondary: `${item.id}`, primary: item.code})
    }

    return {
        view: (vnode: Vnode<ExpandableJoinLinkListAttrs>) => m(BaseExpandableList, {
            button: {
                text: t("all.show_all"),
                onClick: () => {
                    if (vnode.attrs.showAllOnClick) {
                        vnode.attrs.showAllOnClick();
                    }
                }
            },
            makeItem: (item: JoinLink) => createItem(item),
            items: vnode.attrs.joinLinks
        })
    }
}