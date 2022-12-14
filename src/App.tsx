/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Suspense } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { MDBContainer } from 'mdb-react-ui-kit';

import Header from './components/Header';
import Footer from './components/Footer';

const Home = React.lazy(() => import('./pages/home/Home'));
const AnnualConference = React.lazy(() => import('./pages/conference/AnnualConference'));
const Tutorials = React.lazy(() => import('./pages/tutorials/Tutorials'));
const Registration = React.lazy(() => import('./pages/registration/Registration'));
const Submission = React.lazy(() => import('./pages/submissions/Submission'));
const Records = React.lazy(() => import('./pages/records/Records'));
const BeProcInformation = React.lazy(() => import('./pages/bproc/BeProcInformation'));
const ExecutiveBoard = React.lazy(() => import('./pages/eboard/ExecutiveBoard'));
const Resources = React.lazy(() => import('./pages/resources/Resources'));
const Recruitment = React.lazy(() => import('./pages/recruitment/Recruitment'));
const AnalyticPmax = React.lazy(() => import('./pages/tools/AnalyticPmax'));
const DemandCurveAnalyzer = React.lazy(() => import('./pages/tools/DemandCurveAnalyzer'));
const DiscountingModelSelector = React.lazy(() => import('./pages/tools/DiscountingModelSelector'));
const SignIn = React.lazy(() => import('./pages/signin/SignIn'));
const MentorPage = React.lazy(() => import('./pages/mentor/MentorPage'));
const UserProfile = React.lazy(() => import('./pages/user/UserProfile'));
const UserRecruitment = React.lazy(() => import('./pages/user/UserRecruitment'));
const UserPoster = React.lazy(() => import('./pages/user/UserPoster'));
const SystemAdministration = React.lazy(() => import('./pages/admin/SystemAdministration'));

import { useAuthorizationContext } from './context/hooks/useAuthorizationContext';
import Loading from './components/Loading';
import BasicAdministrator from './pages/admin/BasicAdministrator';

const pageTitle = 'SQAB';

function App(): JSX.Element {
  const {
    user,
    systemAdministratorFlag,
    studentRecruitFlag,
    diversityReviewFlag,
    submissionReviewFlag,
    authIsReady,
  } = useAuthorizationContext();

  useEffect(() => {
    document.title = pageTitle;
  }, []);

  return (
    <div>
      {authIsReady && (
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <MDBContainer
              fluid
              style={{
                flexGrow: 1,
                paddingLeft: '0',
                paddingRight: '0',
                backgroundColor: '#e3e3e3',
              }}
            >
              <Header />
              <div
                style={{
                  paddingTop: '20px',
                  paddingBottom: '20px',
                }}
              >
                <Suspense fallback={<Loading />}>
                  <Switch>
                    <Route exact path='/'>
                      <Home />
                    </Route>
                    <Route exact path='/loading'>
                      <Loading />
                    </Route>
                    <Route path='/conference'>
                      <AnnualConference />
                    </Route>
                    <Route path='/tutorials/:id'>
                      <Tutorials />
                    </Route>
                    <Route path='/registration'>
                      <Registration />
                    </Route>
                    <Route path='/submission'>
                      {!user || user === null || user.uid === null ? (
                        <Redirect to='/signin' />
                      ) : (
                        <Submission userId={user.uid} />
                      )}
                    </Route>
                    <Route path='/records'>
                      <Records />
                    </Route>
                    <Route path='/behavioralprocesses'>
                      <BeProcInformation />
                    </Route>
                    <Route path='/executiveboard'>
                      <ExecutiveBoard />
                    </Route>
                    <Route path='/resources'>
                      <Resources />
                    </Route>
                    <Route exact path='/recruitment'>
                      <Recruitment />
                    </Route>
                    <Route path='/recruitment/:id'>
                      <MentorPage />
                    </Route>
                    <Route path='/pmax'>
                      <AnalyticPmax />
                    </Route>
                    <Route path='/demand'>
                      <DemandCurveAnalyzer />
                    </Route>
                    <Route path='/discounting'>
                      <DiscountingModelSelector />
                    </Route>
                    <Route path='/signin'>
                      <SignIn />
                    </Route>
                    <Route path='/user/:id'>
                      {!user && <Redirect to='/signin' />}
                      {user && <UserProfile />}
                    </Route>
                    <Route path='/poster/:id'>
                      {!user && <Redirect to='/signin' />}
                      {user && <UserPoster />}
                    </Route>
                    <Route path='/manage/:id'>
                      {!user && <Redirect to='/signin' />}
                      {user && <UserRecruitment />}
                    </Route>
                    <Route path='/admin'>
                      {!user && <Redirect to='/signin' />}
                      {user &&
                        !(systemAdministratorFlag || studentRecruitFlag || diversityReviewFlag) && (
                          <Redirect to='/' />
                        )}
                      {user && systemAdministratorFlag && <SystemAdministration />}
                      {user &&
                        (studentRecruitFlag || diversityReviewFlag || submissionReviewFlag) && (
                          <BasicAdministrator />
                        )}
                    </Route>
                  </Switch>
                </Suspense>
              </div>
              <Footer />
            </MDBContainer>
          </Suspense>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
