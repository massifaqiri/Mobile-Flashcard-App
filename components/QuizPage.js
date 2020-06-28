import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from './Button';
import GestureRecognizer from 'react-native-swipe-gestures';
import { TouchableOpacity } from 'react-native-gesture-handler';

class QuizPage extends Component {
  state = {
    questionPage: true,
  };

  onSwipeUp(gestureState) {
    this.setState(prevState => ({
      questionPage: !prevState.questionPage,
    }));
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    const {
      route,
      question,
      answer,
      questionsNumber,
      currentNumber,
      onBtnClick,
    } = this.props;
    const { questionPage } = this.state;
    return (
      <GestureRecognizer
        onSwipeUp={state => this.onSwipeUp(state)}
        config={config}
        style={styles.container}
      >
        <View style={styles.container}>
          <Text style={styles.counter}>
            {currentNumber} out of {questionsNumber}
          </Text>
          {questionPage ? (
            <View style={styles.textContainer}>
              <Text style={styles.title}>{question}</Text>
              <Text style={styles.subTitle}>Swipe up for its answer!</Text>
            </View>
          ) : (
            <View style={styles.textContainer}>
              <Text style={styles.title}>{answer}</Text>
              <Text style={styles.subTitle}>Swipe up for the question!</Text>
            </View>
          )}

          <View>
            <TouchableOpacity onPress={() => onBtnClick('correct')}>
              <Button label='Correct' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onBtnClick('incorrect')}>
              <Button label='Incorrect' />
            </TouchableOpacity>
          </View>
        </View>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counter: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    width: 300,
    margin: 10,
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'center',
    lineHeight: 100,
  },
  textContainer: {
    marginBottom: 100,
  },
});

export default QuizPage;
