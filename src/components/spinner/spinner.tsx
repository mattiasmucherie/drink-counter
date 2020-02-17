import React from "react";
import "./style.scss";

export const Spinner: React.FC<{ color?: string; size?: string }> = props => {
  console.log(props);
  const classes = `simple-spinner ${props.color} ${props.size}`;
  return <div className={classes}></div>;
};
