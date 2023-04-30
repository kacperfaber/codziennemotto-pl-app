import Mithril, {Vnode} from "mithril";
import Stream from "mithril/stream";
import {subscribeStream} from "../subscribeStream";

export class BaseComponent<TAttrs, TState> implements Mithril.Component<TAttrs, TState> {
    onbeforeremove(vnode: Mithril.VnodeDOM<TAttrs, Mithril._NoLifecycle<this & TState>>): Promise<any> | void {
        return undefined;
    }

    onbeforeupdate(vnode: Mithril.Vnode<TAttrs, Mithril._NoLifecycle<this & TState>>, old: Mithril.VnodeDOM<TAttrs, Mithril._NoLifecycle<this & TState>>): boolean | void {
        return undefined;
    }

    oncreate(vnode: Mithril.VnodeDOM<TAttrs, Mithril._NoLifecycle<this & TState>>): any {
    }

    oninit(vnode: Mithril.Vnode<TAttrs, Mithril._NoLifecycle<this & TState>>): any {
    }

    onremove(vnode: Mithril.VnodeDOM<TAttrs, Mithril._NoLifecycle<this & TState>>): any {
    }

    onupdate(vnode: Mithril.VnodeDOM<TAttrs, Mithril._NoLifecycle<this & TState>>): any {
    }

    view(vnode: Mithril.Vnode<TAttrs, Mithril._NoLifecycle<this & TState>>): Mithril.Children | void | null {
        return undefined;
    }

}

export class BaseStreamComponent<TAttrs, TState> extends BaseComponent<TAttrs, TState> {
    public streams: Stream<any>[] = [];

    oninit(vnode: Mithril.Vnode<TAttrs, Mithril._NoLifecycle<this & TState>>): any {
        subscribeStream(...this.streams);
        return super.oninit(vnode);
    }
}
