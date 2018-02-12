import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StylePropType from 'react-style-proptype'
import { View, Easing, TouchableOpacity } from 'react-native'
import FlipView from 'react-native-flip-view-next'
import styles from './styles'

/**
 * Display a stylized empty white card with rounder corners.
 */
class Card extends Component {

    /**
     * Default constructor.
     */
    constructor(props) {
        super(props)
        this.state = {
            flip: props.flip || false,
            isFlipped: props.isFlipped || false
        }
    }

    /**
     * Listen to some properties change to know if 
     * we need to update our component.
     */
    componentWillReceiveProps(nextProps) {
        const { flip, isFlipped } = nextProps
        this.setState(state => ({ flip, isFlipped }))
    }

    /**
     * This function render what will be displayed in the front part of the card.
     * When flip is active, the component will listen to tap action to flip the card. 
     */
    renderFront() {
        const { front, children, cardStyle = {} } = this.props
        const { flip } = this.state
        return flip ? (
            <TouchableOpacity
                style={styles.flex}
                activeOpacity={1}
                onPress={() => this.flip()}>
                <View style={[styles.card, cardStyle]}>{front}</View>
            </TouchableOpacity>
        ) : (
            <View style={[styles.card, cardStyle]}>{children}</View>
        )
    }

    /**
     * When flip is active, this function render what will be displayed
     * in the back part of the card.
     */
    renderBack() {
        const { back, cardStyle = {} } = this.props
        return (
            <TouchableOpacity
                style={styles.flex}
                activeOpacity={1}
                onPress={() => this.flip()}>
                <View style={[styles.card, cardStyle]}>{back}</View>
            </TouchableOpacity>
        )
    }

    /**
     * Flip our card to show what was rendered in the oposite side.
     */
    flip() {
        const { flip } = this.state
        if (flip === true) {
            this.setState(state => ({ isFlipped: !state.isFlipped }))
        }
    }

    /**
     * Render our component in the screen.
     */
    render() {
        const { style, onFlipStart, onFlipEnd } = this.props
        const { isFlipped } = this.state
        return (
            <FlipView
                style={style}
                front={this.renderFront()}
                back={this.renderBack()}
                isFlipped={isFlipped}
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

Card.propTypes = {
    flip: PropTypes.bool,
    isFlipped: PropTypes.bool,
    onFlipStart: PropTypes.func,
    onFlipEnd: PropTypes.func,
    front: PropTypes.node,
    back: PropTypes.node,
    children: PropTypes.node,
    cardStyle: StylePropType,
    style: StylePropType.supportingArrays
}
