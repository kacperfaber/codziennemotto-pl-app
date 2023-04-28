import Mithril, {Vnode} from "mithril";
import {Layout} from "../../layout";
import m from "mithril";
import {t} from "i18next";
import route from "mithril/route";
import {Links} from "../../../routes";

export function NoData(): Mithril.Component {
    return {
        view: () => Layout.center(m("div.no-data",
            m("span.no-data-icon.icon.icon-home"),
            m("h3", t("all.no_data")),
            m("button.btn.btn-success", {onclick: () => route.set(Links.home)}, t("all.home"))
        ))
    }
}