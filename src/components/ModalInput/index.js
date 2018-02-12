import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Modal, TextInput, Alert, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import styles from './styles'

/**
 * Display a modal like screen with one input text field.
 * It has a much better approach to type texts instead of a form
 * with lots of input fields.
 */
class ModalInput extends Component {

    /**
     * Default constructor.
     */
    constructor(props) {
        super(props)
        const { value = '' } = props
        this.state = { value }
    }

    /**
     * Listener called when user cancel the editing.
     */
    onCancelInput() {
        const { onCancel = () => {} } = this.props
        onCancel()
    }

    /**
     * Listener called when user finish typing and closed the modal.
     * A simple validation of at least on word is made.
     */
    onFinishInput() {
        const { onFinish = () => {} } = this.props
        const { value = '' } = this.state
        if (value.length) {
            onFinish(value)
        } else {
            const msg = 'You should type at least 1 letter'
            Alert.alert('Validation', msg, [{ text: 'OK' }])
        }
    }

    /**
     * Render our component in the screen.
     */
    render() {
        const { title, placeholder, maxLength } = this.props
        const { value } = this.state
        return (
            <Modal
                transparent={true}
                hardwareAccelerated={true}
                animationType={'slide'}
                visible={true}
                onRequestClose={() => { this.onCancelInput() }}>
                <View style={styles.modalContainer}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            style={styles.closeIcon}
                            onPress={() => { this.onCancelInput() }}>
                            <Entypo name="cross" size={32} style={styles.cancelBtn}/>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <TouchableOpacity 
                            style={styles.btn}
                            onPress={() => { this.onFinishInput() }}>
                            <Text style={styles.btnText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        placeholder={placeholder}
                        multiline={true}
                        autoFocus={true}
                        maxLength={maxLength}
                        value={value}
                        onChangeText={value => this.setState({ value })}
                        style={styles.textInput}/>
                </View>
            </Modal>
        )
    }
}

export default ModalInput

ModalInput.propTypes = {
    value: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    onCancel: PropTypes.func,
    onFinish: PropTypes.func
}