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
import { removeDeck, saveDeck } from '../../actions/actionCreators'
import { FontAwesome } from '@expo/vector-icons'
import ModalInput from '../../components/ModalInput'
import CardStack from '../../components/CardStack'
import NavigationHelper from '../../helper/NavigationHelper'
import styles from './styles'

class DeckDetails extends Component {

    constructor(props) {
        super(props)
        this.state = { editing: false }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (typeof nextProps.deck === 'undefined') {
            return false
        }
        return super.shouldComponentUpdate(nextProps, nextState, nextContext)
    }

    editDeck() {
        this.setState(state => ({
            ...state,
            editing: true
        }))
    }

    onFinishEditing(title) {
        const { deck } = this.props
        this.props.saveDeck({ ...deck, title })
        this.setState(state => ({
            ...state,
            editing: false
        }))
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
        this.props.removeDeck(id)
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
        const { editing } = this.state
        const { deck } = this.props
        return (
            <View style={[{ backgroundColor: '#32cdff', flex: 1 }, styles.screeen]}>
                {editing && (
                    <ModalInput 
                        title={'Deck\'s name'}
                        placeholder={'Enter the name ...'}
                        value={deck.title}
                        maxLength={30}
                        onFinish={value => this.onFinishEditing(value)}/>
                )}
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
                        onPress={() => this.editDeck()}
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

const mapStateToProps = (decks, props) => ({
    deck: decks.find(d => d.id === props.screenProps.deck.id)
})

const mapDispatchToProps = (dispatch, props) => ({
    removeDeck: id => dispatch(removeDeck(id)),
    saveDeck: deck => dispatch(saveDeck(deck))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails)
