/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MultiValue } from 'react-select';
import { SingleOptionType } from '../../tools/types/GeneralTypes';
import { UserEditAction } from '../functionality/UserProfileFunctionality';

export type ProfileActions =
  | { type: UserEditAction.Email; payload: any }
  | { type: UserEditAction.Institution; payload: any }
  | { type: UserEditAction.Name; payload: string }
  | { type: UserEditAction.Phone; payload: string }
  | { type: UserEditAction.Load; payload: any }
  | { type: UserEditAction.EditEducation; payload: SingleOptionType }
  | { type: UserEditAction.EditGender; payload: SingleOptionType }
  | { type: UserEditAction.EditAge; payload: SingleOptionType }
  | { type: UserEditAction.EditRaceEthnicity; payload: MultiValue<SingleOptionType> }
  | { type: UserEditAction.EditOrientation; payload: SingleOptionType }
  | { type: UserEditAction.EditLanguage; payload: SingleOptionType }
  | { type: UserEditAction.EditNationality; payload: SingleOptionType }
  | { type: UserEditAction.EditPhoneAuthed; payload: boolean }
  | { type: UserEditAction.EditFormError; payload: string | undefined }
  | { type: UserEditAction.EditDidBuild; payload: boolean };
