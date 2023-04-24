export class SideNavCtrl {
    private static getElement(): HTMLElement {
        return document.getElementById("app_sidenav")!!;
    }

    private static getClassName(): string {
        return "active";
    }

    static toggle() {
        SideNavCtrl.getElement().classList.toggle(SideNavCtrl.getClassName());
    }

    static open() {
        SideNavCtrl.getElement().classList.add(SideNavCtrl.getClassName());
    }

    static close() {
        SideNavCtrl.getElement().classList.remove(SideNavCtrl.getClassName());
    }
}