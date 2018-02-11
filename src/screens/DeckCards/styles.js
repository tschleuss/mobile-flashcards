import { StyleSheet } from 'react-native'

export default StyleSheet.create({
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
    },
    addButtonIcon: {
        marginTop: 5
    },
    row: {
        paddingBottom: 35,
        paddingLeft: 15,
        paddingRight: 15
    },
    cardContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    btn: {
        position: 'absolute',
        right: 10
    },
    btnRemove: {
        bottom: 10,
    },
    iconRemove: {
        color: '#ff5635'
    },
    btnEdit: {
        top: 10
    },
    iconEdit: {
        color: '#ccc'
    },
    card: {
        height: 200
    },
    cardText: {
        fontSize: 18,
        color: '#bbb',
        textAlign: 'center'
    }
})
