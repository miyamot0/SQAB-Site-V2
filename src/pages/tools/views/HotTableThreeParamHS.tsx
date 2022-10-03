/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { HotColumn, HotTable } from "@handsontable/react";
import { HOTTableStyleDemand } from "../styles/DemandTableStyles";

export function HotTableThreeParamHS({ hotData }: { hotData: string[][] | undefined }) {
    return <HotTable
        data={hotData}
        colHeaders={true}
        rowHeaders={true}
        height="auto"
        stretchH="all"
        style={HOTTableStyleDemand}
        columnSorting={false}
        columns={[
            { data: 0, type: 'string' },
            { data: 1, type: 'string' },
            { data: 2, type: 'string' },
            { data: 3, type: 'string' },
        ]}
        contextMenu={true}
        licenseKey="non-commercial-and-evaluation"
    >
        <HotColumn title="Q0" />
        <HotColumn title="Alpha" />
        <HotColumn title="K" />
        <HotColumn title="Analytic PMAX" />
    </HotTable>
}