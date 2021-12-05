// import { ipcRenderer } from "electron";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Konva from "konva";
import { Stage, Layer, Rect } from "react-konva";

const electron = window.require("electron");
const { ipcRenderer } = electron;

export default function App(props) {
	const [ state, setState ] = useState({
		now: Date.now(),
		data: "",
	});

	useEffect(() => {
		// const timerId = setInterval(() => setState({
		// 	...state,
		// 	now: Date.now(),
		// }), 50);

		const handler = (event, now) => {
			console.log(now)
			setState({ ...state, data: now });
		};
		ipcRenderer.on("test-event", handler)

		return () => {
			// clearInterval(timerId);
			ipcRenderer.off("test-event", handler);
		};
	}, []);

	return (
		<div>
			<h1>Home page</h1>
			<Link to="/profile">Go back to profile</Link>
			<h2
				style={{
					fontSize: "40pt",
					color: "#eee",
					backgroundColor: "#000",
				}}
			>
				<div>Current Time: { state.now }</div>
				<div>Data: { state.data.toString() }</div>
			</h2>

			<Stage width={ window.innerWidth } height={ window.innerHeight }>
				<Layer>
					<Rect
						x={ 0 }
						y={ 0 }
						width={ window.innerWidth }
						height={ window.innerHeight }
						stroke="#eee"
						strokeWidth={ 20 }
					/>
				</Layer>
			</Stage>
		</div>
	);
}
