import Mithril, {Vnode} from "mithril";
import {DialogComponent} from "./dialog";
import m from "mithril";

export function DialogFrame(vnode: Vnode<{dialog: DialogComponent}>): Mithril.Component<{dialog: DialogComponent}> {
    return {
        view: () => m(".dialog-frame", vnode.attrs.dialog)
    }
}