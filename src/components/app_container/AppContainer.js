import React, { Component } from "react";
import "./AppContainer.css";

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
		hoverOpacity: 0.3,
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
						<div
							className="Plate"
							key={key}
							onClick={
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
						</div>
					))
				}))
		);
	};

	handlePlateClick = key => {
		currTarget = key;
		this.setState(
			state => ({
				isclicked: 1
			}),
			() => {
				// if (currTarget !== prevTarget || clicks === 0) {
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
								alert("Game Over!");
							}, 50);
						}
						return;
					}
					clicks++;
					if (clicks === 2) {
						currTarget = -1;
						prevTarget = -2;
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
					}
					prevTarget = currTarget;
				}
			}
		);
	};

	render() {
		return <div className="App-container">{this.state.plates}</div>;
	}
}

export default AppContainer;
