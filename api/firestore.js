const {
  Firestore
} = require('@google-cloud/firestore');

const firestore = new Firestore({
  keyFilename: './secret-import-app-firestore.json',
  projectId: 'recipe-box-staging',
});

module.exports = {
  firestore,
};