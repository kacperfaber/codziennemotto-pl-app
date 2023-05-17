import route from "mithril/route";
import {Links} from "./links";

export class AppNavigator {
    public static textSetById(id: number): void {
        route.set(`/text-set/by-id/${id}`);
    }

    public static textById(id: number): void {
        throw new Error("Not implemented right now.")
    }

    public static allTextsByTextSetId(id: number): void {
        route.set(`/text-set/texts/all/${id}`);
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

    public static addText(textSetId: number) {
        route.set(`/text-set/${textSetId}/add`);
    }

    public static allReaders(textSetId: number) {
        route.set(Links.allReaders.replace(":textSetId", textSetId.toString(0)));
    }
}