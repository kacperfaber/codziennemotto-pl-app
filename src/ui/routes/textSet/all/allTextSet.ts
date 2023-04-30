import m from "mithril";
import Mithril, {Vnode} from "mithril";
import {Layout} from "../../../layout";
import {TextSetList} from "../../../components/textSet/list/TextSetList";
import {t} from "i18next";
import {TextSetStore} from "../../../../store/textSet/textSetStore";
import {subscribeStream} from "../../../subscribeStream";
import {TextSet} from "../../../../services/textSet/textSet";
import {NoData} from "../../../components/noData/noData";
import {BaseComponent, BaseStreamComponent} from "../../../base/baseComponent";

interface AllTextSet_WithDataAttrs {
    mine: TextSet[];
    notMine: TextSet[];
}

function AllTextSet_WithData(): Mithril.Component<AllTextSet_WithDataAttrs> {
    return {
        view: (vnode: Vnode<AllTextSet_WithDataAttrs>) =>
            m(".container",
                m(".row",
                    m("#app_all_text_set__mine.col-12.col-lg-4.offset-lg-1",
                        m("#app_all_text_set__mine__header",
                            m("h3", t("all.mine_text_sets")),
                            m("p", t("all_text_set.there_is_only_your_text_sets"))
                        ),
                        m(TextSetList, {items: vnode.attrs.mine})
                    ),

                    m("#app_all_text_set__not_mine.col-12.col-lg-4.offset-lg-1",
                        m("#app_all_text_set__mine__header",
                            m("h3", t("all.not_mine_text_sets")),
                            m("p", t("all_text_set.there_is_text_sets_you_read"))
                        ),
                        m(TextSetList, {items: vnode.attrs.notMine})
                    )
                )
            )
    }
}

export function AllTextSet() {
    function validateData(mine: TextSet[] | undefined, notMine: TextSet[] | undefined): boolean {
        return (mine !== undefined && notMine !== undefined);
    }

    return new class extends BaseStreamComponent<any, any> {
        mine = this.useStream(TextSetStore.mine);
        notMine = this.useStream(TextSetStore.notMine);

        override view() {
            return Layout.free(
                validateData(this.mine.value, this.notMine.value) ? m(AllTextSet_WithData, {mine: this.mine.value!!, notMine: this.notMine.value!!}) : m(NoData)
            )
        }
    }
}