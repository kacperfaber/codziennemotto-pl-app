import Mithril, {RouteResolver} from "mithril";
import {RouteSecurity} from "@routeSecurity";
import m from "mithril";
import {Register} from "./register";

export const RegisterRoute: RouteResolver = {
    async onmatch(args: {}, requestedPath: string, route: string): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.anonymousOrHome(requestedPath);
    },

    render(vnode: Mithril.Vnode<{}, {}>): Mithril.Children {
        return m(Register);
    }
}