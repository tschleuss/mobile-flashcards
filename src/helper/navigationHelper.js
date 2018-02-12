/**
 * A helper/singleton created for hold the stack navigator reference.
 * I can't be able to go back to deck list when inside tab navigator.
 */
export default class NavigationHelper {

    static myInstance = null;
    _rootNavigation = null

    /**
     * Retorn a single instance.
     */
    static getInstance() {
        if (this.myInstance === null) {
            this.myInstance = new NavigationHelper()
        }
        return this.myInstance
    }

    /**
     * Return a reference for the stack navigator.
     */
    getRootNavigaton() {
        return this._rootNavigation
    }

    /**
     * Set a reference for the stack navigator.
     */
    setRootNavigaton(rootNavigation) {
        this._rootNavigation = rootNavigation
    }
}
