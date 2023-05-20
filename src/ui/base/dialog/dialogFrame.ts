import Mithril, {Vnode} from "mithril";
import {DialogComponent} from "./dialog";
import m from "mithril";

export function DialogFrame(vnode: Vnode<{dialog: DialogComponent}>): Mithril.Component<{dialog: DialogComponent}> {
    const opt = vnode.attrs.dialog.options();

    function getAnimationInOrEmptyString(): string {
        return opt.animationIn ? `.${opt.animationIn}` : "";
    }

    return {
        view: () => m(`.dialog-frame.place-${opt.placement}${getAnimationInOrEmptyString()}`,
            m(vnode.attrs.dialog, {...vnode.attrs.dialog.attrs})
        )
    }
}