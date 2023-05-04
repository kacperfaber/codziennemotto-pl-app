import {AuthenticationService} from "../../services/auth/authenticationService";

class RouteSecurityDev {
    async authenticatedOrWelcome(requestedRoute: string) {
        if (!await AuthenticationService.current()) console.warn(`RouteSecurityDev.ts -> '${requestedRoute}' should redirect to /welcome`);
    }

    async anonymousOrHome(requestedRoute: string) {
        if (await AuthenticationService.current()) console.warn(`RouteSecurityDev.ts -> '${requestedRoute}' should redirect to /home`);
    }
}

export const RouteSecurity = new RouteSecurityDev();