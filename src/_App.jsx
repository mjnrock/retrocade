import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

import Konva from "konva";
import { Html } from "react-konva-utils";
import { Stage, Layer, Rect } from "react-konva";
import Video from "./Video";

const electron = window.require("electron");
const { ipcRenderer } = electron;

const videoConstraints = {
	deviceId:
		"16cdf4f0fbff21e163d53c62d0164efbab9d6a3a45d2898d8156826f7b6114eb",
	width: 1280,
	height: 720,
};

async function greyImages(base64) {
	const canvas = document.createElement("canvas");
	canvas.width = 1280;
	canvas.height = 720;

	let img = new Image();
	await new Promise(r => (img.onload = r), (img.src = base64));

	
	const ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);
	let imageData = ctx.getImageData(0, 0, 1280, 720);
	let px = imageData.data;
	let length = px.length;

	// Grey
	//  for ( ; i < length; i+= 4 ) {
	//    grey = px[i] * .3 + px[i+1] * .59 + px[i+2] * .11;
	//    px[i] =  grey;
	//    grey = px[i] * .1 + px[i+1] * .1 + px[i+2] * .1;
	//    px[i] = px[i+1] = px[i+2] = grey;
	//  }

	// Bright up / down
	const factor = -125;
	for (let i = 0; i < length; i += 4) {
		px[i] += factor;
		px[i + 1] += factor;
		px[i + 2] += factor;
	}

	// Threshold
	//  for ( ; i < length; i+= 4) {
	//    var r = px[i];
	//    var g = px[i+1];
	//    var b = px[i+2];
	//    grey= (0.2126*r + 0.7152*g + 0.0722*b >= 150) ? 255 : 0;
	//    px[i] = px[i+1] = px[i+2] = grey;
	//  }


	ctx.putImageData(imageData, 0, 0);

	console.log(canvas.toDataURL());
	
}

export default function App(props) {
	const [state, setState] = useState({
		stream: false,
	});
	const webcamRef = useRef(null);

	useEffect(() => {
		// navigator.mediaDevices
		// 	.enumerateDevices()
		// 	.then((...args) => console.log(...args));

		// console.log(navigator.mediaDevices.getSupportedConstraints());

		navigator.mediaDevices
			.getUserMedia({ video: videoConstraints })
			.then(function (stream) {
				var video = document.createElement("video");
				video.srcObject = stream;

				setState({
					stream,
				});
			})
			.catch(function (err) {
				console.error(err);
			});
	}, []);

	useEffect(() => {
		const handler = (event, now) => {
			if (state.stream) {
				const base64 = state.stream.getScreenshot({
					width: 1280,
					height: 720,
				});

				greyImages(base64);

				// console.log(base64);
			}
		};
		ipcRenderer.on("test-event", handler);

		return () => {
			ipcRenderer.off("test-event", handler);
		};
	}, []);

	return (
		<>
			<Stage width={window.innerWidth} height={window.innerHeight}>
				<Layer>
					{/* <Html>
						<Webcam
							style={{
								width: 1280,
								height: 720,
								position: "absolute",
								top: 0,
								left: 0,
								brightness: 0
							}}
							audio={false}
							height={720}
							ref={webcamRef}
							screenshotFormat="image/jpeg"
							width={1280}
							videoConstraints={videoConstraints}
						/>
					</Html> */}

					<Rect
						x={0}
						y={0}
						width={1280}
						height={720}
						stroke="#f00"
						strokeWidth={20}
					/>
				</Layer>
			</Stage>
		</>
	);
}
