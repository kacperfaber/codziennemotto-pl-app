import Mithril, {redraw, Vnode} from "mithril";
import m from "mithril";
import {JoinLink} from "../../../../services/joinLink/joinLink";
import {JoinLinkService} from "../../../../services/joinLink/joinLinkService";
import {t} from "i18next";
import {Clipboard} from "../../../../cap/clipboard";

interface CreateNewJoinLink_CreateAttrs {
    createJoinLink: () => void
}

function CreateNewJoinLink_Create(): Mithril.Component<CreateNewJoinLink_CreateAttrs> {
    return {
        view: (vnode: Vnode<CreateNewJoinLink_CreateAttrs>) => m(".create-join-link__create",
            m("button.btn.btn-primary", {onclick: vnode.attrs.createJoinLink}, t("join-links.create-new"))
        )
    }
}

interface CreateNewJoinLink_GeneratedAttrs {
    joinLink: JoinLink;
    reset: () => void;
    copy: () => void;
}

function CreateNewJoinLink_Generated(): Mithril.Component<CreateNewJoinLink_GeneratedAttrs> {
    return {
        view: ({attrs}: Vnode<CreateNewJoinLink_GeneratedAttrs>) => m(".create-new-join-link__generated",
            m(".create-new-join-link__generated__input.form-control", {'disabled': true},
                m("h3.create-new-join-link__generated__input__text",
                    attrs.joinLink.code,
                    m("button.btn.create-new-join-link__generated__copy", {onclick: attrs.copy},
                        m("span.icon.icon-paste")
                    )
                ),
                m("button.btn.create-new-join-link__generated__reset", {onclick: attrs.reset}, m("span.icon.icon-cancel"))
            )
        )
    }
}

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
        throw new Error("createNewJoinLink.ts->onFailed not implemented.");
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

    const copy = async () => {
        await Clipboard.saveString(generatedJoinLink!!.code);
    }

    return {
        view: () => m(".create-new-join-link",
            generatedJoinLink ? m(CreateNewJoinLink_Generated, {joinLink: generatedJoinLink, copy, reset}) : m(CreateNewJoinLink_Create, {createJoinLink})
        )
    }
}