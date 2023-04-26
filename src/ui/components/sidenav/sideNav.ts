import m from "mithril";
import {SideNavCtrl} from "./sideNavCtrl";
import {SideNavLinks} from "./sideNavLinks";

function SideNavCloseButton() {
    return {
        view: () =>
            m("button.btn#app_sidenav__close_button",
                {onclick: SideNavCtrl.close},
                m("span.icon.icon-cancel")
            )
    };
}

export const SideNav = function () {
    return {
        view: () => m("#app_sidenav",
            m(SideNavCloseButton),
            m(SideNavLinks)
        )
    };
}