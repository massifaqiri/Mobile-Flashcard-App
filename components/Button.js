import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDecks, saveDeck } from '../utils/helpers';

class Button extends Component {
  state = {};

  render() {
    const { label } = this.props;
    let icon = '';
    switch (label) {
      case 'Add New Question':
        icon = <Ionicons name='md-add' size={18} color='white' />;
        break;
      case 'Start the Quiz':
        icon = <AntDesign name='question' size={18} color='white' />;
        break;
      case 'Submit':
        icon = <Feather name='send' size={18} color='white' />;
        break;
      case 'Correct':
        icon = <AntDesign name='check' size={18} color='white' />;
        break;
      case 'Incorrect':
        icon = <Entypo name='cross' size={18} color='white' />;
        break;
      case 'Restart the Quiz':
        icon = <MaterialCommunityIcons name='reload' size={18} color='white' />;
        break;
      case 'Go Back to the Deck':
        icon = <AntDesign name='back' size={18} color='white' />;
        break;
      default:
        icon = <Ionicons name='md-add' size={18} color='white' />;
        break;
    }

    return (
      <LinearGradient
        colors={['rgba(243, 33, 33, 0)', 'rgba(215, 9, 157, 1)']}
        start={[0.2, 0.1]}
        end={[0.5, 0.9]}
        style={styles.button}
      >
        <TouchableOpacity>
          <Text style={styles.buttonText}>
            {icon}
            &nbsp;&nbsp;&nbsp; {label}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    borderRadius: 100,
    height: 50,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  buttonText: {
    textTransform: 'uppercase',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontStyle: 'normal',
  },
});

export default Button;
