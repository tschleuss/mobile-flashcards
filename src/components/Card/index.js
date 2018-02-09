import React, { Component } from 'react'
import { View, Easing, TouchableOpacity } from 'react-native'
import FlipView from 'react-native-flip-view-next'
import styles from './styles'

class Card extends Component {
    
    constructor() {
        super()
        this.state = { isFlipped: false }
    }

    componentWillReceiveProps(nextProps) {
        const { isFlipped } = this.state
        if(isFlipped && !nextProps.isFlipped) {
            this.setState(state => ({ isFlipped: false }))
        }
    }

    renderFront() {
        const { flip, front, children, cardStyle = {} } = this.props
        return flip ? (
            <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={() => {
                    this.flip()
                }}>
                <View style={[styles.card, cardStyle]}>{front}</View>
            </TouchableOpacity>
        ) : (
            <View style={[styles.card, cardStyle]}>{children}</View>
        )
    }

    renderBack() {
        const { back, cardStyle = {} } = this.props
        return (
            <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={() => {
                    this.flip()
                }}>
                <View style={[styles.card, cardStyle]}>{back}</View>
            </TouchableOpacity>
        )
    }

    flip() {
        this.setState(state => ({ isFlipped: !state.isFlipped }))
    }

    render() {
        const { style } = this.props
        return (
            <FlipView
                style={style}
                front={this.renderFront()}
                back={this.renderBack()}
                isFlipped={this.state.isFlipped}
                flipAxis="y"
                flipEasing={Easing.out(Easing.ease)}
                flipDuration={500}
                perspective={2000}
            />
        )
    }
}

export default Card
