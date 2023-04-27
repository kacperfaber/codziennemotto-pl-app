import {Vnode} from "mithril";
import m from "mithril";
import {Layout} from "../../../layout";
import {TextSetList} from "../../../components/textSet/list/TextSetList";
import {TextSet} from "../../../../services/textSet/textSet";
import {t} from "i18next";

export interface AllTextSetAttrs {
    mine: Array<TextSet>; // TODO: | undefined or not?
}

export function AllTextSet() {
    return {
        view: (vnode: Vnode<AllTextSetAttrs>) => Layout.free(
            m(".container",
                m(".row",
                    m(".col-12.col-lg-4.offset-lg-1",
                        m("h3", t("all.mine-text-sets")),
                        m(TextSetList, {items: vnode.attrs.mine})
                    )
                )
            )
        )
    };
}