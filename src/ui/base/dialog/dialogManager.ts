import {redraw} from "mithril";
import {DialogComponent} from "./dialog";

export class DialogManager {
    public static dialogs: (DialogComponent)[] = [];

    public static push(dialog: DialogComponent) {
        DialogManager.dialogs.push(dialog);
        redraw();
    }

    public static close(dialog: DialogComponent){
        DialogManager.dialogs = DialogManager.dialogs.filter(comp => comp !== dialog);
        redraw();
    }
}