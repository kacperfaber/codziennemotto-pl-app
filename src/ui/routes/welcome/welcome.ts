import m from "mithril";
import {Layout} from "../../layout";
import {t} from "i18next";
import route from "mithril/route";

export const Welcome = function () {
    return {
        view: () => Layout.free(
            m("#app_welcome",
                m("h5", t("welcome.header")),
                m("p", t("welcome.description")),
                m("button.btn.btn-success", {onclick: () => route.set("/home")}, t("all.sign_in"))
            )
        )
    }
}