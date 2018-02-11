import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    modalContainer: {
        position: 'relative',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 20,
        backgroundColor: '#fff',
        flex: 1
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    modalTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#354868'
    },
    btn: {
        // position: 'absolute',
        // right: 10,
        // top: 10
    },
    btnText: {
        color: '#32cdff',
        fontWeight: 'bold',
        fontSize: 18
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 35
    },
    card: {
        marginLeft: 50,
        marginRight: 50,
        height: 200
    },
    cardSpacing: {
        marginTop: 50
    },
    button: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    placeholder: {
        fontSize: 18,
        color: '#bbb',
        textAlign: 'center'
    },
    text: {
        fontSize: 18,
        color: '#354868',
        textAlign: 'center'
    }
})
