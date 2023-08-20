import Mithril from "mithril";
import m, {Vnode} from "mithril";
import {BaseStreamComponent} from "../../../base/baseComponent";
import {Layout} from "../../../layout";
import {TextSetService} from "../../../../services/textSet/textSetService";
import stream from "mithril/stream";
import Stream from "mithril/stream";
import {TextSet} from "../../../../services/textSet/textSet";
import {Text} from "../../../../services/textSet/text";
import {SummaryItem} from "../../../../services/textSet/summary";
import {t} from "i18next";
import {SingleTextSetDailyView} from "../../../components/textSet/textList/daily/singleTextSet/singleTextSetDailyView";
import {AppNavigator} from "../../../appNavigator";
import {JoinLinkService} from "../../../../services/joinLink/joinLinkService";
import {JoinLink} from "../../../../services/joinLink/joinLink";
import {ExpandableJoinLinkList} from "../../../components/joinLinks/list/expandable/expandableJoinLinkList";
import {CreateNewJoinLink} from "../../../components/joinLinks/create/createNewJoinLink";
import {BaseExpandableList} from "../../../components/base/expandableList/baseExpandableList";
import {BaseExpandableListItem} from "../../../components/base/expandableList/item/baseExpandableListItem";
import {AddText} from "../../../components/text/addText/addText"
import {LoadingScreen} from "../../../components/base/screens/loading/loadingScreen";
import {ReaderIncludeUser} from "../../../../services/reader/reader";
import {ReaderService} from "../../../../services/reader/readerService";
import {ExpandableReaderList} from "../../../components/reader/list/expandableReaderList";

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
    let readers: Array<ReaderIncludeUser> | undefined = undefined;

    return new class extends BaseStreamComponent<TextSetByIdAttrs, any> {
        private textSetStream: Stream<TextSet | undefined> = stream<TextSet | undefined>(undefined);
        private textsStream: Stream<Array<Text> | undefined> = stream<Array<Text> | undefined>(undefined);
        private summaryItemStream: Stream<SummaryItem | undefined> = stream<SummaryItem | undefined>(undefined);

        private textSetStreamHook = this.useStream(this.textSetStream);
        private textsStreamHook = this.useStream(this.textsStream);
        private summaryStreamHook = this.useStream(this.summaryItemStream);

        private isTextSetOwner: boolean | undefined = undefined;

        fetchJoinLinks(textSetId: number) {
            JoinLinkService.fetchJoinLinks(textSetId).then(data => joinLinks = data)
                .catch(() => {
                });
        }

        fetchReaders(textSetId: number) {
            ReaderService.getReaders(textSetId)
                .then(data => readers = data);
        }

        override oninit(vnode: Mithril.Vnode<TextSetByIdAttrs, Mithril._NoLifecycle<any>>): any {
            TextSetService.getById(vnode.attrs.id).then(data => this.textSetStream(data))
                .catch(() => {
                });

            TextSetService.getAllVisibleTexts(vnode.attrs.id).then(data => this.textsStream(data))
                .catch(() => {
                });

            TextSetService.getSummaryItem(vnode.attrs.id).then(data => this.summaryItemStream(data))
                .catch(() => {
                });

            return super.oninit(vnode);
        }

        override onbeforeupdate(vnode: Mithril.Vnode<TextSetByIdAttrs, Mithril._NoLifecycle<any>>, old: Mithril.VnodeDOM<TextSetByIdAttrs, Mithril._NoLifecycle<any>>): boolean | void {
            if (this.isTextSetOwner == undefined && this.textSetStreamHook.value) {
                this.isTextSetOwner = TextSetService.isTextSetOwner(this.textSetStreamHook.value!!);
                if (this.isTextSetOwner) this.fetchJoinLinks(this.textSetStreamHook.value!!.id);
                if (this.isTextSetOwner) this.fetchReaders(this.textSetStreamHook.value!!.id)
            }
            return super.onbeforeupdate(vnode, old);
        }

        override view(vnode: Mithril.Vnode<TextSetByIdAttrs, Mithril._NoLifecycle<any>>): Mithril.Children | void | null {
            if (!this.textSetStreamHook.value || !this.textsStreamHook.value || !this.summaryStreamHook.value) {
                return m(LoadingScreen)
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
                                items: this.textsStreamHook.value!!.slice(0, 5),
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

                        this.isTextSetOwner && readers ? Layout.splitBlock(
                            t("all.reader.all-readers"),
                            m(ExpandableReaderList, {readers: readers, textSetId: vnode.attrs.id})
                        ) : null,

                        this.isTextSetOwner && joinLinks ? Layout.splitBlock(
                            t("all.join-links"),
                            m(ExpandableJoinLinkList, {
                                joinLinks: joinLinks!!,
                                showAllOnClick: () => AppNavigator.joinLinkList(vnode.attrs.id)
                            })
                        ) : null,

                        this.isTextSetOwner ? Layout.splitBlock(
                            t("join-links.create-new"),
                            m(CreateNewJoinLink, {textSetId: vnode.attrs.id})
                        ) : null,

                        this.isTextSetOwner ? Layout.splitBlock(
                            t("text-set.text.create-new"),
                            m(AddText, {textSetId: vnode.attrs.id})
                        ) : null
                    )
                )
            )
        }

    }
}