import {Layout} from "../../layout";
import Mithril, {redraw, Vnode} from "mithril";
import m from "mithril";
import {t} from "i18next";
import {BaseComponent} from "../../base/baseComponent";
import {Summary, SummaryItem} from "../../../services/textSet/summary";
import {User} from "../../../services/user/user";
import {TextSetService} from "../../../services/textSet/textSetService";
import {UserStore} from "../../../store/user/userStore";
import {LoadingScreen} from "../../components/base/screens/loading/loadingScreen";
import {BaseExpandableList} from "../../components/base/expandableList/baseExpandableList";
import {BaseExpandableListItem} from "../../components/base/expandableList/item/baseExpandableListItem";
import {AppNavigator} from "../../appNavigator";

interface Home_HeaderAttrs {
    summary: Summary;
    user: User;
}

export function Home_Header(): Mithril.Component<Home_HeaderAttrs> {
    // TODO: There's i18next interpolation, I don't know it would render good data.
    return {
        view: ({attrs}: Vnode<Home_HeaderAttrs>) => m("#app_home__header",
            m("h2", t("home.hello_user", {username: attrs.user.username})),
            m("p", t("home.you_have_x_mottos_today", {x: attrs.summary.length}))
        )
    }
}

interface Home_SummaryListItemAttrs {
    item: SummaryItem;
}

export function Home_SummaryListItem() {
    return {
        view: ({attrs}: Vnode<Home_SummaryListItemAttrs>) => m(BaseExpandableListItem, {
            primary: attrs.item.text,
            secondary: attrs.item.textSet.title,
            onClick: () => {AppNavigator.textSetById(attrs.item.textSet.id)}
        })
    }
}

interface Home_SummaryListAttrs {
    summary: Summary;
}

export function Home_SummaryList(): Mithril.Component<Home_SummaryListAttrs> {
    return {
        view: ({attrs}: Vnode<Home_SummaryListAttrs>) => m("#app_home__summary_list",
            m(BaseExpandableList, {
                items: attrs.summary,
                makeItem: (item: SummaryItem) => m(Home_SummaryListItem, {item}),
                button: undefined
            })
        )
    }
}

export function Home() {
    return new class extends BaseComponent<any, any> {
        private summary: Summary | undefined = undefined;
        private user: User | undefined = undefined;

        override oninit(vnode: Mithril.Vnode<any, Mithril._NoLifecycle<any>>): any {
            TextSetService.getSummary().then(summary => {
                this.summary = summary;
                redraw();
            }).catch(() => {});

            this.user = UserStore.current();

            return super.oninit(vnode);
        }

        override view() {
            if (!this.user || !this.summary) {
                return m(LoadingScreen)
            }

            return Layout.free(
                m("#app_home",
                    Layout.centerNodes(
                        m(Home_Header, {summary: this.summary, user: this.user}),
                        m(Home_SummaryList, {summary: this.summary})
                    )
                )
            )
        }
    }
}