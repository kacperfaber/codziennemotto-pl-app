import m, {Vnode} from "mithril";
import {Navbar} from "./components/navbar/navbar";
import {SideNav} from "./components/sidenav/sideNav";
import Mithril from "mithril";

export class Layout {
    static free(node: Vnode<any, any>): Vnode<any, any> {
        return m("#app",
            m(Navbar),
            m(SideNav),
            m("#app_container", node)
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
}