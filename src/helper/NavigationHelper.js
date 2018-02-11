export default class NavigationHelper {

    static myInstance = null;
    _rootNavigation = null

    static getInstance() {
        if (this.myInstance === null) {
            this.myInstance = new NavigationHelper()
        }
        return this.myInstance
    }

    getRootNavigaton() {
        return this._rootNavigation
    }

    setRootNavigaton(rootNavigation) {
        this._rootNavigation = rootNavigation
    }
}
