/**
 * @jest-environment jsdom
 */

/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactModal from 'react-modal';
import firebase from 'firebase';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../components/Header';
import Home from '../pages/home/Home';
import AnnualConference from '../pages/conference/AnnualConference';
import Tutorials from '../pages/tutorials/Tutorials';
import { FirestoreState } from '../firebase/interfaces/FirebaseInterfaces';
import { createMemoryHistory } from 'history';
import { AuthorizationContext } from '../context/AuthorizationContext';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { mount } from 'enzyme';
import { AuthorizationContextInterface } from '../context/interfaces/AuthorizationInterfaces';
import Registration from '../pages/registration/Registration';
import Submission from '../pages/submissions/Submission';
import Records from '../pages/records/Records';
import BeProcInformation from '../pages/bproc/BeProcInformation';
import ExecutiveBoard from '../pages/eboard/ExecutiveBoard';
import Resources from '../pages/resources/Resources';
import Recruitment from '../pages/recruitment/Recruitment';
import MentorPage from '../pages/mentor/MentorPage';
import AnalyticPmax from '../pages/tools/AnalyticPmax';
import DemandCurveAnalyzer from '../pages/tools/DemandCurveAnalyzer';
import DiscountingModelSelector from '../pages/tools/DiscountingModelSelector';
import SignIn from '../pages/signin/SignIn';
import UserProfile from '../pages/user/UserProfile';
import UserPoster from '../pages/user/UserPoster';
import UserRecruitment from '../pages/user/UserRecruitment';
import SystemAdministration from '../pages/admin/SystemAdministration';
import BasicAdministrator from '../pages/admin/BasicAdministrator';
import Loading from '../components/Loading';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

const generalAuthObj = {
  user: null,
  authIsReady: true,
  //Student monitor for ads
  studentRecruitFlag: false,
  //Sysadmin
  systemAdministratorFlag: false,
  //Diversity reviewer
  diversityReviewFlag: false,
  //Check for poster rights
  submissionReviewFlag: false,
  dispatch: jest.fn(),
} as AuthorizationContextInterface;

jest.mock('./../firebase/hooks/useFirebaseDocument', () => {
  const originalModule = jest.requireActual('./../firebase/hooks/useFirebaseDocument');
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      addDocument: jest.fn(),
      response: {} as FirestoreState,
    }),
  };
});

jest.mock('../firebase/hooks/useFirebaseLogout', () => {
  const originalModule = jest.requireActual('../firebase/hooks/useFirebaseLogout');
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      logout: jest.fn(),
      logoutPending: false,
    }),
  };
});

