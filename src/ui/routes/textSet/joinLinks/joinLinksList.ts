import {BaseComponent} from "../../../base/baseComponent";
import Mithril from "mithril";
import m, {redraw, Vnode} from "mithril";
import {Layout} from "../../../layout";
import {t} from "i18next";
import {BaseList} from "../../../components/base/list/baseList";
import {JoinLink} from "../../../../services/joinLink/joinLink";
import {JoinLinkService} from "../../../../services/joinLink/joinLinkService";
import {AlertManager} from "../../../base/alert/alertManager";
import {BaseListItem} from "../../../components/base/list/item/baseListItem";
import {DialogManager} from "../../../base/dialog/dialogManager";
import {DialogChooseAnswer} from "../../../base/dialog/choose/dialogChoose";
import {ClipboardService} from "../../../../cap/clipboardService";

type JoinLinksListAttrs = {
    textSetId: number;
}

let joinLinks: Array<JoinLink> | undefined;

function fetchJoinLinks(textSetId: number) {
    JoinLinkService.getJoinLinks(textSetId)
        .then(j => {
            joinLinks = j;
            redraw()
        })
        .catch(() => AlertManager.pushString(t("all.something-went-wrong")));
}

const JoinLinksList_List = {
    view: ({attrs}: Vnode<{ joinLinks: Array<JoinLink> }>) => m(BaseList, {
        items: attrs.joinLinks,
        makeItem: (item: JoinLink) => {
            return m(BaseListItem, {
                onClick: () => {
                    DialogManager.choose(t("join-links-list.choose-dialog.title"), t("join-links-list.choose-dialog.body"), t("all.copy"), t("all.delete"))
                        .then((action: DialogChooseAnswer | undefined) => {
                            if (!action) return;

                            if (action == "act_1") {
                                ClipboardService.saveString(item.code)
                                    .then(() => AlertManager.pushString(t("all.copy-success")))
                                    .catch(() => {});
                            }

                            else if (action == "act_2") {
                                JoinLinkService.deleteJoinLink(item.textSetId, item.id)
                                    .then(() => { fetchJoinLinks(item.textSetId); AlertManager.pushString(t("all.deleted-successfully")) })
                            }
                        })
                },
                primary: item.code,
                secondary: item.activeUntil
            });
        }
    })
}

export class JoinLinksList extends BaseComponent<JoinLinksListAttrs, any> {
    oninit(vnode: Mithril.Vnode<JoinLinksListAttrs, Mithril._NoLifecycle<any>>): any {
        fetchJoinLinks(vnode.attrs.textSetId)
    }

    override view(vnode: Mithril.Vnode<JoinLinksListAttrs, Mithril._NoLifecycle<any>>): Mithril.Children | void | null {
        return Layout.free(
            m("#app_join_links",
                Layout.centerNodes(
                    Layout.withHeader(
                        t("join-links-list.title"),
                        t("join-links-list.body") ?? undefined,
                        m("div")
                    ),

                    joinLinks ? m(JoinLinksList_List, {joinLinks: joinLinks}) : m(".d-none")
                )
            )
        )
    }
}