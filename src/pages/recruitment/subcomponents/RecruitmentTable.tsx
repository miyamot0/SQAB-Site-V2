/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import moment from 'moment';

import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { RecruitmentAd } from '../../../firebase/types/RecordTypes';

import './../styles/Recruitment.css';

export interface RecruitmentTable {
  documents: RecruitmentAd[] | null
}

export default function RecruitmentTable({ documents }: RecruitmentTable): JSX.Element {
  return (
    <>
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
          {documents
            ? documents
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
    </>
  );
}
