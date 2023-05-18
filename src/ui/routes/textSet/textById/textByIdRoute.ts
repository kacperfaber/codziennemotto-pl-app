import Mithril, {RouteResolver} from "mithril";
import {RouteSecurity} from "@routeSecurity";
import {TextById} from "./textById";
import m from "mithril";

export interface TextByIdRouteAttrs {
    textSetId: number;
    textId: number;
}

export const TextByIdRoute: RouteResolver<TextByIdRouteAttrs> = {
    async onmatch(args: TextByIdRouteAttrs, requestedPath: string): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.authenticatedOrWelcome(requestedPath);
    },

    render(vnode: Mithril.Vnode<TextByIdRouteAttrs, {}>): Mithril.Children {
        return m(TextById, vnode.attrs);
    }
}