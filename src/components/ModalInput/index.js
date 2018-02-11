import React, { Component } from 'react'
import { View, Text, Modal, TextInput, Alert, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import styles from './styles'

class ModalInput extends Component {

    constructor(props) {
        super(props)
        const { value = '' } = props
        this.state = { value }
    }

    onCancelInput() {
        const { onCancel = () => {} } = this.props
        onCancel()
    }

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

    render() {
        const { title, placeholder, maxLength } = this.props
        const { value } = this.state
        return (
            <Modal
                transparent={true}
                hardwareAccelerated={true}
                animationType={'slide'}
                visible={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            style={{ marginTop: 2 }}
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
