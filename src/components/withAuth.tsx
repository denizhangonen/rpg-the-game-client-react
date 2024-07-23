import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectAuth } from '../store/reducers/auth.reducer';

const withAuth: any = (Component: any) => {
  return (props: any) => {
    const { auth } = useAppSelector(selectAuth);
    if (!auth) {
      return <Navigate to="/login" />;
    }
    return <Component {...props} />;
  };
};

export default withAuth;

