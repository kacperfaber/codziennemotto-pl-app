import m, {Vnode} from "mithril";
import {t} from "i18next";
import route from "mithril/route";
import {Links} from "../../links";

type Link = { route: string, text: string };

const LinkList: Array<Link> = [
    {route: Links.home, text: "all.home"}
];

interface SideNavLinkAttrs {
    link: Link
}

const SideNavLink = {
    view: (vnode: Vnode<SideNavLinkAttrs, never>) => m(".app-sidenav-link",
        m("button.btn.app-sidenav-link-button", {onclick: () => route.set(vnode.attrs.link.route)}, t(vnode.attrs.link.text))
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