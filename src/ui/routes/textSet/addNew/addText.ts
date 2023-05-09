import {BaseComponent} from "../../../base/baseComponent";
import Mithril, {Vnode} from "mithril";
import {Layout} from "../../../layout";
import m from "mithril";
import {t} from "i18next";
import {Text} from "../../../../services/textSet/text";
import {TextSetService} from "../../../../services/textSet/textSetService";

export interface AddTextAttrs {
    textSetId: number;
}

export function AddText(vnode: Vnode<AddTextAttrs>): Mithril.Component<AddTextAttrs> {
    const state = {text: '', order: 0, date: null};

    function onSubmit(ev: Event) {
        ev.preventDefault();

        console.log("submitting form with " + JSON.stringify({...state, ...vnode.attrs}));

        TextSetService.createText(vnode.attrs.textSetId, state.text, state.date, state.order)
            .then(onSuccess)
            .catch(onFailed);
    }

    function requireButton(): HTMLElement {
        return document.getElementById("app_add_text__form__submit")!!
    }

    function onSuccess(text: Text) {
        let buttonClassList = requireButton().classList;
        buttonClassList.add("btn-success");
        buttonClassList.remove("btn-primary");
        console.log("success");
    }

    function onFailed() {
        let buttonClassList = requireButton().classList;
        buttonClassList.add("btn-danger");
        buttonClassList.remove("btn-primary");
        console.log("failed");
    }

    function onTextChanged(ev: Event) {
        state.text = (ev.target as HTMLInputElement).value;
        console.log("text changed " + state.text);
    }

    return new class extends BaseComponent<AddTextAttrs, any> {
        override view(vnode: Vnode<AddTextAttrs>): Mithril.Children | void | null {
            return Layout.free(
                m("#app_add_text",
                    Layout.center(
                        m("form#app_add_text__form", {onsubmit: onSubmit},
                            m(".form-floating",
                                m("input.form-control#app_add_text__form__input_text[type=text]", {
                                    onchange: onTextChanged,
                                    placeholder: t("text-set.add-text.input_text.placeholder")
                                }),
                                m("label", {'for': 'app_add_text__form__input_text'}, t("text-set.add-text.input_text.label"))
                            ),

                            m("button#app_add_text__form__submit.btn.btn-primary", {type: 'submit'}, t("text-set.add-text.submit"))
                        )
                    )
                )
            )
        }
    }
}