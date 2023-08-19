import Mithril, {RouteResolver} from "mithril";
import {RouteSecurity} from "@routeSecurity";
import m from "mithril";
import {Confirm} from "./confirm";

export interface ConfirmRouteAttrs {
    emailAddress: string;
}

export const ConfirmRoute: RouteResolver<ConfirmRouteAttrs> = {
    async onmatch(args: {}, requestedPath: string, route: string): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.anonymousOrHome(requestedPath);
    },

    render(vnode: Mithril.Vnode<ConfirmRouteAttrs>): Mithril.Children {
        return m(Confirm, {emailAddress: vnode.attrs.emailAddress});
    }
}