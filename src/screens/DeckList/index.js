import React, { Component } from 'react'
import { FlatList, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import styles from './styles'
import DeckListItemView from '../../components/DeckListItemView'
import CardStack from '../../components/CardStack'

class DeckList extends Component {

    openDeckDetails() {
        this.props.navigation.navigate('DeckView', { deckId: 1 })
    }

    renderItem({ item }) {
        return (
            <TouchableOpacity 
                activeOpacity={.8} 
                onPress={this.openDeckDetails.bind(this)}>
                <View style={styles.row}>
                    <CardStack distance={5}>
                        <Text style={{fontSize: 18, color: '#bbb'}}>{item.title} ({item.cards.length})</Text>
                    </CardStack>
                </View>
            </TouchableOpacity>
        )
    }

    keyExtractor(item, index) {
        return item.title;
    }

    render() {
        return (
            <View style={{backgroundColor:'#32cdff',flex: 1}}>
                <FlatList
                    data={this.props.decks}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                    style={{paddingTop:20}}
                />
                <TouchableHighlight 
                    style={styles.addButton}
                    underlayColor='#41567a' 
                    onPress={()=>{console.log('pressed')}}>
                    <Entypo 
                        name="plus" 
                        size={40} 
                        color={'#fff'}
                        style={{marginTop:5}}/>
                </TouchableHighlight>
            </View>
        )
    }
}

// Test
function mapStateToProps(decks) {
    return { decks }
}

export default connect(mapStateToProps)(DeckList)
