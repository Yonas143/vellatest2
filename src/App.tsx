import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { SetupProfile } from './pages/profile/SetupProfile';
import { Discover } from './pages/Discover';
import { Matches } from './pages/matches/Matches';
import { Chat } from './pages/messages/Chat';
import { PrivateRoute } from './components/auth/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/setup-profile"
          element={
            <PrivateRoute>
              <SetupProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Discover />
            </PrivateRoute>
          }
        />
        <Route
          path="/matches"
          element={
            <PrivateRoute>
              <Matches />
            </PrivateRoute>
          }
        />
        <Route
          path="/messages/:matchId"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;