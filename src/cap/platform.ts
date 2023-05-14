import {Capacitor} from "@capacitor/core";

export type Platform = "web" | "ios" | "android";

export function getPlatform(): Platform {
    let capacitorPlatform = Capacitor.getPlatform();

    switch (capacitorPlatform) {
        case "web":
            return "web";

        case "ios":
            return "ios";

        case "android":
            return "android";

        default:
            throw `Value '${capacitorPlatform}' doesn't satisfy type Platform ('web', 'android', 'ios')`;
    }
}