import {BaseComponent} from "../../../base/baseComponent";
import {Layout} from "../../../layout";
import m from "mithril";
import {t} from "i18next";
import {TextSetService} from "../../../../services/textSet/textSetService";
import {TextSet} from "../../../../services/textSet/textSet";

export function CreateNewTextSet() {
    const state = {title: '', description: ''};

    function onSubmit(event: Event) {
        event.preventDefault();

        TextSetService.createNewTextSet(state.title, state.description)
            .then(onSuccess)
            .catch(onFailed);
    }

    function onFailed() {
        let button = document.getElementById("app_create_new_text_set__form__submit")!!;
        button.classList.remove("btn-primary");
        button.classList.add("btn-error");
    }

    function onSuccess(textSet: TextSet) {
        let button = document.getElementById("app_create_new_text_set__form__submit")!!;
        button.classList.remove("btn-primary");
        button.classList.add("btn-success");
    }

    function onTitleChanged(ev: Event) {
        state.title = (ev.target as HTMLInputElement).value;
        resetVisualState();
    }

    function onDescriptionChanged(ev: Event) {
        state.description = (ev.target as HTMLInputElement).value;
        resetVisualState();
    }

    function resetVisualState() {
        let buttonClassList = document.getElementById("app_create_new_text_set__form__submit")!!.classList;
        buttonClassList.remove("btn-success", "btn-error");
        buttonClassList.add("btn-primary");
    }

    return new class extends BaseComponent<any, any> {
        override view() {
            // TODO: Missing some headers and texts.
            return Layout.free(
                m("#app_text_set_create_new",
                    Layout.centerNodes(
                        Layout.withHeader(
                            t("create-text-set.title"),
                            t("create-text-set.body") ?? undefined,
                            m("div")
                        ),

                        m("form#app_create_new_text_set__form", {onsubmit: onSubmit},
                            m(".form-floating#app_create_new_text_set__form__title",
                                m("input[type=text]#app_create_new_text_set__form__input_title.form-control", {
                                    onchange: onTitleChanged,
                                    'placeholder': t("create-text-set.form.title.placeholder")
                                }),
                                m("label", {'for': 'app_create_new_text_set__form__input_title'}, t("create-text-set.form.title.label"))
                            ),

                            m(".form-floating#app_create_new_text_set__form__description",
                                m("input[type=text]#app_create_new_text_set__form__input_description.form-control", {
                                    onchange: onDescriptionChanged,
                                    'placeholder': t("create-text-set.form.description.placeholder")
                                }),
                                m("label", {'for': 'app_create_new_text_set__form__input_description'}, t("create-text-set.form.description.placeholder"))
                            ),

                            /* Replace with spinner. TODO */
                            m("button#app_create_new_text_set__form__submit[type=submit].btn.btn-primary", t("all.ok"))
                        )
                    )
                )
            )
        }
    };
}