import m from "mithril";
import {t} from "i18next";
import {Layout} from "../../../../layout";

export function LoadingScreen() {
    return {
        view: () => Layout.free(
            Layout.center(
                m("#app_loading",
                    m("h4", t("all.pending-loading")),
                    m(".spinner-border")
                )
            )
        )
    }
}