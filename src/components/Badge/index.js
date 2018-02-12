import React from 'react'
import PropTypes from 'prop-types'
import StylePropType from 'react-style-proptype'
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

Badge.propTypes = {
    style: StylePropType.supportingArrays,
    children: PropTypes.node
}
