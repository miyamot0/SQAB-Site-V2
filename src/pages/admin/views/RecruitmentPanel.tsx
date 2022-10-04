/** @license
 *
 * Copyright (c) Shawn P. Gilroy, Louisiana State University.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBBtn } from "mdb-react-ui-kit";
import { MDBDataTable } from "mdbreact";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useFirebaseCollectionTyped } from "../../../firebase/hooks/useFirebaseCollection";
import { getFilteredRecruitmentInformation } from "../../../firebase/hooks/useFirebaseFunction";
import { RecruitmentFunctionResponse } from "../../../firebase/types/FunctionTypes";
import { RecruitmentAd } from "../../../firebase/types/RecordTypes";
import { SingleOptionType } from "../../tools/types/GeneralTypes";
import { toggleRecruitmentStatus } from "../helpers/AdministrationHelpers";
import { ColumnType } from "../types/TableTypes";
import { RecruitmentFunctionality } from "./RecruitmentFunctionality";

export function RecruitmentPanel() {
    const { documents } = useFirebaseCollectionTyped<RecruitmentAd>({
        collectionString: 'recruitment',
        queryString: undefined,
        orderString: undefined,
    });

    const [rows, setRows] = useState<any[]>([])

    const [userAdArray, setUserAdArray] = useState<SingleOptionType[]>([]);
    const [selectedAdUser, setSelectedAdUser] = useState<SingleOptionType>({
        label: '',
        value: '',
    });

    const columns: ColumnType[] = [
        { label: 'Mentor', field: 'mentor', sort: 'asc' },
        { label: 'Institution', field: 'institution', sort: 'asc' },
        { label: 'Contact Information', field: 'contact', sort: 'asc' },
        { label: 'Summary of Mentory and Lab', field: 'ad', sort: 'asc' },
        { label: 'Application Deadline', field: 'deadline', sort: 'asc' },
        { label: 'Approved', field: 'approval', sort: 'asc' },
    ];

    useEffect(() => {
        getFilteredRecruitmentInformation().then((value) => {
            if (value && value.data) {
                const cast = value.data as RecruitmentFunctionResponse;

                if (cast && cast.arrayUsersNeedAds) {
                    setUserAdArray(cast.arrayUsersNeedAds);
                } else {
                    return;
                }
            } else {
                return;
            }
        });
    }, [])

    useEffect(() => {
        if (documents) {
            const preRow = documents
                .filter((recr) => {
                    return (
                        recr.Bio.trim().length > 0 &&
                        recr.Contact.trim().length > 0 &&
                        recr.Cycle.trim().length > 0 &&
                        recr.Mentor.trim().length > 0 &&
                        recr.Position.trim().length > 0 &&
                        recr.Name.trim().length > 0
                    );
                })
                .sort((a, b) => {
                    if (!a.Cycle || a.Cycle.trim().length === 0) {
                        return 1;
                    }

                    return moment(new Date(a.Cycle), 'DD/MM/YYYY').isAfter(
                        moment(new Date(b.Cycle), 'DD/MM/YYYY'),
                    )
                        ? 1
                        : -1;
                })
                .map((userItem) => {
                    const ret = {
                        mentor: userItem.Mentor,
                        institution: userItem.Institution,
                        contact: userItem.Contact,
                        ad: (
                            <a href={`/recruitment/${userItem.id}`} style={{ color: '#7f007f' }}>
                                Lab & Mentor Details
                            </a>
                        ),
                        deadline: userItem.Cycle,
                        approval: (
                            <MDBBtn
                                noRipple
                                tag="a"
                                href="#!"
                                style={{
                                    width: '100%',
                                }}
                                className={`button-fit-card ${userItem.Approved ? 'button-color-override-red' : 'button-color-override-green'
                                    }`}
                                onClick={() => toggleRecruitmentStatus(userItem)}
                            >
                                {userItem.Approved ? 'Revoke Approval' : 'Approve'}
                            </MDBBtn>
                        ),
                    };

                    return ret;
                });

            setRows(preRow);
        } else {
            return;
        }
    }, [documents])

    return <>
        {/**
       */}
        <RecruitmentFunctionality
            selectedAdUser={selectedAdUser}
            userAdArray={userAdArray}
            setSelectedAdUser={setSelectedAdUser}
        />

        <MDBRow center>
            <MDBCol sm="8">
                <hr className="additional-margin" />
            </MDBCol>
        </MDBRow>

        <MDBRow className="d-flex justify-content-center">
            <MDBCol sm="8">
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle>Recruitment Dashboard</MDBCardTitle>
                        <MDBDataTable
                            noBottomColumns
                            striped
                            data={{
                                columns,
                                rows,
                            }}
                        />
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>

    </>
}