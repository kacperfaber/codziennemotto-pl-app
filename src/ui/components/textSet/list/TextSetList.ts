import m, {Vnode} from "mithril";
import {TextSet} from "../../../../services/textSet/textSet";
import {AppNavigator} from "../../../appNavigator";


export interface TextSetListAttrs {
    items: Array<TextSet>;
}

export function TextSetListItem() {
    return {
        view: (vnode: Vnode<{ item: TextSet }>) => m("btn.btn.text-set-list-item",
            {onclick: () => AppNavigator.textSetById(vnode.attrs.item.id)},
            m("h5", vnode.attrs.item.title),
            m("p", vnode.attrs.item.description)
        )
    }
}

export function TextSetList() {
    return {
        view: (vnode: Vnode<TextSetListAttrs>) => m(".text-set-list",
            vnode.attrs.items.map(textSet => m(TextSetListItem, {item: textSet}))
        )
    }
}