import {AlertComponent, AlertKind} from "./alertComponent";
import Mithril from "mithril";
import m, {Vnode} from "mithril";

interface NodeAlertAttrs {
    node: Vnode<any, any>;
    kind: AlertKind;
}

export function NodeAlert(attrs: NodeAlertAttrs, disappearSeconds: number | undefined) {
    return new class extends AlertComponent {
        constructor() {
            super(attrs, disappearSeconds);
        }

        override view(vnode: Mithril.Vnode<NodeAlertAttrs, Mithril._NoLifecycle<any>>): Mithril.Children | void | null {
            return m(`.base-alert.alert-${vnode.attrs.kind}.alert`,
                vnode.attrs.node,
                m("button.btn",
                    m("span.icon-cancel.icon", {onclick: this.ctrl.close})
                )
            )
        }
    }
}