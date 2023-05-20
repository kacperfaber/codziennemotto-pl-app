import Mithril from "mithril";
import {DialogManager} from "./dialogManager";

export interface DialogController {
    close: () => void;
}

export type DialogPlacement = "center";

export interface DialogOptions {
    placement: DialogPlacement;
}

export class DialogComponent implements Mithril.Component<any, any> {
    onbeforeremove(vnode: Mithril.VnodeDOM<any, Mithril._NoLifecycle<any>>): Promise<any> | void {
        return undefined;
    }

    onbeforeupdate(vnode: Mithril.Vnode<any, Mithril._NoLifecycle<any>>, old: Mithril.VnodeDOM<any, Mithril._NoLifecycle<any>>): boolean | void {
        return undefined;
    }

    oncreate(vnode: Mithril.VnodeDOM<any, Mithril._NoLifecycle<any>>): any {
    }

    oninit(vnode: Mithril.Vnode<any, Mithril._NoLifecycle<any>>): any {
    }

    onremove(vnode: Mithril.VnodeDOM<any, Mithril._NoLifecycle<any>>): any {
    }

    onupdate(vnode: Mithril.VnodeDOM<any, Mithril._NoLifecycle<any>>): any {
    }

    view(vnode: Mithril.Vnode<any, Mithril._NoLifecycle<any>>): Mithril.Children | void | null {
        return null;
    }

    options(): DialogOptions {
        throw "Dialog options must be overrided";
    }

    protected ctrl: DialogController = {
        close: () => DialogManager.close(this)
    }
}