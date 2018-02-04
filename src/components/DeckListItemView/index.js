import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

export default function DeckListItemView({ item }) {
    return (
        <View style={styles.row}>
            <View style={styles.container}>
                <Text style={{fontSize: 18, color: '#ccc'}}>{item.title} ({item.cards.length})</Text>
            </View>
        </View>
    )
}
