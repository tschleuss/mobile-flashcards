import React, { Component } from 'react'
import { View, Easing, TouchableOpacity } from 'react-native'
import FlipView from 'react-native-flip-view-next'
import styles from './styles'

class Card extends Component {
    
    constructor(props) {
        super(props)
        this.state = { 
            flip: props.flip || false,
            isFlipped: props.isFlipped || false
        }
    }

    componentWillReceiveProps(nextProps) {
        const { flip, isFlipped } = nextProps
        this.setState(state => ({ flip, isFlipped }))
    }

    renderFront() {
        const { front, children, cardStyle = {} } = this.props
        const { flip } = this.state
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
        const { flip } = this.state
        if(flip === true) {
            this.setState(state => ({ 
                ...state, 
                isFlipped: !state.isFlipped
            }))
        }
    }

    render() {
        const { style, onFlipStart, onFlipEnd } = this.props
        return (
            <FlipView
                style={style}
                front={this.renderFront()}
                back={this.renderBack()}
                isFlipped={this.state.isFlipped}
                flipAxis="y"
                flipEasing={Easing.out(Easing.ease)}
                onFlipStart={onFlipStart}
                onFlipEnd={onFlipEnd}
                flipDuration={500}
                perspective={2000}
            />
        )
    }
}

export default Card
