import React from "react";
import CardInfo from "../CardInfo";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const mountComponent = (team: any) => {
  return render(
    <Router history={createBrowserHistory()}>
      <CardInfo team={team} />
    </Router>
  );
};
describe("Mounting Component", () => {
  const team = {
    name: "Test",
    total: 0,
    owner: "SomeRandomId",
    id: "Team-ID"
  };
  const { getByTestId } = mountComponent(team);
  it("renders without crashing", () => {
    const card = getByTestId("card-info-team-card");
    const link = getByTestId("card-info-link");
    const title = getByTestId("card-info-title");
    const total = getByTestId("card-info-total");
    expect(link.closest("a")).toHaveAttribute("href", "/team/Team-ID");
    expect(card).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(total).toBeInTheDocument();
  });
});
