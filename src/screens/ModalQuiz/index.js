import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Modal, Image, TouchableOpacity, LayoutAnimation } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import ProgressBar from 'react-native-progress/Bar'
import AnimateNumber from 'react-native-animate-number'
import Card from '../../components/Card'
import styles from './styles'

/**
 * Modal used to display the quiz for a deck.
 */
class ModalQuiz extends Component {

    /**
     * Default constructor.
     */
    constructor(props) {
        super(props)
        this.state = this.getInitialState(props)
    }

    /**
     * Define the initial state of this component.
     * Here we create a copy of current deck because every
     * answered question will be removed from it.
     */
    getInitialState(props) {
        const cards = props.cards.filter(c => c)
        const total = cards.length
        const card = this.getNextCard(cards)
        return {
            cards,
            total,
            card,
            answers: [],
            isFlipped: false,
            showButtons: true,
            displayScore: false,
            displayRetry: false,
            progress: 0,
            canClose: true
        }
    }

    /**
     * Preload a imagem as soon as the component will mount.
     * At some times, using the image directly on 'render' it delay to show up.
     */
    componentWillMount() {
        const imgUrl = require('../../images/finish.png')
        this.finishLogo = (<Image style={styles.scoreLogo} resizeMode="contain" source={imgUrl} />)
    }

    /** 
     * Listener called when user closes the quiz modal.
     */
    closeQuiz() {
        const { onClose } = this.props
        const { canClose } = this.state
        if(canClose) {
            onClose()
        }
    }

    /** 
     * Listener called when user tap to display the card answer.
     */
    showAnswer() {
        this.setState({ showButtons: false, isFlipped: true })
    }

    /**
     * Listener called when user tap the if 
     * they know tha answer for a question.
     */
    answerQuestion(wasCorrect) {
        this.setState(state => {
            const answers = state.answers.concat(wasCorrect)
            const totalCorrected = answers.filter(a => a).length
            return {
                answers,
                progress: ((100 * answers.length) / state.total) / 100,
                score: ((100 * totalCorrected) / state.total),
                showButtons: false,
                isFlipped: false
            }
        }, () => {
            // FIXME - Wait for the flip animation ends. Not the best solution.
            setTimeout(() => this.renderNextCard(), 150)
        })
    }

    /**
     * Listener called when the card starts to flip.
     * Here we disable all buttons to not have problems 
     * with animations and async operations.
     */
    onFlipStart(fromIsFlipped) {
        this.setState({ isFlipped: !fromIsFlipped, showButtons: false })
    }

    /**
     * Listener called when the card ends to flip.
     * Here we enable buttons again.
     */
    onFlipEnd(isFlipped) {
        this.setState({ isFlipped, showButtons: true })
    }

    /** 
     * Render the next card if exists, otherwise
     * we should display the score, because the quiz has ended.
     */
    renderNextCard() {
        const { answers, total } = this.state
        if (answers.length === total) {
            this.displayScores()
        } else {
            this.setState(state => ({ card: this.getNextCard(state.cards) }))
        }
    }

    /** 
     * Display the final score on screen.
     */
    displayScores() {
        this.setState({ canClose: false, displayScore: true })
    }

    /** 
     * Display a retry option when quiz ends.
     */
    displayRetryOptions() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        this.setState({ canClose: true, displayRetry: true })
    }

    /**
     * Randomicaly remove and return a card from the deck.
     */
    getNextCard(cards) {
        return cards.splice(Math.floor(Math.random() * cards.length), 1).pop()
    }

    /** 
     * Listener called to reset current quiz and start again.
     */
    retryQuiz() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        this.setState(state => this.getInitialState(this.props))
    }

    /**
     * This function render what will be displayed in the front part of the card.
     */
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

    /**
     * This function render what will be displayed in the back part of the card.
     */
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

    /**
     * Format users score to display on screen.
     */
    formatScore(value) {
        return `${parseFloat(value).toFixed(0)}%`
    }

    /**
     * Render our component in the screen.
     */
    render() {

        const { card, progress, isFlipped, score } = this.state
        const { showButtons, displayScore, displayRetry } = this.state

        return (
            <Modal
                transparent={true}
                hardwareAccelerated={true}
                animationType={'slide'}
                visible={true}
                onRequestClose={() => { this.closeQuiz() }}>
                <View style={styles.modalContainer}>
                    <View style={styles.quizContainer}>

                        {/* Header */}
                        <View style={styles.headerContainer}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => this.closeQuiz()}>
                                <Entypo name="cross" size={32} style={styles.closeIcon}/>
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
                                    onFlipStart={this.onFlipStart.bind(this)}
                                    onFlipEnd={this.onFlipEnd.bind(this)}
                                    front={this.renderFront(card)}
                                    back={this.renderBack(card)}/>
                            )}
                            {displayScore && (
                                <View style={styles.scoreContainer}>
                                    {this.finishLogo}
                                    <Text style={styles.scoreTextTitle}>Quiz finished!</Text>
                                    <Text style={styles.scoreText}>Your score:</Text>
                                    <Text style={styles.scoreValue}>
                                        <AnimateNumber 
                                            value={score} 
                                            interval={15} 
                                            countBy={1} 
                                            timing="linear" 
                                            onFinish={() => this.displayRetryOptions()}
                                            formatter={value => this.formatScore(value)}
                                        />
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Buttons */}
                        <View style={styles.buttonContainer}>
                            {showButtons && !isFlipped && (
                                <TouchableOpacity
                                    onPress={() => {this.showAnswer()}}
                                    activeOpacity={0.6}
                                    style={[styles.btn, styles.showAnswerBtn]}>
                                    <Text style={styles.btnText}>Show Answer</Text>
                                </TouchableOpacity>
                            )}
                            {showButtons && isFlipped && (
                                <View style={styles.buttonGroupWrapper}>
                                    <TouchableOpacity
                                        onPress={() => {this.answerQuestion(false)}}
                                        activeOpacity={0.6}
                                        style={[styles.btn, styles.incorrectBtn]}>
                                        <Text style={styles.btnText}>Incorrect</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {this.answerQuestion(true)}}
                                        activeOpacity={0.6}
                                        style={[styles.btn, styles.correctBtn]}>
                                        <Text style={styles.btnText}>Correct</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {displayScore && displayRetry && (
                                <View style={styles.buttonGroupWrapper}>
                                    <TouchableOpacity
                                        onPress={() => {this.closeQuiz()}}
                                        activeOpacity={0.6}
                                        style={[styles.btn, styles.incorrectBtn]}>
                                        <Text style={styles.btnText}>Finish</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {this.retryQuiz()}}
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

ModalQuiz.propTypes = {
    cards: PropTypes.array.isRequired,
    onClose: PropTypes.func
}
