import m, {Vnode} from "mithril";
import {Navbar} from "./components/navbar/navbar";

export class Layout {
    static free(node: Vnode): Vnode<any, any> {
        return m("#app",
            m(Navbar),
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