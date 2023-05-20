import m, {redraw} from "mithril";
import {AwaitableDialogComponent, DialogComponent} from "./dialog";
import {DialogInfo} from "./info/dialogInfo";

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

    public static info(title: string, text: string) {
        DialogManager.dialogs.push(DialogInfo({title, text}))
    }

    public static pushAsync<T>(dialog: AwaitableDialogComponent<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            dialog.resolve = resolve;
            dialog.reject = reject;
            DialogManager.push(dialog);
        });
    }
}