import React, { Component } from "react";
import "./AppContainer.css";

import Tappable from "react-tappable";

let plateValue = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

let randomPlateValues = [];

let clicks = 0;

let currTarget = -1;

let prevTarget = -2;

let unclickable = [];

let pairs = 0;

class AppContainer extends Component {
	state = {
		plates: [],
		valueToShow: [],
		hoverOpacity: 0.1,
		isclicked: 0
	};

	componentDidMount() {
		this.generatePlates();
	}

	generatePlates = () => {
		for (let i = 0; i < 12; i++) {
			const random = Math.floor(Math.random() * plateValue.length);
			const index = plateValue.indexOf(plateValue[random]);

			randomPlateValues.push(plateValue[random]);

			plateValue.splice(index, 1);
		}
		this.drawPlates();
	};

	drawPlates = () => {
		this.setState(
			state => ({
				plates: []
			}),
			() =>
				this.setState(state => ({
					plates: randomPlateValues.map((randomValue, key) => (
						<Tappable
							className="Plate"
							key={key}
							onTap={
								unclickable[key] || this.state.isclicked
									? null
									: e => this.handlePlateClick(key)
							}
						>
							<div
								className="Plate-hover"
								style={{ opacity: this.state.hoverOpacity }}
							/>
							<div
								className="Image"
								style={
									!unclickable[key]
										? {
												backgroundImage:
													"url(./imgs/" +
													this.state.valueToShow[
														key
													] +
													".jpg)"
										  }
										: {
												backgroundImage:
													"url(./imgs/" +
													randomValue +
													".jpg)"
										  }
								}
							/>
						</Tappable>
					))
				}))
		);
	};

	handlePlateClick = key => {
		this.setState(
			state => ({
				isclicked: 1
			}),
			() => {
				currTarget = key;
				if (currTarget !== prevTarget) {
					if (clicks < 2) {
						const tmpArray = this.state.valueToShow.slice();
						tmpArray[key] = randomPlateValues[key];

						this.setState(
							state => ({
								valueToShow: tmpArray,
								isclicked: 0
							}),
							() => this.drawPlates()
						);
					}
					if (
						randomPlateValues[currTarget] ===
							randomPlateValues[prevTarget] &&
						clicks < 2
					) {
						unclickable[currTarget] = 1;
						unclickable[prevTarget] = 1;
						currTarget = -1;
						prevTarget = -2;
						clicks = 0;
						pairs++;
						if (pairs === 6) {
							setTimeout(() => {
								if (
									window.confirm(
										"Congratulations!\nYour score: " +
											this.props.points +
											"\nPlay again?"
									)
								) {
									this.playAgain();
								} else {
								}
							}, 50);
						}
						this.props.changePoints(50);
						return;
					}
					clicks++;
					if (clicks === 2) {
						if (
							randomPlateValues[currTarget] !==
								randomPlateValues[prevTarget] &&
							this.props.points
						)
							this.props.changePoints(-10);
						this.setState(
							state => ({
								isclicked: 1
							}),
							() => {
								setTimeout(() => {
									this.setState(
										state => ({
											valueToShow: [],
											isclicked: 0
										}),
										() => this.drawPlates()
									);
								}, 750);
								setTimeout(() => {
									clicks = 0;
								}, 750);
								currTarget = -1;
								prevTarget = -2;
								return;
							}
						);
					}
				}
				prevTarget = currTarget;
			}
		);
	};

	playAgain = () => {
		plateValue = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
		randomPlateValues = [];
		clicks = 0;
		currTarget = -1;
		prevTarget = -2;
		unclickable = [];
		pairs = 0;
		this.props.changePoints(0 - this.props.points);
		this.setState(
			state => ({
				plates: [],
				valueToShow: [],
				hoverOpacity: 0.1,
				isclicked: 0
			}),
			() => this.generatePlates()
		);
	};

	render() {
		return <div className="App-container">{this.state.plates}</div>;
	}
}

export default AppContainer;
