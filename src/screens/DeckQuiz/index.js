import React, { Component } from 'react'
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ModalQuiz from '../ModalQuiz'
import styles from './styles'

class DeckQuiz extends Component {

    constructor() {
        super()
        this.state = { started: false }
    }

    componentWillMount() {
        const imgUrl = require('../../images/quiz.png')
        this.image = (<Image resizeMode="contain" style={styles.logo} source={imgUrl} />)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (typeof nextProps.deck === 'undefined') {
            return false
        }
        return true
    }

    onCloseModal(result) {
        this.setState({ started: false })
    }

    startQuiz() {
        const { cards } = this.props.deck
        if (cards.length) {
            this.setState({
                cards: cards.filter(c => c),
                started: true
            })
        } else {
            const msg = `Seems that you don't have any cards yet! Start creating a new one on Cards tab.`
            const btns = [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => this.goToCardsTab() }
            ]
            Alert.alert('Empty deck', msg, btns)
        }
    }

    goToCardsTab() {
        const { navigation } = this.props
        navigation.navigate('DeckCards')
    }

    render() {
        const { cards } = this.props.deck
        const { started } = this.state
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
                    {
                        /**
                         * Tried to just adjust disabled and style dynamicaly
                         * to handle disabled property, but seems that 
                         * TouchableOpacity has some bugs with it:
                         * https://github.com/facebook/react-native/issues/17105
                         */
                    }
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
