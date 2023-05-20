import {AlertComponent} from "./alertComponent";
import Mithril from "mithril";
import m from "mithril";

export type StringAlertKind = "warning" | "danger" | "primary" | "secondary" | "success" | "info";

interface StringAlertAttrs {
    text: string;
    kind: StringAlertKind;
}

export function StringAlert(attrs: StringAlertAttrs): AlertComponent {
    return new class extends AlertComponent {
        constructor() {
            super(attrs);
        }

        override view(vnode: Mithril.Vnode<StringAlertAttrs, Mithril._NoLifecycle<any>>): Mithril.Children | void | null {
            return m(`.string-alert.alert.alert-${attrs.kind}`,
                vnode.attrs.text,
                m("button.btn", m("span.icon.icon-cancel", {onclick: this.ctrl.close}))
            )
        }
    }
}