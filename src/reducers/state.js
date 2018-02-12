const sampleDeck = {
    id: Date.now(),
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

export default [sampleDeck]
