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
import MentorPage from '../MentorPage';
import { RecruitmentAd } from '../../../firebase/types/RecordTypes';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;


const mockId = '123';

let mockUseFirebaseDocumentTyped: jest.Mock<any, any>;

jest.mock('../../../firebase/hooks/useFirebaseDocument', () => {
  mockUseFirebaseDocumentTyped = jest.fn();

  return {
    ...jest.requireActual("../../../firebase/hooks/useFirebaseDocument"),
    useFirebaseDocumentTyped: mockUseFirebaseDocumentTyped.mockReturnValue({
      document: null,
      documentError: null
    })
  }
})

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: mockId,
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
  useRouteMatch: () => ({ url: `/user/${mockId}` }),
}));

describe('MentorPage', () => {
  it('Should render, without data loaded', () => {
    const wrapper = mount(<MentorPage />);

    expect(wrapper.find(MentorPage).length).toBe(1);
  });

  it('Should render, with data loaded', () => {
    mockUseFirebaseDocumentTyped.mockReturnValue({
      document: {
        Bio: 'string',
        Contact: 'string',
        Cycle: 'string',
        Description: 'string',
        Institution: 'string',
        Link: 'string',
        LabLink: 'string',
        Mentor: 'string',
        Name: 'string',
        Position: 'string',
        Approved: false,
        id: mockId,
      } as RecruitmentAd,
      documentError: null
    })

    const wrapper = mount(<MentorPage />);

    expect(wrapper.find(MentorPage).length).toBe(1);
  });
});
