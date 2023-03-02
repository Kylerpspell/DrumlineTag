import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes,  } from "react-router-dom";

import NavBar from './components/NavBar';
import TagLeaderboard from './components/TagLeaderboard';
import HomePage from './components/HomePage';

function App() {
  return (
	  <Router>
		<NavBar />
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/leaderboard" element={<TagLeaderboard />} />
		</Routes>
	  </Router>
  );
}

export default App;