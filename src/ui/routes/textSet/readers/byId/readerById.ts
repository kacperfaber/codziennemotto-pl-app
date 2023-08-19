import Mithril from "mithril";
import m, {redraw, Vnode} from "mithril";
import {Layout} from "../../../../layout";
import {BaseComponent} from "../../../../base/baseComponent";
import {t} from "i18next";
import {ReaderService} from "../../../../../services/reader/readerService";
import {ReaderIncludeUser} from "../../../../../services/reader/reader";
import {LoadingScreen} from "../../../../components/base/screens/loading/loadingScreen";
import {AppNavigator} from "../../../../appNavigator";
import {DialogManager} from "../../../../base/dialog/dialogManager";
import {TextSet} from "../../../../../services/textSet/textSet";
import {TextSetService} from "../../../../../services/textSet/textSetService";

type ReaderByIdAttrs = { readerId: number, textSetId: number };

export const ReaderById = new class extends BaseComponent<ReaderByIdAttrs, any> {
    private reader: ReaderIncludeUser | undefined = undefined;
    private isError: boolean = false;
    private isDeleted: boolean = false;
    private textSet: TextSet | undefined = undefined;

    override oninit(vnode: Mithril.Vnode<ReaderByIdAttrs, Mithril._NoLifecycle<any>>): any {
        ReaderService.getReaders(vnode.attrs.textSetId)
            .then(readers => {
                let found = readers.find(x => x.reader.id == vnode.attrs.readerId);
                if (!found) {
                    this.isError = true;
                    this.reader = undefined;
                    redraw();
                } else {
                    this.reader = found;
                    redraw();
                }

            })
            .catch(() => {
                this.isError = true;
                redraw()
            });

        TextSetService.getById(vnode.attrs.textSetId)
            .then((textSet) => {this.textSet = textSet; redraw()})
            .catch(() => {this.isError = true; redraw()});

        return super.oninit(vnode);
    }

    override view(vnode: Mithril.Vnode<ReaderByIdAttrs, Mithril._NoLifecycle<this & {}>>): Mithril.Children | void | null {
        return Layout.free(
            m("#app_reader_by_id",
                this.reader ? this.renderReaderData() : m(LoadingScreen)
            )
        )
    }

    private deleteReader() {
        if (!this.reader) return;
        let {textSetId, userId, id} = this.reader!!.reader;

        DialogManager.yesNoAsync(t("all.confirmation"), t("all.reader.really-want-to-delete-reader", {textSet: this.textSet?.title, reader: this.reader?.userName}))
            .then((yesNo) => {
                if (yesNo == "yes") {
                    ReaderService.deleteReader(textSetId, id)
                        .then(() => {
                            this.isDeleted = true;
                            redraw();
                        })
                        .catch(() => DialogManager.info(t("all.something-went-wrong"), t("reader.could-not-delete")))
                }
            });
    }

    private renderReaderData(): Vnode<any, any> {
        if (this.isDeleted) {
            return Layout.center(
                Layout.block(
                    m("div",
                        m("h1", t("all.reader.reader-is-deleted", {reader: this.reader?.userName!!})),
                        m("button.btn.btn-primary", {onclick: () => AppNavigator.textSetById(this.reader?.reader.textSetId!!)}, t("all.home"))
                    )
                )
            )
        }

        if (this.reader && this.textSet) {
            return Layout.centerNodes(
                Layout.withHeader(t("reader-by-id.title"), t("reader-by-id.body", {textSet: this.textSet.title}) ?? undefined, m("div")),

                Layout.block(
                    m("#app_reader_by_id__header",
                        m("h2", this.reader?.userName),
                        m("p", this.reader?.reader.id)
                    )
                ),

                Layout.block(
                    Layout.withHeader(t("all.text-owner-actions"), undefined,
                        m("#app_reader_by_id__owner_actions",
                            m("button.btn.btn-danger", {onclick: () => this.deleteReader()}, t("all.reader.delete-reader"))
                        )
                    )
                )
            )
        }

        else {
            return m("h2", t("all.something-went-wrong"))
        }
    }
}