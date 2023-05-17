import {WelcomeRoute} from "./routes/welcome/welcomeRoute";
import {LoginRoute} from "./routes/login/loginRoute";
import {AllTextSetRoute} from "./routes/textSet/all/allTextSetRoute";
import {AllTextsRoute} from "./routes/textSet/texts/all/allTextsRoute";
import {CreateNewTextSetRoute} from "./routes/textSet/createNew/createNewTextSetRoute";
import {TextSetByIdRoute} from "./routes/textSet/byId/textSetByIdRoute";
import {Links} from "./links";
import {AddTextRoute} from "./routes/textSet/addNew/addTextRoute";
import {AllReadersRoute} from "./routes/textSet/readers/all/allReadersRoute";

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
    [Links.addTextToTextSet]: AddTextRoute,

    "/readers/:textSetId": AllReadersRoute

}