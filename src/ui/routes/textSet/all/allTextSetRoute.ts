import m, {RouteResolver} from "mithril";
import {AllTextSet} from "./allTextSet";
import Mithril from "mithril";
import {RouteSecurity} from "@routeSecurity";

export const AllTextSetRoute: RouteResolver = {
    onmatch: async (args, requestedPath, route) => await RouteSecurity.authenticatedOrWelcome(requestedPath),

    render(): Mithril.Children {
        return m(AllTextSet);
    }
}