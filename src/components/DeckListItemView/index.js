import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import CardStack from '../../components/CardStack'

export default function DeckListItemView({ item }) {
    return (
        <View style={styles.row}>
            <CardStack distance={5}>
                <Text style={{fontSize: 18, color: '#bbb'}}>{item.title} ({item.cards.length})</Text>
            </CardStack>
        </View>
    )
}
