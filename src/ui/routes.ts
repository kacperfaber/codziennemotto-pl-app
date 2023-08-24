import {WelcomeRoute} from "./routes/welcome/welcomeRoute";
import {LoginRoute} from "./routes/login/loginRoute";
import {AllTextSetRoute} from "./routes/textSet/all/allTextSetRoute";
import {AllTextsRoute} from "./routes/textSet/texts/all/allTextsRoute";
import {CreateNewTextSetRoute} from "./routes/textSet/createNew/createNewTextSetRoute";
import {TextSetByIdRoute} from "./routes/textSet/byId/textSetByIdRoute";
import {Links} from "./links";
import {AllReadersRoute} from "./routes/textSet/readers/all/allReadersRoute";
import {TextByIdRoute} from "./routes/textSet/textById/textByIdRoute";
import {HomeRoute} from "./routes/home/homeRoute";
import {ReaderByIdRoute} from "./routes/textSet/readers/byId/readerByIdRoute";
import {JoinUsingLinkRoute} from "./routes/textSet/joinUsingLink/joinUsingLinkRoute";
import {RegisterRoute} from "./routes/register/registerRoute";
import {ConfirmRoute} from "./routes/register/confirm/confirmRoute";
import {JoinLinksListRoute} from "./routes/textSet/joinLinks/joinLinksListRoute";
import {RequirePrivacy} from "./routes/privacy/requirePrivacy";

export const Routes = {
    [Links.welcome]: WelcomeRoute,

    /* login */
    [Links.login]: LoginRoute,


    /* textSet's */
    [Links.createNewTextSet]: CreateNewTextSetRoute,
    [Links.textSetByIdLink]: TextSetByIdRoute,
    [Links.allTextSets]: AllTextSetRoute,

    /* texts */
    [Links.allTextsLink]: AllTextsRoute,

    [Links.allReadersLink]: AllReadersRoute,
    [Links.textByIdLink]: TextByIdRoute,
    [Links.home]: HomeRoute,
    [Links.readerByIdLink]: ReaderByIdRoute,
    [Links.joinUsingLink]: JoinUsingLinkRoute,

    [Links.register]: RegisterRoute,
    [Links.confirmLink]: ConfirmRoute,

    [Links.joinLinkListLink]: JoinLinksListRoute,

    [Links.requirePrivacy]: RequirePrivacy
}