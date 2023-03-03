import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes,  } from "react-router-dom";

import NavBar from './components/NavBar';
import TagLeaderboard from './components/TagLeaderboard';
import HomePage from './components/HomePage';
import Feed from './components/Feed';
import Drummers from './components/Drummers';
import AddDrummer from './components/AddDrummer';
import AddTag from './components/AddTag';

function App() {
  return (
	  <Router>
		<NavBar />
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/leaderboard" element={<TagLeaderboard />} />
			<Route path="/drummers" element={<Drummers />} />
			<Route path="/feed" element={<Feed />} />
			<Route path="/drummers/add" element={<AddDrummer />} />
			<Route path="/addTag" element={<AddTag />} />
		</Routes>
	  </Router>
  );
}

export default App;
