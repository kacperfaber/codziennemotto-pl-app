import m, {Vnode} from "mithril";
import {AppNavigator} from "../../appNavigator";
import {t} from "i18next";

type Link = { onClick: () => void, text: () => string };

const LinkList: Array<Link> = [
    {onClick: AppNavigator.home, text: () => t("all.home")},
    {onClick: AppNavigator.allTextSets, text: () => t("all.all_text_set")},
    {onClick: AppNavigator.joinUsingLink, text: () => t("join-links.join-using-link")}
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
        view: () => m("#app_sidenav__links",
            LinkList.map(link => {
                return m(SideNavLink, {link: link})
            })
        )
    }
}