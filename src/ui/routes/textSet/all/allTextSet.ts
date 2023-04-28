import {Vnode} from "mithril";
import m from "mithril";
import {Layout} from "../../../layout";
import {TextSetList} from "../../../components/textSet/list/TextSetList";
import {TextSet} from "../../../../services/textSet/textSet";
import {t} from "i18next";
import {TextSetStore} from "../../../../store/textSet/textSetStore";
import {subscribeStream} from "../../../subscribeStream";

export function AllTextSet() {
    let mine = TextSetStore.mine();

    return {
        oninit: () => {
            subscribeStream(TextSetStore.mine);
        },

        onbeforeupdate: () => {
            mine = TextSetStore.mine();
        },

        view: () => Layout.free(
            m(".container",
                m(".row",
                    m(".col-12.col-lg-4.offset-lg-1",
                        m("h3", t("all.mine-text-sets")),
                        mine === undefined ? m("h5", "break danych") : m(TextSetList, {items: mine})
                    )
                )
            )
        )
    };
}