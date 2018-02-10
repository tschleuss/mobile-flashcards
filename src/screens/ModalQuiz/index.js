import React, { Component } from 'react'
import {
    View,
    Text,
    Modal,
    Button,
    TouchableOpacity
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import ProgressBar from 'react-native-progress/Bar'
import Card from '../../components/Card'
import styles from './styles'

class ModalQuiz extends Component {

    constructor(props) {
        super(props)
        const { cards } = props
        this.state = {
            cards,
            card: this._getNextCard(cards),
            total: cards.length,
            answered: 0, 
            isFlipped: false
         }
    }

    componentWillReceiveProps(nextProps) {
        const { show } = nextProps
        if(this.state.show !== show) {
            this.setState(state => ({ show }))
        }
    }

    _closeQuiz() {
        const { onClose } = this.props 
        onClose({'sucesso': 'não ;)'})
        this.setState(state => ({ show: false }))
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
            answered: state.answered + 1,
            card: this._getNextCard(state.cards),
            progress: ((100 * (state.answered + 1)) / state.total) / 100
        }))
    }

    _getNextCard(cards) {
        return cards.splice(Math.floor(Math.random() * cards.length), 1).pop()
    }

    _checkFinishedQuiz() {

    }

    renderFront(card = {}) {
        return (
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{card.question}</Text>
            </View>
        )
    }

    renderBack(card = {}) {
        return (
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{card.answer}</Text>
            </View>
        )
    }

    render() {
        const { card, progress, isFlipped } = this.state
        return (
            <Modal
                transparent={true}
                hardwareAccelerated={true}
                animationType={'slide'}
                visible={true}>
                <View style={styles.modalContainer}>
                    <View style={{ flex:1 , flexDirection: 'column', justifyContent: 'space-between' }}>

                        {/* Header */}
                        <View style={styles.headerContainer}>
                            <TouchableOpacity
                                style={{ marginTop: 2 }}
                                onPress={() => this._closeQuiz()}>
                                <Entypo name="cross" size={32} style={{ color: '#32cdff', fontWeight: 'bold' }}/>
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

                        {/* Body */}
                        <View style={styles.bodyContainer}>
                        
                            <Card
                                flip={true}
                                isFlipped={isFlipped}
                                style={{ height: 200, margin: 50 }}
                                onFlipStart={this._onFlipStart.bind(this)}
                                front={this.renderFront(card)}
                                back={this.renderBack(card)}/>

                        </View>

                        {/* Buttons */}
                        <View style={{ flexDirection: 'row' }}>
                            {!isFlipped && (
                                <TouchableOpacity
                                    onPress={() => {this._showAnswer()}}
                                    activeOpacity={0.6}
                                    style={[styles.btn, styles.showAnswerBtn]}>
                                    <Text style={styles.btnText}>Show Answer</Text>
                                </TouchableOpacity>
                            )}
                            {isFlipped && (
                                <View style={{flex:1, flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        onPress={() => {this._nextCard()}}
                                        activeOpacity={0.6}
                                        style={[styles.btn, styles.incorrectBtn]}>
                                        <Text style={styles.btnText}>Incorrect</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {this._nextCard()}}
                                        activeOpacity={0.6}
                                        style={[styles.btn, styles.correctBtn]}>
                                        <Text style={styles.btnText}>Correct</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default ModalQuiz

