import {BaseComponent} from "../../base/baseComponent";
import Mithril, {redraw} from "mithril";
import m from "mithril";
import {RegisterService} from "../../../services/register/registerService";
import {Layout} from "../../layout";
import {t} from "i18next";
import {DialogManager} from "../../base/dialog/dialogManager";
import {StringAlert} from "../../base/alert/stringAlert";

let username = "";
let emailAddress = "";
let password = "";
let failed = false;

function v(e: InputEvent): string {
    return (e.target as HTMLInputElement).value;
}

const onSuccess = () => {
    console.log("success");
    DialogManager.info(t("all.success"), t("register.check-email"));
}

const onFailed = () => {
    console.log("failed");
    failed = true;
    redraw();
    DialogManager.info(t("all.something-went-wrong"), t("register.could-not-register"));
}

export class Register extends BaseComponent<any, any> {


    view(vnode: Mithril.Vnode<any, Mithril._NoLifecycle<any>>): Mithril.Children | void | null {
        return Layout.free(
            m("#app_register",
                Layout.center(
                    Layout.withHeader(t("register.title"), t("register.body") ?? undefined,
                        m("form.form", {onsubmit: this.onSubmit},
                            m(".form-floating.my-2",
                                m("input[type=text]#app_register__username.form-control", {
                                    onchange: (e: InputEvent) => username = v(e),
                                    placeholder: t("register.username.placeholder")
                                }),

                                m("label", {"for": 'app_register__username'}, t("register.username.label"))
                            ),

                            m(".form-floating.my-2",
                                m("input[type=email]#app_register__email.form-control", {
                                    onchange: (e: InputEvent) => emailAddress = v(e),
                                    placeholder: t("register.email_address.placeholder")
                                }),

                                m("label", {"for": 'app_register__email_address'}, t("register.email.label"))
                            ),

                            m(".form-floating.my-2",
                                m("input[type=password]#app_register__password.form-control", {
                                    onchange: (e: InputEvent) => password = v(e),
                                    placeholder: t("register.password.placeholder")
                                }),

                                m("label", {"for": 'app_register__password'}, t("register.password.label"))
                            ),

                            failed ? m("label", {style: {'color': 'red'}}, t("register.could-not-register")) : null,

                            m("button.btn.btn-success[type=submit]", t("all.register_in"))
                        )
                    )
                )
            )
        )
    }

    private onSubmit(e: Event) {
        e.preventDefault();

        RegisterService.register(username, emailAddress, password)
            .then(onSuccess)
            .catch(onFailed)
    }
}