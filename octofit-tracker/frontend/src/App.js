import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Teams from './components/Teams';
import Users from './components/Users';
import Leaderboard from './components/Leaderboard';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/octofitapp-small.svg" alt="OctoFit" className="app-logo" />
          <span className="brand-title">OctoFit Tracker</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p className="lead">Frontend pointing to Django REST backend.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}
