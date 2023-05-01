import {AuthenticationService} from "./services/auth/authenticationService";
import route from "mithril/route";

// TODO: Create RouteSecurity and some other things profile-dependant. I want to try with filename 'routes.{dev}.ts'.

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
    home: "/home",

    textById: (id: number) => {throw new Error("Links -> textById not implemented")},

    textSetById: (id: number) => {throw new Error("Links -> textSetById not implemented")}
}