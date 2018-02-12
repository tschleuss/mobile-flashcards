import React from 'react'
import PropTypes from 'prop-types'
import StylePropType from 'react-style-proptype'
import { View } from 'react-native'
import Card from '../Card'
import styles from './styles'

/**
 * Display a stack os components 'Card' like a deck of cards.
 * It is possible to specify the total of cards to stack, as well as the distance between them.
 */
export default function CardStack({ height = 50, distance = 8, count = 2, style, onPress, children }) {

    const cards = []
    const maxZindex = count + 1
    for (let i = 0; i < count; i++) {
        const zIndex = maxZindex - (i + 1)
        const marginTop = distance * (i + 1)
        cards.push({ key: i, style: [{ zIndex, marginTop, height }, styles.card, style] })
    }

    /**
     * Render our component in the screen.
     */
    return (
        <View style={[styles.deck, { height }]}>
            <Card style={[{ zIndex: maxZindex, height }, styles.card, style]}>{children}</Card>
            {cards.map(card => <Card key={card.key} style={card.style} />)}
        </View>
    )
}

CardStack.propTypes = {
    height: PropTypes.number,
    distance: PropTypes.number,
    count: PropTypes.number,
    style: StylePropType,
    onPress: PropTypes.func,
    children: PropTypes.node
}
