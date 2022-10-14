/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Symp1 from './../assets/img/symp-1-min.webp';
import Symp2 from './../assets/img/symp-2-min.webp';
import Symp3 from './../assets/img/symp-3-min.webp';
import Symp4 from './../assets/img/symp-4-min.webp';
import Symp5 from './../assets/img/symp-5-min.webp';

import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

export default function CarouselConference(): JSX.Element {
  return (
    <>
      <MDBCarousel showIndicators fade>
        <MDBCarouselItem className='w-100 d-block' itemId={1} src={Symp1} alt='...' />
        <MDBCarouselItem className='w-100 d-block' itemId={2} src={Symp2} alt='...' />
        <MDBCarouselItem className='w-100 d-block' itemId={3} src={Symp3} alt='...' />
        <MDBCarouselItem className='w-100 d-block' itemId={4} src={Symp4} alt='...' />
        <MDBCarouselItem className='w-100 d-block' itemId={5} src={Symp5} alt='...' />
      </MDBCarousel>
    </>
  );
}
