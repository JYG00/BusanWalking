import React, { Component } from "react";
import "./App.css";
import Header from "./component/Header/header";
import Main from "./component/main/main";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
