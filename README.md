# Mobile Flashcards Project

This project was built on the expo template of create-react-native-app. I used React Native for building its mobile interface and Redux for its state management.

## Platform

This is built for Android platform only. I developed it with the Expo Client on my Android phone.

## How to start it

To get started:

- install all project dependencies with `npm install`
- start the development server with `npm start`

## What You're Getting

```bash
├── actions #action handlers for redux
    ├── decks # action handler for different actions regarding the decks
├── components
    ├── Button.js # component for the buttons
    ├── DeckCard.js # component for each deck card shown on the home page
    ├── DeckListPage.js # component representing the home page with all the decks list
    ├── IndividualDeckPage.js # component representing each deck's page
    ├── NewDeckPage.js # component for the page that allows the user to post new decks
    ├── NewQuestionPage.js # component for the page that allows the user to post new questions
    ├── QuizPage.js # component containing the quiz page
    ├── Quizzes.js # component handling the quizzes listing and their scores
├── reducers # reducers for the decks
├── utils # containing the helpers.js that handles the asyncstorage and the notifications
├── App.js # the parent component handling the navigation and creation of Redux store
├── package.json
├── README.md # this file
```
