import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import { fetchDecks } from '../actions/decks';
import { getDecks } from '../utils/helpers';
import DeckCard from './DeckCard';

/**
 * Class representing the first page that shows all decks
 * @extends Component
 */
class DeckListPage extends Component {
  state = {
    animation: new Animated.Value(1),
  };

  fadeOut = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      timing: 2000,
      useNativeDriver: true,
    }).start();
  };

  fadeIn = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      timing: 200,
      useNativeDriver: true,
    }).start();
  };

  componentDidMount() {
    const { dispatch } = this.props;
    getDecks().then(decks => {
      if (decks !== null) {
        return dispatch(fetchDecks(decks));
      }
    });
  }

  render() {
    const animatedStyle = { opacity: this.state.animation };
    const { decks } = this.props;
    const objectIsEmpty = Object.keys(decks).length === 0;
    return (
      <SafeAreaView style={styles.container}>
        <Animated.ScrollView
          contentContainerStyle={styles.scrollView}
          style={animatedStyle}
        >
          {!objectIsEmpty &&
            Object.keys(decks).map((deck, index) => (
              <DeckCard
                title={decks[deck].title}
                cardsNumber={decks[deck].questions.length}
                navigation={this.props.navigation}
                key={index}
                fadeOut={this.fadeOut}
                fadeIn={this.fadeIn}
              />
            ))}
        </Animated.ScrollView>
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
