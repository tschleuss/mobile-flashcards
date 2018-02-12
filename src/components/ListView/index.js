import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StylePropType from 'react-style-proptype'
import { FlatList, LayoutAnimation } from 'react-native'

/**
 * Display a custom FlatList that can handle scroll and notify it parent
 * to display or hide floating action buttons.
 */
class ListView extends Component {

    /**
     * Default constructor.
     */
    constructor() {
        super()
        this.isActionButtonVisible = true
        this.listViewOffset = 0
        this.listViewHeight = 0
        this.listViewContentHeight = 0
    }

    /**
     * Define a key for each row of the list.
     */
    keyExtractor(item, index) {
        return index
    }

    /**
     * Some list listeners to use alongside 'onScroll'.
     */
    onLayout(event) {
        const { height } = event.nativeEvent.layout
        this.listViewHeight = height
    }

    /**
     * Some list listeners to use alongside 'onScroll'.
     */
    onContentSizeChange(contentWidth, contentHeight) {
        this.listViewContentHeight = contentHeight
    }

    /**
     * Listener to know when user scroll the list, so we can hide or action button.
     */
    onScroll(event) {

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

        const limit = this.listViewContentHeight - this.listViewHeight
        const offset = event.nativeEvent.contentOffset.y
        const currentOffset = offset > limit ? limit : offset
        const direction = currentOffset > 0 && currentOffset >= this.listViewOffset ? 'down' : 'up'
        const isVisible = direction === 'up'

        if (isVisible !== this.isActionButtonVisible) {
            LayoutAnimation.configureNext(CustomLayoutLinear)
            this.isActionButtonVisible = isVisible
            this.onChangeScroll(isVisible)
        }

        this.listViewOffset = currentOffset
    }

    /**
     * Listener called when they should hide or show 
     * the floating action button.
     */
    onChangeScroll(isActionButtonVisible) {
        const { onChangeState = () => {} } = this.props
        onChangeState(isActionButtonVisible)
    }

    /**
     * Render our component in the screen.
     */
    render() {
        const { data, extraData, renderItem, style } = this.props
        return (
            <FlatList
                data={data}
                extraData={extraData}
                keyExtractor={this.keyExtractor.bind(this)}
                renderItem={renderItem}
                style={style}
                onScroll={this.onScroll.bind(this)}
                onContentSizeChange={this.onContentSizeChange.bind(this)}
                onLayout={this.onLayout.bind(this)}
                scrollEventThrottle={1} />
        )
    }
}

export default ListView

ListView.propTypes = {
    data: PropTypes.array.isRequired,
    extraData: PropTypes.any.isRequired,
    renderItem: PropTypes.func.isRequired,
    onChangeState: PropTypes.func,
    style: StylePropType
}
