import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    card: {
        flex: 1,
        minHeight: 50,
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
