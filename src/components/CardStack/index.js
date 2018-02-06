import React from 'react'
import { View } from 'react-native'
import styles from './styles'

export default function CardStack({ height = 50, distance = 8, count = 2, style, children }) {

    const cards = []
    const maxZindex = count + 1
    for (let i = 0; i < count; i++) {
        const zIndex = maxZindex - (i + 1)
        const marginTop = distance * (i + 1)
        cards.push({ key: i, style: [{ zIndex, marginTop }, styles.card, { height }] })
    }

    return (
        <View style={[styles.deck,{height}]}>
            <View style={[{zIndex:maxZindex}, styles.card, style, {height}]}>
                {children}
            </View>
            {cards.map(card => (
                <View key={card.key} style={card.style} />    
            ))}
        </View>
    )
}
