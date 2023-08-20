import Mithril, {RouteResolver} from "mithril";
import {RouteSecurity} from "@routeSecurity";
import m from "mithril";
import {JoinLinksList} from "./joinLinksList";

type JoinLinksListRouteAttrs = {
    textSetId: number;
}

export const JoinLinksListRoute: RouteResolver<JoinLinksListRouteAttrs> = {
    async onmatch(args: {}, requestedPath: string, route: string): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.authenticatedOrWelcome(requestedPath);
    },

    render(vnode: Mithril.Vnode<JoinLinksListRouteAttrs>): Mithril.Children {
        return m(JoinLinksList, {textSetId: vnode.attrs.textSetId});
    }
}