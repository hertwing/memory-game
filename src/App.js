import React, { Component } from "react";
import "./App.css";

import Header from "./components/header/Header";
import Points from "./components/points/Points";
import AppContainer from "./components/app_container/AppContainer";
import Footer from "./components/footer/Footer";

class App extends Component {
	state = {
		points: 0
	};

	changePoints = points => {
		this.setState(state => ({
			points: this.state.points + points
		}));
	};

	render() {
		return (
			<div className="App">
				<Header text="Memory Game!" />
				<Points points={this.state.points} />
				<AppContainer
					changePoints={this.changePoints}
					points={this.state.points}
				/>
				<Footer text="Memory Game by Piotr Henczel - 2018" />
			</div>
		);
	}
}

export default App;
