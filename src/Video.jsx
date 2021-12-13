import React, { useRef, useState, useMemo, useEffect } from "react";
import Konva from "konva";
import { Image } from "react-konva";

export function Video({ src }) {
	const imageRef = useRef(null);
	const [ size, setSize ] = useState({ width: 50, height: 50 });

	const videoElement = useMemo(() => {
		console.log(src)
		const element = document.querySelector("video");
		element.src = src;

		return element;
	}, [ src ]);

	useEffect(() => {
		console.log(src)
		const onload = function () {
			// setSize({
			// 	width: videoElement.videoWidth,
			// 	height: videoElement.videoHeight,
			// });
		};

		videoElement.addEventListener("loadedmetadata", onload);

		return () => {
			videoElement.removeEventListener("loadedmetadata", onload);
		};
	}, [ videoElement ]);

	// use Konva.Animation to redraw a layer
	// useEffect(() => {
	// 	videoElement.play();
	// 	const layer = imageRef.current.getLayer();

	// 	const anim = new Konva.Animation(() => {}, layer);
	// 	anim.start();

	// 	return () => anim.stop();
	// }, [ videoElement ]);

	return (
		<video />
		// <Image
		// 	ref={imageRef}
		// 	image={videoElement}
		// 	x={20}
		// 	y={20}
		// 	stroke="red"
		// 	width={size.width}
		// 	height={size.height}
		// 	draggable
		// />
	);
};

export default Video;