import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Fragment } from 'react';

import AuthContextProvider from '~/contexts/auth/AuthContext';
import { publicRoutes, privateRoutes } from '~/route/routes';
import ProtectedRoute from '~/route/routing/ProtectedRoute';
import DefaultLayout from '~/layout/DefaultLayout';
import Account from '~/route/routing/Account';
import Verify from '~/route/routing/Verify';
import Logout from '~/route/routing/Logout';
import Auth from '~/views/Auth/index.js';
import { GlobalContext } from './contexts/global';
import GlobalContextProvider from './contexts/global/GlobalContext';
import StackAddVideo from './layout/WrapperLayout/StackAddVideo/StackAddVideo';
import WrapperLayout from './layout/WrapperLayout/WrapperLayout';

function App() {
   return (
      <AuthContextProvider>
         <GlobalContextProvider>
            <Router>
               <Routes>
                  <Route exact path="/verify" element={<Verify />} />
                  <Route exact path="/logout" element={<Logout />} />

                  {publicRoutes.map((route, index) => {
                     const Page = route.component;
                     let Layout = DefaultLayout;
                     if (route.layout) Layout = route.layout;
                     else if (route.layout === null) Layout = Fragment;
                     return (
                        <Route
                           key={index}
                           path={route.path}
                           element={
                              <WrapperLayout>
                                 <Layout>{route.component ? <Page /> : ''}</Layout>
                              </WrapperLayout>
                           }
                        />
                     );
                  })}

                  <Route element={<Account />}>
                     <Route exact path="/register" element={<Auth authRoute="register" />} />
                     <Route path="/login" element={<Auth authRoute="login" />} />
                  </Route>

                  <Route element={<ProtectedRoute />}>
                     {privateRoutes.map((route, index) => {
                        const Page = route.compnent;
                        let Layout = DefaultLayout;
                        let WrapperLayout = WrapperLayout;
                        if (route.layout) Layout = route.layout;
                        else if (route.layout === null) Layout = Fragment;
                        return (
                           <Route
                              key={index}
                              path={route.path}
                              element={
                                 <WrapperLayout>
                                    <Layout>{route.component ? <Page /> : ''}</Layout>
                                 </WrapperLayout>
                              }
                           />
                        );
                     })}
                  </Route>

                  <Route path="*" element={<Navigate to="/login" />} />
               </Routes>
            </Router>
         </GlobalContextProvider>
      </AuthContextProvider>
   );
}

export default App;
