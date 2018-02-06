import React, { Component } from 'react'
import { FlatList, View, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import styles from './styles'

class DeckCards extends Component {

    render() {
        return (
            <View style={{backgroundColor:'#32cdff', flex:1}}>
                <Text>deck cards</Text>
            </View>
        )
    }
}

export default DeckCards
