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

describe('createBlankAdTemplate', () => {
  it('Should error out, bad option', () => {
    const mockAlert = jest.fn();
    jest.spyOn(window, 'alert').mockImplementation(mockAlert);

    const selectedAdUser = { label: '', value: '' } as SingleOptionType;
    createBlankAdTemplate(selectedAdUser);
    expect(mockAlert).toBeCalled();
  });

  it('Should not throw when passing', () => {
    const spyRecruitment = jest.spyOn(FBFunctions, 'createBlankTemplateRecruitment');
    const mockBuildTemplate = jest.fn();
    mockBuildTemplate.mockReturnValue(() => Promise.resolve());
    spyRecruitment.mockImplementation(mockBuildTemplate);

    const selectedAdUser = { label: 'real label', value: 'real value' } as SingleOptionType;

    expect(() => createBlankAdTemplate(selectedAdUser)).not.toThrow();
  });

  it('Should throw when erroring', () => {
    const mockAlert = jest.fn();
    jest.spyOn(window, 'alert').mockImplementation(mockAlert);

    const spyRecruitment = jest.spyOn(FBFunctions, 'createBlankTemplateRecruitment');
    spyRecruitment.mockImplementation(({ recruiterId: string }) => {
      throw new Error();
    });

    const selectedAdUser = { label: 'real label', value: 'real value' } as SingleOptionType;

    createBlankAdTemplate(selectedAdUser);
  });
});

describe('toggleRecruitmentStatus', () => {
  it('Should error out, bad option', () => {
    const spyRecruitment = jest.spyOn(FBFunctions, 'updateStatusForRecruitment');
    spyRecruitment.mockRejectedValue(() => Promise.resolve());

    const recr = { id: '123', Approved: true } as RecruitmentAd;

    toggleRecruitmentStatus(recr);
    expect(spyRecruitment).toBeCalled();
  });
});

describe('togglePosterStatus', () => {
  it('Should error out, bad option', () => {
    const spyRecruitment = jest.spyOn(FBFunctions, 'updateStatusForPoster');
    spyRecruitment.mockRejectedValue(() => Promise.resolve());

    const recr = { id: '123', reviewed: true } as PosterSubmission;

    togglePosterStatus(recr);
    expect(spyRecruitment).toBeCalled();
  });
});
