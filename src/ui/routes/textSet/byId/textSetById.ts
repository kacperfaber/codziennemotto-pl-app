import Mithril, {Vnode} from "mithril";
import {BaseStreamComponent} from "../../../base/baseComponent";
import {Layout} from "../../../layout";
import m from "mithril";
import {TextSetService} from "../../../../services/textSet/textSetService";
import stream from "mithril/stream";
import Stream from "mithril/stream";
import {TextSet} from "../../../../services/textSet/textSet";
import {Text} from "../../../../services/textSet/text";
import {SummaryItem} from "../../../../services/textSet/summary";
import {
    ExpandableTextList
} from "../../../components/textSet/textList/expandable/expandableTextList";
import {t} from "i18next";
import route from "mithril/route";
import {SingleTextSetDailyView} from "../../../components/textSet/textList/daily/singleTextSet/singleTextSetDailyView";
import {AppNavigator} from "../../../appNavigator";
import {JoinLinkService} from "../../../../services/joinLink/joinLinkService";
import {JoinLink} from "../../../../services/joinLink/joinLink";
import {ExpandableJoinLinkList} from "../../../components/joinLinks/list/expandable/expandableJoinLinkList";
import {CreateNewJoinLink} from "../../../components/joinLinks/create/createNewJoinLink";
import {BaseExpandableList} from "../../../components/base/expandableList/baseExpandableList";
import {BaseExpandableListItem} from "../../../components/base/expandableList/item/baseExpandableListItem";

export interface TextSetByIdAttrs {
    id: number;
}

export interface TextSetById_HeaderAttrs {
    title: string,
    description: string
}

export function TextSetById_Header(): Mithril.Component<TextSetById_HeaderAttrs, any> {
    return {
        view: (vnode: Vnode<TextSetById_HeaderAttrs>) => m("#app_text_set_by_id__header.col-12.col-lg-4.offset-lg-4",
            m("h3", vnode.attrs.title),
            m("p", vnode.attrs.description)
        )
    }
}

export function TextSetById(): Mithril.Component<TextSetByIdAttrs, any> {

    let joinLinks: Array<JoinLink> | undefined = undefined;

    return new class extends BaseStreamComponent<TextSetByIdAttrs, any> {
        private textSetStream: Stream<TextSet | undefined> = stream<TextSet | undefined>(undefined);
        private textsStream: Stream<Array<Text> | undefined> = stream<Array<Text> | undefined>(undefined);
        private summaryItemStream: Stream<SummaryItem | undefined> = stream<SummaryItem | undefined>(undefined);

        private textSetStreamHook = this.useStream(this.textSetStream);
        private textsStreamHook = this.useStream(this.textsStream);
        private summaryStreamHook = this.useStream(this.summaryItemStream);

        override oninit(vnode: Mithril.Vnode<TextSetByIdAttrs, Mithril._NoLifecycle<any>>): any {
            TextSetService.getById(vnode.attrs.id).then(data => this.textSetStream(data));

            TextSetService.getAllVisibleTexts(vnode.attrs.id).then(data => this.textsStream(data));

            TextSetService.getSummaryItem(vnode.attrs.id).then(data => this.summaryItemStream(data));

            JoinLinkService.fetchJoinLinks(vnode.attrs.id).then(data => joinLinks = data).catch();

            return super.oninit(vnode);
        }

        override view(vnode: Mithril.Vnode<TextSetByIdAttrs, Mithril._NoLifecycle<any>>): Mithril.Children | void | null {
            if (!joinLinks || !this.textSetStreamHook.value || !this.textsStreamHook.value || !this.summaryStreamHook.value) {
                // TODO: Replace with loading...
                return m("div", "no data for " + vnode.attrs.id);
            }

            return Layout.free(
                m(".container",
                    m(".row",
                        m(TextSetById_Header, {
                            title: this.textSetStreamHook.value!!.title,
                            description: this.textSetStreamHook.value!!.description
                        }),

                        Layout.splitColumn(
                            m(".margin-bottom-50", m(SingleTextSetDailyView, {
                                text: this.summaryStreamHook.value!!.text,
                                textSet: this.summaryStreamHook.value!!.textSet
                            }))
                        ),

                        Layout.splitBlock(
                            t("all.texts"),
                            m(BaseExpandableList, {
                                items: this.textsStreamHook.value!!.slice(0,5),
                                button: {
                                    text: t("all.show_all"),
                                    onClick: () => AppNavigator.allTextsByTextSetId(vnode.attrs.id)
                                },
                                makeItem: (i: Text) => m(BaseExpandableListItem, {
                                    onClick: () => AppNavigator.textById(i.textSetId, i.id),
                                    primary: i.text,
                                    secondary: i.id?.toString()
                                })
                            })
                        ),

                        Layout.splitBlock(
                            t("all.join-links"),
                            m(ExpandableJoinLinkList, {joinLinks: joinLinks!!, showAllOnClick: () => AppNavigator.home()})
                        ),

                        Layout.splitBlock(
                            t("all.join-links.create-new"),
                            m(CreateNewJoinLink, {textSetId: vnode.attrs.id})
                        )
                    )
                )
            )
        }

    }
}