describe('Routing tests', () => {
  it('Stubbed', () => {
    expect(1).toBe(1);
  });

  it('Should display conditionally selectively: No Sign in', async () => {
    ReactModal.setAppElement = () => null;

    const unauthedObject = {
      ...generalAuthObj,
      user: null,
      studentRecruitFlag: false,
      systemAdministratorFlag: false,
      diversityReviewFlag: false,
      submissionReviewFlag: false,
    } as AuthorizationContextInterface;

    const history = createMemoryHistory();

    const wrapper = mount(
      <AuthorizationContext.Provider value={{ ...unauthedObject }}>
        <Router history={history}>
          <Header />
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
              {!unauthedObject.user ||
              unauthedObject.user === null ||
              unauthedObject.user.uid === null ? (
                <Redirect to="/signin" />
              ) : (
                <Submission userId={unauthedObject.user.uid} />
              )}
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
            <Route path="/loading">
              <Loading />
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
              {!unauthedObject.user && <Redirect to="/signin" />}
              {unauthedObject.user && <UserProfile />}
            </Route>
            <Route path="/poster/:id">
              {!unauthedObject.user && <Redirect to="/signin" />}
              {unauthedObject.user && <UserPoster />}
            </Route>
            <Route path="/manage/:id">
              {!unauthedObject.user && <Redirect to="/signin" />}
              {unauthedObject.user && <UserRecruitment />}
            </Route>
            <Route path="/admin">
              {!unauthedObject.user && <Redirect to="/signin" />}
              {unauthedObject.user &&
                !(
                  unauthedObject.systemAdministratorFlag ||
                  unauthedObject.studentRecruitFlag ||
                  unauthedObject.diversityReviewFlag
                ) && <Redirect to="/" />}
              {unauthedObject.user && unauthedObject.systemAdministratorFlag && (
                <SystemAdministration />
              )}
              {unauthedObject.user &&
                (unauthedObject.studentRecruitFlag ||
                  unauthedObject.diversityReviewFlag ||
                  unauthedObject.submissionReviewFlag) && <BasicAdministrator />}
            </Route>
          </Switch>
        </Router>
      </AuthorizationContext.Provider>,
    );

    const links = [
      '/',
      '/conference',
      '/tutorials/-1',
      '/registration',
      '/records',
      '/behavioralprocesses',
      '/executiveboard',
      '/resources',
      '/recruitment',
      '/recruitment/id',
      '/loading',
      //'/pmax',
      //'/demand',
      //'/discounting'
      '/user',
      '/poster',
      '/manage',
      '/admin',
    ];

    const instances = [
      Home,
      AnnualConference,
      Tutorials,
      Registration,
      Records,
      BeProcInformation,
      ExecutiveBoard,
      Resources,
      Recruitment,
      MentorPage,
      Loading,
      //AnalyticPmax,
      //DemandCurveAnalyzer,
      //DiscountingModelSelector,
      UserProfile,
      Submission,
      UserRecruitment,
      SystemAdministration,
    ];

    for (let i = 0; i < links.length; i++) {
      const expected = i < 11 ? 1 : 0;
      history.push(links[i]);
      wrapper.update();
      wrapper.render();
      expect(wrapper.find(instances[i])).toHaveLength(expected);
      wrapper.update();
      wrapper.render();
    }
  });

  /*

it('Should display conditionally selectively: Has Sign in', async () => {
  ReactModal.setAppElement = () => null;

  const authedObject = {
    ...generalAuthObj,
    user: { uid: "123" } as firebase.User,
    studentRecruitFlag: false,
    systemAdministratorFlag: true,
    diversityReviewFlag: false,
    submissionReviewFlag: false,
  } as AuthorizationContextInterface;

  const history = createMemoryHistory();

  const wrapper = mount(
    <AuthorizationContext.Provider value={{ ...authedObject }}>
      <Router history={history}>
        <Header />
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
            {!authedObject.user || authedObject.user === null || authedObject.user.uid === null ? (
              <Redirect to="/signin" />
            ) : (
              <Submission userId={authedObject.user.uid} />
            )}
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
            {!authedObject.user && <Redirect to="/signin" />}
            {authedObject.user && <UserProfile />}
          </Route>
          <Route path="/poster/:id">
            {!authedObject.user && <Redirect to="/signin" />}
            {authedObject.user && <UserPoster />}
          </Route>
          <Route path="/manage/:id">
            {!authedObject.user && <Redirect to="/signin" />}
            {authedObject.user && <UserRecruitment />}
          </Route>
          <Route path="/admin">
            {!authedObject.user && <Redirect to="/signin" />}
            {authedObject.user &&
              !(authedObject.systemAdministratorFlag ||
                authedObject.studentRecruitFlag || authedObject.diversityReviewFlag) && (
                <Redirect to="/" />
              )}
            {authedObject.user && authedObject.systemAdministratorFlag && <SystemAdministration />}
            {authedObject.user &&
              (authedObject.studentRecruitFlag ||
                authedObject.diversityReviewFlag ||
                authedObject.submissionReviewFlag) && (
                <BasicAdministrator />
              )}
          </Route>
        </Switch>
      </Router>
    </AuthorizationContext.Provider>,
  );

  const links = [
    '/',
    '/conference',
    '/tutorials/-1',
    '/registration',
    '/records',
    '/behavioralprocesses',
    '/executiveboard',
    '/resources',
    '/recruitment',
    '/recruitment/id',
    //'/pmax',
    //'/demand',
    //'/discounting'
    //'/user',
    //'/poster',
    //'/manage',
    //'/admin'
  ]

  const instances = [
    Home,
    AnnualConference,
    Tutorials,
    Registration,
    Records,
    BeProcInformation,
    ExecutiveBoard,
    Resources,
    Recruitment,
    MentorPage,
    //AnalyticPmax,
    //DemandCurveAnalyzer,
    //DiscountingModelSelector,
    //UserProfile,
    //Submission,
    //UserRecruitment,
    //SystemAdministration
  ]

  for (let i = 0; i < links.length; i++) {
    const expected = 1;
    history.push(links[i]);
    wrapper.update();
    wrapper.render();
    expect(wrapper.find(instances[i])).toHaveLength(expected);
    wrapper.update();
    wrapper.render();
  }

  // TODO: permission tests
});

*/
});

describe('App', () => {
  it('Should build', () => {
    const wrapper = shallow(<App />);
  });
});
