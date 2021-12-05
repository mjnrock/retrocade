import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Konva from "konva";
import { Stage, Layer, Rect } from "react-konva";

export default function App(props) {
	const [state, setState] = useState({
		now: Date.now(),
	});

	useEffect(() => {
		const timerId = setInterval(() => setState({
			...state,
			now: Date.now(),
		}), 25);

		return () => {
			clearInterval(timerId);
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
				Current Time: {state.now}
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
