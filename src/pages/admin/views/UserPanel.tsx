/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { IndividualUserRecordSaved } from '../../../firebase/types/RecordTypes';
import { ColumnType } from '../types/TableTypes';
import { MDBDataTable } from 'mdbreact';

export interface UserPanel {
    userDocuments: IndividualUserRecordSaved[];
}

export function UserPanel({ userDocuments }: UserPanel) {

    const columns: ColumnType[] = [
        { label: 'ID', field: 'id', sort: 'asc' },
        { label: 'Name', field: 'name', sort: 'asc' },
        { label: 'Email', field: 'email', sort: 'asc' },
        { label: 'Ad', field: 'ad', sort: 'asc' },
        { label: 'Permissions', field: 'perms', sort: 'asc' },
    ];

    const rows = userDocuments
        .sort((a, b) => {
            if (!a.userName || a.userName.trim().length === 0) {
                return 1;
            }

            return a.userName.localeCompare(b.userName);
        })
        .map((userItem) => {
            const ret = {
                id: userItem.id ?? '',
                name: userItem.userName,
                email: userItem.userEmail,
                ad: userItem.canPostAd ? 'Yes' : '',
                perms: userItem.perms === 'baseuser' ? '' : userItem.perms,
            };

            return ret;
        });

    return <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="8">
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>User Dashboard</MDBCardTitle>
                    <MDBDataTable
                        exportToCSV
                        noBottomColumns
                        striped
                        data={{
                            columns,
                            rows,
                        }}
                    />
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    </MDBRow>
}