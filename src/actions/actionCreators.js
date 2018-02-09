import * as ActionTypes from './actionTypes'

/** Decks */

export const getDecks = () => ({ type: ActionTypes.GET_DECKS })
export const addDeck = deck => ({ type: ActionTypes.ADD_DECK, deck })

/** Cards */

export const getCards = () => ({ type: ActionTypes.GET_CARDS })
export const addCard = card => ({ type: ActionTypes.ADD_CARD, card })
