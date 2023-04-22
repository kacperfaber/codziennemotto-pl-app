import i18next from "i18next";
export async function translate(d: any): Promise<any> {
    return {translation: d};
}

export async function initLanguage() {
    await i18next.init({
        lng: 'en',
        resources: {}
    })
}