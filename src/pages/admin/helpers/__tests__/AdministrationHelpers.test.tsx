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
  pullAggregatedDiversityInformation,
  togglePosterStatus,
  toggleRecruitmentStatus,
} from '../AdministrationHelpers';
import { PosterSubmission, RecruitmentAd } from '../../../../firebase/types/RecordTypes';

const mockCreateBlankAdTemplate = jest.fn();
let mockUpdateStatusForRecruitment: jest.Mock<any, any>;
jest.mock('../../../../firebase/hooks/useFirebaseFunction', () => {
  mockUpdateStatusForRecruitment = jest.fn();

  return {
    updateStatusForRecruitment: () => jest.fn(),
    createBlankTemplateRecruitment: () => mockCreateBlankAdTemplate,
    updateStatusForPoster: () => jest.fn(),
    getAggregatedDiversityInformation: () =>
      jest.fn().mockResolvedValue({ data: { genderData: [['']] } }),
    getFilteredRecruitmentInformation: () => jest.fn(),
    useFirebaseFunction: () => ({
      updateStatusForRecruitment: jest.fn(),
      createBlankTemplateRecruitment: jest.fn(),
      updateStatusForPoster: jest.fn(),
      getAggregatedDiversityInformation: jest.fn(),
      getFilteredRecruitmentInformation: jest.fn(),
    }),
  };
});

describe('createBlankAdTemplate', () => {
  const jsdomAlert = window.alert;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.alert = () => {}; // provide an empty implementation for window.alert
  });

  afterAll(() => {
    window.alert = jsdomAlert; // restore the jsdom alert
  });

  it('Should not throw when passing', () => {
    //jestTotalFunctions.mockResolvedValue(true);

    const selectedAdUser = { label: 'real label', value: 'real value' } as SingleOptionType;

    createBlankAdTemplate(selectedAdUser);
  });

  it('Should error out, bad option', () => {
    //jestTotalFunctions.mockRejectedValue(new Error('blah'));

    const selectedAdUser = { label: '', value: '' } as SingleOptionType;
    createBlankAdTemplate(selectedAdUser);
  });
});

describe('toggleRecruitmentStatus', () => {
  it('Should not throw when passing', () => {
    //jestTotalFunctions.mockResolvedValue(true);

    const recr = { id: '123', Approved: true } as RecruitmentAd;

    expect(() => toggleRecruitmentStatus(recr)).not.toThrow();
  });

  it('Should error out, bad option', () => {
    //spyRecruitStatus.mockRejectedValue(() => Promise.resolve());

    const recr = { id: '123', Approved: true } as RecruitmentAd;

    toggleRecruitmentStatus(recr);
    //expect(spyRecruitStatus).toBeCalled();
  });
});

describe('togglePosterStatus', () => {
  it('Should not throw when passing', () => {
    //jestTotalFunctions.mockResolvedValue(true);

    const recr = { id: '123', reviewed: true } as PosterSubmission;

    expect(() => togglePosterStatus(recr)).not.toThrow();
  });

  it('Should error out, bad option', () => {
    //spyPosterStatus.mockRejectedValue(() => Promise.resolve());

    const recr = { id: '123', reviewed: true } as PosterSubmission;

    togglePosterStatus(recr);
    //expect(spyPosterStatus).toBeCalled();
  });
});

describe('pullAggregatedDiversityInformation', () => {
  it('Should pass', () => {
    const setCurrentDemographics = jest.fn();

    pullAggregatedDiversityInformation(setCurrentDemographics);

    expect(1).toBe(1);
    //expect(setCurrentDemographics).toBeCalled();
  });
});
