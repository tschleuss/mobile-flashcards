import React, { Component } from 'react'
import { DeckTabs } from '../../config/navigation'
import styles from './styles'

class DeckView extends Component {

    render() {
        const { navigation } = this.props
        const { deck } = navigation.state.params
        return (
            <DeckTabs screenProps={{deck}}/>
        )
    }
}

export default DeckView
