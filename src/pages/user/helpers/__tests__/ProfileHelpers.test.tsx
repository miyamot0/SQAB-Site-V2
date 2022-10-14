/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { act } from 'react-dom/test-utils';
import { updateProfileCallback } from '../ProfileHelpers';
import { FirestoreState } from '../../../../firebase/interfaces/FirebaseInterfaces';
import { IndividualUserRecord } from '../../../../firebase/types/RecordTypes';
import { SingleOptionType } from '../../../tools/types/GeneralTypes';

Enzyme.configure({ adapter: new Adapter() });

describe('ProfileHelpers', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = () => {}; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should submit and route, given good data', async () => {
    await act(async () => {
      const state = {
        userEmail: '',
        userInstitution: '',
        userName: '',
        userPhone: '',
        canPostAd: false,
        perms: '',
        id: undefined,
        formError: undefined,
        phoneAuthed: false,
        didBuild: false,
        userEducation: { label: '', value: '' } as SingleOptionType,
        userGender: { label: '', value: '' } as SingleOptionType,
        userAge: { label: '', value: '' } as SingleOptionType,
        userRaceEthnicity: [
          { label: '', value: '' } as SingleOptionType,
          { label: '', value: '' } as SingleOptionType,
        ],
        userOrientation: { label: '', value: '' } as SingleOptionType,
        userLanguage: { label: '', value: '' } as SingleOptionType,
        userNationality: { label: '', value: '' } as SingleOptionType,
      } as IndividualUserRecord;

      const id = '123';

      const updateDocument = jest.fn();
      const response = {} as FirestoreState;
      const history = jest.fn();
      const historyObj = {
        push: history,
      };

      await updateProfileCallback(state, id, updateDocument, response, historyObj);

      expect(updateDocument).toBeCalled();
      expect(history).toBeCalled();
    });
  });

  it('Should error out, given bad response', async () => {
    await act(async () => {
      const state = {
        userEmail: '',
        userInstitution: '',
        userName: '',
        userPhone: '',
        canPostAd: false,
        perms: '',
        id: undefined,
        formError: undefined,
        phoneAuthed: false,
        didBuild: false,
        userEducation: { label: '', value: '' } as SingleOptionType,
        userGender: { label: '', value: '' } as SingleOptionType,
        userAge: { label: '', value: '' } as SingleOptionType,
        userRaceEthnicity: [
          { label: '', value: '' } as SingleOptionType,
          { label: '', value: '' } as SingleOptionType,
        ],
        userOrientation: { label: '', value: '' } as SingleOptionType,
        userLanguage: { label: '', value: '' } as SingleOptionType,
        userNationality: { label: '', value: '' } as SingleOptionType,
      } as IndividualUserRecord;

      const id = '123';

      const updateDocument = jest.fn();
      const response = { error: 'Error' } as FirestoreState;
      const history = jest.fn();
      const historyObj = {
        push: history,
      };

      await updateProfileCallback(state, id, updateDocument, response, historyObj);

      expect(updateDocument).toBeCalled();
      expect(history).not.toBeCalled();
    });
  });
});
