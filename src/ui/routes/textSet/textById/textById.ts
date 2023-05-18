import Mithril from "mithril";
import m, {redraw, Vnode} from "mithril";
import {Layout} from "../../../layout";
import {BaseComponent} from "../../../base/baseComponent";
import {TextSet} from "../../../../services/textSet/textSet";
import {Text} from "../../../../services/textSet/text";
import {LoadingScreen} from "../../../components/base/screens/loading/loadingScreen";
import {TextSetPreview} from "../../../components/textSet/textSetPreview/textSetPreview";
import {TextSetService} from "../../../../services/textSet/textSetService";

interface TextByIdAttrs {
    textId: number;
    textSetId: number;
}

export function TextById(): Mithril.Component<TextByIdAttrs> {
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
            return textSet && text ? Layout.free(
                Layout.centerNodes(
                    renderTextSetPreview(textSet),

                    m("h3", "Text is: "),
                    m("p", text.text)
                )
            ) : m(LoadingScreen);
        }
    }
}