import m from "mithril";
import {Layout} from "../../layout";
import {t} from "i18next";

export const Login = function () {
    return {
        view: () => Layout.free(
            m("#app_login",
                Layout.center(

                    m("#app_login__form.form", {onsubmit: (e: Event) => e.preventDefault()},

                        m(".form-group",
                            m("label", {'for': 'inputLogin'}, t("login.enter_login")),
                            m("input#inputLogin[type=text].form-control")
                        ),

                        m(".form-group.my-3",
                            m("label", {'for': 'inputPassword'}, t("login.enter_password")),
                            m("input#inputPassword[type=password].form-control")
                        ),

                        m("button.btn.btn-primary", {type: 'submit'}, t("login.submit"))
                    )

                )
            )
        )
    }
}