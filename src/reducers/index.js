import * as ActionTypes from '../actions/actionTypes'

const mockInitialState = [{
    title: 'React',
    cards: [{
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
    }, {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
    }]
}, {
    title: 'JavaScript',
    cards: [{
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
    }]
}]

function decks(state = mockInitialState, action) {
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
