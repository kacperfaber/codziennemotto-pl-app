import {Layout} from "../../layout";
import {t} from "i18next";
import m from "mithril";
import {AppNavigator} from "../../appNavigator";
import {RodoUrl} from "./rodoUrl";

export function Privacy() {
    return {
        view: () => Layout.free(
            Layout.centerNodes(
                Layout.withHeader(
                    t("privacy.title"),
                    t("privacy.body") ?? undefined,
                    m("div", {style:{'margin-bottom': '25px'}},
                        m("button.btn.btn-link.my-4", {onclick: () => window.location.replace(RodoUrl)}, t("require-privacy.click-to-see-rodo"))
                    )
                ),

                Layout.withHeader(
                    t("privacy.cookies.title"),
                    t("privacy.cookies.body") ?? undefined,
                    m("div.mb-4", {style:{'margin-bottom': '25px'}})
                ),

                m("button.btn.btn-primary", {onclick: AppNavigator.home}, t("all.home"))
            )
        )
    }
}