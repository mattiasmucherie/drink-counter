import React, { useState, useEffect } from "react";
import { withAuthorization } from "../Session";
import Firebase, { withFirebase } from "../Firebase";
import { User } from "firebase";
import { Spinner } from "../spinner/spinner";
import "./style.scss";
import { Team } from "../../constants/types";
import CardInfo from "./CardInfo";
import CreateTeam from "./CreateTeam";
interface HomeProps {
  firebase: Firebase;
  authUser: User;
}

const Home: React.FC<HomeProps> = props => {
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = props.firebase.db
      .collection("teams")
      .where("users", "array-contains", props.authUser.uid)
      .onSnapshot(
        querySnapshot => {
          const teamsFromFS: React.SetStateAction<any[]> = [];
          if (querySnapshot.size) {
            querySnapshot.forEach(doc => {
              teamsFromFS.push({ ...doc.data(), id: doc.id });
            });
            setLoading(false);
          } else {
            setLoading(false);
          }
          setTeams(teamsFromFS);
        },
        err => {
          console.error(err);
          setLoading(false);
        }
      );
    return () => {
      unsubscribe();
    };
  }, [props.authUser.uid, props.firebase]);
  return (
    <div>
      <div className="home-wrapper">
        <p className="info-text">Here are your teams:</p>
        {loading ? (
          <Spinner color="dark" />
        ) : (
          <div className="card-wrapper">
            <CreateTeam firebase={props.firebase} authUser={props.authUser} />
            {teams.length &&
              teams.map((team: Team) => {
                return <CardInfo key={team.id} team={team}></CardInfo>;
              })}
          </div>
        )}
      </div>
    </div>
  );
};
const condition = (authUser: firebase.User | null) => !!authUser;
export default withAuthorization(condition)(withFirebase(Home));
