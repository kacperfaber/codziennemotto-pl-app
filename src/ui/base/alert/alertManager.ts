import {AlertComponent, AlertKind} from "./alertComponent";
import {redraw, Vnode} from "mithril";
import {StringAlert} from "./stringAlert";
import {NodeAlert} from "./nodeAlert";

export class AlertManager {
    public static alerts: AlertComponent[] = [];

    public static push(ac: AlertComponent): void {
        this.alerts.push(ac);
        redraw();
    }

    public static close(ac: AlertComponent): void {
        this.alerts = this.alerts.filter(d => d !== ac);
        redraw();
    }

    public static pushString(text: string, kind: AlertKind = "info", disSec: number | undefined = 5) {
        AlertManager.push(StringAlert({kind, text}, disSec));
    }

    public static pushAlert(node: Vnode<any, any>, kind: AlertKind = "info", disSec: number | undefined = 5) {
        AlertManager.push(NodeAlert({kind, node}, disSec));
    }
}