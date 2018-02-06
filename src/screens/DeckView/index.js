import React, { Component } from 'react'
import { FlatList, View, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import styles from './styles'
import DeckListItemView from '../../components/DeckListItemView'
import { DeckTabs } from '../../config/navigation'

class DeckView extends Component {

    render() {
        return (
            <DeckTabs/>
        )
    }
}

// Test
function mapStateToProps(decks) {
    return { decks }
}

export default connect(mapStateToProps)(DeckView)
