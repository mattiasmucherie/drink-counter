import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "../../style/formStyle.scss";
import "./createTeam.scss";
import { createTeamInitialState, TeamFirebase } from "../../constants/types";
import Firebase from "../Firebase";
import { User } from "firebase";
import { Spinner } from "../spinner/spinner";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface CreateTeamProps extends RouteComponentProps {
  firebase: Firebase;
  authUser: User;
}

const CreateTeam: React.FC<CreateTeamProps> = props => {
  const [expand, setExpand] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control } = useForm<createTeamInitialState>({
    defaultValues: {
      users: [{ name: "" }]
    }
  });
  const { fields, append, remove } = useFieldArray({ control, name: "users" });
  window.onclick = function(event: any) {
    const modal = document.getElementById("create-team-modal");
    if (event.target === modal && modal) {
      setExpand(false);
    }
  };
  const onSubmit = handleSubmit(async data => {
    const users = data.users.map(user => user.name);
    const body: TeamFirebase = {
      name: data.teamName,
      owner: props.authUser.displayName || "",
      ownerId: props.authUser.uid,
      users,
      created: props.firebase.timestamp()
    };
    try {
      setLoading(true);
      const newTeamRef = props.firebase.db.collection("teams").doc();
      await newTeamRef.set(body);
      setLoading(false);
      setExpand(false);
      props.history.push(`/team/${newTeamRef.id}`);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  });
  return (
    <div className="create-team-wrapper">
      <button className="btn-create-team" onClick={() => setExpand(true)}>
        Create New Team
      </button>
      <div className={`modal ${expand && "open"}`} id="create-team-modal">
        <div className="modal-container">
          <div className="form-wrapper">
            <form onSubmit={onSubmit} className="form-modal">
              <h2>Create Team</h2>
              <input
                type="text"
                name="teamName"
                ref={register({ required: true })}
                placeholder="Team name"
              />
              <ul>
                {fields.map((item, index) => {
                  return (
                    <li key={item.id}>
                      <input
                        name={`users[${index}].name`}
                        defaultValue={`${item.name}`}
                        ref={register({})}
                        type="email"
                        placeholder="Email address"
                        className="input-multiple"
                      />
                      <button
                        className="btn-delete"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        <i className="fas fa-times-circle"></i>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                onClick={() => {
                  append({ name: "" });
                }}
                className="btn-append"
              >
                <i className="fas fa-plus-circle"></i>
              </button>
              <button type="submit" disabled={loading}>
                {loading ? <Spinner /> : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateTeam);
