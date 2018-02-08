import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

export default function Badge({ style, children }) {
    return (
        <View style={[styles.badge, style]}>
            <Text style={styles.badgeText}>{children}</Text>
        </View>
    )
}
