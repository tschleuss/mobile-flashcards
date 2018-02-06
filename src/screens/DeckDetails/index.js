import React, { Component } from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import styles from './styles'
import DeckListItemView from '../../components/DeckListItemView'
import CardStack from '../../components/CardStack'

class DeckDetails extends Component {

    renderItem({ item }) {
        return <DeckListItemView item={item} />
    }

    keyExtractor(item, index) {
        return item.title
    }

    render() {
        return (
            <View style={[{backgroundColor:'#32cdff',flex: 1}, styles.screeen]}>
                <CardStack height={200}>
                    <TouchableOpacity 
                        activeOpacity={.6} 
                        onPress={() => console.log('edit deck')}
                        style={{position:'absolute', top:10, right:10}}>
                        <FontAwesome name="gear" size={32} style={{color:'#ccc'}}/>
                    </TouchableOpacity>
                    <Text>carta top</Text>
                </CardStack>
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

export default DeckDetails
