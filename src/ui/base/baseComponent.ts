import Mithril, {Vnode} from "mithril";
import Stream from "mithril/stream";
import {subscribeStream} from "../subscribeStream";

export class BaseComponent implements Mithril.Component {
    onbeforeremove(vnode: Mithril.VnodeDOM<{}, Mithril._NoLifecycle<this & {}>>): Promise<any> | void {
        return undefined;
    }

    onbeforeupdate(vnode: Mithril.Vnode<{}, Mithril._NoLifecycle<this & {}>>, old: Mithril.VnodeDOM<{}, Mithril._NoLifecycle<this & {}>>): boolean | void {
        return undefined;
    }

    oncreate(vnode: Mithril.VnodeDOM<{}, Mithril._NoLifecycle<this & {}>>): any {
    }

    oninit(vnode: Mithril.Vnode<{}, Mithril._NoLifecycle<this & {}>>): any {
    }

    onremove(vnode: Mithril.VnodeDOM<{}, Mithril._NoLifecycle<this & {}>>): any {
    }

    onupdate(vnode: Mithril.VnodeDOM<{}, Mithril._NoLifecycle<this & {}>>): any {
    }

    view(vnode: Mithril.Vnode<{}, Mithril._NoLifecycle<this & {}>>): Mithril.Children | void | null {
        return undefined;
    }
}

export class BaseStreamComponent extends BaseComponent {
    public streams: Stream<any>[] = [];

    override oninit(vnode: Mithril.Vnode<{}, Mithril._NoLifecycle<this & {}>>): any {
        subscribeStream(...this.streams);
    }
}
