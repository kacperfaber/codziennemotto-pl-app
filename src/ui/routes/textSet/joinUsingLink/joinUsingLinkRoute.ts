import Mithril, {RouteResolver} from "mithril";
import {RouteSecurity} from "@routeSecurity";
import {JoinUsingLink} from "./joinUsingLink";
import m from "mithril";

export const JoinUsingLinkRoute: RouteResolver = {
    async onmatch(args: {}, requestedPath: string, route: string): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.authenticatedOrWelcome(requestedPath)
    },

    render(vnode: Mithril.Vnode<{}, {}>): Mithril.Children {
        return m(JoinUsingLink);
    }
}