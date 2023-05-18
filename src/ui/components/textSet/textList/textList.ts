import Mithril, {Vnode} from "mithril";
import {Text} from "../../../../services/textSet/text";
import m from "mithril";
import {t} from "i18next";
import route from "mithril/route";
import {AppNavigator} from "../../../appNavigator";

export function TextListItem() {
    return {
        view: (vnode: Vnode<{text: Text}>) => m("button.btn.text-list-item",
            {onclick: () => AppNavigator.textById(vnode.attrs.text.textSetId, vnode.attrs.text.id)},
            m("h5.text", vnode.attrs.text.text),
            m("p.id", `${t("all.id")}: ${vnode.attrs.text.id}`)
        )
    }
}

export interface TextListAttrs {
    texts: Array<Text>;
}

export function TextList(): Mithril.Component<TextListAttrs, any> {
    return {
        view: (vnode: Vnode<TextListAttrs>) => {
            return m(".text-list",
                vnode.attrs.texts.map(text => m(TextListItem, {text: text}))
            );
        }
    }
}