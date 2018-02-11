import React, { Component } from 'react'
import { 
    FlatList, 
    Text, 
    View, 
    TouchableHighlight, 
    TouchableOpacity 
} from 'react-native'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import { addDeck } from '../../actions/actionCreators'
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
        navigation.navigate('DeckView', { deck })
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
        return (
            <View style={{ backgroundColor: '#32cdff', flex: 1 }}>
                {creating && (
                    <ModalInput 
                        title={'Deck\'s name'}
                        placeholder={'Enter the name ...'}
                        maxLength={30}
                        onFinish={name => this.onFinishCreating(name)}/>
                )}
                <FlatList
                    data={decks}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                    style={styles.list}
                />
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
