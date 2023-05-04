import route from "mithril/route";
import {AuthenticationService} from "../../services/auth/authenticationService";
import {Links} from "../../routes";

class RouteSecurityProd {
    static async authenticatedOrWelcome(requestedPath: string) {
        if (!await AuthenticationService.current()) route.set(Links.welcome);
    }

    static async anonymousOrHome(requestedPath: string) {
        if (await AuthenticationService.current()) route.set(Links.home);
    }
}

export const RouteSecurity = new RouteSecurityProd();