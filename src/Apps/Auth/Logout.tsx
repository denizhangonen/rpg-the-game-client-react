// Logout.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/auth.actions';

const Logout: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout() as any);
  }, [dispatch]);

  return null;
};

export default Logout;
