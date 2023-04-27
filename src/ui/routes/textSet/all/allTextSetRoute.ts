import {RouteSecurity} from "../../../../routes";
import m, {RouteResolver} from "mithril";
import {AllTextSet} from "./allTextSet";

export const AllTextSetRoute: RouteResolver = {
    onmatch: () => RouteSecurity.authenticatedOrWelcome(),

    // TODO: Inject data from store, or IDK.

    render: () => m(AllTextSet, {mine: []})
}