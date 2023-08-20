import {Clipboard as CapClipboard} from "@capacitor/clipboard";

export class ClipboardService {
    public static async saveString(string: string) {
        await CapClipboard.write({string});
    }
}