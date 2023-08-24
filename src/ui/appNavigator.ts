import route from "mithril/route";
import {Links} from "./links";

export class AppNavigator {
    public static textSetById(id: number): void {
        route.set(`/text-set/by-id/${id}`);
    }

    public static textById(textSetId: number, textId: number): void {
        route.set(`/text-set/${textSetId}/text/${textId}`);
    }

    public static allTextsByTextSetId(id: number): void {
        route.set(`/text-set/texts/all/${id}`);
    }

    public static allTextSets(): void {
        route.set("/text-set/all");
    }

    public static home() {
        route.set(Links.home);
    }

    public static welcome() {
        route.set(Links.welcome);
    }

    public static login() {
        route.set(Links.login);
    }

    public static joinLinkList(textSetId: number) {
        route.set(Links.joinLinkListLink.replace(":textSetId", textSetId.toString()));
    }

    public static addText(textSetId: number) {
        route.set(`/text-set/${textSetId}/add`);
    }

    public static allReaders(textSetId: number) {
        route.set(Links.allReadersLink.replace(":textSetId", textSetId.toString()));
    }

    public static readerById(textSetId: number, readerId: number) {
        route.set(Links.readerByIdLink.replace(":textSetId", textSetId.toString()).replace(":readerId", readerId.toString()))
    }

    public static joinUsingLink() {
        route.set(Links.joinUsingLink);
    }

    public static register() {
        route.set(Links.register);
    }

    public static confirm(emailAddress: string) {
        route.set(Links.confirmLink.replace(":emailAddress", emailAddress));
    }

    public static createTextSet() {
        route.set(Links.createNewTextSet);
    }

    public static requirePrivacy() {
        route.set(Links.requirePrivacy);
    }
}