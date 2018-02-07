import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Card from '../Card'
import styles from './styles'

export default function CardStack({ height = 50, distance = 8, count = 2, style, onPress, children }) {

    const cards = []
    const maxZindex = count + 1
    for (let i = 0; i < count; i++) {
        const zIndex = maxZindex - (i + 1)
        const marginTop = distance * (i + 1)
        cards.push({ key: i, style: [{ zIndex, marginTop }, styles.card, { height }] })
    }

    return (
        <View style={[styles.deck,{flex:1, height}]}>
            <Card style={[{flex:1, zIndex:maxZindex}, styles.card, {height}]}>{children}</Card>
            {cards.map(card => <Card key={card.key} style={card.style} />)}
        </View>
    )
}
