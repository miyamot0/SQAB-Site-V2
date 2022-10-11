/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactModal from 'react-modal';
import {
  IndividualUserRecordSaved,
  PosterSubmission,
  RecruitmentAd,
} from '../../../../firebase/types/RecordTypes';
import { PosterPanel } from '../PosterPanel';
import * as FBHooks from '../../../../firebase/hooks/useFirebaseCollection';
import * as FBFunctions from '../../../../firebase/hooks/useFirebaseFunction';
import { projectFunctions } from '../../../../firebase/config';
import { UserSummaryCard } from '../UserSummaryCard';

Enzyme.configure({ adapter: new Adapter() });

ReactModal.setAppElement = () => null;

describe('UserSummaryCard', () => {
  it('Should render with good data', () => {
    const fakeUsers = [{} as IndividualUserRecordSaved];
    const fakeRecruit = [{} as RecruitmentAd];
    const fakePosters = [{} as PosterSubmission];

    const wrapper = shallow(
      <UserSummaryCard
        userDocuments={fakeUsers}
        recruitmentDocuments={fakeRecruit}
        submissionDocuments={fakePosters}
      />,
    );
  });
});
