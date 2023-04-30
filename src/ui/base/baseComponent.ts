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

class StreamHook<T> {
    public value: T;
    public stream: Stream<T>;

    constructor(value: T, stream: Stream<T>) {
        this.value=value;
        this.stream=stream;
    }

    public refresh() {
        this.value = this.stream();
    }
}

export class BaseStreamComponent<TAttrs, TState> extends BaseComponent<TAttrs, TState> {
    private streamHooks: StreamHook<any>[] = [];

    protected useStream<T>(stream: Stream<T>): StreamHook<T> {
        let streamHook = new StreamHook<T>(stream(), stream);
        this.streamHooks.push(streamHook);
        return streamHook;
    }

    private refreshHooks() {
        this.streamHooks.forEach(hook => hook.refresh());
    }

    override onbeforeupdate(vnode: Mithril.Vnode<TAttrs, Mithril._NoLifecycle<this & TState>>, old: Mithril.VnodeDOM<TAttrs, Mithril._NoLifecycle<this & TState>>): boolean | void {
        this.refreshHooks();
        return super.onbeforeupdate(vnode, old);
    }

    override oninit(vnode: Mithril.Vnode<TAttrs, Mithril._NoLifecycle<this & TState>>): any {
        subscribeStream(...this.streamHooks.map(x => x.stream));
        return super.oninit(vnode);
    }
}
