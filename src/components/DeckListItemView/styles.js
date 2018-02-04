import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    row: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        shadowColor: 'rgba(0, 0, 0, .20)',
        shadowOpacity: 0.8,
        shadowRadius: 14,
        shadowOffset: {
            width: 0,
            height: 4
        }
    }
})
