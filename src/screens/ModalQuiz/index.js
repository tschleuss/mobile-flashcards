import React, { Component } from 'react'
import { View, Text, Modal, Image, TouchableOpacity, LayoutAnimation } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import ProgressBar from 'react-native-progress/Bar'
import AnimateNumber from 'react-native-animate-number'
import Card from '../../components/Card'
import styles from './styles'

class ModalQuiz extends Component {

    constructor(props) {
        super(props)
        this.state = this.getInitialState(props)
    }

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
            progress: 0
        }
    }

    componentWillMount() {
        this.finishLogo = (<Image style={styles.scoreLogo} resizeMode="contain" source={require('../../images/finish.png')} />)
    }

    closeQuiz() {
        const { onClose } = this.props
        onClose()
    }

    showAnswer() {
        this.setState({ showButtons: false, isFlipped: true })
    }

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
            setTimeout(() => this.renderNextCard(), 150)
        })
    }

    onFlipStart(fromIsFlipped) {
        this.setState({ isFlipped: !fromIsFlipped, showButtons: false })
    }

    onFlipEnd(isFlipped) {
        this.setState({ isFlipped, showButtons: true })
    }

    renderNextCard() {
        const { answers, total } = this.state
        if (answers.length === total) {
            this.displayScores()
        } else {
            this.setState(state => ({ card: this.getNextCard(state.cards) }))
        }
    }

    displayScores() {
        this.setState({ displayScore: true })
    }

    displayRetryOptions() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        this.setState({ displayRetry: true })
    }

    getNextCard(cards) {
        return cards.splice(Math.floor(Math.random() * cards.length), 1).pop()
    }

    retryQuiz() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        this.setState(state => this.getInitialState(this.props))
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

    formatScore(value) {
        return `${parseFloat(value).toFixed(0)}%`
    }

    render() {

        const { card, progress, isFlipped, score } = this.state
        const { showButtons, displayScore, displayRetry } = this.state

        return (
            <Modal
                transparent={true}
                hardwareAccelerated={true}
                animationType={'slide'}
                visible={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.quizContainer}>

                        {/* Header */}
                        <View style={styles.headerContainer}>
                            <TouchableOpacity
                                style={{ marginTop: 2 }}
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
                                    <Text style={styles.scoreTextTitle}>Quiz concluído!</Text>
                                    <Text style={styles.scoreText}>Sua pontuação:</Text>
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
