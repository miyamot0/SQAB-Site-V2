/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SingleOptionType } from "../../tools/types/GeneralTypes";

export const EducationOptions: SingleOptionType[] = [
  { label: 'Some high school', value: 'Some high school', },
  {
    label: 'High school', value: 'High school',
  },
  {
    label: 'Trade school', value: 'Trade school',
  },
  {
    label: 'Associate degree', value: 'Associate degree',
  },
  {
    label: 'Bachelors degree', value: 'Bachelors degree',
  },
  {
    label: 'Masters degree', value: 'Masters degree',
  },
  {
    label: 'Doctoral degree or higher', value: 'Doctoral degree or higher',
  },
  { label: 'Prefer not to answer', value: 'Prefer not to answer', }
];

export const GenderOptions = [{ value: 'Woman', label: 'Woman', },
{ value: 'Man', label: 'Man', },
{ value: 'Nonbinary', label: 'Nonbinary', },
{ value: 'Other gender', label: 'Other gender', },
{ value: 'Prefer not to answer', label: 'Prefer not to answer', },
];

export const AgeOptions = [
  { value: '<18 years', label: '<18 years', },
  { value: '18-20', label: '18-20', },
  { value: '21-29', label: '21-29', },
  { value: '30-39', label: '30-39', },
  { value: '40-49', label: '40-49', },
  { value: '50-59', label: '50-59', },
  { value: '60-69', label: '60-69', },
  { value: '70 or older', label: '70 or older', },
  { value: 'Prefer not to answer', label: 'Prefer not to answer', },
];

export const SexualityOptions = [
  { value: 'Heterosexual or Straight', label: 'Heterosexual or Straight', },
  { value: 'Gay or Lesbian', label: 'Gay or Lesbian', },
  { value: 'Bisexual', label: 'Bisexual', },
  { value: 'Other orientation', label: 'Other orientation', },
  { value: 'Prefer not to answer', label: 'Prefer not to answer', },
];

export const DemographicOptions = [
  { value: 'African American/Black', label: 'African American/Black', },
  { value: 'Asian', label: 'Asian', },
  { value: 'Caucasian/White', label: 'Caucasian/White', },
  { value: 'Hispanic/Latino/a/x', label: 'Hispanic/Latino/a/x', },
  { value: 'Middle Eastern/North African', label: 'Middle Eastern/North African', },
  { value: 'Native American/American Indian/Alaska Native', label: 'Native American/American Indian/Alaska Native', },
  { value: 'Native Hawaiian or Pacific Islander', label: 'Native Hawaiian or Pacific Islander', },
  { value: 'Other race or ethnicity', label: 'Other race or ethnicity', },
  { value: 'Prefer not to answer', label: 'Prefer not to answer', },
];
