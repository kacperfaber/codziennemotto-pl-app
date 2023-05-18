import m, {Vnode} from "mithril";

export function verifyObject(d: any): boolean {
    return d ? Object.entries(d).every(([key, value]) => value !== undefined && value !== null) : false;
}

export class Optional {
    public static orNull<TData>(d: TData, render: (d: TData) => Vnode<any, any>): Vnode<any, any> | null {
        return verifyObject(d) ? render(d) : null;
    }

    public static orLoading<TData>(d: TData, render: (d: TData) => Vnode<any, any>): Vnode<any, any> {
        // TODO: Replace with spinner component.
        return verifyObject(d) ? render(d) : m("div#app_optional_loading.spinner-border");
    }
}