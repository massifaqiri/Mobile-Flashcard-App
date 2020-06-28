import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchDecks } from '../actions/decks';
import { getDecks } from '../utils/helpers';
import DeckCard from './DeckCard';

/**
 * Class representing the first page that shows all decks
 * @extends Component
 */
class DeckListPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    getDecks().then(decks => {
      if (decks !== null) {
        return dispatch(fetchDecks(decks));
      }
    });
  }

  render() {
    const { decks } = this.props;
    const objectIsEmpty = Object.keys(decks).length === 0;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {!objectIsEmpty &&
            Object.keys(decks).map((deck, index) => (
              <DeckCard
                title={decks[deck].title}
                cardsNumber={decks[deck].questions.length}
                navigation={this.props.navigation}
                key={index}
              />
            ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  scrollView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps)(DeckListPage);
