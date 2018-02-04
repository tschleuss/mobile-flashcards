import React, { Component } from 'react'
import { FlatList, View, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import styles from './styles'
import DeckListItemView from '../../components/DeckListItemView'

class DeckList extends Component {

    renderItem({ item }) {
        return <DeckListItemView item={item} />
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
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
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
    return {
        decks: [{
            title: 'React',
            cards: [{
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        }, {
            title: 'JavaScript',
            cards: [{
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }]
        }]
    }
}

export default connect(mapStateToProps)(DeckList)
