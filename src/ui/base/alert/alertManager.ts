import {AlertComponent} from "./alertComponent";
import {redraw} from "mithril";

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
}