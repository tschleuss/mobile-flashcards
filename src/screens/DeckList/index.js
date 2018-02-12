import React, { Component } from 'react'
import { FlatList, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import { addDeck } from '../../actions/actionCreators'
import NavigationHelper from '../../helper/NavigationHelper'
import CardStack from '../../components/CardStack'
import Badge from '../../components/Badge'
import ModalInput from '../../components/ModalInput'
import styles from './styles'

class DeckList extends Component {

    constructor(prop) {
        super(prop)
        this.state = { creating: false }
    }

    openDeckDetails(deck) {
        const { navigation } = this.props
        NavigationHelper.getInstance().setRootNavigaton(navigation) // BAD!!!
        navigation.push('DeckView', { deck })
    }

    onCancelCreating() {
        this.setState({ creating: false })
    }

    onFinishCreating(name) {
        this.props.addDeck(name)
        this.setState(state => ({
            ...state,
            creating: false
        }))
    }

    createNewDeck() {
        this.setState(state => ({
            ...state,
            creating: true
        }))
    }

    renderItem({ item }) {
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

    keyExtractor(item, index) {
        return index
    }

    render() {
        const { creating } = this.state
        const { decks } = this.props
        const empty = decks.length === 0
        return (
            <View style={styles.screenContainer}>
                {creating && (
                    <ModalInput 
                        title={'Deck\'s name'}
                        placeholder={'Enter the name ...'}
                        maxLength={30}
                        onCancel={() => this.onCancelCreating()}
                        onFinish={name => this.onFinishCreating(name)}/>
                )}
                {!empty ? (
                    <FlatList
                        data={decks}
                        extraData={this.state}
                        keyExtractor={this.keyExtractor.bind(this)}
                        renderItem={this.renderItem.bind(this)}
                        style={styles.list}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Entypo name="emoji-flirt" size={120} style={styles.emptyIcon} />
                        <Text style={styles.emptyText}>
                            Seems that you don't have any deck yet! Start creating a new one tapping the plus button below.
                        </Text>
                    </View>
                )}
                <TouchableHighlight
                    style={styles.addButton}
                    underlayColor="#41567a"
                    onPress={() => this.createNewDeck()}>
                    <Entypo name="plus" size={40} style={styles.buttonIcon} />
                </TouchableHighlight>
            </View>
        )
    }
}

const mapStateToProps = decks => ({ decks })

const mapDispatchToProps = dispatch => ({
    addDeck: name => dispatch(addDeck(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
