import Mithril, {RouteResolver, Vnode} from "mithril";
import {Welcome} from "./welcome";
import m from "mithril";
import {RouteSecurity} from "@routeSecurity";


export const WelcomeRoute: RouteResolver = {
    async onmatch(requestedPath: string): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.anonymousOrHome(requestedPath);
    },

    render(): Mithril.Children {
        return m(Welcome);
    }
}