import React, { Component } from 'react'
import { View, Text, StatusBar, AppState, AsyncStorage } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { MainNavigator } from '../../config/navigation'
import { setupLocalNotification } from '../../helper/notification'
import reducer from '../../reducers'
import styles from './styles'

/**
 * Bootstrap screen, when user first open our app.
 * Here whe setup some storage and notifications configs.
 */
export default class App extends Component {

    /**
     * Default constructor.
     */
    constructor(props) {
        super(props)
        this.state = {
            isStoreLoading: false,
            store: createStore(reducer)
        }
    }

    /**
     * As soon as the app opens, setup some listeners to sync our redux store
     * with async local storage, so all information will be saves even when user leave the app.
     */
    componentWillMount() {
        AppState.addEventListener('change', this.handleAppStateChange.bind(this))
        this.syncStorageWithState()
    }

    /**
     * When the screen mount, setup our local notification settings.
     */
    componentDidMount() {
        setupLocalNotification()
    }

    /**
     * Remove all listeners when the app closes.
     */
    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange.bind(this))
    }

    /**
     * Perform a sync between redux store and local storage.
     */
    syncStorageWithState() {
        this.setState({ isStoreLoading: true })
        AsyncStorage.getItem('completeStore')
            .then(value => {
                if (value && value.length) {
                    const initialStore = JSON.parse(value)
                    this.setState({ store: createStore(reducer, initialStore) })
                }
                this.setState({ isStoreLoading: false })
            }).catch(error => {
                this.setState({ isStoreLoading: false })
            })
    }

    /**
     * When our app go to background or go back to foreground,
     * update our local storage with everything that exists on redux store.
     */
    handleAppStateChange(currentAppState) {
        const storingValue = JSON.stringify(this.state.store.getState())
        AsyncStorage.setItem('completeStore', storingValue)
    }

    /**
     * Render our component in the screen.
     */
    render() {
        const { isStoreLoading, store } = this.state
        if (isStoreLoading) {
            return (
                <View style={styles.baseContainer}>
                    <StatusBar barStyle="light-content" />
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <Provider store={store}>
                    <View style={styles.baseContainer}>
                        <StatusBar barStyle="light-content" />
                        <MainNavigator />
                    </View>
                </Provider>
            )
        }
    }
}
