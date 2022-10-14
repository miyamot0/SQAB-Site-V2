/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Tut1 from './../assets/img/tut-1-min.webp';
import Tut2 from './../assets/img/tut-2-min.webp';
import Tut3 from './../assets/img/tut-3-min.webp';
import Tut4 from './../assets/img/tut-4-min.webp';
import Tut5 from './../assets/img/tut-5-min.webp';

import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

export default function CarouselConference(): JSX.Element {
  return (
    <>
      <MDBCarousel showIndicators fade>
        <MDBCarouselItem className='w-100 d-block' itemId={1} src={Tut1} alt='...' />
        <MDBCarouselItem className='w-100 d-block' itemId={2} src={Tut2} alt='...' />
        <MDBCarouselItem className='w-100 d-block' itemId={3} src={Tut3} alt='...' />
        <MDBCarouselItem className='w-100 d-block' itemId={4} src={Tut4} alt='...' />
        <MDBCarouselItem className='w-100 d-block' itemId={5} src={Tut5} alt='...' />
      </MDBCarousel>
    </>
  );
}
