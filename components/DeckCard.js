import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Represents each deck shown on the main page
 */
function DeckCard(props) {
  const { title, cardsNumber, navigation } = props;
  return (
    <LinearGradient
      colors={['#F27A54', '#A154F2']}
      start={[0.2, 0.1]}
      end={[0.5, 0.9]}
      style={styles.cardContainer}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Card', { title })}>
        <Text style={styles.deckTitle}>{title}</Text>
        <Text style={styles.deckSubTitle}>{cardsNumber} cards</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 7,
    alignContent: 'center',
    justifyContent: 'center',
    height: 200,
    width: 300,
    marginTop: 20,
  },
  deckTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  deckSubTitle: {
    fontStyle: 'normal',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});

export default DeckCard;
