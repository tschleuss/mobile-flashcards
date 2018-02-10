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

    componentWillMount() {
        this.image = (<Image resizeMode="contain" style={styles.logo} source={require('../../images/splash_logo.png')} />)
    }

    _onCloseModal(result) {
        console.log(result)
        this.setState(state => ({ started: false }))
    }

    _startQuiz() {
        const { cards } = this.props.screenProps.deck
        this.setState(state => ({ 
            cards: cards.filter(c => c),
            started: true 
        }))
    }

    render() {
        const { cards, started } = this.state
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
                        {this.image}
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
