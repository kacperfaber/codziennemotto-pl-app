import i18next from "i18next";
import * as pl from "./lang.pl.json";


export async function translate(d: any): Promise<any> {
    return {translation: d};
}

export async function initLanguage() {
    await i18next.init({
        lng: 'pl',
        resources: {
            pl: {
                translation: pl
            }
        }
    })
}