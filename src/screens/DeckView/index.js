import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DeckTabs } from '../../config/navigation'
import styles from './styles'

class DeckView extends Component {

    render() {
        return (
            <DeckTabs/>
        )
    }
}

// Test
function mapStateToProps(decks) {
    return { decks }
}

export default connect(mapStateToProps)(DeckView)
