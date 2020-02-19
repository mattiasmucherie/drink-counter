import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// To run functions locally, make sure that GOOGLE_APP... is set
// https://firebase.google.com/docs/functions/local-shell
// export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json"

admin.initializeApp({
  databaseURL: "https://drink-counter-f8e16.firebaseio.com"
});
const db = admin.firestore();

export const createTeam = functions
  .region("europe-west1")
  .https.onRequest(async (req, res) => {
    interface createTeamRes {
      name: string;
      owner: string;
      createdAt: FirebaseFirestore.Timestamp;
      users: string[];
      total: number;
    }

    const data = req.body;
    const resBody: createTeamRes = {
      name: data.name,
      owner: data.owner,
      createdAt: admin.firestore.Timestamp.fromDate(new Date()),
      users: [],
      total: 0
    };
    const promises: Promise<
      FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
    >[] = [];

    data.usersEmail.forEach(
      async (userEmail: string): Promise<any> => {
        promises.push(
          db
            .collection("users")
            .where("email", "==", `${userEmail}`)
            .get()
        );
      }
    );
    Promise.all(promises)
      .then(promise => {
        promise.forEach(snapShot => {
          snapShot.forEach(doc => {
            resBody.users.push(doc.id);
          });
        });
        db.collection("teams")
          .add(resBody)
          .then(doc => {
            const batch = db.batch();
            const drinkTemplate = { total: 0, logs: [] };
            resBody.users.forEach(user => {
              const ref = doc.collection("drinks").doc(user);
              batch.set(ref, drinkTemplate);
            });
            batch
              .commit()
              .then(() => {
                return res.status(200).send();
              })
              .catch(err => {
                console.error(err);
              });
          })
          .catch(err => {
            return res
              .status(500)
              .send(
                "Couldn't add a new team to the database, please talk to admin."
              );
          });
      })
      .catch(err => {
        return res
          .status(500)
          .send("New team not created, contact admin. " + err);
      });
  });

export const newTeam = functions
  .region("europe-west1")
  .firestore.document("teams/{teamId}")
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
        return snap.ref.update({ total: 0, users: usersUID });
      } catch (err) {
        console.log(err);
        return null;
      }
    }
    return null;
  });
