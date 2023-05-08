import m, {Vnode} from "mithril";
import {Text} from "../../../../../services/textSet/text";
import route from "mithril/route";
import {t} from "i18next";
import {AppNavigator} from "../../../../appNavigator";

export function ExpandableTextListItem() {
    return {
        view: (vnode: Vnode<{ item: Text }>) => m("button.btn.expandable-text-list-item",
            {onclick: () => AppNavigator.textSetById(vnode.attrs.item.id)},
            m("p.text", vnode.attrs.item.text),
            m("p.id", `${t("all.id")}: ${vnode.attrs.item.id}`)
        )
    }
}

export interface ExpandableTextListAttrs {
    items: Array<Text>;
    /**
     * @description If undefined, title wouldn't render.
     */
    title: string | undefined;
    /**
     * @description If undefined, 'show-all' button wouldn't render.
     */
    showAllOnClick: () => void | undefined;
}

export function ExpandableTextList() {
    return {
        view: (vnode: Vnode<ExpandableTextListAttrs>) => m(".expandable-text-list",
            vnode.attrs.title ? m("h4", vnode.attrs.title!!) : m("div"),

            vnode.attrs.items.map(item => m(ExpandableTextListItem, {item: item})),

            vnode.attrs.showAllOnClick ?
                m(".expandable-text-list-footer",
                    m("button.btn.btn-primary", {onclick: vnode.attrs.showAllOnClick}, t("all.show_all"))
                ) : m("div")
        )
    };
}