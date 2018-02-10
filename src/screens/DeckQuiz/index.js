import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    Modal,
    Button,
    TouchableOpacity
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import ProgressBar from 'react-native-progress/Bar'
import Card from '../../components/Card'
import ModalQuiz from '../ModalQuiz'
import styles from './styles'

class DeckQuiz extends Component {

    constructor() {
        super()
        this.state = { started: false, isFlipped: false }
    }

    _onCloseModal(result) {
        console.log(result)
        this.setState(state => ({ started: false }))
    }

    _startQuiz() {
        const { deck } = this.props.screenProps
        const started = true
        const cards = deck.cards.filter(c => c)
        const total = cards.length
        const count = 0
        const card = this._getNextCard(cards)
        this.setState(state => ({ cards, card, total, count, started }))
    }

    _closeQuiz() {
        const started = false
        const progress = 0
        this.setState(state => ({ started, progress }))
    }

    _showAnswer() {
        this.setState(state => ({ isFlipped: true }))
    }

    _nextCard() {
        this.setState(state => ({ isFlipped: false }), () => {
            // Wait for the flip animation end. Didn't find a better approach
            setTimeout(() => this._renderNextCard(), 150)
        })
    }

    _onFlipStart(fromIsFlipped) {
        this.setState(state => ({ isFlipped: !fromIsFlipped }))
    }

    _renderNextCard() {
        this.setState(state => ({
            nextCard: false,
            count: state.count + 1,
            card: this._getNextCard(state.cards),
            progress: ((100 * (state.count + 1)) / state.total) / 100
        }))
    }

    _getNextCard(cards) {
        return cards.splice(Math.floor(Math.random() * cards.length), 1).pop()
    }

    _checkFinishedQuiz() {

    }

    renderFront(card = {}) {
        return (
            <View
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20
                }}>
                <Text style={{ fontSize: 18, color: '#bbb', textAlign: 'center' }}>
                    {card.question}
                </Text>
            </View>
        )
    }

    renderBack(card = {}) {
        return (
            <View
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20
                }}>
                <Text style={{ fontSize: 18, color: '#bbb', textAlign: 'center' }}>
                    {card.answer}
                </Text>
            </View>
        )
    }

    render() {
        const { cards, card, started, progress, isFlipped } = this.state
        const logo = require('../../images/splash_logo.png')
        return (
            <View
                style={{
                    backgroundColor: '#32cdff',
                    position: 'relative',
                    padding: 20,
                    flex: 1
                }}>
                {started && (
                    <ModalQuiz 
                        onClose={this._onCloseModal.bind(this)}
                        cards={cards}
                    />
                )}
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 24,
                            color: '#354868',
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>
                        Fazer um teste!
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            color: '#354868',
                            textAlign: 'center',
                            marginTop: 20
                        }}>
                        Pronto para um desafio? Teste seu conhecimento sobre o assunto abordado
                        neste baralho!
                    </Text>
                    <View style={styles.container}>
                        <Image resizeMode="contain" style={styles.logo} source={logo} />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            this._startQuiz()
                        }}
                        style={styles.startButton}>
                        <Text
                            style={{
                                fontSize: 18,
                                color: '#fff',
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}>
                            Iniciar o Quiz!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default DeckQuiz
