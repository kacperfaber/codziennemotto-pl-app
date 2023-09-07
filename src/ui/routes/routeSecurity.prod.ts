import route from "mithril/route";
import {AuthenticationService} from "../../services/auth/authenticationService";
import {AppNavigator} from "../appNavigator";
import {StorageService} from "../../services/storage/storageService";

class RouteSecurityProd {
    async authenticatedOrWelcome(requestedPath: string) {
        if (!StorageService.isPrivacyConsented()){
            AppNavigator.requirePrivacy();
        }

        if (!await AuthenticationService.current()) AppNavigator.welcome();
    }

    async anonymousOrHome(requestedPath: string) {
        if (!StorageService.isPrivacyConsented()){
            AppNavigator.requirePrivacy();
        }

        if (await AuthenticationService.current()) AppNavigator.home();
    }
}

export const RouteSecurity = new RouteSecurityProd();