import React, { Component } from "react";
import "./App.css";
import Header from "./component/Header/header";
import Main from "./component/main/main";
import axios from "axios";

class App extends Component {
  state = { object: [], headColor: "" };

  handleScroll = () => {
    if (window.scrollY > 0) {
      this.setState({ headColor: "white" });
    } else {
      this.setState({ headColor: "transparent" });
    }
  };

  getData = async () => {
    await axios
      .get(
        "http://apis.data.go.kr/6260000/WalkingService/getWalkingKr?serviceKey=hGeBuMFhtkE6bZ%2F2wNlO2vAP6MQevzRFM0I3Zz3ILWTCbLbTHuNHDKtwOwcOENS%2FvJknwdmrLYTYH8pNbyhWzA%3D%3D&numOfRows=37&pageNo=1&resultType=json",
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => this.setState({ object: [res.data.getWalkingKr.item] }))
      .then(() => {
        console.log(this.state.object);
      });
  };

  componentDidMount() {
    // this.getData();
    window.addEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div className="container">
        <Header isScroll={this.state.headColor} />
        <Main />
      </div>
    );
  }
}

export default App;
