import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import DeckListPage from './components/DeckListPage';
import IndividualDeckPage from './components/IndividualDeckPage';
import QuizPage from './components/QuizPage';
import NewDeckPage from './components/NewDeckPage';
import NewQuestionPage from './components/NewQuestionPage';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import Quizzes from './components/Quizzes';
import { setLocalNotification, removeValue } from './utils/helpers';

// The tabs representing the home page and the new deck page
const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 18,
        },
        style: {
          height: 62,
        },
      }}
    >
      <Tab.Screen
        name='Decks'
        component={DeckListPage}
        options={{
          tabBarLabel: 'Decks',
          tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name='cards' size={35} color='#666666' />
          ),
        }}
      />
      <Tab.Screen
        name='New Deck'
        component={NewDeckPage}
        options={{
          tabBarLabel: 'New Deck',
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name='md-add-circle' size={35} color='#666666' />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Stack navigators representing the screens of Decks tab
const DecksStack = createStackNavigator();
function DecksScreen() {
  return (
    <DecksStack.Navigator>
      <DecksStack.Screen
        name='DecksList'
        options={{ title: 'Your Flashcards' }}
        component={Tabs}
      />
      <DecksStack.Screen
        name='Card'
        options={{ title: 'Flashcard Page' }}
        component={IndividualDeckPage}
      />
      <DecksStack.Screen
        name='QuizQuestion'
        options={{ title: 'Quiz' }}
        component={QuizPage}
      />
      <DecksStack.Screen
        name='QuizAnswer'
        options={{ title: 'Quiz' }}
        component={QuizPage}
      />
      <DecksStack.Screen
        name='Quizzes'
        options={{ title: 'Quiz' }}
        component={Quizzes}
      />
      <DecksStack.Screen
        name='NewQuestion'
        options={{ title: 'New Question' }}
        component={NewQuestionPage}
      />
    </DecksStack.Navigator>
  );
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
          <DecksScreen />
        </NavigationContainer>
      </Provider>
    );
  }
}
