import {AwaitableDialogComponent, DialogOptions} from "../dialog";
import Mithril from "mithril";
import m, {Vnode} from "mithril";
import {t} from "i18next";

export type YesNo = "yes" | "no";

export interface DialogYesNoAttrs {
    title: string;
    text: string;
}

export class DialogYesNo extends AwaitableDialogComponent<YesNo> {
    constructor(attrs: any) {
        super(attrs);
    }

    yesClick = () => {
        this.ctrl.close("yes");
    }

    noClick = () => {
        this.ctrl.close("no");
    }

    override view({attrs}: Vnode<DialogYesNoAttrs>): Mithril.Children | void | null {
        return m(".dialog-prompt",
            m(".modal-dialog", {role: 'document'},
                m(".modal-content",
                    m(".modal-header",
                        m("h5.modal-title", attrs.title)
                    ),
                    m(".modal-body",
                        m("p", attrs.text)
                    ),
                    m(".modal-footer",
                        m("button.btn.btn-success", {onclick: this.yesClick}, t("all.yes")),
                        m("button.btn.btn-danger", {onclick: this.noClick}, t("all.no"))
                    )
                )
            )
        )
    }

    options(): DialogOptions {
        return {placement: "center", animationIn: "slide-in"};
    }
}