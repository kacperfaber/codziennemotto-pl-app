import Mithril, {RouteResolver} from "mithril";
import {TextSetById} from "./textSetById";
import m from "mithril";
import {RouteSecurity} from "@routeSecurity";

export const TextSetByIdRoute: RouteResolver<{id: number}> = {
    async onmatch(args: {id: number}, requestedRoute: string): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.authenticatedOrWelcome(requestedRoute)
    },

    render(vnode: Mithril.Vnode<{id: number}>): Mithril.Children {
        return m(TextSetById, {id: vnode.attrs.id})
    }
}