
import * as firebase from 'firebase-admin/app'
import * as firebaseAuth from 'firebase-admin/auth'

const firebaseConfig = require('../../firebase/config.json')

const app = firebase.initializeApp({
  credential: firebase.cert(firebaseConfig)
})

export const auth = firebaseAuth.getAuth(app)