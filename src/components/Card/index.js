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
        const { flip, front } = this.props
        return (
            flip ?
            <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={() => {this.flip()}}>
                <View style={[{flex:1},styles.card, this.props.style]}>{front}</View>
            </TouchableOpacity> :
            <View style={[{flex:1},styles.card, this.props.style]}>{this.props.children}</View>
        )
    }

    renderBack() {
        const { back } = this.props
        return (
            <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={() => {this.flip()}}>
                <View style={[{flex:1},styles.card, this.props.style]}>{back}</View>
            </TouchableOpacity>
        )
    }

    flip() {
        this.setState(state => ({ isFlipped: !state.isFlipped }))
    }

    render() {
        return (
            <FlipView style={[this.props.style]}
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
