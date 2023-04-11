import React from "react";

import Card from "./UI/Card";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Card className={classes.containerheader}>
      <header className={classes.header}>
        <img src={props.icon} alt="weather logo website" />
        <h1>{props.location ? `${props.location}` : "Weather App"}</h1>
        {props.temperature && <p>{props.temperature}°C</p>}
      </header>
    </Card>
  );
};

export default Header;
