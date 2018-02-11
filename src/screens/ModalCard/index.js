import React, { Component } from 'react'
import { View, Text, Modal, Alert, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import ModalInput from '../../components/ModalInput'
import Card from '../../components/Card'
import styles from './styles'

class ModalCard extends Component {

    constructor(props) {
        super(props)
        this.initConstants()
        this.state = this.getInitialState()
    }

    getInitialState(props) {
        const { title = '', question, answer } = props
        return {
            editing: false,
            type: '',
            editTitle: '',
            editPlaceholder: '',
            title,
            question,
            answer
        }
    }

    initConstants() {
        this.TYPE_QUESTION = 'question'
        this.TYPE_ANSWER = 'answer'
        this.DEFAULT_QUESTION = 'Type your front question...'
        this.DEFAULT_ANSWER = 'Type your back answer...'
    }

    getStateForEditType(type) {
        if (type === this.TYPE_QUESTION) {
            return {
                editTitle: 'Question',
                editPlaceholder: this.DEFAULT_QUESTION
            }
        }
        return {
            editTitle: 'Answer',
            editPlaceholder: this.DEFAULT_ANSWER
        }
    }

    editCard(type) {
        this.setState(state => ({
            ...state,
            ...this.getStateForEditType(type),
            type,
            editing: true
        }))
    }

    onCancelEditing() {
        this.setState({ editing: false })
    }

    onFinishEditing(type, value) {
        this.setState(state => {
            const nState = { ...state, editing: false }
            if (type === this.TYPE_QUESTION) {
                nState.question = value
            } else {
                nState.answer = value
            }
            return nState
        })
    }

    cancelEdit() {
        const { onCancel = () => {} } = this.props
        onCancel()
    }

    finishEdit() {
        const { onFinish = () => {} } = this.props
        const { question = '', answer = '' } = this.state
        if (question.length && answer.length) {
            onFinish(question, answer)
        } else {
            const msg = 'You should inform a question and answer.'
            const btns = [{ text: 'OK' }]
            Alert.alert('Validation', msg, btns)
        }
    }

    render() {

        const { editing, editTitle, editPlaceholder } = this.state
        const { type, title, question, answer } = this.state
        const editValue = type === this.TYPE_QUESTION ? question : answer
        const questionPlaceholder = question ? false : true
        const answerPlaceholder = answer ? false : true

        return (
            <Modal
                transparent={true}
                hardwareAccelerated={true}
                animationType={'slide'}
                visible={true}>
                {editing && (
                    <ModalInput 
                        title={editTitle}
                        placeholder={editPlaceholder}
                        maxLength={30}
                        value={editValue}
                        onCancel={() => this.onCancelEditing() }
                        onFinish={value => this.onFinishEditing(type, value)}
                    />
                )}
                <View style={styles.modalContainer}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            style={{ marginTop: 2 }}
                            onPress={() => this.cancelEdit()}>
                            <Entypo name="cross" size={32} style={{ color: '#32cdff', fontWeight: 'bold' }}/>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <TouchableOpacity 
                            style={styles.btn}
                            onPress={() => this.finishEdit()}>
                            <Text style={styles.btnText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardContainer}>
                        <Card style={styles.card}>
                            <View style={styles.textContainer}>
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={() => this.editCard(this.TYPE_QUESTION)}>
                                    {questionPlaceholder ? (
                                        <Text style={styles.placeholder}>{this.DEFAULT_QUESTION}</Text>
                                    ) : (
                                        <Text style={styles.text}>{question}</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </Card>
                        <Card style={[styles.card, styles.cardSpacing]}>
                            <View style={styles.textContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.editCard(this.TYPE_ANSWER)}>
                                    {answerPlaceholder ? (
                                        <Text style={styles.placeholder}>{this.DEFAULT_ANSWER}</Text>
                                    ) : (
                                        <Text style={styles.text}>{answer}</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default ModalCard
