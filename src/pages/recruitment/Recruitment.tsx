import React from 'react';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from 'mdb-react-ui-kit';

import './Recruitment.css';
import moment from 'moment';
import { RecruitmentAd } from './types/RecruitmentTypes';
import { useFirebaseCollection } from '../../firebase/useFirebaseCollection';

export default function Recruitment(): JSX.Element {
  const { documents } = useFirebaseCollection('recruitment');

  return (
    <>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Current and Upcoming Graduate Student Opportunities</MDBCardTitle>

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
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {(documents as RecruitmentAd[])
                    ? (documents as RecruitmentAd[])
                        .filter((ad) => ad.Approved)
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
                              <td>{recr.Mentor}</td>
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
