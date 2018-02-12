const sampleDeck = {
    id: 1,
    title: 'JavaScript',
    cards: [{
            id: 1,
            question: 'What\'s a good reason to not use form element names that are the same as different element IDs?',
            answer: 'IE 7 and earlier will accidently grab the form element with that name, instead of the element with that ID.'
        },
        {
            id: 2,
            question: 'What object property holds the function to call when the page is fully loaded?',
            answer: 'window.onload'
        },
        {
            id: 3,
            question: 'What happens if you call a global variable before it\'s been declared?',
            answer: 'Global variables can be declared anywhere in the script. The browser parses all JavaScript before it starts executing. \nThough it\'s recommended to define all global variables at the top of the script.'
        },
        {
            id: 4,
            question: 'null == undefined ?',
            answer: 'true'
        },
        {
            id: 5,
            question: 'false == 0 ?',
            answer: 'true'
        },
        {
            id: 6,
            question: 'What happens if you call a function before it\'s been defined?',
            answer: 'Function declarations can be anywhere in the script. The browser parses all JavaScript before it starts executing.'
        },
        {
            id: 7,
            question: 'Why is null returned as a typeof "object"?',
            answer: 'null is considered to be an empty object reference.'
        },
        {
            id: 8,
            question: 'What\'s the difference between window.location and document.location',
            answer: 'Nothing. They point to the exact same object.'
        },
        {
            id: 9,
            question: 'NaN == NaN ?',
            answer: 'false. NaN is not equal to any value.'
        },
        {
            id: 10,
            question: 'NaN != NaN ?',
            answer: 'true'
        },
        {
            id: 11,
            question: 'What is window.location?',
            answer: 'Property with the URL of the current page.'
        },
        {
            id: 12,
            question: 'How do you enable strict mode?',
            answer: '"use strict" '
        },
        {
            id: 13,
            question: 'Which is more recommended, == or ===?  Why?',
            answer: '=== because of type-conversion issues with ==. Maintains data integrity.'
        },
        {
            id: 14,
            question: 'What does confirm() return?',
            answer: 'true if they click [OK], false if they click [Cancel]'
        },
        {
            id: 15,
            question: '5 + "5"',
            answer: '"55"'
        },
        {
            id: 16,
            question: 'How to find out if a is an array?',
            answer: '(a instanceof Array) or Array.isArray(a)'
        }
    ]
}

export default [sampleDeck]
