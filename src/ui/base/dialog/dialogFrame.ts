import Mithril, {Vnode} from "mithril";
import {DialogComponent} from "./dialog";
import m from "mithril";

export function DialogFrame(vnode: Vnode<{dialog: DialogComponent}>): Mithril.Component<{dialog: DialogComponent}> {
    const opt = vnode.attrs.dialog.options();

    return {
        view: () => m(`.dialog-frame.place-${opt.placement}`, m(vnode.attrs.dialog))
    }
}