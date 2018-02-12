import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
    screenContainer: {
        backgroundColor: '#32cdff',
        position: 'relative',
        padding: 20,
        flex: 1
    },
    quizContainer: {
        flex: 1
    },
    imageContainer: {
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
    quizTitle: {
        fontSize: 24,
        color: '#354868',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    quizText: {
        fontSize: 18,
        color: '#354868',
        textAlign: 'center',
        marginTop: 20
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
        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOpacity: 0.8,
                shadowRadius: 2,
                shadowOffset: {
                    height: 1,
                    width: 0
                }
            },
            android: {
                elevation: 4
            }
        })
    },
    buttonDisabled: {
        opacity: 0.4
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})
