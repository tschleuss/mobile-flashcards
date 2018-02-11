import React, { Component } from 'react'
import { View, Text, StatusBar, AppState, AsyncStorage } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { MainNavigator } from '../../config/navigation'
import reducer from '../../reducers'
import styles from './styles'

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isStoreLoading: false,
            store: createStore(reducer)
        }
    }

    componentWillMount() {
        AppState.addEventListener('change', this._handleAppStateChange.bind(this))
        this._syncStorageWithState()
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange.bind(this))
    }

    _syncStorageWithState() {
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

    _handleAppStateChange(currentAppState) {
        const storingValue = JSON.stringify(this.state.store.getState())
        AsyncStorage.setItem('completeStore', storingValue)
    }

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
