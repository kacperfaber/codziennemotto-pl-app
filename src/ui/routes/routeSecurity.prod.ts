import route from "mithril/route";
import {AuthenticationService} from "../../services/auth/authenticationService";
import {AppNavigator} from "../appNavigator";

class RouteSecurityProd {
    static async authenticatedOrWelcome(requestedPath: string) {
        if (!await AuthenticationService.current()) AppNavigator.welcome();
    }

    static async anonymousOrHome(requestedPath: string) {
        if (await AuthenticationService.current()) AppNavigator.home();
    }
}

export const RouteSecurity = new RouteSecurityProd();