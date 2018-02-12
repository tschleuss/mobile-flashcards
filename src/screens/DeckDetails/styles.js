import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    screenContainer: {
        backgroundColor: '#32cdff',
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1
    },
    deck: {
        position: 'relative',
        flex: 1
    },
    card: {
        flex: 1,
        padding: 15,
        alignSelf: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    cardInfoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    cardLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 5
    },
    cardValue: {
        fontSize: 20
    },
    btn: {
        position: 'absolute',
        right: 10
    },
    btnRemove: {
        bottom: 10
    },
    iconRemove: {
        color: '#ff5635'
    },
    btnEdit: {
        top: 10
    },
    iconEdit: {
        color: '#ccc'
    }
})
