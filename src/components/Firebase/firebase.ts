import app, { firestore } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementID: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
  auth: app.auth.Auth;
  db: app.firestore.Firestore;
  provider: app.auth.GoogleAuthProvider;
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.provider = new app.auth.GoogleAuthProvider();
  }
  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignInWithGoogle = async () => {
    try {
      const userCredential: any = await app
        .auth()
        .signInWithPopup(this.provider);
      if (userCredential.additionalUserInfo.isNewUser && userCredential.user) {
        const { name, email } = userCredential.additionalUserInfo.profile;
        await this.user(userCredential.user.uid).set({ username: name, email });
      }
    } catch (err) {
      console.error(err);
    }
  };
  doSignOut = () => this.auth.signOut();
  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = (password: string) =>
    this.auth.currentUser?.updatePassword(password);
  user = (uid: string) => this.db.collection("users").doc(uid);
  users = () => this.db.collection("users");
  incrementValue = (amount: number) => firestore.FieldValue.increment(amount);
  addToArray = (log: any) => firestore.FieldValue.arrayUnion(log);
  timestamp = () => firestore.Timestamp.fromDate(new Date());
  timestampToDate = (timestamp: firestore.Timestamp) => timestamp.toDate();
}
export default Firebase;
