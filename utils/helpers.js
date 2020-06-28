import AsyncStorage from '@react-native-community/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'FlashCardNotify';
const FLASHCARDS_KEY = 'FlashCards';

/**
 * Asynchronous function responsible for getting all of the decks from the local storage
 * @return {Promise} that can be resolved to the value of the decks object
 */
export const getDecks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FLASHCARDS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error while fetching data from storage', e);
  }
};

/**
 * Asynchronous function responsible for getting the number of questions in the given deck
 * @return {Number} number of question in the given deck
 */
export const getDeckQuestionsNumber = async title => {
  try {
    const jsonValue = await AsyncStorage.getItem(FLASHCARDS_KEY);
    const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : null;
    return parsedValue[title].questions.length;
  } catch (e) {
    console.log('Error while fetching question length', e);
  }
};

/**
 * Asynchronous function responsible for removing the items from the storage
 */
export const removeValue = async () => {
  try {
    await AsyncStorage.removeItem(FLASHCARDS_KEY);
    console.log('Done.');
  } catch (e) {
    console.log('There was a problem clearing the flashcard storage', e);
  }
};

/**
 * Asynchronous function responsible for saving the deck with its given title
 * @return {Promise} that resolves to the value of the new storage
 */
export async function saveDeck(title) {
  try {
    const deckObject = { [title]: { title: title, questions: [] } };
    const stringifiedDeckObj = JSON.stringify(deckObject);
    const afterMerge = await AsyncStorage.mergeItem(
      FLASHCARDS_KEY,
      stringifiedDeckObj
    );
    return afterMerge;
  } catch (e) {
    console.log('Error occured while saving the deck', e);
  }
}

/**
 * Asynchronous function responsible for adding the given card to the given deck
 * @return {Promise} that resolves to the new storage after adding the card to the deck
 */
export async function addCardToDeck(title, card) {
  try {
    getDecks().then(res => {
      let cardObject = res[title];
      let newQuestionsArray = cardObject.questions.concat(card);
      cardObject['questions'] = newQuestionsArray;
      res[title] = cardObject;
      return AsyncStorage.setItem(FLASHCARDS_KEY, JSON.stringify(res));
    });
  } catch (e) {}
}

/**
 * Clears all of the notifications
 */
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

/**
 * Sets local notifications for the user to take the quiz daily
 */
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(res => {
      return JSON.parse(res);
    })
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync;
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(9);
            tomorrow.setMinutes(30);

            Notifications.scheduleNotificationAsync({
              content: {
                title: 'Take your daily quiz',
                body: 'Make it a good habit by taking the quiz daily',
              },
              repeat: 'day',
              trigger: tomorrow,
            }).then(msg => console.log('Notification Scheduled!', msg));
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
