import m, {Vnode} from "mithril";
import {AppNavigator} from "../../appNavigator";
import {t} from "i18next";
import {UserStore} from "../../../store/user/userStore";

type LinkVisibility = "only_user" | "only_anonymous" | "both";

type Link = { visibility: LinkVisibility, onClick: () => void, text: () => string };

const LinkList: Array<Link> = [
    {visibility: "only_anonymous", onClick: AppNavigator.login, text: () => t("all.sign_in")},
    {visibility: "only_anonymous", onClick: AppNavigator.register, text: () => t("all.register_in")},
    {visibility: "only_user", onClick: AppNavigator.home, text: () => t("all.home")},
    {visibility: "only_user", onClick: AppNavigator.allTextSets, text: () => t("all.all_text_set")},
    {visibility: "only_user", onClick: AppNavigator.createTextSet, text: () => t("all.create-text-set")},
    {visibility: "only_user", onClick: AppNavigator.joinUsingLink, text: () => t("join-links.join-using-link")},
    {visibility: "both", onClick: AppNavigator.privacy, text: () => t("all.privacy")}
];

interface SideNavLinkAttrs {
    link: Link
}

const SideNavLink = {
    view: (vnode: Vnode<SideNavLinkAttrs, never>) => m(".app-sidenav-link",
        m("button.btn.app-sidenav-link-button", {onclick: vnode.attrs.link.onClick}, vnode.attrs.link.text())
    )
}

export const SideNavLinks = function () {
    return {
        view: () => {
            const user = UserStore.current();

            return m("#app_sidenav__links",
                LinkList
                    .filter(link => ((link.visibility == "only_user") && user) || (link.visibility == "only_anonymous" && !user) || link.visibility == "both")
                    .map(link => m(SideNavLink, {link: link}))
            )
        }
    }
}