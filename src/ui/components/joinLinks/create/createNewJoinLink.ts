import Mithril, {redraw, Vnode} from "mithril";
import m from "mithril";
import {JoinLink} from "../../../../services/joinLink/joinLink";
import {JoinLinkService} from "../../../../services/joinLink/joinLinkService";

export interface CreateNewJoinLinkAttrs {
    textSetId: number;
}

export function CreateNewJoinLink(vnode: Vnode<CreateNewJoinLinkAttrs>): Mithril.Component<CreateNewJoinLinkAttrs> {
    let generatedJoinLink: JoinLink | undefined = {code: 'ABC123', id: 0, activeUntil: "2023-01-01", textSetId: 1};

    const onSuccess = (d: JoinLink) => {
        generatedJoinLink = d;
        redraw();
    };

    const onFailed = () => {
        // TODO: Show error
    };

    const createJoinLink = () => {
        JoinLinkService.createJoinLink(vnode.attrs.textSetId)
            .then(onSuccess)
            .catch(onFailed);
    };

    const reset = () => {
        generatedJoinLink = undefined;
        redraw();
    }

    const copy = () => {
        // TODO: Copy to clipboard.
    }

    return {
        view: () => m(".create-new-join-link",
            m(".create-new-join-link__generated",
                m(".create-new-join-link__generated__input.form-control", {'disabled': true},
                    m("h3.create-new-join-link__generated__input__text",
                        generatedJoinLink!!.code,
                        m("button.btn.create-new-join-link__generated__copy", {onclick: copy},
                            m("span.icon.icon-paste")
                        )
                    ),
                    m("button.btn.create-new-join-link__generated__reset", {onclick: reset}, m("span.icon.icon-cancel"))
                )
            )
        )
    }
}