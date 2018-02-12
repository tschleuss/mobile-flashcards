import React from 'react'
import { DeckTabs } from '../../config/navigation'

/**
 * Component that renders all tabs for deck view.
 */
export default function DeckView({ navigation }) {
    const { deck } = navigation.state.params
    return <DeckTabs screenProps={{ deck }} />
}
