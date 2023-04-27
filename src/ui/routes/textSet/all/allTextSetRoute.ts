import {RouteSecurity} from "../../../../routes";
import m, {RouteResolver} from "mithril";
import {AllTextSet} from "./allTextSet";
import Mithril from "mithril";

export const AllTextSetRoute: RouteResolver = {
    onmatch: () => RouteSecurity.authenticatedOrWelcome(),

    // TODO: Inject data from store, or IDK.

    render(): Mithril.Children {
        return m(AllTextSet);
    }
}