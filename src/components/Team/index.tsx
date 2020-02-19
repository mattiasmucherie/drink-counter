import React, { useEffect, useState } from "react";
import { RouteComponentProps, match } from "react-router-dom";
import { withAuthorization } from "../Session";
import { User } from "firebase";
import Firebase, { withFirebase } from "../Firebase";
import { Spinner } from "../spinner/spinner";
import UserCard from "./UserCard";
import "./style.scss";
interface TeamProps extends RouteComponentProps {
  match: match<{ id: string }>;
  authUser: User;
  firebase: Firebase;
}

const Team: React.FC<TeamProps> = props => {
  const [team, setTeam] = useState<firebase.firestore.DocumentData | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = props.firebase.db
      .collection("teams")
      .doc(props.match.params.id)
      .onSnapshot(
        snap => {
          const data = snap.data();

          setTeam(data);
          setLoading(false);
        },
        err => {
          console.error(err);
          setLoading(false);
        }
      );
    return () => {
      unsubscribe();
    };
  }, [props.firebase.db, props.match.params.id]);
  let usersCards = <Spinner color="dark" />;

  if (team && !loading) {
    usersCards = (
      <div className="team-wrapper">
        <h2 className="team-name">{team.name}</h2>
        {team.users.map((user: string) => {
          return (
            <UserCard
              teamId={props.match.params.id}
              userId={user}
              firebase={props.firebase}
              key={user}
              authUser={props.authUser}
            />
          );
        })}
      </div>
    );
  }
  return <div className="team-container">{usersCards}</div>;
};

const condition = (authUser: firebase.User | null) => !!authUser;
export default withAuthorization(condition)(withFirebase(Team));
