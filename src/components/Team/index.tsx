import React, { useEffect, useState } from "react";
import { RouteComponentProps, match } from "react-router-dom";
import { withAuthorization } from "../Session";
import { User } from "firebase";
import Firebase, { withFirebase } from "../Firebase";
import { Spinner } from "../spinner/spinner";
import UserCard from "./UserCard";
import "./style.scss";
import { userDrinkInfo, TeamType } from "../../constants/types";
import { sortOnTotal } from "../../utils/teamUtils";
interface TeamProps extends RouteComponentProps {
  match: match<{ id: string }>;
  authUser: User;
  firebase: Firebase;
}

const Team: React.FC<TeamProps> = props => {
  const [team, setTeam] = useState<TeamType>();
  const [userDrinkData, setUserDrinkData] = useState<userDrinkInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = props.firebase.db
      .collection("teams")
      .doc(props.match.params.id)
      .onSnapshot(
        snap => {
          const data: any = snap.data();
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

  useEffect(() => {
    const unsubscribe = props.firebase.db
      .collection("teams")
      .doc(props.match.params.id)
      .collection("drinks")
      .onSnapshot(
        snap => {
          const usersDrink: userDrinkInfo[] = [];
          snap.forEach(doc => {
            const data = doc.data();
            const userDrink: userDrinkInfo = {
              logs: data.logs,
              total: data.total,
              id: doc.id
            };
            usersDrink.push(userDrink);
          });
          setUserDrinkData(sortOnTotal(usersDrink));
        },
        err => {
          console.log(err);
        }
      );
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.firebase.db, props.match.params.id]);

  let usersCards = <Spinner color="dark" />;
  if (team && !loading) {
    usersCards = (
      <div className="team-wrapper">
        <h2 className="team-name">{team.name}</h2>
        {userDrinkData.map((user: userDrinkInfo) => {
          return (
            <UserCard
              teamId={props.match.params.id}
              userDrinkInfo={user}
              firebase={props.firebase}
              key={user.id}
              authUser={props.authUser}
            />
          );
        })}
      </div>
    );
  }
  return (
    <div className="team-container">
      {usersCards}
      <div className="team-total">Total: {team && team.total}</div>
    </div>
  );
};

const condition = (authUser: firebase.User | null) => !!authUser;
export default withAuthorization(condition)(withFirebase(Team));
