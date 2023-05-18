import Mithril, {redraw} from "mithril";

export class DialogManager {
    public static dialogs: (Mithril.Component<any, any>)[] = [];

    public static push(dialog: Mithril.Component<any, any>) {
        DialogManager.dialogs.push(dialog);
        redraw();
    }

    public static close(dialog: Mithril.Component<any, any>){
        DialogManager.dialogs = DialogManager.dialogs.filter(comp => comp !== dialog);
        redraw();
    }
}