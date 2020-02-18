import React from "react";
import { Link } from "react-router-dom";
import { Team } from "../../constants/types";
interface TeamProps {
  team: Team;
}
const CardInfo: React.FC<TeamProps> = props => {
  return (
    <div className="card">
      <div className="title">{props.team.name}</div>
      <div className="total">{props.team.total}</div>
      <div className="link-to-team">
        <Link to={`/team/${props.team.id}`}>
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};
export default CardInfo;
