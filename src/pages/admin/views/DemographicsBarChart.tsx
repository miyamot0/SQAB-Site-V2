/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MDBCard } from "mdb-react-ui-kit";
import React from "react";

export type BarChartEntry = {
    name: string,
    y: number,
}

export interface DemographicsBarChartInterface {
    name: string,
    data: BarChartEntry[]
}

export function DemographicsBarChart({ demographicData }: { demographicData: DemographicsBarChartInterface }) {
    return <MDBCard>
        <HighchartsReact
            allowChartUpdate={false}
            highcharts={Highcharts}
            options={{
                title: {
                    text: demographicData.name
                },
                chart: {
                    type: "column"
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Total Counts'
                    }
                },
                legend: {
                    enabled: false
                },
                series: [demographicData],
            }}
        />
    </MDBCard>;
}