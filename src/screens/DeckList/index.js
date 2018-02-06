import React, { Component } from 'react'
import { FlatList, View, TouchableHighlight, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import styles from './styles'
import DeckListItemView from '../../components/DeckListItemView'

class DeckList extends Component {

    renderItem({ item }) {
        return (
            <TouchableOpacity 
                activeOpacity={.8} 
                onPress={() => {
                    this.props.navigation.navigate('DeckView', { deckId: 1 })
                }}>
                <DeckListItemView item={item}/>
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
