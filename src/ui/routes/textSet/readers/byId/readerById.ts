import Mithril from "mithril";
import m, {redraw, Vnode} from "mithril";
import {Layout} from "../../../../layout";
import {BaseComponent} from "../../../../base/baseComponent";
import {t} from "i18next";
import {ReaderService} from "../../../../../services/reader/readerService";
import {ReaderIncludeUser} from "../../../../../services/reader/reader";
import {LoadingScreen} from "../../../../components/base/screens/loading/loadingScreen";
import {AppNavigator} from "../../../../appNavigator";

type ReaderByIdAttrs = { readerId: number, textSetId: number };

export const ReaderById = new class extends BaseComponent<ReaderByIdAttrs, any> {
    private reader: ReaderIncludeUser | undefined = undefined;
    private isError: boolean = false;
    private isDeleted: boolean = false;

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
        ReaderService.deleteReader(textSetId, id)
            .then(() => {
                this.isDeleted = true;
                redraw();
            })
            .catch(() => alert("Couldn't delete this reader")) // TODO
    }

    private renderReaderData(): Vnode<any, any> {
        if (this.isDeleted) {
            return Layout.center(
                Layout.block(
                    m("div",
                        m("h1", this.reader?.reader.id!! + " został usunięty") /* TODO */,
                        m("button.btn.btn-primary", {onclick: () => AppNavigator.textSetById(this.reader?.reader.textSetId!!)}, t("all.home"))
                    )
                )
            )
        }

        return Layout.centerNodes(
            Layout.withHeader(t("routes.reader_by_id.title"), t("routes.reader_by_id.body") ?? undefined, m("div")),

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
}