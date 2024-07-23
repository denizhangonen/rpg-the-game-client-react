import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectAuth } from '../store/reducers/auth.reducer';

interface ProtectedRouteProps {
  path: string;
  element: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element: Component }) => {
  const { auth } = useAppSelector(selectAuth);

  return (
    <Route
      path={path}
      element={auth ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
