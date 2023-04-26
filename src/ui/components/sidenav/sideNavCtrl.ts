export class SideNavCtrl {
    private static getElement(): HTMLElement {
        return document.getElementById("app_sidenav")!!;
    }

    private static className = "active";

    static toggle() {
        SideNavCtrl.getElement().classList.toggle(SideNavCtrl.className);
    }

    static open() {
        SideNavCtrl.getElement().classList.add(SideNavCtrl.className);
    }

    static close() {
        SideNavCtrl.getElement().classList.remove(SideNavCtrl.className);
    }
}