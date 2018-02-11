import React, { Component } from 'react'
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import styles from './styles'

class ModalInput extends Component {

    constructor(props) {
        super(props)
        const { value = '' } = props
        this.state = { value }
    }

    render() {
        const { title, placeholder, maxLength, onFinish } = this.props
        const { value } = this.state
        return (
            <Modal
                transparent={true}
                hardwareAccelerated={true}
                animationType={'slide'}
                visible={true}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={() => { onFinish(value) }}>
                        <Text style={styles.btnText}>Done</Text>
                    </TouchableOpacity>
                    <TextInput
                        placeholder={placeholder}
                        multiline={true}
                        autoFocus={true}
                        maxLength={maxLength}
                        value={value}
                        onChangeText={value => this.setState({ value })}
                        style={styles.textInput}
                    />
                </View>
            </Modal>
        )
    }
}

export default ModalInput
