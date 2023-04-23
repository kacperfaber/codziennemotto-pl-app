import m from "mithril";
import {Layout} from "../../layout";
import {t} from "i18next";
import {AuthenticationService} from "../../../services/auth/authenticationService";

export const Login = function () {
    const state = {login: '', password: ''};

    function onSubmit(e: Event) {
        e.preventDefault();

        const {login, password} = state;

        AuthenticationService.authenticate(login, password)
            .then((x) => x ? onSuccess() : onFailed());
    }

    function onSuccess() {}

    function onFailed() {}

    function onLoginChange(e: Event) {
        state.login = (e.target as HTMLInputElement).value;
    }

    function onPasswordChange(e: Event) {
        state.password = (e.target as HTMLInputElement).value;
    }

    return {
        view: () => Layout.free(
            m("#app_login",
                Layout.center(

                    m("form#app_login__form.form", {onsubmit: onSubmit},

                        m(".form-group",
                            m("label", {'for': 'inputLogin'}, t("login.enter_login")),
                            m("input#inputLogin[type=text].form-control", {onchange: onLoginChange})
                        ),

                        m(".form-group.my-3",
                            m("label", {'for': 'inputPassword'}, t("login.enter_password")),
                            m("input#inputPassword[type=password].form-control", {onchange: onPasswordChange})
                        ),

                        m("button.btn.btn-primary", {type: 'submit'}, t("login.submit"))
                    )

                )
            )
        )
    }
}