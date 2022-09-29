/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { useFirestore } from '../../firebase/hooks/useFirestore';
import { useHistory } from 'react-router-dom';
import { useFirebaseDocumentTyped } from '../../firebase/hooks/useFirebaseDocument';
import {
  InitialUserState,
  UserEditAction,
  UserEditReducer,
} from './functionality/UserProfileFunctionality';
import { IndividualUserRecordSaved } from '../../firebase/types/RecordTypes';
import { OutputUserError } from './views/UserOutputError';
import { UserOutputLoading } from './views/UserOutputLoading';
import { LayoutProfileBody } from './layouts/LayoutProfileBody';
import { RoutedAdminSet } from '../../firebase/types/RoutingTypes';
import { SingleOptionType } from '../tools/types/GeneralTypes';
import { AgeOptions, DemographicOptions, EducationOptions, GenderOptions, SexualityOptions } from './helpers/DemographicOptions';
import { CountryList } from '../../utilities/CountryCodes';

export default function UserProfile() {
  const history = useHistory();
  const { id } = useParams<RoutedAdminSet>();
  const { document, documentError } = useFirebaseDocumentTyped<IndividualUserRecordSaved>({
    collectionString: 'users',
    idString: id,
  });
  const [state, dispatch] = useReducer(UserEditReducer, InitialUserState);
  const { updateDocument, response } = useFirestore('users');

  useEffect(() => {
    if (document && !state.didBuild) {
      dispatch({ type: UserEditAction.EditDidBuild, payload: true });

      if (document.userPhone) {
        dispatch({
          type: UserEditAction.EditPhoneAuthed,
          payload: document.userPhone.trim().length > 0,
        });
      } else {
        dispatch({ type: UserEditAction.EditPhoneAuthed, payload: false });
      }

      let raceEthnicityOptions: string[] | undefined = undefined;

      if (document.userRaceEthnicity && document.userRaceEthnicity.includes(':')) {
        raceEthnicityOptions = document.userRaceEthnicity.split(':')
      } else if (document.userRaceEthnicity && !document.userRaceEthnicity.includes(':')) {
        raceEthnicityOptions = [document.userRaceEthnicity]
      }

      const modDocument = {
        ...document,
        userEducation: EducationOptions.find(function (ed: SingleOptionType) {
          return ed.value === document.userEducation;
        }),
        userGender: GenderOptions.find(function (ed: SingleOptionType) {
          return ed.value === document.userGender;
        }),
        userAge: AgeOptions.find(function (ed: SingleOptionType) {
          return ed.value === document.userAge;
        }),
        userRaceEthnicity: DemographicOptions.filter(function (ed: SingleOptionType) {
          if (raceEthnicityOptions && raceEthnicityOptions.includes(ed.value)) {
            return true;
          } else {
            return false;
          }
        }),
        userOrientation: SexualityOptions.find(function (ed: SingleOptionType) {
          return ed.value === document.userOrientation;
        }),
        userNationality: CountryList.find(function (ed: SingleOptionType) {
          return ed.label === document.userNationality;
        }),
      };

      modDocument.userEducation = modDocument.userEducation ?? null as unknown as SingleOptionType;
      modDocument.userGender = modDocument.userGender ?? null as unknown as SingleOptionType;
      modDocument.userAge = modDocument.userAge ?? null as unknown as SingleOptionType;
      modDocument.userOrientation = modDocument.userOrientation ?? null as unknown as SingleOptionType;
      modDocument.userNationality = modDocument.userNationality ?? null as unknown as SingleOptionType;
      modDocument.userRaceEthnicity = modDocument.userRaceEthnicity ?? []

      dispatch({ type: UserEditAction.Load, payload: modDocument });
    }
  }, [document]);

  /** handleEditFormSubmit
   *
   * Submission event for student edit form
   *
   */
  async function submitCallback(): Promise<void> {

    const uploadObject = {
      userName: state.userName,
      userEmail: state.userEmail,
      userInstitution: state.userInstitution,

      userAge: state.userAge?.value,
      userEducation: state.userEducation?.value,
      userGender: state.userGender?.value,
      userOrientation: state.userOrientation?.value,
      userNationality: state.userNationality?.label,
      userRaceEthnicity: state.userRaceEthnicity?.map((resp: SingleOptionType) => {
        return resp.value
      }).join(":"),
    } as IndividualUserRecordSaved;

    await updateDocument(id, uploadObject);

    if (response.error) {
      alert(response.error);
    } else {
      history.push(`/user/${id}`);
    }

    return;
  }

  if (documentError) {
    return <OutputUserError documentError={documentError} />;
  } else if (!document && !documentError) {
    return <UserOutputLoading />;
  } else {
    return <LayoutProfileBody state={state} submitCallback={submitCallback} dispatch={dispatch} />;
  }
}
