import {initializeApp} from 'firebase/app'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDQ183cASF4xRCuUlAr4TLxrb6oGDbFWp0",
  authDomain: "devconnect-dev30.firebaseapp.com",
  projectId: "devconnect-dev30",
  storageBucket: "devconnect-dev30.firebasestorage.app",
  messagingSenderId: "637979002316",
  appId: "1:637979002316:web:1ca81cdf48f308b10d0969",
  measurementId: "G-RK5Z7DCGC9"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth, provider};