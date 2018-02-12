import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

/**
 * Badge component to show deck cards count.
 */
export default function Badge({ style, children }) {
    return (
        <View style={[styles.badge, style]}>
            <Text style={styles.badgeText}>{children}</Text>
        </View>
    )
}
