import m, {redraw, Vnode} from "mithril";
import {TextSetService} from "../../../../../services/textSet/textSetService";
import {TextSet} from "../../../../../services/textSet/textSet";
import {t} from "i18next";
import {TextSetPreview} from "../textSetPreview";

// TODO: 1) It's able to run all the time.
//  2) Calls another component...

export interface LiveTextSetPreviewAttrs {
    textSetId: number;
}

export function LiveTextSetPreview() {
    let textSet: undefined | TextSet = undefined;

    function loadData(id: number) {
        TextSetService.getById(id)
            .then(data => {textSet = data; redraw()})
            .catch();
    }

    return {
        view: () => {
            if (!textSet){
                return m(".text-set-preview.live-text-set-preview",
                    m("h3.loading", t("all.loading")),
                    m("span.spinner-border.spinner-border-sm")
                );
            }

            const {id, title, description} = textSet!!;

            return m(TextSetPreview, {id, title, description});
        },

        oninit: (vnode: Vnode<LiveTextSetPreviewAttrs>) => {
            loadData(vnode.attrs.textSetId);
        }
    }
}