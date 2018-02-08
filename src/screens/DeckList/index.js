import React, { Component } from 'react'
import { FlatList, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import CardStack from '../../components/CardStack'
import Badge from '../../components/Badge'
import styles from './styles'

class DeckList extends Component {

    openDeckDetails(item) {
        const { id, title } = item
        const { navigation } = this.props
        navigation.navigate('DeckView', { id, title })
    }

    renderItem({ item }) {
        return (
            <TouchableOpacity
                activeOpacity={.8} 
                onPress={this.openDeckDetails.bind(this, item)}>
                <View style={styles.row}>
                    <CardStack distance={5} height={70}>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                            <Text style={{flex:1, marginLeft: 20, fontWeight: 'bold', fontSize: 24, color: '#bbb'}}>{item.title}</Text>
                            <Badge style={{marginLeft: 10, marginRight: 20}}>{item.cards.length}</Badge>
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
