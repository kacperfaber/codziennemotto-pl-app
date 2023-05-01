import Mithril from "mithril";
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

export interface TextSetByIdAttrs {
    id: number;
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
            return Layout.free(
                m(".container",
                    m(".row",
                        m(".col-12.offset-lg-1.col-lg-4",

                        )
                    )
                )
            )
        }

    }
}