import m from "mithril";
import {t} from "i18next";

export const Navbar = () => {
    return {view: () => m("#app_navbar", m("#app_navbar__logo", t("navbar.title")))};
}