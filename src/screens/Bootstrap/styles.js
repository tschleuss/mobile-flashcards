import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    baseContainer: {
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#32cdff',
        paddingTop: 20
    },
    loadingText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#354868'
    }
})
