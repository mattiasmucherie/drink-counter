import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const newTeam = functions.firestore
  .document("teams/{teamId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    if (data) {
      let usersUID: string[] = data.users;
      try {
        const usersDB: { email: string; username: string; uid: string }[] = [];
        const usersReq = await db.collection("users").get();
        usersReq.forEach(doc => {
          const docData = doc.data();
          usersDB.push({
            email: docData.email,
            username: docData.username,
            uid: doc.id
          });
        });
        data.usersEmail.forEach((email: string) => {
          const user = usersDB.find(u => u.email === email);
          if (user) {
            usersUID = [...usersUID, user.uid];
          }
        });
        await snap.ref.update({ total: 0, users: usersUID });
      } catch (err) {
        console.log(err);
      }
    }
  });
