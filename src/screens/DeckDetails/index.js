import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { removeDeck, saveDeck } from '../../actions/actionCreators'
import { FontAwesome } from '@expo/vector-icons'
import ModalInput from '../../components/ModalInput'
import CardStack from '../../components/CardStack'
import NavigationHelper from '../../helper/navigationHelper'
import styles from './styles'

class DeckDetails extends Component {

    constructor(props) {
        super(props)
        this.state = { editing: false }
    }

    componentWillReceiveProps(newProps) {
        console.log(`componentWillReceiveProps: ${newProps.deck.cards.length}`)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(`shouldComponentUpdate: ${nextProps.deck.cards.length}`)
        if (typeof nextProps.deck === 'undefined') {
            return false
        }
        return true
    }

    editDeck() {
        this.setState({ editing: true })
    }

    onCancelEditing() {
        this.setState({ editing: false })
    }

    onFinishEditing(title) {
        const { deck } = this.props
        this.props.saveDeck({ ...deck, title })
        this.setState({ editing: false })
    }

    askDeleteDeck(deck) {
        const msg = `Do you really want to exclude the deck '${deck.title}'?`
        const btns = [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => this.deleteDeck(deck.id) }
        ]
        Alert.alert('Exclusion confirmation', msg, btns)
    }

    deleteDeck(id) {
        this.props.removeDeck(id)
        const navigation = NavigationHelper.getInstance().getRootNavigaton() // BAD
        navigation.pop()
    }

    keyExtractor(item, index) {
        return item.title
    }

    render() {
        const { editing } = this.state
        const { deck } = this.props
        return (
            <View style={styles.screenContainer}>
                {editing && (
                    <ModalInput 
                        title={'Deck\'s name'}
                        placeholder={'Enter the name ...'}
                        value={deck.title}
                        maxLength={30}
                        onCancel={() => this.onCancelEditing()}
                        onFinish={value => this.onFinishEditing(value)}/>
                )}
                <CardStack height={200}>
                    <View style={styles.card}>
                        <View style={styles.cardInfoContainer}>
                            <Text style={styles.cardLabel}>Name:</Text>
                            <Text style={styles.cardValue}>{deck.title}</Text>
                        </View>
                        <View style={styles.cardInfoContainer}>
                            <Text style={styles.cardLabel}>Cards:</Text>
                            <Text style={styles.cardValue}>{deck.cards.length}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => this.editDeck()}
                        style={[styles.btn, styles.btnEdit]}>
                        <FontAwesome name="gear" size={32} style={styles.iconEdit} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => this.askDeleteDeck(deck)}
                        style={[styles.btn, styles.btnRemove]}>
                        <FontAwesome name="trash" size={32} style={styles.iconRemove} />
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
