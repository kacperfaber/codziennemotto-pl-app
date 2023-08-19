import Mithril, {RouteResolver} from "mithril";
import {AuthenticationService} from "../../../../../services/auth/authenticationService";
import {RouteSecurity} from "@routeSecurity";
import m from "mithril";
import {ReaderById} from "./readerById";

interface ReaderByIdRouteAttrs {
    textSetId: number;
    readerId: number;
}

export const ReaderByIdRoute: RouteResolver<ReaderByIdRouteAttrs> = {
    async onmatch(args: {}, requestedPath: string, route: string): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.authenticatedOrWelcome(requestedPath);
    },

    render(vnode: Mithril.Vnode<ReaderByIdRouteAttrs>): Mithril.Children {
        return m(ReaderById, {readerId: vnode.attrs.readerId, textSetId: vnode.attrs.textSetId});
    }
}