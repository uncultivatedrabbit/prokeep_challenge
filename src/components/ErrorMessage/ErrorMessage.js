import React from "react";
import "./ErrorMessage.scss";

export default function ErrorPage(props) {
  return <div className="Error__Message">{props.error}</div>;
}
