import Mithril, {RouteResolver} from "mithril";
import {RouteSecurity} from "@routeSecurity";
import {AddText} from "./addText";
import m from "mithril";

export interface AddTextRouteAttrs {
    textSetId: number;
}

export const AddTextRoute: RouteResolver<AddTextRouteAttrs> = {
    async onmatch(args: {}, requestedPath: string, route: string): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.authenticatedOrWelcome(requestedPath);
    },

    render(vnode: Mithril.Vnode<AddTextRouteAttrs>): Mithril.Children {
        return m(AddText, {textSetId: vnode.attrs.textSetId});
    }
}