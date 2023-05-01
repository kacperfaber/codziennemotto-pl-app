import m, {Vnode} from "mithril";
import {TextSet} from "../../../../../../services/textSet/textSet";
import route from "mithril/route";
import {Links} from "../../../../../../routes";

export interface SingleTextSetDailyViewAttrs {
    text: string;
    textSet: TextSet;
}

export function SingleTextSetDailyView() {
    return {
        view: (vnode: Vnode<SingleTextSetDailyViewAttrs>) => m(".single-text-set-daily-view",
            m(".single-text-set-daily-view-center", m("h3", vnode.attrs.text)),
            m(".single-text-set-daily-view-right",
                m("button.btn.from", {onclick: () => route.set(Links.textSetById(vnode.attrs.textSet.id))}, `from ${vnode.attrs.textSet.title}`)
            )
        )
    };
}