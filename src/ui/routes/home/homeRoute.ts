import Mithril, {RouteResolver} from "mithril";
import {RouteSecurity} from "@routeSecurity";
import m from "mithril";
import {Home} from "./home";

export const HomeRoute: RouteResolver = {
    async onmatch(args: {}, requestedPath: string, route: string): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.authenticatedOrWelcome(requestedPath);
    },

    render(): Mithril.Children {
        return m(Home);
    }
}