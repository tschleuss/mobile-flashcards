import * as ActionTypes from '../actions/actionTypes'
import initialState from './state'

function decks(state = initialState, action) {

    switch (action.type) {

        case ActionTypes.GET_DECKS:
            return {
                ...state
            }

        case ActionTypes.ADD_DECK:
            return [...state, {
                id: Date.now(),
                title: action.name,
                cards: []
            }]

        case ActionTypes.REMOVE_DECK:
            return state.filter(d => d.id !== action.id)

        case ActionTypes.SAVE_DECK:
            return state.map(deck => {
                if (deck.id === action.deck.id) {
                    return action.deck
                }
                return deck
            })

        case ActionTypes.GET_CARDS:
            return {
                ...state
            }

        case ActionTypes.ADD_CARD:
            return state.map(deck => {
                if (deck.id === action.deckId) {
                    deck.cards.push({
                        ...action.card,
                        id: Date.now()
                    })
                }
                return deck
            })

        case ActionTypes.REMOVE_CARD:
            return state.map(deck => {
                const nDeck = { ...deck }
                if (deck.id === action.deckId) {
                    nDeck.cards = nDeck.cards.filter(c => c.id !== action.cardId)
                }
                return nDeck
            })

        case ActionTypes.SAVE_CARD:
            return state.map(deck => {
                if (deck.id === action.deckId) {
                    deck.cards = deck.cards.map(card => {
                        if (card.id === action.card.id) {
                            return action.card
                        }
                        return card
                    })
                }
                return deck
            })

        default:
            return state
    }
}

export default decks
