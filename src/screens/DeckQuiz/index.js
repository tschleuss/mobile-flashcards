import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ModalQuiz from '../ModalQuiz'
import styles from './styles'

/**
 * Display a option to user take a quiz based 
 * on current deck questions and answerd.
 */
class DeckQuiz extends Component {

    /**
     * Default constructor.
     */
    constructor() {
        super()
        this.state = { started: false }
    }

    /**
     * Preload a imagem as soon as the component will mount.
     * At some times, using the image directly on 'render' it delay to show up.
     */
    componentWillMount() {
        const imgUrl = require('../../images/quiz.png')
        this.image = (<Image resizeMode="contain" style={styles.logo} source={imgUrl} />)
    }

    /**
     * Define when that screen should be updated.
     * When it don't have a defined deck yet, prevent react from rendered it.
     */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (typeof nextProps.deck === 'undefined') {
            return false
        }
        return true
    }

    /**
     * Listener called when user finish a quiz.
     */
    onCloseModal(result) {
        this.setState({ started: false })
    }

    /**
     * Start a quiz for current deck.
     */
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

    /**
     * Redirect user to 'Cards' tab to create new ones in case
     * no cards exists yet in the current deck.
     */
    goToCardsTab() {
        const { navigation } = this.props
        navigation.navigate('DeckCards')
    }

    /**
     * Render our component in the screen.
     */
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

DeckQuiz.propTypes = {
    deck: PropTypes.object,
    navigation: PropTypes.object.isRequired
}
