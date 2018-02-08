import React, { Component } from 'react'
import { View, Text, Easing, TouchableOpacity } from 'react-native'
import FlipView from 'react-native-flip-view-next'
import styles from './styles'

class Card extends Component {

    constructor(props) {
        super(props)
        this.state = { isFlipped: false }
    }

    renderFront() {
        const { flip, front, style, children } = this.props
        return (
            flip ?
            <TouchableOpacity 
                style={{flex:1}} 
                activeOpacity={1} 
                onPress={() => {this.flip()}}>
                <View style={[styles.card]}>{front}</View>
            </TouchableOpacity> :
            <View style={[styles.card]}>{children}</View>
        )
    }

    renderBack() {
        const { back, style } = this.props
        return (
            <TouchableOpacity 
                style={{flex:1}} 
                activeOpacity={1} 
                onPress={() => {this.flip()}}>
                <View style={[styles.card]}>{back}</View>
            </TouchableOpacity>
        )
    }

    flip() {
        this.setState(state => ({ isFlipped: !state.isFlipped }))
    }

    render() {
        const { style } = this.props
        return (
            <FlipView style={[{flex:1}, style]}
                front={this.renderFront()}
                back={this.renderBack()}
                isFlipped={this.state.isFlipped}
                flipAxis="y"
                flipEasing={Easing.out(Easing.ease)}
                flipDuration={700}
                perspective={2000}/>
        )
    }
}

export default Card
