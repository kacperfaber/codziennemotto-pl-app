import {AlertComponent, AlertKind} from "./alertComponent";
import Mithril from "mithril";
import m from "mithril";

interface StringAlertAttrs {
    text: string;
    kind: AlertKind;
}

export function StringAlert(attrs: StringAlertAttrs, disappearSeconds: number | undefined): AlertComponent {
    return new class extends AlertComponent {
        constructor() {
            super(attrs, disappearSeconds);
        }

        override view(vnode: Mithril.Vnode<StringAlertAttrs, Mithril._NoLifecycle<any>>): Mithril.Children | void | null {
            return m(`.base-alert.alert.alert-${attrs.kind}`,
                vnode.attrs.text,
                m("button.btn", m("span.icon.icon-cancel", {onclick: this.ctrl.close}))
            )
        }
    }
}