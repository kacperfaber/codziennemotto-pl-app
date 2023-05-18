import m, {Vnode} from "mithril";
import {Text} from "../../../../../services/textSet/text";
import {AppNavigator} from "../../../../appNavigator";

export interface TextListItemAttrs {
    item: Text;
}

export function TextListItem() {
    return {
        view: (vnode: Vnode<TextListItemAttrs>) =>
            m("btn.text-item", {onclick: () => AppNavigator.textById(vnode.attrs.item.textSetId, vnode.attrs.item.id)},
                m("h5.text", vnode.attrs.item.text),
                m("p.id", vnode.attrs.item.id)
            )
    }
}

export interface TextsListAttrs {
    items: Text[];
}

export function TextsList() {
    return {
        view: (vnode: Vnode<TextsListAttrs>) => m(".texts-list",
            vnode.attrs.items.map((item) => m(TextListItem, {item: item}))
        )
    }
}