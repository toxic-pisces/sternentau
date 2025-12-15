import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyC4aK7tVaia1784Ykm5VJuOsOfqaOC3qcM',
  authDomain: 'sternentau-9fc03.firebaseapp.com',
  databaseURL: 'https://sternentau-9fc03-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'sternentau-9fc03',
  storageBucket: 'sternentau-9fc03.firebasestorage.app',
  messagingSenderId: '445425125332',
  appId: '1:445425125332:web:2acd51f9a914e552e77841',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Realtime Database
export const database = getDatabase(app)
