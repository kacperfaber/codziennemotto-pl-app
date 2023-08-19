import m from "mithril";
import {Layout} from "../../layout";
import {t} from "i18next";
import {AuthenticationService} from "../../../services/auth/authenticationService";
import {BaseComponent} from "../../base/baseComponent";
import {AlertManager} from "../../base/alert/alertManager";
import {AppNavigator} from "../../appNavigator";

export const Login = function () {
    const state = {login: '', password: ''};

    function onSubmit(e: Event) {
        e.preventDefault();

        setSubmitButtonSpinner();
        disableSubmit();

        const {login, password} = state;

        AuthenticationService.authenticate(login, password)
            .then((x) => x ? onSuccess() : onFailed());
    }

    function onSuccess() {
        setSubmitButtonContent();
        activateSuccessMessage();
        disableFailedMessage();
        AlertManager.pushString(t("all.login.logged_in_successfully"), "success");
    }

    function onFailed() {
        activateFailedMessage();
        setSubmitButtonContent();
        enableSubmit();
        activateFailedMessage();
        disableSuccessMessage();
        AlertManager.pushString(t("all.login.login_error"), "danger");
    }

    function activateFailedMessage() {
        document.getElementById("app_login__login_error")!!.classList.remove("disabled");
    }

    function disableFailedMessage() {
        document.getElementById("app_login__login_error")!!.classList.add("disabled");
    }

    function activateSuccessMessage() {
        document.getElementById("app_login__login_success")!!.classList.remove("disabled");
    }

    function disableSuccessMessage() {
        document.getElementById("app_login__login_success")!!.classList.add("disabled");
    }

    function getSubmitButtonSpinner(): HTMLElement | null {
        return document.querySelector("#app_login__form__submit > .spinner");
    }

    function getSubmitButtonContent(): HTMLElement | null {
        return document.querySelector("#app_login__form__submit > .content");
    }

    function setSubmitButtonSpinner() {
        activateSpinnerInSubmitButton();
        disableContentInSubmitButton();
    }

    function setSubmitButtonContent() {
        activateContentInSubmitButton();
        disableSpinnerInSubmitButton();
    }

    function activateContentInSubmitButton() {
        getSubmitButtonContent()!!.classList.remove("disabled");
    }

    function disableContentInSubmitButton() {
        getSubmitButtonContent()!!.classList.add("disabled");
    }

    function activateSpinnerInSubmitButton() {
        getSubmitButtonSpinner()!!.classList.add("active");
    }

    function disableSpinnerInSubmitButton() {
        getSubmitButtonSpinner()!!.classList.remove("active");
    }

    function getSubmitButton(): HTMLElement | null {
        return document.getElementById("app_login__form__submit");
    }

    function disableSubmit() {
        getSubmitButton()!!.setAttribute("disabled", "true");
    }

    function enableSubmit() {
        getSubmitButton()!!.removeAttribute("disabled");
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
                                m("input#inputLogin[type=text].form-control", {onchange: onLoginChange,'placeholder': t("login.login_placeholder")}),
                                m("label", {'for': "inputLogin"}, t("login.login_label"))
                            ),

                            m(".form-floating#app_login__form__input_password",
                                m("input#inputPassword[type=password].form-control", {onchange: onPasswordChange, 'placeholder': t("login.password_placeholder")}),
                                m("label", {'for': 'inputPassword'}, t("login.password_label"))
                            ),

                            m(".form-group.mb-3",

                                m("label#app_login__login_error.disabled", {style: {color: 'red'}}, t("login.login_error")),
                                m("label#app_login__login_success.disabled", {style: {color: 'green'}}, t("login.login_success"))
                            ),

                            m("button#app_login__form__submit.btn.btn-primary", {type: 'submit'},
                                m("span.content", t("login.submit")),
                                m("span.spinner.spinner-border.spinner-border-sm")
                            ),

                            m("button.btn.btn-link", {onclick: AppNavigator.register, type: 'button'},
                                t("all.instead-register-in")
                            )
                        )
                    )
                )
            )
        }
    }
}