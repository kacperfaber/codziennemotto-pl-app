import m from "mithril";
import {DialogManager} from "./dialogManager";
import {DialogFrame} from "./dialogFrame";

export const DialogContainer = {
    view: () => m(".dialog-container",
        DialogManager.dialogs.map(d => m(DialogFrame, {dialog: d}))
    )
}