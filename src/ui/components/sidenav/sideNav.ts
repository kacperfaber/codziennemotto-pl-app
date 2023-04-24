import m from "mithril";
import {SideNavCtrl} from "./sideNavCtrl";

export const SideNav = function () {
    return {
        view: () => m("#app_sidenav",
            m("button.#app_sidenav__close.btn",
                m("span#app_sidenav__close__icon.icon-cancel.icon", {onclick: SideNavCtrl.close})
            )
        )
    };
}