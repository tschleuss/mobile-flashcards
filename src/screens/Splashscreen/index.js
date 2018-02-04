import React, { Component } from 'react'
import { View, StatusBar, Animated } from 'react-native'
import styles from './styles'

export default class Splashscreen extends Component {

    render() {
        const logo = require('../../images/splash_logo.png')
        return (
            <View style={[styles.background, {flex: 1}]}>
                <View style={styles.container}>
                    <Animated.Image 
                        resizeMode="contain" 
                        style={styles.logo} 
                        source={logo}/>
                </View>
            </View>
        )
    }
}
