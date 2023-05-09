import m, {Vnode} from "mithril";
import {AppNavigator} from "../../../appNavigator";
import Mithril from "mithril";

export interface TextSetPreviewAttrs {
    id: number;
    title: string, description: string;
}

export function TextSetPreview(): Mithril.Component<TextSetPreviewAttrs> {
    return {
        view: (vnode: Vnode<TextSetPreviewAttrs>) => m("button.btn.text-set-preview",
            {onclick: () => AppNavigator.textSetById(vnode.attrs.id)},
            m("h3.title", vnode.attrs.title),
            m("p.description", vnode.attrs.description),
        )
    }
}