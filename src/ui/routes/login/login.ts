import m from "mithril";
import {Layout} from "../../layout";
import {t} from "i18next";
import {AuthenticationService} from "../../../services/auth/authenticationService";
import {BaseComponent} from "../../base/baseComponent";

export const Login = function () {
    const state = {login: '', password: ''};

    function onSubmit(e: Event) {
        e.preventDefault();

        const {login, password} = state;

        AuthenticationService.authenticate(login, password)
            .then((x) => x ? onSuccess() : onFailed());
    }

    function onSuccess() {}

    function onFailed() {
        document.getElementById("app_login__login_error")!!.classList.remove("disabled");
    }

    function onLoginChange(e: Event) {
        state.login = (e.target as HTMLInputElement).value;
    }

    function onPasswordChange(e: Event) {
        state.password = (e.target as HTMLInputElement).value;
    }

    return new class extends BaseComponent<any, any> {
        override view() {
            return Layout.free(
                m("#app_login",
                    Layout.center(

                        m("form#app_login__form.form", {onsubmit: onSubmit},

                            m(".form-floating#app_login__form__input_login",
                                m("input#inputLogin[type=text].form-control", {'placeholder': t("login.login_placeholder")}),
                                m("label", {'for': t("inputLogin")}, t("login.login_label"))
                            ),

                            m(".form-floating#app_login__form__input_password",
                                m("input#inputPassword[type=password].form-control", {'placeholder': t("login.password_placeholder")}),
                                m("label", {'for': 'inputPassword'}, t("login.login_password"))
                            ),

                            m(".form-group.mb-3",

                                m("label#app_login__login_error.disabled", {style: {color: 'red'}}, t("login.login_error"))

                            ),

                            m("button.btn.btn-primary", {type: 'submit'}, t("login.submit"))
                        )

                    )
                )
            )
        }
    }
}