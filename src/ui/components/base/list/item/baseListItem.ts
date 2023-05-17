import Mithril, {Vnode} from "mithril";
import m from "mithril";

export interface BaseListItemAttrs {
    primary: string;
    secondary: string | undefined;
    onClick: () => void;
}

export function BaseListItem(): Mithril.Component<BaseListItemAttrs> {
    return {
        view: ({attrs}: Vnode<BaseListItemAttrs>) => m("button.btn.base-list-item",
            {onclick: attrs.onClick},

            m("p.primary", attrs.primary),

            attrs.secondary ? m("p.secondary", attrs.secondary) : null
        )
    }
}