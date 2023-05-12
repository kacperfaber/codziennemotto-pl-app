import m, {Vnode} from "mithril";
import {Navbar} from "./components/navbar/navbar";
import {SideNav} from "./components/sidenav/sideNav";
import Mithril from "mithril";

export class Layout {
    static free(node: Vnode<any, any>): Vnode<any, any> {
        return m("#app",
            m(Navbar),
            m(SideNav),
            m("#app_container.animate-in", node)
        );
    }

    static center(node: Vnode) {
        return m(".container",
            m(".row",
                m(".col-12.col-lg-6.offset-lg-3",
                    node
                )
            )
        )
    }

    static centerNodes(...nodes: Array<Vnode<any, any>>) {
        return m(".container",
            m(".row",
                m(".col-12.col-lg-6.offset-lg-3",
                    ...nodes
                )
            )
        )
    }

    static splitColumn(node: Vnode<any, any>): Vnode<any, any> {
        return m(".col-12.col-lg-4.offset-lg-1", node);
    }

    static withHeader(text: string, paragraph: string | undefined = undefined, node: Vnode<any, any>): Vnode<any, any> {
        return m(".with-header",
            m("h3.header", text),
            paragraph ? m("p.paragraph", paragraph) : m(".d-none"),
            node
        );
    }

    static splitBlock(title: string, node: Vnode<any, any>): Vnode<any, any> {
        return m(".block.col-12.col-lg-4.offset-lg-1", m("h4", title), node);
    }
}