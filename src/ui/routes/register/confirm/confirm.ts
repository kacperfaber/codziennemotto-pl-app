import {BaseComponent} from "../../../base/baseComponent";
import Mithril from "mithril";
import {Layout} from "../../../layout";
import m from "mithril";
import {t} from "i18next";
import {RegisterService} from "../../../../services/register/registerService";
import {DialogManager} from "../../../base/dialog/dialogManager";
import {AppNavigator} from "../../../appNavigator";

type ConfirmAttrs = {
    emailAddress: string;
}

let code: string = "";

function onSuccess() {
    AppNavigator.login();
    DialogManager.info(t("register_confirm.confirmed-successfully"), t("register_confirm.you-can-login-now"));
}

function onFailed() {
    DialogManager.info(t("register_confirm.could-not-confirm"), t("register_confirm.try-again"));
}

function onSubmit(e: Event, emailAddress: string) {
    e.preventDefault();

    RegisterService.confirm(emailAddress, code)
        .then(onSuccess)
        .catch(onFailed);
}

export class Confirm extends BaseComponent<ConfirmAttrs, any> {
    override view(vnode: Mithril.Vnode<ConfirmAttrs, Mithril._NoLifecycle<any>>): Mithril.Children | void | null {
        return Layout.free(
            m("#app_register_confirm",
                Layout.center(
                    Layout.withHeader(t("register_confirm.title"), t("register_confirm.body") ?? undefined,
                        m("form.form", {onsubmit: (e: Event) => onSubmit(e, vnode.attrs.emailAddress)},
                            m(".form-floating.my-2",
                                m("input[type=email]#app_register_confirm__email_address.form-control", {value: vnode.attrs.emailAddress}),
                                m("label", {"for": 'app_register_confirm__email_address'}, t("register_confirm.email.label"))
                            ),

                            m(".form-floating.my-2",
                                m("input[type=text]#app_register_confirm__code.form-control", {
                                    onchange: (e: InputEvent) => code = (e.target as HTMLInputElement).value,
                                    placeholder: t("register_confirm.code.placeholder")
                                }),

                                m("label", {"for": 'app_register_confirm__username'}, t("register_confirm.code.label"))
                            ),

                            m("button.btn.btn-success[type=submit]", t("register_confirm.submit"))
                        )
                    )
                )
            )
        )
    }
}