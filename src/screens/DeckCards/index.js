import React, { Component } from 'react'
import {
    FlatList,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Text,
    LayoutAnimation
} from 'react-native'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import Card from '../../components/Card'
import styles from './styles'

class DeckCards extends Component {
    constructor() {
        super()
        this.state = { isActionButtonVisible: true }
        this._listViewOffset = 0
        this._listViewHeight = 0
        this._listViewContentHeight = 0
    }

    renderFront(item) {
        return (
            <View
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20
                }}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {}}
                    style={{ position: 'absolute', top: 10, right: 10 }}>
                    <FontAwesome name="gear" size={32} style={{ color: '#ccc' }} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {}}
                    style={{ position: 'absolute', bottom: 10, right: 10 }}>
                    <FontAwesome name="trash" size={32} style={{ color: '#ff5635' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, color: '#bbb', textAlign: 'center' }}>
                    {item.question}
                </Text>
            </View>
        )
    }

    renderBack(item) {
        return (
            <View
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20
                }}>
                <Text style={{ fontSize: 18, color: '#bbb', textAlign: 'center' }}>
                    {item.answer}
                </Text>
            </View>
        )
    }

    renderItem({ item }) {
        return (
            <View style={styles.row}>
                <Card
                    flip={true}
                    style={{ height: 200 }}
                    front={this.renderFront(item)}
                    back={this.renderBack(item)}
                />
            </View>
        )
    }

    keyExtractor(item, index) {
        return index
    }

    _onLayout(event) {
        const { height } = event.nativeEvent.layout
        this._listViewHeight = height
    }

    _onContentSizeChange(contentWidth, contentHeight) {
        this._listViewContentHeight = contentHeight
    }

    _onScroll(event) {
        const CustomLayoutLinear = {
            duration: 100,
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity
            },
            update: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity
            },
            delete: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity
            }
        }

        const limit = this._listViewContentHeight - this._listViewHeight
        const offset = event.nativeEvent.contentOffset.y
        const currentOffset = offset > limit ? limit : offset
        const direction = currentOffset > 0 && currentOffset >= this._listViewOffset ? 'down' : 'up'
        const isActionButtonVisible = direction === 'up'

        if (isActionButtonVisible !== this.state.isActionButtonVisible) {
            LayoutAnimation.configureNext(CustomLayoutLinear)
            this.setState({ isActionButtonVisible })
        }

        this._listViewOffset = currentOffset
    }

    render() {
        const { deck } = this.props.screenProps
        return (
            <View style={{ flex: 1, backgroundColor: '#32cdff' }}>
                <FlatList
                    data={deck.cards}
                    keyExtractor={this.keyExtractor.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                    style={{ paddingTop: 20 }}
                    onScroll={this._onScroll.bind(this)}
                    onContentSizeChange={this._onContentSizeChange.bind(this)}
                    onLayout={this._onLayout.bind(this)}
                    scrollEventThrottle={1}
                />
                {this.state.isActionButtonVisible && (
                    <TouchableHighlight
                        style={styles.addButton}
                        underlayColor="#41567a"
                        onPress={() => {
                            this.setState(state => ({ edit: true }))
                        }}>
                        <Entypo name="plus" size={40} color={'#fff'} style={{ marginTop: 5 }} />
                    </TouchableHighlight>
                )}
            </View>
        )
    }
}

export default DeckCards
