import React, { useEffect, useState } from "react";
import Firebase from "../Firebase";
import { Spinner } from "../spinner/spinner";
import "./userCard.scss";
import { User } from "firebase";
import { dateToString } from "../../utils/dateUtils";
import { userDrinkInfo, logType } from "../../constants/types";

interface UserCardProps {
  userDrinkInfo: userDrinkInfo;
  firebase: Firebase;
  teamId: string;
  authUser: User;
}

const UserCard: React.FC<UserCardProps> = props => {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState({ displayName: false, total: false });
  const [expand, setExpand] = useState(false);
  const [expandLog, setExpandLog] = useState(false);
  useEffect(() => {
    setLoading({ ...loading, displayName: true });
    const unsubscribe = props.firebase.db
      .collection("users")
      .doc(props.userDrinkInfo.id)
      .onSnapshot(
        snap => {
          const data = snap.data();
          if (data) {
            setDisplayName(data.username);
            setLoading({ ...loading, displayName: false });
          }
        },
        err => {
          console.error(err);
          setLoading({ ...loading, displayName: false });
        }
      );
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.firebase.db, props.userDrinkInfo.id]);

  const changeAmount = async (amount: number) => {
    const docRef = props.firebase.db
      .collection("teams")
      .doc(props.teamId)
      .collection("drinks")
      .doc(props.userDrinkInfo.id);
    await docRef.update({
      total: props.firebase.incrementValue(amount),
      logs: props.firebase.addToArray({
        createdAt: props.firebase.timestamp(),
        createdBy: props.authUser.uid,
        amount
      })
    });
  };

  window.onclick = function(event: any) {
    const modal = document.getElementById(
      `user-card-modal-${props.userDrinkInfo.id}`
    );
    if (event.target === modal && modal) {
      setExpand(false);
      setExpandLog(false);
    }
  };
  return (
    <div className="user-card-wrapper" onClick={() => setExpand(true)}>
      {loading.total || loading.displayName ? (
        <Spinner color="dark" />
      ) : (
        <>
          <div className="user-card-display-name">{displayName}</div>
          <div className="user-card-total">{props.userDrinkInfo.total}</div>
          <div className="user-card-24h">4.5</div>
          <div className="user-card-sober">103</div>
          <div
            className={`user-card-modal ${expand ? "open" : ""}`}
            id={`user-card-modal-${props.userDrinkInfo.id}`}
          >
            <div className="modal-wrapper">
              <div className="modal-display-name">{displayName}</div>
              <div className="modal-tools-wrapper">
                <button
                  className="modal-remove"
                  onClick={() => changeAmount(-0.5)}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <div className="modal-total">{props.userDrinkInfo.total}</div>
                <button className="modal-add" onClick={() => changeAmount(0.5)}>
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <div className="modal-logs">
                <div
                  className={`modal-logs-btn-wrapper ${expandLog &&
                    "expand-log"}`}
                  onClick={() => setExpandLog(!expandLog)}
                >
                  <i className="fas fa-clipboard-list"></i>
                </div>
                {expandLog ? (
                  <div className="modal-list-of-logs">
                    {props.userDrinkInfo.logs
                      .map((log: logType) => {
                        return (
                          <div
                            className="modal-log-wrapper"
                            key={
                              log.createdAt.seconds + log.createdAt.nanoseconds
                            }
                          >
                            <div
                              className={`modal-log-amount ${
                                log.amount < 0 ? "neg" : "pos"
                              }`}
                            >
                              {Math.abs(log.amount)}
                            </div>

                            <div className="modal-log-time">
                              {dateToString(
                                props.firebase.timestampToDate(log.createdAt)
                              )}
                            </div>
                          </div>
                        );
                      })
                      .reverse()}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default UserCard;
