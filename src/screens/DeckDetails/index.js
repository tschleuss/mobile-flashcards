import React, { Component } from 'react'
import {
    Alert,
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { removeDeck } from '../../actions/actionCreators'
import { FontAwesome } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
import CardStack from '../../components/CardStack'
import NavigationHelper from '../../helper/NavigationHelper'
import styles from './styles'

class DeckDetails extends Component {

    constructor(props) {
        super(props)
        const { deck } = props.screenProps
        this.state = { edit: false, deck }
    }

    askDeleteDeck(deck) {
        Alert.alert(
            'Exclusion confirmation',
            `Do you really want to exclude the deck '${deck.title}'?`, [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => this.deleteDeck(deck.id) }
            ], { cancelable: false }
        )
    }

    deleteDeck(id) {
        console.log('deleteDeck')
        const navigation = NavigationHelper.getInstance().getRootNavigaton() // BAD
        navigation.pop()
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
        const { deck, edit } = this.state
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
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => this.askDeleteDeck(deck)}
                        style={{ position: 'absolute', bottom: 10, right: 10 }}>
                        <FontAwesome name="trash" size={32} style={{ color: '#ff5635' }} />
                    </TouchableOpacity>
                </CardStack>
            </View>
        )
    }
}

const mapStateToProps = decks => ({ decks })

const mapDispatchToProps = (dispatch, props) => ({
    removeDeck: id => dispatch(removeDeck(id)),
    goBack: () => {
        //console.log(props.screenProps)
        //dispatch(NavigationActions.reset({ index: 0 }))
        //navigation.goBack(null)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails)
