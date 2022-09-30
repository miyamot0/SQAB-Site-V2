/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import { MDBDataTable } from "mdbreact";
import React from "react";
import { ColumnType } from "../types/TableTypes";

export type TableEntry = {
    columns: ColumnType[],
    rows: any[],
}

export interface DemographicsDataTableInterface {
    name: string,
    data: TableEntry
}

export function DemographicsDataTable({ demographicData }: { demographicData: DemographicsDataTableInterface }) {
    return <MDBCard>
        <MDBCardBody>
            <MDBCardTitle>{demographicData.name}</MDBCardTitle>
            <MDBDataTable
                exportToCSV
                noBottomColumns
                striped
                data={{
                    columns: demographicData.data.columns,
                    rows: demographicData.data.rows,
                }}
            />
        </MDBCardBody>
    </MDBCard>;
}