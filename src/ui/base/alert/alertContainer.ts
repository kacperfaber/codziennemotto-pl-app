import m from "mithril";
import {AlertManager} from "./alertManager";

export function AlertContainer() {
    return {
        view: () => m(".alert-container",
            ...AlertManager.alerts.map((it) => m(it, {...it.attrs}))
        )
    }
}