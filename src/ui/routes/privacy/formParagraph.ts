import {AppNavigator} from "../../appNavigator";
import m from "mithril";
import {t} from "i18next";

export const FormParagraph = () => {
    return {
        view: () => m("p.paragraph.my-3",
            t("privacy.form-paragraph"),
            m("br"),
            m("button.btn-link.btn", {onclick: AppNavigator.privacy}, t("all.privacy"))
        ),
    }
}