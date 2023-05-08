import Mithril, {RouteResolver} from "mithril";
import {RouteSecurity} from "@routeSecurity";
import {AllTexts, AllTextsAttrs} from "./allTexts";
import m from "mithril";

export interface AllTextsRouteAttrs {
    id: number;
}

export const AllTextsRoute: RouteResolver<AllTextsRouteAttrs> = {
    async onmatch(args: {}, requestedPath: string, route: string): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.authenticatedOrWelcome(requestedPath);
    },

    render(vnode: Mithril.Vnode<AllTextsRouteAttrs, any>): Mithril.Children {
        return m(AllTexts, {textSetId: vnode.attrs.id});
    }
}