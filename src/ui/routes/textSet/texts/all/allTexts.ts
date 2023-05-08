import {BaseComponent} from "../../../../base/baseComponent";
import Mithril, {redraw, Vnode} from "mithril";
import {TextSetService} from "../../../../../services/textSet/textSetService";
import {Text} from "../../../../../services/textSet/text";
import {Layout} from "../../../../layout";
import m from "mithril";
import {TextSet} from "../../../../../services/textSet/textSet";
import {TextsList} from "../../../../components/textSet/texts/list/textsList";

export function AllTexts_SetTitle() {
    return {
        view: (vnode: Vnode<{ title: string, description: string }>) => m("h5", vnode.attrs.title)
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
                (visibleTexts !== undefined && textSet !== undefined) ?

                m("#app_text_set_all_texts",
                    m("#app_text_set_all_texts__header",
                        m(AllTexts_SetTitle, {title: textSet!!.title, description: textSet!!.description})
                    ),

                    m("#app_text_set_all_texts__text_list",
                        m(TextsList, {items: visibleTexts!!})
                    )
                )

                    : m("div", "brak danych")
            )
        }
    }
}