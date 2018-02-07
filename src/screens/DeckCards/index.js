import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import Card from '../../components/Card'
import styles from './styles'

class DeckCards extends Component {

    renderFront(item) {
        return (
            <View style={{position:'absolute', left: 0, top: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', padding: 20}}>
                <TouchableOpacity 
                    activeOpacity={.6} 
                    onPress={() => {}}
                    style={{position:'absolute', top:10, right:10}}>
                    <FontAwesome name="gear" size={32} style={{color:'#ccc'}}/>
                </TouchableOpacity>
                <Text style={{fontSize: 18, color: '#bbb', textAlign: 'center'}}>{item.question}</Text>
            </View>
        )
    }

    renderBack(item) {
        return (
            <View style={{position:'absolute', left: 0, top: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', padding: 20}}>
                <Text style={{fontSize: 18, color: '#bbb', textAlign: 'center'}}>{item.answer}</Text>
            </View>
        )
    }

    renderItem({ item }) {
        return (
            <View style={styles.row}>
                <Card 
                    flip={true}
                    style={{height: 200}}
                    front={this.renderFront(item)}
                    back={this.renderBack(item)}>
                </Card>
            </View>
        )
    }

    keyExtractor(item, index) {
        return index
    }

    render() {
        return (
            <View style={{backgroundColor:'#32cdff',flex: 1}}>
                <FlatList
                    data={this.props.cards}
                    keyExtractor={this.keyExtractor.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                    style={{paddingTop:20}}
                />
            </View>
        )
    }
}

// Test
function mapStateToProps(decks) {
    const { cards } = decks[1] // Teste
    return { cards }
}

export default connect(mapStateToProps)(DeckCards)
