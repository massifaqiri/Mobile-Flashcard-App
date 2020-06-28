import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import QuizPage from './QuizPage';
import Button from './Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

/**
 * Handles the quizzes by keeping track of the score and sending the questions, one by one
 * @extends ParentClassNameHereIfAny
 */
class Quizzes extends Component {
  state = {
    index: 0,
    correct: 0,
    incorrect: 0,
  };

  handleButtons = whichButton => {
    if (whichButton === 'correct') {
      this.setState(prevState => ({
        ...prevState,
        index: prevState.index + 1,
        correct: prevState.correct + 1,
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        index: prevState.index + 1,
        incorrect: prevState.incorrect + 1,
      }));
    }
  };

  resetQuiz = () => {
    this.setState({
      index: 0,
      correct: 0,
      incorrect: 0,
    });
  };

  triggerTomorrowNotification = () => {
    clearLocalNotification();
    setLocalNotification();
  };

  render() {
    const { index, correct } = this.state;
    const { decks, title, navigation } = this.props;
    const questionsArray = decks[title].questions;
    const questionsNumber = questionsArray.length;
    let gameOn = true;
    let question, answer;
    if (index < questionsNumber) {
      question = questionsArray[index].question;
      answer = questionsArray[index].answer;
    } else {
      gameOn = false;
      triggerTomorrowNotification = this.triggerTomorrowNotification();
    }
    return (
      <View style={styles.container}>
        {gameOn ? (
          <QuizPage
            route={{ name: 'QuizQuestion' }}
            navigation={this.props.navigation}
            question={question}
            answer={answer}
            questionsNumber={questionsNumber}
            currentNumber={index + 1}
            onBtnClick={this.handleButtons}
          />
        ) : (
          <View style={styles.container}>
            <Text style={styles.title}>
              Your Score is: {correct} out of {questionsNumber}
            </Text>
            <TouchableOpacity onPress={this.resetQuiz}>
              <Button label='Restart the Quiz' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Button label='Go Back to the Deck' />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
  },
});

function mapStateToProps(state, { route }) {
  return {
    decks: state,
    title: route.params.title,
  };
}

export default connect(mapStateToProps)(Quizzes);
