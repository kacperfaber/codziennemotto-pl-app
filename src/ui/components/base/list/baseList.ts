import Mithril, {Vnode} from "mithril";
import m from "mithril";

export interface BaseListAttrs {
    items: Array<any>;
    makeItem: (a: any) => Vnode<any, any>;
}

export function BaseList(): Mithril.Component<BaseListAttrs> {
    return {
        view: (vnode: Vnode<BaseListAttrs>) => m(".base-list",
            vnode.attrs.items.map(vnode.attrs.makeItem)
        )
    }
}