import {DialogComponent, DialogOptions} from "../dialog";
import m, {Vnode} from "mithril";
import {t} from "i18next";

export interface DialogInfoAttrs {
    title: string;
    text: string;
}

export function DialogInfo(attrs: any): DialogComponent {
    return new class extends DialogComponent {
        constructor() {
            super(attrs);
        }

        override options(): DialogOptions {
            return {placement: "center", animationIn: "slide-in"};
        }

        override view({attrs}: Vnode<DialogInfoAttrs>) {
            return m(".dialog-info",
                m(".modal-dialog", {role: 'document'},
                    m(".modal-content",
                        m(".modal-header",
                            m("h5.modal-title", attrs.title)
                        ),
                        m(".modal-body",
                            m("p", attrs.text)
                        ),
                        m(".modal-footer",
                            m("button.btn.btn-primary", {onclick: this.ctrl.close}, t("all.ok"))
                        )
                    )
                )
            )
        }
    }
}