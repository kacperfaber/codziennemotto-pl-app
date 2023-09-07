import Mithril, {redraw} from "mithril";
import m from "mithril";
import {t} from "i18next";
import {StorageService} from "../../../services/storage/storageService";
import {AppNavigator} from "../../appNavigator";
import {Layout} from "../../layout";
import {RodoUrl} from "./rodoUrl";
import {PrivacyUrl} from "./privacyUrl";

let cookieAllowed = false;
let rodoAllowed = false;
let privacyAllowed = false;

function cookieClick() {
    cookieAllowed = !cookieAllowed;
    redraw();
}

function privacyClick() {
    privacyAllowed = !privacyAllowed;
    redraw();
}

function rodoClick() {
    rodoAllowed = !rodoAllowed;
    redraw();
}



export const RequirePrivacy: Mithril.Component = {
    view: () => {
        return Layout.free(
            Layout.centerNodes(
                Layout.withHeader(
                    t("require-privacy.title"),
                    t("require-privacy.body") ?? undefined,
                    m("div", {style:{'margin-bottom': '25px'}},
                        m("button.btn.btn-link.my-4", {onclick: () => window.location.replace(RodoUrl)}, t("require-privacy.click-to-see-rodo")),
                        m("br"),
                        m(`button.btn.btn-${rodoAllowed ? 'success' : 'secondary'}`, {onclick: rodoClick}, rodoAllowed ? t("require-privacy.consent") : t("require-privacy.no-consent")),
                        m("p.paragraph", t("require-privacy.click-to-change-consent"))
                    )
                ),

                Layout.withHeader(
                    t("require-privacy.cookies.title"),
                    t("require-privacy.cookies.body") ?? undefined,
                    m("div.mb-4", {style:{'margin-bottom': '25px'}},
                        m(`button.btn.btn-${cookieAllowed ? 'success' : 'secondary'}`, {onclick: cookieClick}, cookieAllowed ? t("require-privacy.consent") : t("require-privacy.no-consent")),
                        m("p.paragraph", t("require-privacy.click-to-change-consent"))
                    )
                ),

                Layout.withHeader(
                    t("require-privacy.privacy.title"),
                    t("require-privacy.privacy.body") ?? undefined,
                    m("div.mb-4", {style:{'margin-bottom': '25px'}},
                        m(`button.btn.btn-${privacyAllowed ? 'success' : 'secondary'}`, {onclick: privacyClick}, privacyAllowed ? t("require-privacy.consent") : t("require-privacy.no-consent")),
                        m("button.btn.btn-link.my-4", {onclick: () => window.location.replace(PrivacyUrl)}, t("require-privacy.click-to-see-privacy")),
                        m("p.paragraph", t("require-privacy.click-to-change-consent"))
                    )
                ),

                m(".col-12",
                    m("p.paragraph", t("require-privacy.allow-everything-to-continue")),
                    rodoAllowed && cookieAllowed && privacyAllowed ?
                    m("button.btn.btn-primary", {onclick: () => { StorageService.consentPrivacy(true); AppNavigator.home(); }}, t("all.save")) : null
                )
            )
        )
    }
}