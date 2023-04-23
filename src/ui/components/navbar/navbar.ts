import m from "mithril";
import {t} from "i18next";

export const Navbar = () => {
    return {
        view: () => m("#app_navbar",
            m("button#app_navbar__menu_button.btn", m("span#app_navbar__menu_button__icon.icon.icon-menu")),
            m("#app_navbar__logo", t("navbar.title"))
        )
    };
}