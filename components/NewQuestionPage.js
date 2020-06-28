import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from './Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addCardToDeck } from '../utils/helpers';
import { connect } from 'react-redux';
import { addCard } from '../actions/decks';

/**
 * Represents the page that allows the user to enter their new question
 * @extends Component
 */
class NewQuestionPage extends Component {
  state = { question: '', answer: '' };

  handleTextChange = (text, type) => {
    if (type === 'question') {
      this.setState({ question: text });
    } else {
      this.setState({ answer: text });
    }
  };

  handleSubmit = () => {
    const { dispatch, title, navigation } = this.props;
    dispatch(addCard(title, this.state));
    addCardToDeck(title, this.state);
    navigation.goBack();
  };
  render() {
    const disabled = this.state.question === '' || this.state.answer === '';
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Write down below your question and answer
        </Text>
        <View>
          <Text>Question</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.handleTextChange(text, 'question')}
            maxLength={140}
            placeholder='140 characters max'
            placeholderTextColor='gray'
          />
        </View>
        <View>
          <Text>Answer</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.handleTextChange(text, 'answer')}
            maxLength={140}
            placeholder='140 characters max'
            placeholderTextColor='gray'
          />
        </View>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => this.handleSubmit()}
        >
          <Button label='Submit' />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'pink',
  },
  input: {
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 20,
    padding: 5,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
});

function mapStateToProps(state, { route }) {
  return {
    decks: state,
    title: route.params.title,
  };
}

export default connect(mapStateToProps)(NewQuestionPage);
