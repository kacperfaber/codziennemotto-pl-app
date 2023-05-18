import m, {Vnode} from "mithril";
import Mithril from "mithril";
import {t} from "i18next";
import {TextSetService} from "../../../../services/textSet/textSetService";
import {Text} from "../../../../services/textSet/text";

interface AddTextAttrs {
    textSetId: number;
}

export function AddText(vnode: Vnode<AddTextAttrs>): Mithril.Component<AddTextAttrs> {
    const state = {text: ''};

    function onSuccess(text: Text) {
        alert("Created Text");
        console.log(JSON.stringify(text));
    }

    function onFailed() {

    }

    function onSubmit(ev: Event) {
        ev.preventDefault();

        TextSetService.createText(vnode.attrs.textSetId, state.text, null, 0)
            .then(onSuccess)
            .catch(onFailed);
    }

    function onTextChanged(ev: Event) {
        state.text = (ev.target as HTMLInputElement).value;
    }

    return {
        view: () => m("form.add-text-form.form",
            {onsubmit: onSubmit},

            m(".form-floating.my-3",
                m(`input[type=text].form-control`, {
                    onchange: onTextChanged,
                    placeholder: t("add-text.input.placeholder")
                }),
                m("label", {'for': ''}, t("add-text.input.label"))
            ),

            m("button.btn.btn-primary", {type: 'submit'}, t("add-text.submit"))
        )
    }
}