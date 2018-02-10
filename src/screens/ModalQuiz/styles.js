import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    modalContainer: { 
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 20
    },
    questionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        padding: 20
    },
    questionText: { 
        fontSize: 18, 
        color: '#354868', 
        textAlign: 'center' 
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    bodyContainer: {
        flexDirection: 'column'
    },
    card: {
        height: 200, 
        marginLeft: 50,
        marginRight: 50
    },
    quizInfoText: {
        position: 'absolute',
        bottom: 7,
        right: 7,
        textAlign: 'center',
        color: '#ccc',
        fontSize: 15,
        fontWeight: 'bold'
    },
    btn: {
        flex: 1,
        marginBottom: 10,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    showAnswerBtn: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#ffbb46'
    },
    incorrectBtn: {
        marginLeft: 10,
        marginRight: 5,
        backgroundColor: '#ee562e'
    },
    correctBtn: {
        marginRight: 10,
        marginLeft: 5,
        backgroundColor: '#3db543'
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    score: {
        backgroundColor: 'yellow',
        flexDirection: 'row',
        height: 200, 
        marginLeft: 50,
        marginRight: 50
    }
})
