import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    row: {
        paddingBottom: 35,
        paddingLeft: 15,
        paddingRight: 15
    },
    addButton: {
        backgroundColor: '#354868',
        borderWidth: 0,
        height: 80,
        width: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
})
