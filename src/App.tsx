import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './Auth/AuthContext';
import Login from './Apps/Auth/Login/Login';
import Logout from './Apps/Auth/Logout';
import Counter from './Apps/Counter/Counter';
import Game from './Apps/Game/Game';
import Battle1v1 from './Apps/Game/Battle1v1';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { auth } = useAuth();
  return auth ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/game"
              element={
                <ProtectedRoute>
                  <Game />
                </ProtectedRoute>
              }
            />
            <Route
              path="/counter"
              element={
                <ProtectedRoute>
                  <Counter />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game/1vs1/:id"
              element={
                <ProtectedRoute>
                  <Battle1v1 />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;

