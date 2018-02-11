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
    modalTitle: {
        marginTop: 12,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#354868'
    },
    btn: { 
        position: 'absolute', 
        right: 10, 
        top: 10
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
        fontSize: 20 
    }
})
