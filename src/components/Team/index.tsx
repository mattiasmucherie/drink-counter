import React from "react";
import { RouteComponentProps, match } from "react-router-dom";

interface TeamProps extends RouteComponentProps {
  match: match<{ id: string }>;
}

const Team: React.FC<TeamProps> = props => {
  return <h1>This is team</h1>;
};

export default Team;
