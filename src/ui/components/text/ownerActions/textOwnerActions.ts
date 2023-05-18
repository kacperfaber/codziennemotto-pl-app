import Mithril from "mithril";
import m, {Vnode} from "mithril";
import {TextSetService} from "../../../../services/textSet/textSetService";
import {t} from "i18next";

interface TextOwnerActionsAttrs {
    textId: number;
    textSetId: number;
    onDeleted: () => void;
}

export function TextOwnerActions({attrs}: Vnode<TextOwnerActionsAttrs>): Mithril.Component<TextOwnerActionsAttrs> {
    function deleteText() {
        TextSetService.deleteText(attrs.textSetId, attrs.textId)
            .then(attrs.onDeleted)
            .catch(() => {
            }) // TODO: Show Error Page
    }

    return {
        view: () => m(".text-owner-actions",
            m("button.btn.btn-danger", {onclick: deleteText}, t("all.delete"))
        )
    }
}