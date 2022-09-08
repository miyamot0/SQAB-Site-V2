/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBTableBody,
  MDBTableHead,
  MDBTable,
} from 'mdb-react-ui-kit';
import Select from 'react-select';
import moment from 'moment';

import { useFirebaseCollectionTyped } from '../../firebase/useFirebaseCollection';
import { useFirebaseFunction } from '../../firebase/useFirebaseFunction';

import { SingleOptionType } from '../tools/types/GeneralTypes';

import { CardBodyTextStyle } from '../../utilities/StyleHelper';
import {
  IndividualUserRecord,
  PosterSubmission,
  RecruitmentAd,
} from '../../firebase/types/RecordTypes';
import { useAuthorizationContext } from '../../context/useAuthorizationContext';

export default function Administration(): JSX.Element {
  const { documents: recruitmentDocuments } =
    useFirebaseCollectionTyped<RecruitmentAd>('recruitment');
  const { documents: userDocuments } = useFirebaseCollectionTyped<IndividualUserRecord>('users');
  const { documents: submissionDocuments } =
    useFirebaseCollectionTyped<PosterSubmission>('submissions');

  const { updateStatusForRecruitment, createBlankTemplateRecruitment, updateStatusForPoster } =
    useFirebaseFunction();

  const [userAdArray, setUserAdArray] = useState<SingleOptionType[]>([]);
  const [selectedAdUser, setSelectedAdUser] = useState<SingleOptionType>({
    label: '',
    value: '',
  });

  const { sysAdminFlag } = useAuthorizationContext();

  /** createBlankAdTemplate
   *
   * Create a template and amend user claims
   *
   */
  async function createBlankAdTemplate() {
    if (selectedAdUser.value.trim().length < 1) {
      alert('Select a user to add a recruitment template');
    }

    try {
      await createBlankTemplateRecruitment({ recruiterId: selectedAdUser.value });
    } catch (err) {
      alert(err);
    }
  }

  /** toggleRecruitmentStatus
   *
   * Modify recruitment status on the back end
   *
   * @param {RecruitmentAd} recr objec
   */
  async function toggleRecruitmentStatus(recr: RecruitmentAd) {
    try {
      await updateStatusForRecruitment({
        recruitmentId: recr.id,
        recruitmentApproval: !recr.Approved,
      });
    } catch (err) {
      alert(err);
    }
  }

  /** toggleRecruitmentStatus
   *
   * Modify recruitment status on the back end
   *
   * @param {PosterSubmission} poster objec
   */
  async function togglePosterStatus(poster: PosterSubmission) {
    try {
      await updateStatusForPoster({
        posterId: poster.id,
        posterApproval: !poster.reviewed,
      });
    } catch (err) {
      alert(err);
    }
  }

  /** showAdminContent
   *
   * Show admin content if authorized
   *
   * @returns {JSX.Element}
   */
  function showAdminContent(): JSX.Element {
    return (
      <>
        <MDBRow center>
          <MDBCol sm="8">
            <hr className="additional-margin" />
          </MDBCol>
        </MDBRow>

        <MDBRow className="d-flex justify-content-center">
          <MDBCol sm="8">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>User Dashboard</MDBCardTitle>
                <MDBTable responsive>
                  <MDBTableHead>
                    <tr>
                      <th className="recruitment-table-th" scope="col">
                        User Id
                      </th>
                      <th className="recruitment-table-th" scope="col">
                        Name
                      </th>
                      <th className="recruitment-table-th" scope="col">
                        Email
                      </th>
                      <th className="recruitment-table-th" scope="col">
                        Number
                      </th>
                      <th className="recruitment-table-th" scope="col">
                        Ad Privilege
                      </th>
                      <th className="recruitment-table-th" scope="col">
                        Access Level
                      </th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {userDocuments
                      ? userDocuments.map((userItem) => {
                          return (
                            <tr key={userItem.id} className="recruitment-table-tr">
                              <td>{userItem.id}</td>
                              <td>{userItem.userName}</td>
                              <td>{userItem.userEmail}</td>
                              <td>{userItem.userPhone}</td>
                              <td>{userItem.canPostAd ? <b>true</b> : ''}</td>
                              <td>
                                {userItem.perms === 'baseuser' ? '' : <b>{userItem.perms}</b>}
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </>
    );
  }

  useEffect(() => {
    if (userDocuments && recruitmentDocuments && submissionDocuments) {
      const usersWithAdsToFilter = recruitmentDocuments.map((obj) => obj.id) as string[];

      const potentialUsers = userDocuments
        .filter((obj) => !usersWithAdsToFilter.includes(obj.id as string))
        .map((obj) => {
          return {
            value: obj.id, // value for db
            label: `Name: ${obj.userName} Email: ${obj.userEmail}`,
          } as SingleOptionType;
        });

      setUserAdArray(potentialUsers);
    }
  }, [recruitmentDocuments, userDocuments, submissionDocuments]);

  return (
    <>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="6">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Administrative Summary</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                <b>Total Users:</b> {userDocuments?.length} users currently registered
                <br />
                <br />
                <b>Total Recruitment Ads:</b> {recruitmentDocuments?.length} recruitment entries
                (either complete or in-progress)
                <br />
                <br />
                <b>Total Poster Submissions:</b> {submissionDocuments?.length} posters submitted and
                either approved or under review
                <br />
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Recruitment Settings/Options</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                From this dashboard, authorized users can perform two primary roles related to the
                recruitment panel. One, authorized users can supply privileges to registered users
                related to managing a recruitmend ad. By default, typical users can only submit
                posters via the website. This permission can be granted using the dropdown and
                button included in the &quot;Create Recruitment Entry&quot; panel. Two, recently
                created ads are naturally not going to be ready for display on the site and will
                require review. The &quot;Recruitment Advertisement Dashboard&quot; allows
                authorized users to view the current status of an ad, and if deemed ready, can click
                to approve the add for display. However, at any time, authorized users can choose to
                disapprove the add (e.g., the interval has lapsed).
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol sm="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Create Recruitment Entry</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                By default, new users do not have access to a recruitment ad. To enable this
                functionality, select the account from the drop-down below and then present the
                &quot;create entry&quot; button to create a blank ad for them.
              </MDBCardText>
              <label>
                <span>Template Creator:</span>
                <Select
                  options={userAdArray}
                  onChange={(option) => {
                    if (option) {
                      setSelectedAdUser(option);
                    }
                  }}
                  value={selectedAdUser}
                />
              </label>

              <MDBBtn
                noRipple
                tag="a"
                href="#!"
                style={{ width: '100%' }}
                className="button-fit-card"
                onClick={() => createBlankAdTemplate()}
              >
                Create Template for Editing
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      {sysAdminFlag && showAdminContent()}

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Recruitment Advertisement Dashboard</MDBCardTitle>
              <MDBTable responsive>
                <MDBTableHead>
                  <tr>
                    <th className="recruitment-table-th" scope="col">
                      Mentor
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Institution
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Contact Information
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Summary of Mentory and Lab
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Application Deadline
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Approved
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {recruitmentDocuments
                    ? recruitmentDocuments
                        .sort((a, b) => {
                          return moment(new Date(a.Cycle), 'DD/MM/YYYY HH:mm:ss').isAfter(
                            moment(new Date(b.Cycle), 'DD/MM/YYYY HH:mm:ss'),
                          )
                            ? 1
                            : -1;
                        })
                        .map((recr) => {
                          return (
                            <tr key={recr.Contact} className="recruitment-table-tr">
                              <td title={recr.id}>{recr.Mentor}</td>
                              <td>{recr.Institution}</td>
                              <td>
                                {' '}
                                <a className="fw-normal mb-1" href={`mailto:${recr.Contact}`}>
                                  {recr.Contact}
                                </a>
                              </td>
                              <td>
                                <a href={`/recruitment/${recr.id}`}>Lab & Mentor Details</a>
                              </td>
                              <td>{recr.Cycle}</td>
                              <td>
                                <MDBBtn
                                  noRipple
                                  tag="a"
                                  href="#!"
                                  style={{
                                    width: '100%',
                                  }}
                                  className={`button-fit-card ${
                                    recr.Approved
                                      ? 'button-color-override-red'
                                      : 'button-color-override-green'
                                  }`}
                                  onClick={() => toggleRecruitmentStatus(recr)}
                                >
                                  {recr.Approved ? 'Click to Disapprove' : 'Click to Approve'}
                                </MDBBtn>
                              </td>
                            </tr>
                          );
                        })
                    : null}
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Poster Submissions and Review</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                Throughout the application cycle, poster submissions will be received through the
                website. Authorized users can view these submissions via the table provided below.
                This serves three core functions; first, the table facilitates review and decisions
                related to posters. That is, administrative decisions regarding posters can be
                logged and recorded via the click of a respective button (see row). Two, once
                decisions are rendered for all posters after the deadline, the site will facilitate
                the sending of emails regarding decisions. Three, the final results of the table can
                be downloaded to support their incorporation into conference materials.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol sm="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Poster Submission Functionality</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>Please see the options below:</MDBCardText>
              <MDBBtn
                noRipple
                tag="a"
                href="#!"
                style={{ width: '100%' }}
                className="button-fit-card"
                disabled
                onClick={() => true}
              >
                Send Confirmation Emails
              </MDBBtn>
              <br />
              <br />
              <MDBBtn
                noRipple
                tag="a"
                href="#!"
                style={{ width: '100%' }}
                className="button-fit-card"
                disabled
                onClick={() => true}
              >
                Download Results to File
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Poster Management Dashboard</MDBCardTitle>
              <MDBTable responsive>
                <MDBTableHead>
                  <tr>
                    <th className="recruitment-table-th" scope="col">
                      Name
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Email
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Title
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Abstract
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Student Presenter
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Link to Entry
                    </th>
                    <th className="recruitment-table-th" scope="col">
                      Decision
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {submissionDocuments
                    ? submissionDocuments.map((poster) => {
                        return (
                          <tr key={poster.name} className="recruitment-table-tr">
                            <td>{poster.name}</td>
                            <td>
                              <a href={`mailto:${poster.email}`}>{poster.email}</a>
                            </td>
                            <td>{poster.title}</td>
                            <td>{poster.abstract}</td>
                            <td>{poster.presenter ? 'Interested' : 'Not Interested'}</td>
                            <td>
                              <a href={`/poster/${poster.id}`}>Submission</a>
                            </td>
                            <td>
                              <MDBBtn
                                noRipple
                                tag="a"
                                href="#!"
                                style={{
                                  width: '100%',
                                }}
                                className={`button-fit-card ${
                                  poster.reviewed
                                    ? 'button-color-override-red'
                                    : 'button-color-override-green'
                                }`}
                                onClick={() => togglePosterStatus(poster)}
                              >
                                {poster.reviewed ? 'Click to Disapprove' : 'Click to Accept'}
                              </MDBBtn>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
