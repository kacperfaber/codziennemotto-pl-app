import Mithril from "mithril";
import m, {redraw, Vnode} from "mithril";
import {Layout} from "../../../layout";
import {BaseComponent} from "../../../base/baseComponent";
import {TextSet} from "../../../../services/textSet/textSet";
import {Text} from "../../../../services/textSet/text";
import {LoadingScreen} from "../../../components/base/screens/loading/loadingScreen";
import {TextSetPreview} from "../../../components/textSet/textSetPreview/textSetPreview";
import {TextSetService} from "../../../../services/textSet/textSetService";
import {t} from "i18next";
import {AdvancedTextPreview} from "../../../components/text/preview/advanced/advancedTextPreview";
import {TextOwnerActions} from "../../../components/text/ownerActions/textOwnerActions";
import {AlertManager} from "../../../base/alert/alertManager";
import {AppNavigator} from "../../../appNavigator";

interface TextByIdAttrs {
    textId: number;
    textSetId: number;
}

export function TextById({attrs}: Vnode<TextByIdAttrs>): Mithril.Component<TextByIdAttrs> {
    let textSet: TextSet | undefined = undefined;
    let text: Text | undefined = undefined;

    function setText(data: Text | undefined) {
        text = data;
        redraw();
    }

    function setTextSet(data: TextSet | undefined) {
        textSet = data;
        redraw();
    }

    function renderTextSetPreview(textSet: TextSet): Vnode<any, any> {
        return m(TextSetPreview, {title: textSet.title, description: textSet.description, id: textSet.id})
    }

    function renderTextPreview(text: Text): Vnode<any, any> {
        return m(AdvancedTextPreview, {text});
    }

    function onTextDeleted() {
        AlertManager.pushString(t("all.text.deleted"), "info");
        AppNavigator.textSetById(attrs.textSetId);
    }

    return new class extends BaseComponent<any, any> {

        override oninit(vnode: Mithril.Vnode<TextByIdAttrs, Mithril._NoLifecycle<any>>): any {
            TextSetService.getTextById(vnode.attrs.textId, false)
                .then(setText)
                .catch(() => setText(undefined)); // TODO: Make error page.

            TextSetService.getById(vnode.attrs.textSetId)
                .then(setTextSet)
                .catch(() => setTextSet(undefined)); // TODO: Make error page.

            return super.oninit(vnode);
        }

        override view(vnode: Vnode<TextByIdAttrs>): Mithril.Children {

            if (!textSet || !text) return m(LoadingScreen)

            const isTextSetOwner = TextSetService.isTextSetOwner(textSet);

            return Layout.free(
                m(".container",
                    m(".row",

                        m(".col-12",
                            renderTextSetPreview(textSet)
                        ),

                        Layout.splitBlock(
                            t("all.text"),
                            renderTextPreview(text)
                        ),

                        isTextSetOwner ? Layout.splitBlock(
                            t("all.text.owner-actions"),
                            m(TextOwnerActions, {
                                textId: vnode.attrs.textId,
                                textSetId: vnode.attrs.textSetId,
                                onDeleted: onTextDeleted
                            })
                        ) : null
                    )
                )
            )
        }
    }
}