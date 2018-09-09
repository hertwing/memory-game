import React, { Component } from "react";
import "./App.css";

import Header from "./components/header/Header";
import AppContainer from "./components/app_container/AppContainer";
import Footer from "./components/footer/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header text="Memory Game!" />
        <AppContainer />
        <Footer text="Memory Game by Piotr Henczel - 2018" />
      </div>
    );
  }
}

export default App;
