import {AuthenticationService} from "./services/auth/authenticationService";
import route from "mithril/route";

export const Links = {
    welcome: "/welcome",
    home: "/home",

    textById: (id: number) => {throw new Error("Links -> textById not implemented")},

    textSetById: (id: number) => {throw new Error("Links -> textSetById not implemented")}
}