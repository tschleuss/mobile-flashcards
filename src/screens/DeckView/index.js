import React from 'react'
import { DeckTabs } from '../../config/navigation'

export default function DeckView({ navigation }) {
    const { deck } = navigation.state.params
    return <DeckTabs screenProps={{ deck }} />
}
