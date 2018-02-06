import React, { Component } from 'react'
import { FlatList, View, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import styles from './styles'
import DeckListItemView from '../../components/DeckListItemView'

class DeckDetails extends Component {

    renderItem({ item }) {
        return <DeckListItemView item={item} />
    }

    keyExtractor(item, index) {
        return item.title;
    }

    render() {
        return (
            <View style={[{backgroundColor:'#32cdff',flex: 1}, styles.screeen]}>
                <View style={styles.deck}>
                    <View style={[{zIndex:10}, styles.card]}>
                        <Text>carta 1</Text>
                    </View>
                    <View style={[{zIndex:9, marginTop:8}, styles.card]} />
                    <View style={[{zIndex:8, marginTop:16}, styles.card]} />
                </View>
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
                {/* <FlatList
                    data={this.props.decks}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />*/}
            </View>
        )
    }
}

export default DeckDetails
