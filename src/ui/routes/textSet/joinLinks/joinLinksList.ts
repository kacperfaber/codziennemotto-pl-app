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
                                    .then(() => AlertManager.pushString(t("all.deleted-successfully")))
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
    joinLinks: Array<JoinLink> | undefined;

    onbeforeupdate(vnode: Mithril.Vnode<JoinLinksListAttrs, Mithril._NoLifecycle<any>>, old: Mithril.VnodeDOM<JoinLinksListAttrs, Mithril._NoLifecycle<any>>): boolean | void {
        JoinLinkService.getJoinLinks(vnode.attrs.textSetId)
            .then(j => {
                this.joinLinks = j;
                redraw()
            })
            .catch(() => AlertManager.pushString(t("all.something-went-wrong")));

        return super.onbeforeupdate(vnode, old);
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

                    this.joinLinks ? m(JoinLinksList_List, {joinLinks: this.joinLinks}) : m(".d-none")
                )
            )
        )
    }
}