/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { clearConsumptionData, loadExampleData } from "../DemandBehavior"

describe('DemandBehavior', () => {
    it('Confirm that values are passed', () => {
        const setHotData = jest.fn();

        loadExampleData({ setHotData, isZBE: false, hasTwoParameters: false })
        loadExampleData({ setHotData, isZBE: true, hasTwoParameters: false })
        loadExampleData({ setHotData, isZBE: true, hasTwoParameters: true })

        clearConsumptionData({ setHotData, hasTwoParameters: true })
        clearConsumptionData({ setHotData, hasTwoParameters: false })
    })
})