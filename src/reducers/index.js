import * as ActionTypes from '../actions/actionTypes'

const mockInitialState = [{
        id: '1',
        title: 'React',
        cards: [{
                id: '1',
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                id: '2',
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    {
        id: '2',
        title: 'JavaScript',
        cards: [{
                id: '1',
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            },
            {
                id: '2',
                question: "What's a good reason to not use form element names that are the same as different element IDs?",
                answer: 'IE 7 and earlier will accidently grab the form element with that name, instead of the element with that ID.'
            },
            {
                id: '3',
                question: 'For an Element type, what is an alias of .nodeName?',
                answer: '.tagName;'
            },
            {
                id: '4',
                question: 'function f() { a=10; return; }What will this return?',
                answer: 'undefined'
            },
            {
                id: '5',
                question: 'How do you convert a string to a number?',
                answer: "Number('42');"
            }
        ]
    }
]

function decks(state = mockInitialState, action) {
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
            return {
                ...state
            }
        case ActionTypes.REMOVE_CARD:
            return state.map(deck => {
                const nDeck = { ...deck }
                if (deck.id === action.deckId) {
                    nDeck.cards = nDeck.cards.filter(c => c.id !== action.cardId)
                }
                return nDeck
            })
        default:
            return state
    }
}

export default decks
