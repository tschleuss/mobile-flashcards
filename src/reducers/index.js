import * as ActionTypes from '../actions/actionTypes'

const mockInitialState = [{
    id: '1',
    title: 'React',
    cards: [{
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
    }, {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
    }]
}, {
    id: '2',
    title: 'JavaScript',
    cards: [{
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
    }, {
        question: "What's a good reason to not use form element names that are the same as different element IDs?",
        answer: "IE 7 and earlier will accidently grab the form element with that name, instead of the element with that ID."
    }, {
        question: "For an Element type, what is an alias of .nodeName?",
        answer: ".tagName;"
    }, {
        question: "function f() { a=10; return; }What will this return?",
        answer: "undefined"
    }, {
        question: "How do you convert a string to a number?",
        answer: "Number('42');"
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
