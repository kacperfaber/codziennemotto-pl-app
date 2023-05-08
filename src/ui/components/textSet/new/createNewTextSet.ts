import m, {redraw} from "mithril";
import {t} from "i18next";
import {TextSetService} from "../../../../services/textSet/textSetService";
import {TextSet} from "../../../../services/textSet/textSet";

// TODO: I'm using a visualState and redraw, cause I don't know better idea. When it's a component,
//  without static ids because component can be used twice.

export function CreateNewTextSet() {
    const state = {title: ''};

    const visualState = {
        success: false,
        failed: false
    };

    function onSubmit(ev: Event) {
        ev.preventDefault();

        TextSetService.createNewTextSet(state.title, "" /* TODO: description can't be null */)
            .then(onSuccess)
            .catch(onFailed);
    }

    function onSuccess(textSet: TextSet) {
        visualState.success = true;
        visualState.failed = false;
        redraw();
    }

    function onFailed() {
        visualState.failed = true;
        visualState.success = false;
        redraw();
    }

    function onTitleChanged(ev: Event) {
        state.title = (ev.target as HTMLInputElement).value;
    }

    return {
        // TODO: create-new-text-set-input-title - WTF?

        view: () => m(".create-new-text-set",
            m("form.create-new-text-set-form", {onsubmit: onSubmit},
                m(".form-floating.my-3",
                    m(`input[type=text].form-control`, {
                        onchange: onTitleChanged,
                        placeholder: t("text-set.create-new.input_title.placeholder")
                    }),
                    m("label", {'for': 'create-new-text-set-input-title'}, t("text-set.create-new.input_title.label"))
                ),

                m(".form-group.mb-3",
                    visualState.failed ? m("label", {style: {'color': 'red'}}, t("text-set.create-new.label_error")) : m(".d-none"),
                    visualState.success ? m("label", {style: {'color': 'green'}}, t("text-set.create-new.label_success")) : m(".d-none"),
                ),

                m("button.btn.btn-primary[type=submit]", t("text-set.create-new.submit"))
            )
        )
    }
}