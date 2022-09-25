/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IndividualUserRecord, PosterSubmission, RecruitmentAd } from './RecordTypes';

export type CurrentObjectTypeArrays =
  | IndividualUserRecord[]
  | PosterSubmission[]
  | RecruitmentAd[]
  | null;

export type PossibleCollectionType =
  | IndividualUserRecord[]
  | PosterSubmission[]
  | RecruitmentAd[]
  | null;
