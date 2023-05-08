import m, {redraw} from "mithril";
import {SideNavCtrl} from "./sideNavCtrl";
import {SideNavLinks} from "./sideNavLinks";
import {UserStore} from "../../../store/user/userStore";
import {SideNavCurrentUser} from "./current/currentUser";

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
        oninit: () => {
            UserStore.current.map(() => redraw());
        },

        view: () => m("#app_sidenav",
            m(SideNavCloseButton),
            m(SideNavLinks),
            m(SideNavCurrentUser)
        )
    };
}