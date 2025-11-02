// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA2Ln_IRn-ZUALzyxIDNaVvhhTVndFTtqI',
  authDomain: 'ldk-checkout.firebaseapp.com',
  projectId: 'ldk-checkout',
  storageBucket: 'ldk-checkout.firebasestorage.app',
  messagingSenderId: '380783567607',
  appId: '1:380783567607:web:66557b62b0cb1b50e229f2',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export default app
