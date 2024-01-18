import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '~/contexts/auth/AuthContext';

const Account = ({ curPath }) => {
   const {
      authState: { authLoading, isAuthenticated, isVerify },
   } = useContext(AuthContext);

   if (authLoading) return <div className="spinner-container"></div>;

   if (isAuthenticated && isVerify) {
      return <Navigate to="/dashboard" />;
   }

   return <Outlet />;
};
export default Account;
