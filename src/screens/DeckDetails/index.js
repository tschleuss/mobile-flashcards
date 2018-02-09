import React, { Component } from 'react'
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import CardStack from '../../components/CardStack'
import styles from './styles'

class DeckDetails extends Component {
    constructor(props) {
        super(props)
        this.state = { edit: false }
    }

    renderItem({ item }) {
        return (
            <View style={styles.row}>
                <CardStack distance={5} height={70}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text
                            style={{
                                flex: 1,
                                marginLeft: 20,
                                fontWeight: 'bold',
                                fontSize: 24,
                                color: '#bbb'
                            }}>
                            {item.title}
                        </Text>
                    </View>
                </CardStack>
            </View>
        )
    }

    keyExtractor(item, index) {
        return item.title
    }

    render() {
        const { edit } = this.state
        const { deck } = this.props.screenProps
        return (
            <View style={[{ backgroundColor: '#32cdff', flex: 1 }, styles.screeen]}>
                <Modal
                    transparent={true}
                    hardwareAccelerated={true}
                    animationType={'slide'}
                    visible={edit}>
                    <View
                        style={{
                            position: 'relative',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            marginTop: 20,
                            backgroundColor: '#fff',
                            flex: 1
                        }}>
                        <Text
                            style={{
                                marginTop: 12,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: '#354868'
                            }}>
                            Editar título
                        </Text>
                        <TouchableOpacity
                            style={{ position: 'absolute', right: 10, top: 10 }}
                            onPress={() => {
                                this.setState(state => ({ edit: false }))
                            }}>
                            <Text style={{ color: '#32cdff', fontWeight: 'bold', fontSize: 18 }}>
                                Done
                            </Text>
                        </TouchableOpacity>
                        <TextInput
                            placeholder={'Informe o título...'}
                            multiline={true}
                            autoFocus={true}
                            style={{ flex: 1, padding: 10, textAlignVertical: 'top', fontSize: 20 }}
                        />
                    </View>
                </Modal>
                <CardStack height={200}>
                    <View
                        style={{
                            flex: 1,
                            padding: 15,
                            alignSelf: 'flex-start',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={{ fontWeight: 'bold' }}>Name</Text>
                            <Text>{deck.title}</Text>
                        </View>
                        {deck.description && (
                            <View
                                style={{
                                    flexDirection: 'column',
                                    marginTop: 10,
                                    alignItems: 'flex-start'
                                }}>
                                <Text style={{ fontWeight: 'bold' }}>Description</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap' }}>
                                    {deck.description}
                                </Text>
                            </View>
                        )}
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            this.setState(state => ({ edit: true }))
                        }}
                        style={{ position: 'absolute', top: 10, right: 10 }}>
                        <FontAwesome name="gear" size={32} style={{ color: '#ccc' }} />
                    </TouchableOpacity>
                </CardStack>
            </View>
        )
    }
}

export default DeckDetails
