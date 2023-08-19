import {initLanguage} from "./language/initLanguage";
import {UserStore} from "./store/user/userStore";
import {AuthenticationService} from "./services/auth/authenticationService";
import route from "mithril/route";
import {Routes} from "./ui/routes";
import {Links} from "./ui/links";

initLanguage().then(
    () => {
        AuthenticationService.current().then(user => {
            UserStore.current(user);
            console.log(`setting UserStore to ${JSON.stringify(user)}`)


        }).catch(() => UserStore.current(undefined)).finally(() => {
            route(document.body, Links.home, Routes);
        })

    }
)