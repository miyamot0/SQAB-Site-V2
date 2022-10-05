/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DiscountingFit } from "../../types/DiscountingTypes";
import {
    getbleichrodtProjection, getEbertPrelecProjection, getElementByModel, getExponentialProjection,
    getHyperbolicProjection, getMyersonProjection, getQuasiHyperbolicProjection,
    getRachlinProjection, getRodriguezLogueProjection
} from "../DiscountingHelpers";

describe('DiscountingHelpers', () => {
    it('projections', () => {
        const x = 100;
        const p = [0.00001, 0.00001, 0.00001, 0.00001]

        getExponentialProjection(x, p);
        getHyperbolicProjection(x, p);
        getQuasiHyperbolicProjection(x, p);
        getMyersonProjection(x, p);
        getRachlinProjection(x, p);
        getRodriguezLogueProjection(x, p);
        getEbertPrelecProjection(x, p);
        getbleichrodtProjection(x, p);
    })

    it('Model picker, good pick', () => {
        const fits = [
            { Model: "Exponential" } as DiscountingFit,
            { Model: "Hyperbolic" } as DiscountingFit
        ]

        const value = getElementByModel(fits, fits[0].Model)

        expect(value?.Model).toBe("Exponential")
    })

    it('Model picker, bad pick', () => {
        const fits = [
            { Model: "Exponential" } as DiscountingFit,
            { Model: "Hyperbolic" } as DiscountingFit
        ]

        const value = getElementByModel(fits, "Rachlin")

        expect(value).toBe(undefined)
    })
})