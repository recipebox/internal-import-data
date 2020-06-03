const firebase = require('firebase');

const firebaseConfig = {
  apiKey: 'AIzaSyDFletQ1vvCrlkYj77wyZ26xwXqv3Se0IQ',
  authDomain: 'meal-nation.firebaseapp.com',
  databaseURL: 'https://meal-nation.firebaseio.com',
  projectId: 'meal-nation',
  storageBucket: 'meal-nation.appspot.com',
  messagingSenderId: '434850524499',
  appId: '1:434850524499:web:aee39af70a368980c805a6',
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
module.exports = firebase;
// export default !firebase.apps.length
//   ? firebase.initializeApp(config)
//   : firebase.app();

// module.exports = {
//   firebase,
// };
