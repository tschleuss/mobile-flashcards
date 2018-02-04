import * as ActionTypes from '../actions/actionTypes'

function decks(state = {}, action) {
    switch (action.type) {
        case ActionTypes.GET_DECKS:
            return {
                ...state
            }
        case ActionTypes.ADD_DECK:
            return {
                ...state
            }
        case ActionTypes.GET_CARDS:
            return {
                ...state
            }
        case ActionTypes.ADD_CARD:
            return {
                ...state
            }
        default:
            return state
    }
}

export default decks
