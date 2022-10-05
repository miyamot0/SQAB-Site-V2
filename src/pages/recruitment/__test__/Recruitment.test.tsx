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
import Recruitment from '../Recruitment';
import { RecruitmentAd } from '../../../firebase/types/RecordTypes';
import { timestamp } from '../../../firebase/config';
import RecruitmentTable from '../subcomponents/RecruitmentTable';
import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import * as UseCollectionMethods from '../../../firebase/hooks/useFirebaseCollection';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

const mockTime1 = timestamp.fromDate(new Date());
const mockTime2 = timestamp.fromDate(new Date('10/3/2022'));
/*
jest.mock('../../../firebase/hooks/useFirebaseCollection', () => {
  const originalModule = jest.requireActual('../../../firebase/hooks/useFirebaseCollection');
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      useFirebaseCollectionTyped: {
        documents: [
          {
            Bio: '',
            Contact: '',
            Cycle: '',
            Mentor: '',
            Position: '',
            Name: '',
            Description: 'string',
            Institution: 'string',
            Link: 'string',
            LabLink: 'string',
            Approved: false,
            id: 'string',
          } as RecruitmentAd,
          {
            Bio: '',
            Contact: '',
            Cycle: '',
            Mentor: '',
            Position: '',
            Name: '',
            Description: 'string',
            Institution: 'string',
            Link: 'string',
            LabLink: 'string',
            Approved: false,
            id: 'string',
          } as RecruitmentAd,
        ] as RecruitmentAd[],
      },
    }),
  };
});
*/

describe('Recruitment', () => {
  beforeAll(() => {
    const docMockCollection = jest.spyOn(UseCollectionMethods, 'useFirebaseCollectionTyped');
    docMockCollection.mockImplementation(() => ({
      documents: [
        {
          Bio: '',
          Contact: '',
          Cycle: '',
          Mentor: '',
          Position: '',
          Name: '',
          Description: 'string',
          Institution: 'string',
          Link: 'string',
          LabLink: 'string',
          Approved: false,
          id: 'string',
        } as RecruitmentAd,
        {
          Bio: '',
          Contact: '',
          Cycle: '',
          Mentor: '',
          Position: '',
          Name: '',
          Description: 'string',
          Institution: 'string',
          Link: 'string',
          LabLink: 'string',
          Approved: false,
          id: 'string',
        } as RecruitmentAd,
      ] as RecruitmentAd[],
      error: undefined,
    }));
  });

  it('Should render', async () => {
    await act(async () => {
      const wrapper = mount(<Recruitment />);

      wrapper.update();
      wrapper.render();

      expect(wrapper.find(Recruitment).length).toBe(1);

      //TODO: not working
      //await waitFor(() => {
      //  expect(wrapper.find(RecruitmentTable).length).toBe(1);
      //});
    });
  });
});
