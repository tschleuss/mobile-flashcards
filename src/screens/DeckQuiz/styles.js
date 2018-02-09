import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        padding: 50
    },
    logo: {
        flex: 1
    },
    startButton: {
        flex: 1,
        backgroundColor: '#354868',
        borderWidth: 0,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
})
