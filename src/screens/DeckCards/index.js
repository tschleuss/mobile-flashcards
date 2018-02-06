import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import CardStack from '../../components/CardStack'
import styles from './styles'

class DeckCards extends Component {

    renderItem({ item }) {
        return (
            <View style={styles.row}>
                <CardStack count={0} distance={0} height={200} style={{padding: 20}}>
                    <TouchableOpacity 
                        activeOpacity={.6} 
                        onPress={() => console.log('edit card')}
                        style={{position:'absolute', top:10, right:10}}>
                        <FontAwesome name="gear" size={32} style={{color:'#ccc'}}/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 18, color: '#bbb', textAlign: 'center'}}>{item.question}</Text>
                </CardStack>
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
                    extraData={this.state}
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
