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
import { MDBDataTable } from 'mdbreact';
import { RecruitmentPanel } from '../RecruitmentPanel';
import * as FBHooks from '../../../../firebase/hooks/useFirebaseCollection';
import * as ViewHelpers from '../../helpers/AdministrationHelpers';
import { RecruitmentFunctionResponse } from '../../../../firebase/types/FunctionTypes';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('RecruitmentPanel', () => {
  const collSpy = jest.spyOn(FBHooks, 'useFirebaseCollectionTyped');

  it('Should render with data', () => {
    const spyRecruitment = jest.spyOn(ViewHelpers, 'toggleRecruitmentStatus');
    spyRecruitment.mockResolvedValue();

    collSpy.mockReturnValue({
      documents: [
        {
          Bio: '1',
          Contact: '',
          Cycle: '',
          Description: '',
          Institution: '',
          Link: '',
          LabLink: '',
          Mentor: '',
          Name: '',
          Position: '',
          Approved: false,
          id: 'string',
        } as RecruitmentAd,
        {
          Bio: 'string',
          Contact: 'string',
          Cycle: '10/03/2022',
          Description: 'string',
          Institution: 'string',
          Link: 'string',
          LabLink: 'string',
          Mentor: 'string',
          Name: 'string',
          Position: 'string',
          Approved: true,
          id: 'string',
        } as RecruitmentAd,
        {
          Bio: '1',
          Contact: '',
          Cycle: '09/02/2022',
          Description: '',
          Institution: '',
          Link: '',
          LabLink: '',
          Mentor: '',
          Name: '',
          Position: '',
          Approved: false,
          id: 'string',
        } as RecruitmentAd,
        {
          Bio: '1',
          Contact: '',
          Cycle: '10/02/2022',
          Description: '',
          Institution: '',
          Link: '',
          LabLink: '',
          Mentor: '',
          Name: '',
          Position: '',
          Approved: false,
          id: 'string',
        } as RecruitmentAd,
        {
          Bio: '1',
          Contact: '',
          Cycle: undefined as unknown as string,
          Description: '',
          Institution: '',
          Link: '',
          LabLink: '',
          Mentor: '1',
          Name: '',
          Position: '',
          Approved: false,
          id: 'string',
        } as RecruitmentAd,
        {
          Bio: '1',
          Contact: '',
          Cycle: '11/02/2022',
          Description: '',
          Institution: '1',
          Link: '',
          LabLink: '',
          Mentor: '',
          Name: '',
          Position: '',
          Approved: true,
          id: 'string',
        } as RecruitmentAd,
        {
          Bio: '',
          Contact: '',
          Cycle: '10/01/2022',
          Description: '',
          Institution: '',
          Link: '',
          LabLink: '1',
          Mentor: '1',
          Name: '',
          Position: '',
          Approved: true,
          id: 'string',
        } as RecruitmentAd,
        {
          Bio: '',
          Contact: '',
          Cycle: '',
          Description: '',
          Institution: '',
          Link: '',
          LabLink: '',
          Mentor: '1',
          Name: '1',
          Position: '',
          Approved: false,
          id: 'string',
        } as RecruitmentAd,
      ] as RecruitmentAd[],
      error: undefined,
    });

    const wrapper = mount(<RecruitmentPanel />);

    expect(wrapper.find(MDBDataTable).length).toBe(1);

    wrapper.find('.button-color-override-green').first().simulate('click');
  });

  it('Should render with bad data', () => {
    const spyRecruitment = jest.spyOn(ViewHelpers, 'toggleRecruitmentStatus');
    spyRecruitment.mockReturnValue(null as unknown as Promise<void>);

    collSpy.mockReturnValue({
      documents: [
        {
          Bio: '1',
          Contact: '',
          Cycle: '',
          Description: '',
          Institution: '',
          Link: '',
          LabLink: '',
          Mentor: '',
          Name: '',
          Position: '',
          Approved: false,
          id: 'string',
        } as RecruitmentAd,
        {
          Bio: 'string',
          Contact: 'string',
          Cycle: '10/03/2022',
          Description: 'string',
          Institution: 'string',
          Link: 'string',
          LabLink: 'string',
          Mentor: 'string',
          Name: 'string',
          Position: 'string',
          Approved: true,
          id: 'string',
        } as RecruitmentAd,
        {
          Bio: '1',
          Contact: '',
          Cycle: '09/02/2022',
          Description: '',
          Institution: '',
          Link: '',
          LabLink: '',
          Mentor: '',
          Name: '',
          Position: '',
          Approved: false,
          id: 'string',
        } as RecruitmentAd,
        {
          Bio: '1',
          Contact: '',
          Cycle: '10/02/2022',
          Description: '',
          Institution: '',
          Link: '',
          LabLink: '',
          Mentor: '',
          Name: '',
          Position: '',
          Approved: false,
          id: 'string',
        } as RecruitmentAd,
        {
          Bio: '1',
          Contact: '',
          Cycle: undefined as unknown as string,
          Description: '',
          Institution: '',
          Link: '',
          LabLink: '',
          Mentor: '1',
          Name: '',
          Position: '',
          Approved: false,
          id: 'string',
        } as RecruitmentAd,
        {
          Bio: '1',
          Contact: '',
          Cycle: '11/02/2022',
          Description: '',
          Institution: '1',
          Link: '',
          LabLink: '',
          Mentor: '',
          Name: '',
          Position: '',
          Approved: true,
          id: 'string',
        } as RecruitmentAd,
        {
          Bio: '',
          Contact: '',
          Cycle: '10/01/2022',
          Description: '',
          Institution: '',
          Link: '',
          LabLink: '1',
          Mentor: '1',
          Name: '',
          Position: '',
          Approved: true,
          id: 'string',
        } as RecruitmentAd,
        {
          Bio: '',
          Contact: '',
          Cycle: '',
          Description: '',
          Institution: '',
          Link: '',
          LabLink: '',
          Mentor: '1',
          Name: '1',
          Position: '',
          Approved: false,
          id: 'string',
        } as RecruitmentAd,
      ] as RecruitmentAd[],
      error: undefined,
    });

    const wrapper = mount(<RecruitmentPanel />);

    expect(wrapper.find(MDBDataTable).length).toBe(1);

    wrapper.find('.button-color-override-green').first().simulate('click');
  });
});
