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
import styles from './styles'

class DeckQuiz extends Component {

    constructor() {
        super()
        this.state = { started: false, isFlipped: false }
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
            count: state.count+1,
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
                    flex: 1,
                    position: 'relative',
                    padding: 20,
                    overflow: 'hidden'
                }}>
                <Modal
                    transparent={true}
                    hardwareAccelerated={true}
                    animationType={'slide'}
                    visible={started}>
                    <View
                        style={{
                            flex: 1,
                            position: 'relative',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            marginTop: 20,
                            backgroundColor: '#fff'
                        }}>
                        <View style={{ flexDirection: 'column' }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 10
                                }}>
                                <TouchableOpacity
                                    style={{ marginTop: 2 }}
                                    onPress={() => this._closeQuiz()}>
                                    <Entypo
                                        name="cross"
                                        size={32}
                                        style={{ color: '#32cdff', fontWeight: 'bold' }}
                                    />
                                </TouchableOpacity>
                                <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
                                    <ProgressBar
                                        progress={progress}
                                        width={null}
                                        height={8}
                                        borderWidth={0}
                                        color={'#ffbb46'}
                                        animationConfig={{ bounciness: 15 }}
                                        unfilledColor={'#e8e8e8'}
                                        useNativeDriver={true}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                            
                                <Card
                                    flip={true}
                                    isFlipped={isFlipped}
                                    style={{ height: 200, margin: 50 }}
                                    onFlipStart={this._onFlipStart.bind(this)}
                                    front={this.renderFront(card)}
                                    back={this.renderBack(card)}/>

                                {!isFlipped && (
                                    <Button
                                        onPress={() => this._showAnswer()}
                                        title="Show Answer"
                                        color="#841584"/>
                                )}
                                
                                {isFlipped && (
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <TouchableOpacity
                                            onPress={() => {this._nextCard()}}
                                            activeOpacity={0.6}
                                            style={[styles.btn, styles.correctBtn]}>
                                            <Text style={styles.btnText}>Correct</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {this._nextCard()}}
                                            activeOpacity={0.6}
                                            style={[styles.btn, styles.incorrectBtn]}>
                                            <Text style={styles.btnText}>Incorrect</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                            </View>
                        </View>
                    </View>
                </Modal>
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
