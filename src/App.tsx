/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useEffect } from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { MDBContainer } from 'mdb-react-ui-kit';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/home/Home';
import AnnualConference from './pages/conference/AnnualConference';
import Tutorials from './pages/tutorials/Tutorials';
import Registration from './pages/registration/Registration';
import Submission from './pages/submissions/Submission';
import Records from './pages/records/Records';
import BeProcInformation from './pages/bproc/BeProcInformation';
import ExecutiveBoard from './pages/eboard/ExecutiveBoard';
import Resources from './pages/resources/Resources';
import Recruitment from './pages/recruitment/Recruitment';

import AnalyticPmax from './pages/tools/AnalyticPmax';
import DemandCurveAnalyzer from './pages/tools/DemandCurveAnalyzer';
import DiscountingModelSelector from './pages/tools/DiscountingModelSelector';
import SignIn from './pages/signin/SignIn';
import { useAuthorizationContext } from './context/useAuthorizationContext';
import MentorPage from './pages/recruitment/MentorPage';
import UserProfile from './pages/user/UserProfile';
import UserRecruitment from './pages/user/UserRecruitment';
import UserPoster from './pages/user/UserPoster';

const pageTitle = 'SQAB';

function App(): JSX.Element {
  const { user, adFlag, authIsReady } = useAuthorizationContext();

  useEffect(() => {
    document.title = pageTitle;
  }, []);

  return (
    <div>
      {authIsReady && (
        <BrowserRouter forceRefresh={true}>
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
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/conference">
                  <AnnualConference />
                </Route>
                <Route path="/tutorials/:id">
                  <Tutorials />
                </Route>
                <Route path="/registration">
                  <Registration />
                </Route>
                <Route path="/submission">
                  {!user && <Redirect to="/signin" />}
                  <Submission userId={user?.uid} />
                </Route>
                <Route path="/records">
                  <Records />
                </Route>
                <Route path="/behavioralprocesses">
                  <BeProcInformation />
                </Route>
                <Route path="/executiveboard">
                  <ExecutiveBoard />
                </Route>
                <Route path="/resources">
                  <Resources />
                </Route>
                <Route exact path="/recruitment">
                  <Recruitment />
                </Route>
                <Route path="/recruitment/:id">
                  <MentorPage />
                </Route>
                <Route path="/pmax">
                  <AnalyticPmax />
                </Route>
                <Route path="/demand">
                  <DemandCurveAnalyzer />
                </Route>
                <Route path="/discounting">
                  <DiscountingModelSelector />
                </Route>
                <Route path="/signin">
                  <SignIn />
                </Route>
                <Route path="/user/:id">
                  {!user && <Redirect to="/signin" />}
                  {user && <UserProfile />}
                </Route>
                <Route path="/poster/:id">
                  {!user && <Redirect to="/signin" />}
                  {user && <UserPoster />}
                </Route>
                <Route path="/manage/:id">
                  {!user && <Redirect to="/signin" />}
                  {!adFlag && <Redirect to="/" />}
                  {user && <UserRecruitment />}
                </Route>
              </Switch>
            </div>
            <Footer />
          </MDBContainer>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
