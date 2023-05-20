import Mithril from "mithril";
import {DialogManager} from "./dialogManager";

export interface DialogController {
    close: () => void;
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

    protected ctrl: DialogController = {
        close: () => DialogManager.close(this)
    }
}

export class AwaitableDialogComponent extends DialogComponent {

}