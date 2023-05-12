import Mithril, {Vnode} from "mithril";
import m from "mithril";
import {JoinLink} from "../../../../../services/joinLink/joinLink";
import {t} from "i18next";

export interface ExpandableJoinLinkListAttrs {
    joinLinks: Array<JoinLink>;
    showAllOnClick: (() => void) | undefined;
}

export function ExpandableJoinLinkList(): Mithril.Component<ExpandableJoinLinkListAttrs> {
    return {
        view: (vnode: Vnode<ExpandableJoinLinkListAttrs>) => m(".expandable-join-link-list",
            m(".expandable-join-link-list__list",
                vnode.attrs.joinLinks.map(item => m("button.btn.item",
                    m("p.code", item.code),
                    m("p.active-until", item.activeUntil))
                ),
            ),

            vnode.attrs.showAllOnClick ? m(".expandable-join-link-footer",
                m("button.btn.btn-primary", {onclick: vnode.attrs.showAllOnClick}, t("all.show_all"))
            ) : null
        )
    }
}