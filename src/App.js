import React, { Component } from "react";
import "./App.scss";

import GetGiphy from "./components/GetGiphy";

class App extends React.Component {
  render() {
    return (
      <div>
        <GetGiphy />
      </div>
    );
  }
}

export default App;
