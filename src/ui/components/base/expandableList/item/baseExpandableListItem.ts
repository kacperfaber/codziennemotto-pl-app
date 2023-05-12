import Mithril, {Vnode} from "mithril";
import m from "mithril";

export interface BaseExpandableListItemAttrs {
    primary: string;
    secondary: string | undefined;
    onClick: () => void;
}

export function BaseExpandableListItem(): Mithril.Component<BaseExpandableListItemAttrs> {
    return {
        view: ({attrs}: Vnode<BaseExpandableListItemAttrs>) => m("button.btn.base-expandable-list-item",
            {onclick: attrs.onClick},
            m("p.primary", attrs.primary),
            attrs.secondary ? m("p.secondary", attrs.secondary) : null
        )
    }
}