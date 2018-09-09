import React, { Component } from "react";
import "./Points.css";

class Points extends Component {
	render() {
		return <div className="Points">Score: {this.props.points}</div>;
	}
}

export default Points;
