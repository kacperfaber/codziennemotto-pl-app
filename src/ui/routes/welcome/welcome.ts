import m from "mithril";
import {Layout} from "../../layout";
import {t} from "i18next";
import route from "mithril/route";
import {BaseComponent} from "../../base/baseComponent";

export const Welcome = function () {
    return new class extends BaseComponent<any, any> {
        override view() {
            return Layout.free(
                m("#app_welcome",
                    m("h5", t("welcome.header")),
                    m("p", t("welcome.description")),
                    m("button.btn.btn-success", {onclick: () => route.set("/home")}, t("all.sign_in"))
                )
            )
        }
    }
}