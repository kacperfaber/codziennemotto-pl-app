import Mithril, {Vnode} from "mithril";
import m from "mithril";

function BaseExpandableList_Footer(): Mithril.Component<any> {
    return {
        view: (vnode: Vnode<{ button: BaseExpandableList_Button }>) => m(".expandable-list__footer",
            m("button.btn.btn-primary", {onclick: vnode.attrs.button.onClick}, vnode.attrs.button.text)
        )
    }
}

type BaseExpandableList_Button = {
    onClick: (() => void),
    text: string
}

export interface BaseExpandableListAttrs {
    items: Array<any>;
    button: BaseExpandableList_Button | undefined,
    makeItem: (t: any) => Vnode<any, any> | null;
}

export function BaseExpandableList(): Mithril.Component<BaseExpandableListAttrs> {
    return {
        view: (vnode: Vnode<BaseExpandableListAttrs>) => m(".expandable-list",
            m(".expandable-list__list",
                vnode.attrs.items.map(i => vnode.attrs.makeItem(i))
            ),

            vnode.attrs.button ? m(BaseExpandableList_Footer, {button: vnode.attrs.button}) : null
        )
    };
}