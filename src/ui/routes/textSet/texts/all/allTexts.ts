import {BaseComponent} from "../../../../base/baseComponent";
import Mithril, {redraw, Vnode} from "mithril";
import {TextSetService} from "../../../../../services/textSet/textSetService";
import {Text} from "../../../../../services/textSet/text";
import {Layout} from "../../../../layout";
import m from "mithril";
import {TextSet} from "../../../../../services/textSet/textSet";
import {TextsList} from "../../../../components/textSet/texts/list/textsList";
import {NoData} from "../../../../components/noData/noData";

export function AllTexts_SetTitle() {
    return {
        view: (vnode: Vnode<{
            title: string,
            description: string
        }>) => m("div.all-texts-text-set-header", m("h5.title", vnode.attrs.title), m("p.description", vnode.attrs.description))
    }
}

export interface AllTextsAttrs {
    textSetId: number;
}

export function AllTexts() {
    let visibleTexts: Array<Text> | undefined = undefined;
    let textSet: TextSet | undefined = undefined;

    return new class extends BaseComponent<AllTextsAttrs, any> {

        oninit(vnode: Mithril.Vnode<AllTextsAttrs, Mithril._NoLifecycle<any>>): any {
            TextSetService.getAllVisibleTexts(vnode.attrs.textSetId)
                .then(data => {
                    visibleTexts = data;
                    redraw();
                })
                .catch(() => visibleTexts = undefined);


            TextSetService.getById(vnode.attrs.textSetId)
                .then(data => textSet = data)
                .catch(() => textSet = undefined);

            return super.oninit(vnode);
        }

        override view() {
            return Layout.free(
                m("#app_text_set_all_texts",
                    Layout.center(
                        (visibleTexts !== undefined && textSet !== undefined) ?
                            m("div",
                                m("#app_text_set_all_texts__header",
                                    m(AllTexts_SetTitle, {title: textSet!!.title, description: textSet!!.description})
                                ),

                                m("#app_text_set_all_texts__text_list",
                                    m(TextsList, {items: visibleTexts!!})
                                )
                            ) : m(NoData)
                    )
                )
            )
        }
    }
}