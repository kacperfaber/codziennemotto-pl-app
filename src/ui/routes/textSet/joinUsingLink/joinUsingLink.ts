import {BaseComponent} from "../../../base/baseComponent";
import {Layout} from "../../../layout";
import {t} from "i18next";
import m, {redraw} from "mithril";
import Mithril from "mithril";
import {TextSetService} from "../../../../services/textSet/textSetService";
import {DialogManager} from "../../../base/dialog/dialogManager";
import {AppNavigator} from "../../../appNavigator";

let code = "";

export class JoinUsingLink extends BaseComponent<any, any> {
    error = false;

    private onSubmit(e: Event) {
        e.preventDefault();

        console.log("code: " + code)

        TextSetService.joinWithCode(code)
            .then((reader) => { AppNavigator.textSetById(reader.id)})
            .catch(() => {this.error = true; redraw(); DialogManager.info(t("all.something-went-wrong"), t("join-links.could-not-use-join-link"))})
    }

    view(vnode: Mithril.Vnode<any, Mithril._NoLifecycle<any>>): Mithril.Children | void | null {
        return Layout.free(
            Layout.centerNodes(
                Layout.withHeader(t("join-links.join-using-link"), undefined, m("div")),

                Layout.splitBlock(t("join-links.use-link"),
                    m(".join-using-link",
                        m("form.form", {onsubmit: this.onSubmit},
                            m(".form-floating.my-3",
                                m(`input[type=text].form-control`, {
                                    oninput: (e: InputEvent) => {code = (e.target as HTMLInputElement).value;},
                                    placeholder: t("join-links.join-link-code")
                                })
                            ),

                            this.error ? m("label", {style: { color: 'red' }}, t("join-links.could-not-use-join-link")) : null,

                            m("button.btn.btn-primary[type=submit]", t("join-links.use"))
                        )
                    )
                )
            )
        )
    }
}