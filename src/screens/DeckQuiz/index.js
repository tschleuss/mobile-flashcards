import React, { Component } from 'react'
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import styles from './styles'

class DeckQuiz extends Component {

    render() {
        const logo = require('../../images/splash_logo.png')
        return (
            <View style={{backgroundColor:'#32cdff', flex:1, position: 'relative', padding: 20, overflow:'hidden'}}>
                <View style={{flex:1}}>
                    <Text style={{fontSize: 24, color: '#354868', textAlign: 'center', fontWeight: 'bold'}}>Fazer um teste!</Text>
                    <Text style={{fontSize: 18, color: '#354868', textAlign: 'center', marginTop: 20}}>Pronto para um desafio? Teste seu conhecimento sobre o assunto abordado neste baralho!</Text>
                    <View style={styles.container}>
                        <Image 
                            resizeMode="contain" 
                            style={styles.logo} 
                            source={logo}/>
                    </View>
                    <TouchableOpacity 
                        activeOpacity={.6} 
                        onPress={() => console.log('start quiz')}
                        style={styles.startButton}>
                        <Text style={{fontSize: 18, color: '#fff', textAlign: 'center', fontWeight: 'bold'}}>Iniciar o Quiz!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default DeckQuiz
