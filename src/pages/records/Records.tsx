/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { CardBodyTextStyle } from '../../utilities/StyleHelper';

import './styles/Records.css';

const Programs = [
  {
    Year: 2004,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2004.pdf?alt=media&token=5a5059b1-555c-40ef-9e7d-7f479a97bdf6',
  },
  {
    Year: 2005,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2005.pdf?alt=media&token=bfeeb5cf-5e9f-4722-a2df-cdc956e8257c',
  },
  {
    Year: 2006,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2006.pdf?alt=media&token=c9d8d607-5661-48e4-a342-4695d4753cb1',
  },
  {
    Year: 2007,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2007.pdf?alt=media&token=7a059df5-2673-4584-b8d0-aad9f3ffd287',
  },
  {
    Year: 2009,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2009.pdf?alt=media&token=34c89a80-7550-4269-bd38-7958c5538f49',
  },
  {
    Year: 2010,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2010.pdf?alt=media&token=19246e13-32f4-4294-97ba-8bef991b348c',
  },
  {
    Year: 2011,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2011.pdf?alt=media&token=0f2e5101-750d-4ae5-a988-42182e562011',
  },
  {
    Year: 2012,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2012.pdf?alt=media&token=64f46d30-63eb-4b52-9921-f11887bfd82d',
  },
  {
    Year: 2013,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2013.pdf?alt=media&token=142dd38f-c2af-44c8-94e9-c7d0ed5ac70a',
  },
  {
    Year: 2014,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2014.pdf?alt=media&token=647c9df6-70fa-4bfd-89fe-3c785d7d8898',
  },
  {
    Year: 2015,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2015.pdf?alt=media&token=a99eae43-6067-4fc1-8715-3b242efb89d8',
  },
  {
    Year: 2016,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2016.pdf?alt=media&token=613a541a-12a8-4ec9-be11-99134cbf0050',
  },
  {
    Year: 2017,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2017.pdf?alt=media&token=47e4f19f-0395-4dd3-9c06-f0440dbcf2ed',
  },
  {
    Year: 2018,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2018.pdf?alt=media&token=9e8424a5-00ea-4d8b-ab4b-13baa3008c11',
  },
  {
    Year: 2019,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2019.pdf?alt=media&token=e365f3d7-034e-4fd6-addb-df6db7f8c5d6',
  },
  {
    Year: 2020,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2020-contact.pdf?alt=media&token=46511323-8861-4c83-a474-fd8360aaa433',
  },
  {
    Year: 2021,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2021.pdf?alt=media&token=189ef144-b8fa-4a39-a898-9a05ccaef76b',
  },
  {
    Year: 2022,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/programs%2F2022.pdf?alt=media&token=d22dfbda-6270-4054-9321-4e77d814b5a2',
  },
];

const Newsletters = [
  {
    Year: 2005,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2005.pdf?alt=media&token=42b90474-7514-4ed1-b152-f9068048b422',
  },
  {
    Year: 2006,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2006.pdf?alt=media&token=410cd77d-7971-4216-b341-abbb165e24a7',
  },
  {
    Year: 2008,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2008.pdf?alt=media&token=4f25a56a-22e4-4696-89de-1dbc89dba22f',
  },
  {
    Year: 2009,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2009.pdf?alt=media&token=2090e98a-14f9-4c67-96f1-0114ac68380c',
  },
  {
    Year: 2011,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2011.pdf?alt=media&token=1d478dbe-ad5f-4b32-b191-efbbd549b63a',
  },
  {
    Year: 2012,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2012.pdf?alt=media&token=1b6446fb-feb7-4fd2-9675-021451881448',
  },
  {
    Year: 2013,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2013.pdf?alt=media&token=0659dfdb-d6dc-43a9-9185-58d90b9e15b8',
  },
  {
    Year: 2014,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2014.pdf?alt=media&token=c3b347de-1a9b-4297-b255-54c1bd747631',
  },
  {
    Year: 2015,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2015.pdf?alt=media&token=367d0399-ecb8-4cab-bb74-797d9bd32156',
  },
  {
    Year: 2016,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2016.pdf?alt=media&token=3ac6c837-1c91-4c66-8517-80ed804471f6',
  },
  {
    Year: 2017,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2017.pdf?alt=media&token=6a87b3ce-2330-421a-893c-22621c227c7c',
  },
  {
    Year: 2018,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2018.docx?alt=media&token=3bbe9924-c377-47f0-94e9-3dce462b9539',
  },
  {
    Year: 2018,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2018.pdf?alt=media&token=13f0ee55-a764-472c-bb85-fc3b33bcb577',
  },
  {
    Year: 2019,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2019.pdf?alt=media&token=daae9528-7366-431c-9709-5281b166a0fb',
  },
  {
    Year: 2020,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2020.pdf?alt=media&token=90db399f-04e6-4db2-b717-a717d6cd77c7',
  },
  {
    Year: 2022,
    Path: 'https://firebasestorage.googleapis.com/v0/b/sqab-website-v2.appspot.com/o/newletters%2F2022.pdf?alt=media&token=2e1ab1a6-5604-4264-9637-c4ecafe3ad58',
  },
];

export default function Records(): JSX.Element {
  return (
    <>
      <MDBRow center className="row-eq-height">
        <MDBCol sm="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Yearly Programs and Newsletters</MDBCardTitle>
              <MDBCardText style={CardBodyTextStyle}>
                Newsletters and Conference programs are retained for future reference in this
                location. They are also hosted online in the respective Github repository.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow center>
        <MDBCol sm="8">
          <hr className="additional-margin" />
        </MDBCol>
      </MDBRow>

      <MDBRow center className="row-eq-height">
        <MDBCol sm="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Previous Programs</MDBCardTitle>
              <ul className="records-ul">
                {Programs.map((prog) => {
                  return (
                    <li key={`program-${prog.Year}`}>
                      <a href={`${prog.Path}`}>
                        <span>{`${prog.Year} SQAB Program`}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Previous Newsletters</MDBCardTitle>
              <ul className="records-ul">
                {Newsletters.map((news) => {
                  return (
                    <li key={`news-${news.Year}`}>
                      <a href={`${news.Path}`}>
                        <span>{`${news.Year} SQAB Newsletter`}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}
