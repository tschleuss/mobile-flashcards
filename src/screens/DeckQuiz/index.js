import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ModalQuiz from '../ModalQuiz'
import styles from './styles'

class DeckQuiz extends Component {

    constructor() {
        super()
        this.state = {
            started: false,
            isFlipped: false
        }
    }

    componentWillMount() {
        const imgUrl = require('../../images/quiz.png')
        this.image = (<Image resizeMode="contain" style={styles.logo} source={imgUrl} />)
    }

    onCloseModal(result) {
        this.setState({ started: false })
    }

    startQuiz() {
        const { cards } = this.props.deck
        this.setState({ cards: cards.filter(c => c), started: true })
    }

    render() {
        const { cards, started } = this.state
        return (
            <View style={styles.screenContainer}>
                {started && (
                    <ModalQuiz 
                        onClose={this.onCloseModal.bind(this)}
                        cards={cards}/>
                )}
                <View style={styles.quizContainer}>
                    <Text style={styles.quizTitle}>Take a Quiz!</Text>
                    <Text style={styles.quizText}>
                        Ready for a challenge? Test your knowledge of this deck.
                    </Text>
                    <View style={styles.imageContainer}>{this.image}</View>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => this.startQuiz()}
                        style={styles.startButton}>
                        <Text style={styles.buttonText}>Start Quiz!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (decks, props) => ({
    deck: decks.find(d => d.id === props.screenProps.deck.id)
})

export default connect(mapStateToProps)(DeckQuiz)
