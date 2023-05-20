import Mithril from "mithril";
import {DialogManager} from "./dialogManager";

export interface DialogController<T> {
    close: (data: T) => void;
}

export type DialogPlacement = "center";

export type DialogAnimationIn = "slide-in";

export interface DialogOptions {
    placement: DialogPlacement;
    animationIn: DialogAnimationIn | undefined;
}

export class DialogComponent implements Mithril.Component<any, any> {
    constructor(public attrs: any) {
    }


    view(vnode: Mithril.Vnode<any, Mithril._NoLifecycle<any>>): Mithril.Children | void | null {
        return null;
    }

    options(): DialogOptions {
        throw "Dialog options must be overrided";
    }

    protected ctrl: DialogController<any> = {
        close: (data: any = undefined) => DialogManager.close(this)
    }
}

export class AwaitableDialogComponent<T> extends DialogComponent {
    constructor(attrs: any) {
        super(attrs);
    }

    public resolve: ((t: T) => void) | undefined = undefined;
    public reject: (() => void) | undefined = undefined;

    protected tryResolve(t: T) {
        if (!this.resolve) {
            throw "Cannot resolve";
        }
        this.resolve(t);
    }

    protected tryReject() {
        if (!this.reject) {
            throw "Cannot reject";
        }
        this.reject();
    }

    override ctrl: DialogController<T> = {
        close: (data: T) => {
            DialogManager.close(this);
            this.tryResolve(data);
        }
    }
}