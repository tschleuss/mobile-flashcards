import { StackNavigator, TabNavigator } from 'react-navigation'
import { Platform, StyleSheet } from 'react-native'
import DeckList from '../screens/DeckList'
import DeckView from '../screens/DeckView'
import DeckDetails from '../screens/DeckDetails'
import DeckCards from '../screens/DeckCards'
import DeckQuiz from '../screens/DeckQuiz'
import DeckEdit from '../screens/DeckEdit'

export const MainNavigator = StackNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: ({ navigation }) => ({
            title: `Mobile Flashcards`
        })
    },
    DeckView: {
        screen: DeckView,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.title} Deck`
        })
    }
}, {
    navigationOptions: ({ navigation }) => ({
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#354868',
            shadowRadius: 5,
            shadowOpacity: 0.8,
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowOffset: {
                width: 0,
                height: 1
            }
        }
    })
})

export const DeckTabs = TabNavigator({
    DeckDetails: {
        screen: DeckDetails,
        navigationOptions: {
            tabBarLabel: 'Details'
        }
    },
    DeckCards: {
        screen: DeckCards,
        navigationOptions: {
            tabBarLabel: 'Cards'
        }
    },
    DeckQuiz: {
        screen: DeckQuiz,
        navigationOptions: {
            tabBarLabel: 'Quiz'
        }
    }
}, {
    ...TabNavigator.Presets.AndroidTopTabs,
    tabBarOptions: {
        showIcon: false,
        upperCaseLabel: false,
        labelStyle: {
            fontSize: 17,
            fontWeight: 'bold'
        },
        tabStyle: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        style: {
            backgroundColor: '#37537f'
        },
        indicatorStyle: {
            backgroundColor: '#fff',
            height: 2
        }
    }
})
