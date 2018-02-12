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
        marginRight: 5
    },
    cancelBtn: {
        color: '#32cdff',
        fontWeight: 'bold'
    },
    btnText: {
        color: '#32cdff',
        fontWeight: 'bold',
        fontSize: 18
    },
    textInput: {
        flex: 1,
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 20,
        marginTop: 15
    },
    closeIcon: {
        marginTop: 2
    }
})
