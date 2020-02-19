import React from "react";
import { Link } from "react-router-dom";
import { Team } from "../../constants/types";
interface TeamProps {
  team: Team;
}
const CardInfo: React.FC<TeamProps> = props => {
  return (
    <div data-testid="card-info-team-card" className="card">
      <div className="title">{props.team.name}</div>
      <div className="total">{props.team.total}</div>
      <div className="link-to-team">
        <Link data-testid="card-info-link" to={`/team/${props.team.id}`}>
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};
export default CardInfo;
