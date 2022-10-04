/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { EmailStatus } from '../../../firebase/types/RecordTypes';
import { ColumnType } from '../types/TableTypes';
import { MDBDataTable } from 'mdbreact';
import { useFirebaseCollectionTyped } from '../../../firebase/hooks/useFirebaseCollection';

export function EmailPanel() {
    const { documents } = useFirebaseCollectionTyped<EmailStatus>({
        collectionString: 'mail',
        queryString: undefined,
        orderString: undefined,
    });
    const [rows, setRows] = useState<any[]>([])
    const columns: ColumnType[] = [
        { label: 'Email', field: 'to', sort: 'asc' },
        { label: 'Template', field: 'template', sort: 'asc' },
        { label: 'End', field: 'end', sort: 'asc' },
        { label: 'State', field: 'state', sort: 'asc' },
    ];

    useEffect(() => {
        if (documents) {
            const preRows = documents
                .sort((a, b) => b.delivery.endTime.toDate().valueOf() - a.delivery.endTime.toDate().valueOf())
                .map((mail) => {
                    let template = null;

                    if (mail.template && mail.template.name) {
                        template = mail.template.name;
                    }

                    return {
                        to: mail.to[0],
                        attempts: mail.delivery.attempts,
                        state: mail.delivery.state,
                        end: mail.delivery.endTime.toDate().toLocaleDateString('en-US'),
                        template,
                    };
                });
            setRows(preRows)
        }
    }, [documents])

    return <MDBRow className="d-flex justify-content-center">
        <MDBCol sm="8">
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>Email Status Dashboard</MDBCardTitle>
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