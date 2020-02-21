import { createTeamResponse } from "./../types/types";
export const getUsersInfoPromises = (
  data: any,
  db: FirebaseFirestore.Firestore
) => {
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
  return promises;
};

export const getArrayOfUsersId = (
  querySnapshots: FirebaseFirestore.QuerySnapshot<
    FirebaseFirestore.DocumentData
  >[]
) => {
  const usersID: string[] = [];
  querySnapshots.forEach(snapShot =>
    snapShot.forEach(doc => usersID.push(doc.id))
  );
  return usersID;
};

export const setupUsersInTeam = (
  db: FirebaseFirestore.Firestore,
  doc: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
  resBody: createTeamResponse
) => {
  const batch = db.batch();
  const drinkTemplate = { total: 0, logs: [] };
  resBody.users.forEach(user => {
    const ref = doc.collection("drinks").doc(user);
    batch.set(ref, drinkTemplate);
  });
  return batch.commit();
};
