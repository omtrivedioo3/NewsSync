import React, { Component } from "react";
import loading from "./loading.gif";
const Spinner = (props) => {
  return (
    <div className="text-center">
      <img className="my-3" src={loading} alt="loading" height="30px" />
    </div>
  );
};

export default Spinner;
