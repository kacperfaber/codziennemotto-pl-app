import Mithril, {RouteResolver} from "mithril";
import m from "mithril";
import {Login} from "./login";
import {RouteSecurity} from "@routeSecurity";

export const LoginRoute: RouteResolver = {
    async onmatch(requestedPath: string): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.anonymousOrHome(requestedPath);
    },

    render(): Mithril.Children {
        return m(Login);
    }
}