import {AuthenticationService} from "./services/auth/authenticationService";
import route from "mithril/route";

export class RouteSecurity {
    static async authenticatedOrWelcome() {
        if (!await AuthenticationService.current()) route.set(Links.welcome);
    }

    static async anonymousOrHome() {
        if (await AuthenticationService.current()) route.set(Links.home);
    }
}

export const Links = {
    welcome: "/welcome",
    home: "/home"
}