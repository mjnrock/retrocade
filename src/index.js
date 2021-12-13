import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import App from "./App";
import Profile from "./Profile";

import "./assets/css/index.css";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			{/* <div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/profile">Profile</Link>
					</li>
				</ul>

				<Routes>
					<Route exact path="/" element={ <App /> } />
					<Route path="/profile" element={ <Profile /> } />
				</Routes>
			</div> */}

			<Routes>
				<Route exact path="/" element={ <App /> } />
				<Route path="/profile" element={ <Profile /> } />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
