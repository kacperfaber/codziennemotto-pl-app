import Mithril, {RouteResolver} from "mithril";
import {RouteSecurity} from "@routeSecurity";
import m from "mithril";
import {AllReaders} from "./allReaders";

export interface AllReadersRouteAttrs {
    textSetId: number;
}

export const AllReadersRoute: RouteResolver<AllReadersRouteAttrs> = {
    async onmatch(args: AllReadersRouteAttrs, requestedPath: string): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.authenticatedOrWelcome(requestedPath);
    },

    render(vnode: Mithril.Vnode<AllReadersRouteAttrs>): Mithril.Children {
        return m(AllReaders, {textSetId: vnode.attrs.textSetId})
    }
}