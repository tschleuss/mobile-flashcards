import React from 'react'
import PropTypes from 'prop-types'
import { DeckTabs } from '../../config/navigation'

/**
 * Component that renders all tabs for deck view.
 */
export default function DeckView({ navigation }) {
    const { deck } = navigation.state.params
    return <DeckTabs screenProps={{ deckId: deck.id }} />
}

DeckView.propTypes = {
    navigation: PropTypes.object.isRequired
}
