import Mithril, {Vnode} from "mithril";
import {BaseStreamComponent} from "../../../base/baseComponent";
import {Layout} from "../../../layout";
import m from "mithril";
import {TextSetService} from "../../../../services/textSet/textSetService";
import stream from "mithril/stream";
import Stream from "mithril/stream";
import {TextSet} from "../../../../services/textSet/textSet";
import {Text} from "../../../../services/textSet/text";
import {TextSetApi} from "../../../../api/textSet/textSetApi";
import {Summary, SummaryItem} from "../../../../services/textSet/summary";
import {
    ExpandableTextList,
    ExpandableTextListItem
} from "../../../components/textSet/textList/expandable/expandableTextList";
import {t} from "i18next";
import route from "mithril/route";
import {Links} from "../../../../routes";
import {SingleTextSetDailyView} from "../../../components/textSet/textList/daily/singleTextSet/singleTextSetDailyView";

export interface TextSetByIdAttrs {
    id: number;
}

export function TextSetById_Header(): Mithril.Component<any, any> {
    return {
        view:(vnode: Vnode<{title: string}>) => m("#app_text_set_by_id__header.col-12",
            m("h3", vnode.attrs.title)
        )
    }
}

export function TextSetById(): Mithril.Component<TextSetByIdAttrs, any> {
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

            return super.oninit(vnode);
        }

        override view(vnode: Mithril.Vnode<any, Mithril._NoLifecycle<any>>): Mithril.Children | void | null {
            if (!this.textSetStreamHook.value || !this.textsStreamHook.value || !this.summaryStreamHook.value) {
                // TODO: Replace with loading...
                return m("div", "no data for " + vnode.attrs.id);
            }

            return Layout.free(
                m(".container",
                    m(".row",
                        m(TextSetById_Header, {title: this.textSetStreamHook.value!!}),

                        Layout.splitColumn(
                            m(SingleTextSetDailyView, {
                                text: this.summaryStreamHook.value!!.text,
                                textSet: this.summaryStreamHook.value!!.textSet
                            })
                        ),

                        Layout.splitColumn(
                            m(ExpandableTextList, {
                                title: t("all.texts"),
                                showAllOnClick: () => route.set("TODO"), // TODO: Link?
                                items: this.textsStreamHook.value!!.slice(0, 5)
                            })
                        )
                    )
                )
            )
        }

    }
}