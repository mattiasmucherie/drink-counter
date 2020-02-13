import app from "firebase/app";
import "firebase/auth";
const config = {
  apiKey: process.env.DRINK_COUNTER_API_KEY,
  authDomain: process.env.DRINK_COUNTER_AUTH_DOMAIN,
  databaseURL: process.env.DRINK_COUNTER_DATABASE_URL,
  projectId: process.env.DRINK_COUNTER_PROJECT_ID,
  storageBucket: process.env.DRINK_COUNTER_STORAGE_BUCKET,
  messagingSenderId: process.env.DRINK_COUNTER_MESSAGING_SENDER_ID,
  appId: process.env.DRINK_COUNTER_APP_ID,
  measurementID: process.env.DRINK_COUNTER_MEASUREMENT_ID
};
class Firebase {
  auth: app.auth.Auth;
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }
  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = (password: string) =>
    this.auth.currentUser?.updatePassword(password);
}
export default Firebase;
