import Mithril, {RouteResolver} from "mithril";
import {RouteSecurity} from "@routeSecurity";
import {CreateNewTextSet} from "./createNewTextSet";
import m from "mithril";

export const CreateNewTextSetRoute: RouteResolver = {
    async onmatch(args: {}, requestedPath: string, route: string): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.authenticatedOrWelcome(requestedPath);
    },

    render() {
        return m(CreateNewTextSet);
    }
}