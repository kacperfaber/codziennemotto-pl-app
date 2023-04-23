import Mithril, {RouteResolver} from "mithril";
import {RouteSecurity} from "../../../routes";
import m from "mithril";
import {Login} from "./login";

export const LoginRoute: RouteResolver = {
    async onmatch(): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.anonymousOrHome();
    },

    render(): Mithril.Children {
        return m(Login);
    }
}