import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from './Button';
import { saveDeck, addCardToDeck } from '../utils/helpers';
import { addDeck } from '../actions/decks';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * Represents the page that allows the user to submit a new deck
 * @extends Component
 */
class NewDeckPage extends Component {
  state = {
    title: '',
  };

  setTitle = title => {
    this.setState({ title });
  };

  handleClick = () => {
    const { title } = this.state;
    const { navigation, dispatch } = this.props;
    dispatch(addDeck(title));
    saveDeck(title);
    navigation.navigate('Card', { title });
    this.setState({ title: '' });
  };

  render() {
    const disabled = this.state.title === '';
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Write the title of your new deck</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setTitle(text)}
          value={this.state.title}
          maxLength={50}
          placeholder='50 characters max'
          placeholderTextColor='gray'
        />
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            this.handleClick();
          }}
        >
          <Button label='Add New Deck' />
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
    fontSize: 50,
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps)(NewDeckPage);
