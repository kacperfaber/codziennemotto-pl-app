import Mithril, {RouteResolver} from "mithril";
import {TextSetById} from "./textSetById";
import m from "mithril";

export const TextSetByIdRoute: RouteResolver<{id: number}> = {
    onmatch(): Mithril.ComponentTypes<any, any> | Promise<any> | void {

    },

    render(vnode: Mithril.Vnode<{id: number}>): Mithril.Children {
        return m(TextSetById, {id: vnode.attrs.id})
    }
}