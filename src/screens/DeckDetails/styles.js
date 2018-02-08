import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    screeen: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    deck: {
        position: 'relative',
        flex: 1
    },
    card: {
        left: 0,
        right: 0,
        height: 200,
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, .20)',
        shadowOpacity: 0.8,
        shadowRadius: 14,
        shadowOffset: {
            width: 0,
            height: 4
        }
    }
})
