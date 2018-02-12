import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableHighlight, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import { addDeck } from '../../actions/actionCreators'
import { formatInputTexts } from '../../helper/stringHelper'
import NavigationHelper from '../../helper/navigationHelper'
import ListView from '../../components/ListView'
import CardStack from '../../components/CardStack'
import Badge from '../../components/Badge'
import ModalInput from '../../components/ModalInput'
import styles from './styles'

/**
 * Display a list of decks with option to add new ones.
 */
class DeckList extends Component {

    /**
     * Default constructor.
     */
    constructor() {
        super()
        this.state = {
            isActionButtonVisible: true,
            creating: false
        }
    }

    /**
     * Redirect the user to the details of the selected deck.
     * 
     * FIXME - I know it's not a good idea to use Singleton, but I didn't manage to 
     * find / accquire / retrieve my stack navigator navigation reference from tab navigator.
     */
    openDeckDetails(deck) {
        const { navigation } = this.props
        NavigationHelper.getInstance().setRootNavigaton(navigation)
        navigation.push('DeckView', { deck })
    }

    /**
     * Listener called when user cancel the creation of a deck.
     */
    onCancelCreating() {
        this.setState({ creating: false })
    }

    /**
     * Listener called when user finish the creation of a deck.
     */
    onFinishCreating(name) {
        this.props.addDeck(formatInputTexts(name))
        this.setState({ creating: false }, () => {
            const { decks } = this.props
            const deck = decks[decks.length - 1]
            this.openDeckDetails(deck)
        })
    }

    /**
     * Display a modal to create a new deck.
     */
    createNewDeck() {
        this.setState({ creating: true })
    }

    /**
     * This function render what will be displayed in each row of the list.
     */
    renderRow({ item }) {
        return (
            <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={() => this.openDeckDetails(item)}>
                <View style={styles.row}>
                    <CardStack distance={5} height={70}>
                        <View
                            style={styles.deckContainer}>
                            <Text style={styles.deckTitle}>{item.title}</Text>
                            <Badge style={styles.badge}>{item.cards.length}</Badge>
                        </View>
                    </CardStack>
                </View>
            </TouchableOpacity>
        )
    }

    /**
     * Listener called when we should hide or show 
     * the floating action button.
     */
    shouldDisplayActionButton(isActionButtonVisible) {
        this.setState({ isActionButtonVisible })
    }

    /**
     * Render our component in the screen.
     */
    render() {
        const { creating, isActionButtonVisible } = this.state
        const { decks } = this.props
        const empty = decks.length === 0
        return (
            <View style={styles.screenContainer}>
                {creating && (
                    <ModalInput 
                        title={'Deck\'s name'}
                        placeholder={'Enter the name ...'}
                        maxLength={20}
                        onCancel={() => this.onCancelCreating()}
                        onFinish={name => this.onFinishCreating(name)}/>
                )}
                {!empty ? (
                    <ListView
                        data={decks}
                        extraData={this.state}
                        renderItem={this.renderRow.bind(this)}
                        style={styles.list}
                        onChangeState={this.shouldDisplayActionButton.bind(this)}/>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Entypo name="emoji-flirt" size={120} style={styles.emptyIcon} />
                        <Text style={styles.emptyText}>
                            Seems that you don&apos;t have any deck yet! Start creating a new one tapping the plus button below.
                        </Text>
                    </View>
                )}
                {isActionButtonVisible && (
                    <TouchableHighlight
                        style={styles.addButton}
                        underlayColor="#41567a"
                        onPress={() => this.createNewDeck()}>
                        <Entypo name="plus" size={40} style={styles.buttonIcon} />
                    </TouchableHighlight>
                )}
            </View>
        )
    }
}

const mapStateToProps = decks => ({ decks })

const mapDispatchToProps = dispatch => ({
    addDeck: name => dispatch(addDeck(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)

DeckList.propTypes = {
    decks: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    addDeck: PropTypes.func.isRequired
}
