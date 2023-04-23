import Mithril, {RouteResolver} from "mithril";
import {Welcome} from "./welcome";
import m from "mithril";
import {RouteSecurity} from "../../../routes";

export const WelcomeRoute: RouteResolver = {
    async onmatch(): Promise<Mithril.ComponentTypes<any, any> | Promise<any> | void> {
        await RouteSecurity.anonymousOrHome();
    },

    render(): Mithril.Children {
        return m(Welcome);
    }
}