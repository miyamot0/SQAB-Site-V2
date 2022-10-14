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
import { RecruitmentAd } from '../../../../firebase/types/RecordTypes';
import RecruitmentTable from '../RecruitmentTable';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('RecruitmentTable', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // remember the jsdom alert
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = () => {}; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should render, basic content', () => {
    const documents = [
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
    ] as RecruitmentAd[];

    const wrapper = mount(<RecruitmentTable documents={documents} />);
  });

  it('Should render, despite null array', () => {
    const wrapper = mount(<RecruitmentTable documents={null as unknown as RecruitmentAd[]} />);
  });

  it('Should render, shuffled content', () => {
    const documents = [
      {
        Bio: '',
        Contact: '',
        Cycle: '10/05/2022',
        Mentor: '',
        Position: '',
        Name: '',
        Description: 'string',
        Institution: 'string',
        Link: 'string',
        LabLink: 'string',
        Approved: true,
        id: 'string',
      } as RecruitmentAd,
      {
        Bio: '',
        Contact: '',
        Cycle: '09/05/2022',
        Mentor: '',
        Position: '',
        Name: '',
        Description: 'string',
        Institution: 'string',
        Link: 'string',
        LabLink: 'string',
        Approved: true,
        id: 'string',
      } as RecruitmentAd,
      {
        Bio: '',
        Contact: '',
        Cycle: '10/05/2022',
        Mentor: '',
        Position: '',
        Name: '',
        Description: 'string',
        Institution: 'string',
        Link: 'string',
        LabLink: 'string',
        Approved: true,
        id: 'string',
      } as RecruitmentAd,
      {
        Bio: '',
        Contact: '',
        Cycle: '09/05/2022',
        Mentor: '',
        Position: '',
        Name: '',
        Description: 'string',
        Institution: 'string',
        Link: 'string',
        LabLink: 'string',
        Approved: true,
        id: 'string',
      } as RecruitmentAd,
      {
        Bio: '',
        Contact: '',
        Cycle: '10/05/2022',
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
    ] as RecruitmentAd[];

    const wrapper = mount(<RecruitmentTable documents={documents} />);
  });
});
