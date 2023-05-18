import m, {redraw} from "mithril";
import Mithril, {Vnode} from "mithril";
import {t} from "i18next";
import {TextSetService} from "../../../../services/textSet/textSetService";
import {Text} from "../../../../services/textSet/text";

interface AddTextAttrs {
    textSetId: number;
}

type VisualState = "ok" | "failed" | "none";

export function AddText(vnode: Vnode<AddTextAttrs>): Mithril.Component<AddTextAttrs> {
    const state = {text: ''};
    let vState: VisualState = "none";

    function setVisualState(val: VisualState) {
        vState = val;
        redraw();
    }

    function onSuccess() {
        setVisualState("ok");
    }

    function onFailed() {
        setVisualState("failed");
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
                m(`input[type=text]#add-text-form__input.form-control`, {
                    onchange: onTextChanged,
                    placeholder: t("add-text.input.placeholder")
                }),
                m("label", {'for': 'add-text-form__input'}, t("add-text.input.label"))
            ),

            m(".form-group.mb-3",
                vState == "ok" ? m(".text-success", t("all.success")) : null,
                vState == "failed" ? m(".text-failed", t("all.failed")) : null
            ),

            m("button.btn.btn-primary", {type: 'submit'}, t("add-text.submit"))
        )
    }
}