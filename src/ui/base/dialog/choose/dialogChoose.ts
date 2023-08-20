import {AwaitableDialogComponent, DialogOptions} from "../dialog";
import Mithril, {Vnode} from "mithril";
import m from "mithril";

export type DialogChooseAnswer = "act_1" | "act_2";

export interface DialogChooseAttrs {
    title: string;
    text: string;
    action1: string;
    action2: string;
}

export class DialogChoose extends AwaitableDialogComponent<DialogChooseAnswer | undefined> {
    constructor(attrs: any) {
        super(attrs);
    }

    action1Click = () => {
        this.ctrl.close("act_1");
    }

    action2Click = () => {
        this.ctrl.close("act_2");
    }

    override view({attrs}: Vnode<DialogChooseAttrs>): Mithril.Children | void | null {
        return m(".dialog-yes-no", // TODO:
            m(".modal-dialog", {role: 'document'},
                m(".modal-content",
                    m(".modal-header",
                        m("h5.modal-title", attrs.title)
                    ),
                    m(".modal-body",
                        m("p", attrs.text)
                    ),
                    m(".modal-footer",
                        m("button.btn.btn-secondary", {onclick: this.action1Click}, attrs.action1),
                        m("button.btn.btn-secondary", {onclick: this.action2Click}, attrs.action2)
                    )
                )
            )
        )
    }

    options(): DialogOptions {
        return {placement: "center", animationIn: "slide-in"};
    }
}