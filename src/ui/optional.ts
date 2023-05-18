import {Vnode} from "mithril";

export function verifyObject(d: any): boolean {
    return Object.entries(d).every(([key, value]) => value !== undefined && value !== null);
}

export class Optional {
    public static orNull<TData>(d: TData, render: (d: TData) => Vnode<any, any>): Vnode<any, any> | null {
        return verifyObject(d) ? render(d) : null;
    }
}