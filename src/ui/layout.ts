import m, {Vnode} from "mithril";
import {Navbar} from "./components/navbar/navbar";

export class Layout {
    static free(node: Vnode): Vnode<any, any> {
        return m("div", m(Navbar), node);
    }
}