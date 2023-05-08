import {AuthenticationService} from "./services/auth/authenticationService";

export const Links = {
    welcome: "/welcome",
    home: "/home",

    textById: (id: number) => {throw new Error("Links -> textById not implemented")},

    textSetById: (id: number) => {throw new Error("Links -> textSetById not implemented")},

    allTexts: (id: number) => {throw new Error('Links -> allTexts not implemented')}
}