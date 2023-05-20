import Mithril from "mithril";
import {AlertManager} from "./alertManager";

export type AlertKind = "warning" | "danger" | "primary" | "secondary" | "success" | "info";

export class AlertComponent implements Mithril.Component<any, any> {
    constructor(public attrs: any, public disappearSeconds: number | undefined = 5) {
    }

    onbeforeremove(vnode: Mithril.VnodeDOM<any, Mithril._NoLifecycle<any>>): Promise<any> | void {
        return undefined;
    }

    onbeforeupdate(vnode: Mithril.Vnode<any, Mithril._NoLifecycle<any>>, old: Mithril.VnodeDOM<any, Mithril._NoLifecycle<any>>): boolean | void {
        return undefined;
    }

    oncreate(vnode: Mithril.VnodeDOM<any, Mithril._NoLifecycle<any>>): any {
        if (this.disappearSeconds) {
            setTimeout(() => vnode.dom.remove(), this.disappearSeconds * 1000);
        }
    }

    oninit(vnode: Mithril.Vnode<any, Mithril._NoLifecycle<any>>): any {
    }

    onremove(vnode: Mithril.VnodeDOM<any, Mithril._NoLifecycle<any>>): any {
    }

    onupdate(vnode: Mithril.VnodeDOM<any, Mithril._NoLifecycle<any>>): any {
    }

    view(vnode: Mithril.Vnode<any, Mithril._NoLifecycle<any>>): Mithril.Children | void | null {
        return undefined;
    }

    ctrl = {
        close: () => {
            AlertManager.close(this);
        }
    }
}