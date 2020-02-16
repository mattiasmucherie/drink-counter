import React, { useState, useEffect } from "react";
import { withAuthorization } from "../Session";
import Firebase, { withFirebase } from "../Firebase";

interface adminPageProps {
  firebase: Firebase | null;
}

const AdminPage: React.FC<adminPageProps> = props => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      if (props.firebase) {
        try {
          const usersFirebase = await props.firebase.users().get();
          setLoading(false);
          const usersReact: any = [];
          usersFirebase.forEach(doc => {
            usersReact.push(doc.data());
          });
          setUsers(usersReact);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Admin</h1>
      <p>Restricted area! Only users with the admin role are authorized.</p>
      {loading ? (
        <p>Loading</p>
      ) : (
        users.map((user: { email: string; username: string }) => (
          <div key={user.email} style={{ marginBottom: "30px" }}>
            <p>{user.email}</p>
            <p>{user.username}</p>
          </div>
        ))
      )}
    </div>
  );
};
const condition = (authUser: firebase.User | null): boolean => {
  if (authUser && authUser.email && authUser.email === "test@gmail.com")
    return true;
  return false;
};
export default withFirebase(withAuthorization(condition)(AdminPage));
