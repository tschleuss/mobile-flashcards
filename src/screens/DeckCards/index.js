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

class DeckCards extends Component {

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

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (typeof nextProps.deck === 'undefined') {
            return false
        }
        return true
    }

    createNewCard() {
        this.setState({ creating: true })
    }

    onCancelCreating() {
        this.setState({ creating: false })
    }

    onFinishCreating(question, answer) {
        const { deck } = this.props
        this.props.addCard(deck.id, { question, answer })
        this.setState({ creating: false })
    }

    editCard(item) {
        this.setState({ editing: true, card: item })
    }

    onFinishEditing(question, answer) {
        const { deck } = this.props
        this.props.saveCard(deck.id, { question, answer })
        this.setState({ editing: false })
    }

    onCancelEditing() {
        this.setState({ editing: false })
    }

    askDeleteCard(card) {
        const { deck } = this.props
        const msg = 'Do you really want to exclude this card?'
        const btns = [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => this.deleteCard(deck.id, card.id) }
        ]
        Alert.alert('Exclusion confirmation', msg, btns)
    }

    deleteCard(deckId, cardId) {
        this.props.removeCard(deckId, cardId)
    }

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

    renderBack(item) {
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.cardText}>{item.answer}</Text>
            </View>
        )
    }

    renderItem({ item }) {
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

    keyExtractor(item, index) {
        return index
    }

    onLayout(event) {
        const { height } = event.nativeEvent.layout
        this.listViewHeight = height
    }

    onContentSizeChange(contentWidth, contentHeight) {
        this.listViewContentHeight = contentHeight
    }

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
                        renderItem={this.renderItem.bind(this)}
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
