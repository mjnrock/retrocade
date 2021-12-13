import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

import Konva from "konva";
import { Html } from "react-konva-utils";
import { Stage, Layer, Rect, Image as KonvaImage } from "react-konva";
import Video from "./Video";

const electron = window.require("electron");
const { ipcRenderer } = electron;

const videoConstraints = {
	deviceId: "16cdf4f0fbff21e163d53c62d0164efbab9d6a3a45d2898d8156826f7b6114eb",
	width: 1280,
	height: 720,
	frameRate: 60
};

export default function App(props) {
	const [state, setState] = useState({
		video: false,
		image: false,
		canvas: false,
	});

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: videoConstraints })
			.then(function (stream) {
				var video = document.createElement("video");
				video.onloadedmetadata = () => {
					video.play();
					setState({
						...state,
						video,
					});
				}
				
				// const track = stream.getVideoTracks()[ 0 ];

				video.srcObject = stream;
			})
			.catch(function (err) {
				console.error(err);
			});
	}, []);

	useEffect(() => {
		const handler = (event, now) => {
			if (state.video) {
				const canvas = state.canvas || document.createElement("canvas");
				const ctx = canvas.getContext("2d");

				canvas.width = 1280;
				canvas.height = 720;

				ctx.drawImage(state.video, 0, 0);

				const image = new Image();
				image.onload = () => {
					setState({
						...state,
						canvas,
						image,
					});
				};
				image.src = canvas.toDataURL();
				
				const track = state.video.srcObject.getVideoTracks()[ 0 ];
				track.applyConstraints({ advanced : [{
					brightness: 100,
					contrast: 95,
					saturation: 0,
					sharpness: 0
				}] });
				console.log(JSON.stringify(track.getSettings(), null, 2))

				// const base64 = state.stream.getScreenshot({
				// 	width: 1280,
				// 	height: 720,
				// });

				// greyImages(base64);
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
					{
						state.image ? (
							<KonvaImage
							x={(window.innerWidth - 1280) / 2}
							y={(window.innerHeight - 720) / 2}
								image={ state.image }
							/>
						) : null
					}
					<Rect
						width={1280}
						height={720}
						stroke="#fff"
						strokeWidth={40}
						x={(window.innerWidth - 1280) / 2}
						y={(window.innerHeight - 720) / 2}
					/>
					<Rect
						width={1240}
						height={680}
						stroke="#000"
						strokeWidth={5}
						x={(window.innerWidth - 1280) / 2 + 20}
						y={(window.innerHeight - 720) / 2 + 20}
					/>
				</Layer>
			</Stage>
		</>
	);
}
