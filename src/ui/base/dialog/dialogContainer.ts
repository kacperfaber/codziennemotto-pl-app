import m from "mithril";
import Mithril, {Vnode} from "mithril";
import {DialogManager} from "./dialogManager";

interface DialogFrameAttrs {
    dialog: Mithril.Component<any, any>;
}

function DialogFrame({attrs}: Vnode<DialogFrameAttrs>): Mithril.Component<DialogFrameAttrs, any> {
    function close() {
        DialogManager.close(attrs.dialog);
    }

    return {
        view: (vnode: Vnode<DialogFrameAttrs>) => m(".dialog-frame",
            vnode.attrs.dialog
        )
    }
}

export const DialogContainer = {
    view: () => m(".dialog-container",
        DialogManager.dialogs.map(dialog => m(DialogFrame, {dialog}))
    )
}