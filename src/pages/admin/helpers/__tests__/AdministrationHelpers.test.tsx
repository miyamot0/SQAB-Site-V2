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

import { SingleOptionType } from '../../../tools/types/GeneralTypes';
import {
  createBlankAdTemplate,
  togglePosterStatus,
  toggleRecruitmentStatus,
} from '../AdministrationHelpers';
import { PosterSubmission, RecruitmentAd } from '../../../../firebase/types/RecordTypes';
import * as FBFunctions from '../../../../firebase/hooks/useFirebaseFunction';
import { projectFunctions } from '../../../../firebase/config';

const spyAdTemplate = jest.spyOn(FBFunctions, 'createBlankTemplateRecruitment');
const spyRecruitStatus = jest.spyOn(FBFunctions, 'updateStatusForRecruitment');
const spyPosterStatus = jest.spyOn(FBFunctions, 'updateStatusForPoster');

const jestTotalFunctions = jest.fn();
const spyTotalFunctions = jest.spyOn(projectFunctions, 'httpsCallable');
spyTotalFunctions.mockImplementation(jestTotalFunctions);

describe('createBlankAdTemplate', () => {
  const spyWindow = jest.fn().mockImplementation(() => {});

  beforeAll(() => {
    window.alert = spyWindow;
  });

  it('Should not throw when passing', () => {
    jestTotalFunctions.mockResolvedValue(true);

    const selectedAdUser = { label: 'real label', value: 'real value' } as SingleOptionType;

    expect(() => createBlankAdTemplate(selectedAdUser)).not.toThrow();
  });

  it('Should error out, bad option', () => {
    jestTotalFunctions.mockRejectedValue(new Error('blah'));

    const selectedAdUser = { label: '', value: '' } as SingleOptionType;
    createBlankAdTemplate(selectedAdUser);
    expect(spyWindow).toBeCalled();
  });
});

describe('toggleRecruitmentStatus', () => {
  const spyWindow = jest.fn().mockImplementation(() => {});

  beforeAll(() => {
    window.alert = spyWindow;
  });

  it('Should not throw when passing', () => {
    jestTotalFunctions.mockResolvedValue(true);

    const recr = { id: '123', Approved: true } as RecruitmentAd;

    expect(() => toggleRecruitmentStatus(recr)).not.toThrow();
  });

  it('Should error out, bad option', () => {
    spyRecruitStatus.mockRejectedValue(() => Promise.resolve());

    const recr = { id: '123', Approved: true } as RecruitmentAd;

    toggleRecruitmentStatus(recr);
    expect(spyRecruitStatus).toBeCalled();
  });
});

describe('togglePosterStatus', () => {
  const spyWindow = jest.fn().mockImplementation(() => {});

  beforeAll(() => {
    window.alert = spyWindow;
  });

  it('Should not throw when passing', () => {
    jestTotalFunctions.mockResolvedValue(true);

    const recr = { id: '123', reviewed: true } as PosterSubmission;

    expect(() => togglePosterStatus(recr)).not.toThrow();
  });

  it('Should error out, bad option', () => {
    spyPosterStatus.mockRejectedValue(() => Promise.resolve());

    const recr = { id: '123', reviewed: true } as PosterSubmission;

    togglePosterStatus(recr);
    expect(spyPosterStatus).toBeCalled();
  });
});
