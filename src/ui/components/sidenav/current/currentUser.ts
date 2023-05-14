import m, {Vnode} from "mithril";
import {t} from "i18next";
import {AppNavigator} from "../../../appNavigator";
import {UserStore} from "../../../../store/user/userStore";
import {User} from "../../../../services/user/user";
import {AuthenticationService} from "../../../../services/auth/authenticationService";

function SideNavCurrentUser_None() {
    return {
        view: () => m("#app_sidenav__current__none",
            m("button.btn.btn-success", {onclick: () => AppNavigator.login()}, t("all.sign_in"))
        )
    }
}

function SideNavCurrentUser_Presentation() {
    return {
        view: (vnode: Vnode<{ user: User }>) => m("#app_sidenav__current__presentation",
            m("h5.username", vnode.attrs.user.username),
            m("p.email", vnode.attrs.user.email),
            m("button.btn#app_sidenav__current__presentation__logout", {onclick: AuthenticationService.logout}, t("all.logout"))
        )
    }
}

export function SideNavCurrentUser() {
    return {
        view: () => m("#app_sidenav__current",
            UserStore.current() ? m(SideNavCurrentUser_Presentation, {user: UserStore.current()!!}) : m(SideNavCurrentUser_None)
        )
    }
}