/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

export default function CarouselConference(): JSX.Element {
  return (
    <>
      <MDBCarousel showIndicators fade>
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={1}
          src="https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/images%2Fsymp-1-min.jpeg?alt=media&token=d3f4bf9e-e332-4ed0-aa7b-fb62a01dc0b1"
          alt="Image of a poster presenters during conference"
        />
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={2}
          src={
            'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/images%2Fsymp-2-min.jpeg?alt=media&token=c9378113-c4c3-4b86-b641-27fa56d22c45'
          }
          alt="Image of a poster presenters during conference"
        />
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={3}
          src={
            'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/images%2Fsymp-3-min.jpeg?alt=media&token=1c652d06-2c63-45ea-8087-753e2ca46c66'
          }
          alt="Image of a poster presenters during conference"
        />
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={4}
          src={
            'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/images%2Fsymp-4-min.jpeg?alt=media&token=aa68fd73-34b6-4e28-a59d-20e14403f701'
          }
          alt="Image of a poster presenters during conference"
        />
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={5}
          src={
            'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/images%2Fsymp-5-min.jpeg?alt=media&token=92edcea7-419a-4a60-ab5f-c32b7364ff21'
          }
          alt="Image of a poster presenters during conference"
        />
      </MDBCarousel>
    </>
  );
}
