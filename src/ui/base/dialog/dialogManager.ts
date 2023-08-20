import {redraw} from "mithril";
import {AwaitableDialogComponent, DialogComponent} from "./dialog";
import {DialogInfo} from "./info/dialogInfo";
import {DialogYesNo, YesNo} from "./yesNo/dialogYesNo";
import {DialogChoose, DialogChooseAnswer} from "./choose/dialogChoose";

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

    public static choose(title: string, text: string, option1: string, option2: string): Promise<DialogChooseAnswer | undefined> {
        let dial = new DialogChoose({title, text, option1, option2});
        return DialogManager.pushAsync(dial);
    }

    public static pushAsync<T>(dialog: AwaitableDialogComponent<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            dialog.resolve = resolve;
            dialog.reject = reject;
            DialogManager.push(dialog);
        });
    }

    public static yesNoAsync(title: string, text: string): Promise<YesNo> {
        return DialogManager.pushAsync(new DialogYesNo({title, text}));
    }

    public static clear(): void {
        DialogManager.dialogs = [];
        redraw();
    }
}