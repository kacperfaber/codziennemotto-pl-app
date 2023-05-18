import {Text} from "../../../../../services/textSet/text";
import m from "mithril";
import Mithril, {Vnode} from "mithril";

function renderLine(key: string, value: any): Vnode<any, any> {
    function printValue(value: any) {
        return value ? value.toString() : "null";
    }

    return m(".advanced-text-preview__line",
        m("h5.advanced-text-preview__line__heading", key),
        m("p.advanced-text-preview__line__value", printValue(value)),
    )
}

interface AdvancedTextPreviewAttrs {
    text: Text
}

export function AdvancedTextPreview(): Mithril.Component<AdvancedTextPreviewAttrs> {
    return {
        view: ({attrs}: Vnode<AdvancedTextPreviewAttrs>) => m(".advanced-text-preview",
            Object.entries(attrs.text).map(([key, value]) => renderLine(key, value))
        )
    }
}