/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Tut1 from './../assets/img/tut-1-min.jpeg';
import Tut2 from './../assets/img/tut-2-min.jpeg';
import Tut3 from './../assets/img/tut-3-min.jpeg';
import Tut4 from './../assets/img/tut-4-min.jpeg';
import Tut5 from './../assets/img/tut-5-min.jpeg';
import Tut6 from './../assets/img/tut-6-min.jpeg';
/*
Expensive, time and network wise

import Tut7 from './../assets/img/tut-7-min.jpeg';
import Tut8 from './../assets/img/tut-8-min.jpeg';
import Tut9 from './../assets/img/tut-9-min.jpeg';
import Tut10 from './../assets/img/tut-10-min.jpeg';
import Tut11 from './../assets/img/tut-11-min.jpeg';
import Tut12 from './../assets/img/tut-12-min.jpeg';
import Tut13 from './../assets/img/tut-13-min.jpeg';


<MDBCarouselItem className="w-100 d-block" itemId={7} src={Tut7} alt="..." />
<MDBCarouselItem className="w-100 d-block" itemId={8} src={Tut8} alt="..." />
<MDBCarouselItem className="w-100 d-block" itemId={9} src={Tut9} alt="..." />
<MDBCarouselItem className="w-100 d-block" itemId={10} src={Tut10} alt="..." />
<MDBCarouselItem className="w-100 d-block" itemId={11} src={Tut11} alt="..." />
<MDBCarouselItem className="w-100 d-block" itemId={12} src={Tut12} alt="..." />
<MDBCarouselItem className="w-100 d-block" itemId={13} src={Tut13} alt="..." />
*/

import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

export default function CarouselConference(): JSX.Element {
  return (
    <>
      <MDBCarousel showIndicators fade>
        <MDBCarouselItem className="w-100 d-block" itemId={1} src={Tut1} alt="..." />
        <MDBCarouselItem className="w-100 d-block" itemId={2} src={Tut2} alt="..." />
        <MDBCarouselItem className="w-100 d-block" itemId={3} src={Tut3} alt="..." />
        <MDBCarouselItem className="w-100 d-block" itemId={4} src={Tut4} alt="..." />
        <MDBCarouselItem className="w-100 d-block" itemId={5} src={Tut5} alt="..." />
        <MDBCarouselItem className="w-100 d-block" itemId={6} src={Tut6} alt="..." />
      </MDBCarousel>
    </>
  );
}
