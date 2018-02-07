import React, { Component } from 'react'
import { View, Text, Modal, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import styles from './styles'
import DeckListItemView from '../../components/DeckListItemView'
import CardStack from '../../components/CardStack'

class DeckDetails extends Component {

    constructor() {
        super()
        this.state = { edit: false }
    }

    renderItem({ item }) {
        return <DeckListItemView item={item} />
    }

    keyExtractor(item, index) {
        return item.title
    }

    render() {
        const { edit } = this.state
        return (
            <View style={[{backgroundColor:'#32cdff',flex: 1}, styles.screeen]}>
                <Modal
                    transparent={true}
                    hardwareAccelerated={true}
                    animationType={'slide'}
                    visible={edit}>
                    <View style={{
                        position: 'relative',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        marginTop: 20,
                        backgroundColor:'#fff', 
                        flex:1
                        }}>
                        <Text style={{marginTop:12, textAlign:'center', fontWeight:'bold', fontSize: 18, color:'#354868'}}>Editar título</Text>
                        <TouchableOpacity 
                            style={{position:'absolute', right:10, top: 10}}
                            onPress={()=>{this.setState(state => ({edit:false}))}}>
                            {/* <MaterialIcons name="done" size={30} style={{color:'#32cdff', fontWeight:'bold'}}/> */}
                            <Text style={{color:'#32cdff', fontWeight:'bold', fontSize: 18}}>Done</Text>
                        </TouchableOpacity>
                        <TextInput 
                            placeholder={"Informe o título..."}
                            multiline={true}
                            autoFocus={true}
                            style={{flex:1, padding:10, textAlignVertical:'top', fontSize:20}}/>
                    </View>
                </Modal>
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
                    onPress={()=>{this.setState(state => ({edit:true}))}}>
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
