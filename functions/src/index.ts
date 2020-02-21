import {
  getUsersInfoPromises,
  getArrayOfUsersId,
  setupUsersInTeam
} from "./utils/createTeamUtils";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from "cors";
import { createTeamResponse } from "./types/types";
const corsHandler = cors({ origin: true });

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
    corsHandler(req, res, () => {
      const data = req.body;
      const resBody: createTeamResponse = {
        name: data.name,
        owner: data.owner,
        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
        users: [],
        total: 0
      };
      const promises = getUsersInfoPromises(data, db);

      Promise.all(promises)
        .then(querySnapshots => {
          resBody.users = getArrayOfUsersId(querySnapshots);
          db.collection("teams")
            .add(resBody)
            .then(doc => {
              setupUsersInTeam(db, doc, resBody)
                .then(() => {
                  return res.status(200).send();
                })
                .catch(err => {
                  console.error(err);
                  return res.status(500);
                });
            })
            .catch(err => {
              console.error(err);
              return res
                .status(500)
                .send(
                  "Couldn't add a new team to the database, please talk to admin."
                );
            });
        })
        .catch(err => {
          console.error(err);
          return res
            .status(500)
            .send("New team not created, contact admin. " + err);
        });
    });
  });
