import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckList from './screens/DeckList'
import { Constants } from 'expo'
import { MainNavigator } from './config/navigation'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.store = createStore(reducer)
    }

    render() {
        return (
            <Provider store={this.store}>
                <View style={{ flex: 1 }}>
                    <StatusBar barStyle="light-content" />
                    {/* <View style={{backgroundColor: '#32cdff', height: Constants.statusBarHeight }}>
                        <StatusBar translucent barStyle='light-content'/>
                    </View> */}
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}
