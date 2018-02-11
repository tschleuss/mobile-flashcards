import React, { Component } from 'react'
import {
    View,
    Text,
    Modal,
    Button,
    Image,
    TouchableOpacity,
    LayoutAnimation
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import ProgressBar from 'react-native-progress/Bar'
import AnimateNumber from 'react-native-animate-number'
import Card from '../../components/Card'
import styles from './styles'

class ModalQuiz extends Component {

    constructor(props) {
        super(props)
        this.state = this._getInitialState(props)
    }

    _getInitialState(props) {
        const cards = props.cards.filter(c => c)
        return {
            cards,
            card: this._getNextCard(cards),
            total: cards.length,
            answers: [], 
            isFlipped: false,
            showButtons: true,
            displayScore: false,
            displayRetry: false,
            progress: 0
        }
    }

    componentWillMount() {
        this.finishLogo = (<Image resizeMode="contain" source={require('../../images/finish.png')} />)
    }

    _closeQuiz() {
        const { onClose } = this.props
        onClose()
    }

    _showAnswer() {
        this.setState(state => ({ 
            ...state,
            showButtons: false, 
            isFlipped: true 
        }))
    }

    _answerQuestion(wasCorrect) {
        this.setState(state => {
            const answers = state.answers
            answers.push(wasCorrect)
            const totalCorrected = answers.filter(a => a).length
            return { 
                ...state, 
                answers,
                progress: ((100 * answers.length) / state.total) / 100,
                score: ((100 * totalCorrected) / state.total),
                showButtons: false,
                isFlipped: false 
            }
        }, () => {
            setTimeout(() => this._renderNextCard(), 150)
        })
    }

    _onFlipStart(fromIsFlipped) {
        this.setState(state => ({ 
            ...state,
            isFlipped: !fromIsFlipped,
            showButtons: false
         }))
    }

    _onFlipEnd(isFlipped) {
        this.setState(state => ({ 
            ...state,
            isFlipped,
            showButtons: true, 
         }))
    }

    _renderNextCard() {
        const { answers, total } = this.state
        if(answers.length === total) {
            this._displayScores()
        } else {
            this.setState(state => ({
                ...state,
                card: this._getNextCard(state.cards)
            }))
        }
    }

    _displayScores() {
        this.setState(state => ({
            ...state,
            displayScore: true
        }))
    }

    _displayRetryOptions() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        this.setState(state => ({
            ...state,
            displayRetry: true
        }))
    }

    _getNextCard(cards) {
        return cards.splice(Math.floor(Math.random() * cards.length), 1).pop()
    }

    _retryQuiz() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        const cards = this.props.cards.filter(c => c)
        this.setState(state => this._getInitialState(props))
    }

    renderFront(card = {}) {
        const { total, answers } = this.state
        return (
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{card.question}</Text>
                <Text style={styles.quizInfoText}>
                    {answers.length}/{total}
                </Text>
            </View>
        )
    }

    renderBack(card = {}) {
        const { total, answers } = this.state
        return (
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{card.answer}</Text>
                <Text style={styles.quizInfoText}>
                    {answers.length}/{total}
                </Text>
            </View>
        )
    }

    render() {
        
        const { 
            card, 
            progress, 
            isFlipped, 
            total,
            score, 
            showButtons,
            displayScore,
            displayRetry
        } = this.state

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
                            {!displayScore && (
                                <Card
                                    flip={!isFlipped}
                                    isFlipped={isFlipped}
                                    style={styles.card}
                                    onFlipStart={this._onFlipStart.bind(this)}
                                    onFlipEnd={this._onFlipEnd.bind(this)}
                                    front={this.renderFront(card)}
                                    back={this.renderBack(card)}/>
                            )}
                            {displayScore && (
                                <View style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'}}>
                                    {/* {this.finishLogo} */}
                                    <Image style={{height: 170}} 
                                        resizeMode="contain"
                                        source={require('../../images/finish.png')} />
                                    <Text style={{
                                        marginTop: 30,
                                        fontSize: 20,
                                        color: '#ccc'}}>Quiz concluído!</Text>
                                    <Text style={{
                                        fontSize: 20,
                                        color: '#ccc'}}>Sua pontuação:</Text>
                                    <Text style={{
                                        fontSize: 45,
                                        fontWeight: 'bold',
                                        color: '#ffbb46'}}>
                                        {/* {score}% */}
                                        <AnimateNumber 
                                            value={score} 
                                            interval={15} 
                                            countBy={1} 
                                            timing="linear" 
                                            onFinish={() => this._displayRetryOptions()}
                                            formatter={val => {
                                            return `${parseFloat(val).toFixed(0)}%`
                                            }}
                                        />
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Buttons */}
                        <View style={{ height: 60, flexDirection: 'row' }}>
                            {showButtons && !isFlipped && (
                                <TouchableOpacity
                                    onPress={() => {this._showAnswer()}}
                                    activeOpacity={0.6}
                                    style={[styles.btn, styles.showAnswerBtn]}>
                                    <Text style={styles.btnText}>Show Answer</Text>
                                </TouchableOpacity>
                            )}
                            {showButtons && isFlipped && (
                                <View style={{flex:1, flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        onPress={() => {this._answerQuestion(false)}}
                                        activeOpacity={0.6}
                                        style={[styles.btn, styles.incorrectBtn]}>
                                        <Text style={styles.btnText}>Incorrect</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {this._answerQuestion(true)}}
                                        activeOpacity={0.6}
                                        style={[styles.btn, styles.correctBtn]}>
                                        <Text style={styles.btnText}>Correct</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {displayScore && displayRetry && (
                                <View style={{flex:1, flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        onPress={() => {this._closeQuiz()}}
                                        activeOpacity={0.6}
                                        style={[styles.btn, styles.incorrectBtn]}>
                                        <Text style={styles.btnText}>Finish</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {this._retryQuiz()}}
                                        activeOpacity={0.6}
                                        style={[styles.btn, styles.correctBtn]}>
                                        <Text style={styles.btnText}>Try again</Text>
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

