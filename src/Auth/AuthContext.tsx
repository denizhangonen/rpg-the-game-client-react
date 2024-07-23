import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authCheckState, logout } from '../store/actions/auth.actions';
import { RootState } from '../store/store';

interface AuthContextType {
  auth: boolean;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state: RootState) => state.auth.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      await dispatch(authCheckState() as any);
      setLoading(false);
    };

    initializeAuth();
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!auth) {
      console.log('No auth state found, logging out...');
      dispatch(logout() as any);
    }
  }, [auth, loading, dispatch]);

  return (
    <AuthContext.Provider value={{ auth: !!auth, loading }}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

