/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useReducer } from 'react';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useFirebaseDocumentTyped } from '../../firebase/hooks/useFirebaseDocument';
import { useFirestore } from '../../firebase/hooks/useFirestore';
import { EditRecruitmentState } from '../recruitment/types/RecruitmentTypes';
import { dateToYMD } from './helpers/RecruitmentHelpers';
import { useAuthorizationContext } from '../../context/hooks/useAuthorizationContext';
import { IndividualUserRecordSaved, RecruitmentAd } from '../../firebase/types/RecordTypes';
import { RoutedAdminSet } from '../../firebase/types/RoutingTypes';
import {
  InitialRecruitmentState,
  RecruitmentEditAction,
  RecruitmentEditReducer,
} from './functionality/UserRecruitmentFunctionality';
import { UserOutputLoading } from './views/UserOutputLoading';
import { LayoutRecruitmentBody } from './layouts/LayoutRecruitmentBody';

export default function UserRecruitment() {
  const { id } = useParams<RoutedAdminSet>();
  const { document } = useFirebaseDocumentTyped<RecruitmentAd>({
    collectionString: 'recruitment',
    idString: id,
  });
  const { document: userDocument } = useFirebaseDocumentTyped<IndividualUserRecordSaved>({
    collectionString: 'users',
    idString: id,
  });

  const { updateDocument, response } = useFirestore('recruitment');
  const { authIsReady } = useAuthorizationContext();

  const [state, dispatch] = useReducer(RecruitmentEditReducer, InitialRecruitmentState);
  const [didBuild, setDidBuild] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    if (document && userDocument && !didBuild) {
      setDidBuild(true);

      const modDateRec = {
        ...document,
        userEmail: userDocument.userEmail,
        userInstitution: userDocument.userInstitution,
        userName: userDocument.userName,
        Cycle: dateToYMD(document.Cycle),
      } as unknown as EditRecruitmentState;

      dispatch({
        type: RecruitmentEditAction.LoadRecruitment,
        payload: modDateRec,
      });
    }
  }, [document, userDocument, didBuild]);

  if (authIsReady === true && document) {
    return (
      <LayoutRecruitmentBody
        state={state}
        id={id}
        updateDocument={updateDocument}
        history={history}
        response={response}
        dispatch={dispatch}
      />
    );
  } else if (authIsReady === false) {
    return <UserOutputLoading />;
  } else {
    return (
      <div>
        <MDBRow center className='row-eq-height'>
          <MDBCol sm='8'>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>Recruitment Details</MDBCardTitle>
                At present, you currently do not have a recruitment advertisement. Please contact
                the site administrator.
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}
