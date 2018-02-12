import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
    flex: {
        flex: 1
    },
    card: {
        flex: 1,
        minHeight: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, .20)',
                shadowOpacity: 0.8,
                shadowRadius: 14,
                shadowOffset: {
                    width: 0,
                    height: 4
                }
            },
            android: {
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 10,
                elevation: 4
            }
        })
    }
})
