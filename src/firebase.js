import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: 'YOUR apiKey',
  authDomain: 'YOUR authDomain',
  databaseURL: 'YOUR databaseURL',
  projectId: 'YOUR projectId',
  storageBucket: 'YOUR storageBucket',
  messagingSenderId: 'YOUR messagingSenderId'
})

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()
export const storage = firebaseApp.storage()
