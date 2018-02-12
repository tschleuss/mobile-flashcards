import React, { Component } from 'react'
import {
    Alert,
    FlatList,
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import { addCard, removeCard, saveCard } from '../../actions/actionCreators'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import Card from '../../components/Card'
import ModalCard from '../ModalCard'
import styles from './styles'

/**
 * Display a list of cards inside a deck, 
 * with option to add or edit cards.
 */
class DeckCards extends Component {

    /**
     * Default constructor.
     */
    constructor() {
        super()
        this.state = {
            isActionButtonVisible: true,
            editing: false,
            creating: false
        }
        this.listViewOffset = 0
        this.listViewHeight = 0
        this.listViewContentHeight = 0
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
     * Display a modal to create a new card.
     */
    createNewCard() {
        this.setState({ creating: true })
    }

    /**
     * Listener called when user cancel the creation of a card.
     */
    onCancelCreating() {
        this.setState({ creating: false })
    }

    /**
     * Listener called when user finish the creation of a card.
     */
    onFinishCreating(question, answer) {
        const { deck } = this.props
        this.props.addCard(deck.id, { question, answer })
        this.setState({ creating: false })
    }

    /**
     * Display a modal to edit a existent card.
     */
    editCard(item) {
        this.setState({ editing: true, card: item })
    }

    /**
     * Listener called when user finish the edit of a card.
     */
    onFinishEditing(question, answer) {
        const { deck } = this.props
        this.props.saveCard(deck.id, { question, answer })
        this.setState({ editing: false })
    }

    /**
     * Listener called when user cancel the editing of a card.
     */
    onCancelEditing() {
        this.setState({ editing: false })
    }

    /**
     * Display a alert to confirm that if user really wants
     * to remove a specific card on current deck.
     */
    askDeleteCard(card) {
        const { deck } = this.props
        const msg = 'Do you really want to exclude this card?'
        const btns = [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => this.deleteCard(deck.id, card.id) }
        ]
        Alert.alert('Exclusion confirmation', msg, btns)
    }

    /**
     * Delete a specific card on current deck.
     */
    deleteCard(deckId, cardId) {
        this.props.removeCard(deckId, cardId)
    }

    /**
     * This function render what will be displayed in the front part of the card.
     */
    renderFront(item) {
        return (
            <View
                style={styles.cardContainer}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => this.editCard(item)}
                    style={[styles.btn, styles.btnEdit]}>
                    <FontAwesome name="gear" size={32} style={styles.iconEdit} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => this.askDeleteCard(item)}
                    style={[styles.btn, styles.btnRemove]}>
                    <FontAwesome name="trash" size={32} style={styles.iconRemove} />
                </TouchableOpacity>
                <Text style={styles.cardText}>{item.question}</Text>
            </View>
        )
    }

    /**
     * This function render what will be displayed in the back part of the card.
     */
    renderBack(item) {
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.cardText}>{item.answer}</Text>
            </View>
        )
    }

    /**
     * This function render what will be displayed in each row of the list.
     */
    renderRow({ item }) {
        return (
            <View style={styles.row}>
                <Card
                    flip={true}
                    style={styles.card}
                    front={this.renderFront(item)}
                    back={this.renderBack(item)}/>
            </View>
        )
    }

    /**
     * Define a key for each row of the list.
     */
    keyExtractor(item, index) {
        return index
    }

    /**
     * Some list listeners to use alongside 'onScroll'.
     */
    onLayout(event) {
        const { height } = event.nativeEvent.layout
        this.listViewHeight = height
    }

    /**
     * Some list listeners to use alongside 'onScroll'.
     */
    onContentSizeChange(contentWidth, contentHeight) {
        this.listViewContentHeight = contentHeight
    }

    /**
     * Listener to know when user scroll the list, so we can hide or action button.
     */
    onScroll(event) {

        const CustomLayoutLinear = {
            duration: 100,
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity
            },
            update: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity
            },
            delete: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity
            }
        }

        const limit = this.listViewContentHeight - this.listViewHeight
        const offset = event.nativeEvent.contentOffset.y
        const currentOffset = offset > limit ? limit : offset
        const direction = currentOffset > 0 && currentOffset >= this.listViewOffset ? 'down' : 'up'
        const isActionButtonVisible = direction === 'up'

        if (isActionButtonVisible !== this.state.isActionButtonVisible) {
            LayoutAnimation.configureNext(CustomLayoutLinear)
            this.setState({ isActionButtonVisible })
        }

        this.listViewOffset = currentOffset
    }

    /**
     * Render our component in the screen.
     */
    render() {
        const { cards } = this.props.deck
        const { card, editing, creating } = this.state
        const empty = cards.length === 0
        return (
            <View style={styles.screenContainer}>
                {editing && (
                    <ModalCard 
                        title={'Edit Card'}
                        question={card.question}
                        answer={card.answer}
                        onCancel={() => this.onCancelEditing()} 
                        onFinish={(question, answer) => this.onFinishEditing(question, answer)}
                    />
                )}
                {creating && (
                    <ModalCard 
                        title={'Create Card'}
                        onCancel={() => this.onCancelCreating()} 
                        onFinish={(question, answer) => this.onFinishCreating(question, answer)}
                    />
                )}
                {!empty ? (
                    <FlatList
                        data={cards}
                        extraData={this.props}
                        keyExtractor={this.keyExtractor.bind(this)}
                        renderItem={this.renderRow.bind(this)}
                        style={{ paddingTop: 20 }}
                        onScroll={this.onScroll.bind(this)}
                        onContentSizeChange={this.onContentSizeChange.bind(this)}
                        onLayout={this.onLayout.bind(this)}
                        scrollEventThrottle={1}/>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Entypo name="emoji-flirt" size={120} style={styles.emptyIcon} />
                        <Text style={styles.emptyText}>
                            Seems that you don't have any cards yet! Start creating a new one tapping the plus button below.
                        </Text>
                    </View>
                )}
                {this.state.isActionButtonVisible && (
                    <TouchableHighlight
                        style={styles.addButton}
                        underlayColor="#41567a"
                        onPress={() => this.createNewCard()}>
                        <Entypo name="plus" size={40} color={'#fff'} style={styles.addButtonIcon} />
                    </TouchableHighlight>
                )}
            </View>
        )
    }
}

const mapStateToProps = (decks, props) => ({
    deck: decks.find(d => d.id === props.screenProps.deck.id)
})

const mapDispatchToProps = dispatch => ({
    addCard: (deckId, card) => dispatch(addCard(deckId, card)),
    removeCard: (deckId, cardId) => dispatch(removeCard(deckId, cardId)),
    saveCard: (deckId, card) => dispatch(saveCard(deckId, card))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckCards)
