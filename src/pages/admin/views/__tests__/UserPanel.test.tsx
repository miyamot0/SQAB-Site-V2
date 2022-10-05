/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactModal from 'react-modal';
import { IndividualUserRecordSaved } from '../../../../firebase/types/RecordTypes';
import { MDBDataTable } from 'mdbreact';
import { UserPanel } from '../UserPanel';
import { projectFunctions } from '../../../../firebase/config';

const jestTotalFunctions = jest.fn().mockResolvedValue(true);
const spyTotalFunctions = jest.spyOn(projectFunctions, 'httpsCallable');
spyTotalFunctions.mockImplementation(jestTotalFunctions);

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('UserPanel', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // remember the jsdom alert
    window.alert = () => {}; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should render with data', () => {
    const documents = [
      {
        userEmail: 'string',
        userInstitution: 'string',
        userName: 'string',
        userPhone: 'string',
        canPostAd: true,
        perms: 'string',
        id: 'string',
        formError: 'string',
        phoneAuthed: true,
        didBuild: true,

        // New params
        userEducation: 'string',
        userGender: 'string',
        userAge: 'string',
        userRaceEthnicity: 'string',
        userOrientation: 'string',
        userLanguage: 'string',
        userNationality: 'string',
      } as IndividualUserRecordSaved,
    ] as IndividualUserRecordSaved[];

    const wrapper = mount(<UserPanel userDocuments={documents} />);

    expect(wrapper.find(MDBDataTable).length).toBe(1);

    //wrapper.find('.button-color-override-green').first().simulate('click');
  });

  it('Should render with bad data', () => {
    const documents = [
      {
        userEmail: 'string',
        userInstitution: 'string',
        userName: ' ',
        userPhone: 'string',
        canPostAd: true,
        perms: 'string',
        id: 'string',
        formError: 'string',
        phoneAuthed: true,
        didBuild: true,

        // New params
        userEducation: 'string',
        userGender: 'string',
        userAge: 'string',
        userRaceEthnicity: 'string',
        userOrientation: 'string',
        userLanguage: 'string',
        userNationality: 'string',
      } as IndividualUserRecordSaved,
      {
        userEmail: 'string',
        userInstitution: 'string',
        userName: 'string',
        userPhone: 'string',
        canPostAd: true,
        perms: 'baseuser',
        id: 'string',
        formError: 'string',
        phoneAuthed: true,
        didBuild: true,

        // New params
        userEducation: 'string',
        userGender: 'string',
        userAge: 'string',
        userRaceEthnicity: 'string',
        userOrientation: 'string',
        userLanguage: 'string',
        userNationality: 'string',
      } as IndividualUserRecordSaved,
      {
        userEmail: 'string',
        userInstitution: 'string',
        userName: undefined as unknown as string,
        userPhone: 'string',
        canPostAd: true,
        perms: 'string',
        id: 'string',
        formError: 'string',
        phoneAuthed: true,
        didBuild: true,

        // New params
        userEducation: 'string',
        userGender: 'string',
        userAge: 'string',
        userRaceEthnicity: 'string',
        userOrientation: 'string',
        userLanguage: 'string',
        userNationality: 'string',
      } as IndividualUserRecordSaved,
      {
        userEmail: 'string',
        userInstitution: 'string',
        userName: '',
        userPhone: 'string',
        canPostAd: true,
        perms: 'string',
        id: 'string',
        formError: 'string',
        phoneAuthed: true,
        didBuild: true,

        // New params
        userEducation: 'string',
        userGender: 'string',
        userAge: 'string',
        userRaceEthnicity: 'string',
        userOrientation: 'string',
        userLanguage: 'string',
        userNationality: 'string',
      } as IndividualUserRecordSaved,
    ] as IndividualUserRecordSaved[];

    const wrapper = mount(<UserPanel userDocuments={documents} />);

    expect(wrapper.find(MDBDataTable).length).toBe(1);

    //wrapper.find('.button-color-override-green').first().simulate('click');
  });
});
