import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes,  } from "react-router-dom";

import NavBar from './components/NavBar';
import TagLeaderboard from './components/TagLeaderboard';
import HomePage from './components/HomePage';
import Feed from './components/Feed';
import Drummers from './components/Drummers';
import AddDrummer from './components/AddDrummer';

function App() {
  return (
	  <Router>
		<NavBar />
		<Routes>
			<Route path="/" element={<TagLeaderboard />} />
			<Route path="/leaderboard" element={<TagLeaderboard />} />
			<Route path="/drummers" element={<Drummers />} />
			<Route path="/feed" element={<Feed />} />
			<Route path="/drummers/add" element={<AddDrummer />} />
		</Routes>
	  </Router>
  );
}

export default App;
