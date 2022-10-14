/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import tutorialJson from './../../../assets/json/tutorials.json';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import IframeResizer from 'iframe-resizer-react';

export interface TutorialVideo {
  id: string;
  showDirectory: boolean;
}

export interface VideoInformation {
  Index: number;
  Title: string;
  Summary: string;
  Video: string;
}

function isNumeric(str: string) {
  return !isNaN(parseFloat(str));
}

export function TutorialVideo({ id, showDirectory }: TutorialVideo) {
  if (showDirectory === true || isNumeric(id) === false || parseInt(id) < -1 || parseInt(id) > 77) {
    return <div className='blank-div-video'></div>;
  } else {
    const videoInfo: VideoInformation = tutorialJson.Tutorials[parseInt(id)];
    const prevVideoId: number | null = parseInt(id) > 0 ? parseInt(id) + 1 : null;
    const nextVideoId: number | null =
      parseInt(id) >= 0 && parseInt(id) < 77 ? parseInt(id) + 1 : null;

    return (
      <MDBRow center className='row-eq-height'>
        <MDBCol sm='8'>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>{videoInfo.Title}</MDBCardTitle>

              {videoInfo.Summary}

              <IframeResizer
                src={videoInfo.Video}
                title={videoInfo.Title}
                style={{
                  minWidth: '100%',
                  minHeight: '800px',
                  marginTop: '20px',
                }}
                allowFullScreen
              />

              {prevVideoId && (
                <MDBBtn noRipple className='float-left' tag='a' href={`/tutorials/${prevVideoId}`}>
                  Previous Video
                </MDBBtn>
              )}

              {nextVideoId && (
                <MDBBtn noRipple className='float-right' tag='a' href={`/tutorials/${nextVideoId}`}>
                  Next Video
                </MDBBtn>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}
