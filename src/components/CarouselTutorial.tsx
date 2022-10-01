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
          src={
            'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/images%2Ftut-1-min.jpeg?alt=media&token=60ec4cd8-54d5-46d3-89c4-5f152be344a3'
          }
          alt="Image of a speaker during tutorial"
        />
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={2}
          src={
            'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/images%2Ftut-2-min.jpeg?alt=media&token=b7e7c4da-f2f8-4245-9be1-fdb9580fa1fd'
          }
          alt="Image of a speaker during tutorial"
        />
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={3}
          src={
            'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/images%2Ftut-3-min.jpeg?alt=media&token=3224d092-26d1-4427-9408-26258b66ac58'
          }
          alt="Image of a speaker during tutorial"
        />
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={4}
          src={
            'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/images%2Ftut-4-min.jpeg?alt=media&token=4698006c-0c24-4374-9ca0-4a67fbbcf623'
          }
          alt="Image of a speaker during tutorial"
        />
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={5}
          src={
            'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/images%2Ftut-5-min.jpeg?alt=media&token=544aa310-d73b-4342-bb16-81f8a0911894'
          }
          alt="Image of a speaker during tutorial"
        />
      </MDBCarousel>
    </>
  );
}
