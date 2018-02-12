import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    screenContainer: {
        backgroundColor: '#32cdff',
        flex: 1
    },
    deckContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deckTitle: {
        flex: 1,
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 24,
        color: '#bbb'
    },
    list: {
        paddingTop: 20
    },
    row: {
        paddingBottom: 35,
        paddingLeft: 15,
        paddingRight: 15
    },
    badge: {
        marginLeft: 10,
        marginRight: 20
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
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    buttonIcon: {
        color: '#fff',
        marginTop: 5
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    emptyIcon: {
        color: '#fff'
    },
    emptyText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 24,
        marginTop: 15
    }
})
