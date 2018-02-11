import * as ActionTypes from './actionTypes'

/** Decks */

export const getDecks = () =>
    ({ type: ActionTypes.GET_DECKS })

export const addDeck = name =>
    ({ type: ActionTypes.ADD_DECK, name })

export const removeDeck = id =>
    ({ type: ActionTypes.REMOVE_DECK, id })

export const saveDeck = deck =>
    ({ type: ActionTypes.SAVE_DECK, deck })

/** Cards */

export const getCards = () =>
    ({ type: ActionTypes.GET_CARDS })

export const addCard = (deckId, card) =>
    ({ type: ActionTypes.ADD_CARD, deckId, card })

export const removeCard = (deckId, cardId) =>
    ({ type: ActionTypes.REMOVE_CARD, deckId, cardId })

export const saveCard = (deckId, card) =>
    ({ type: ActionTypes.SAVE_CARD, deckId, card })
