import { FirestoreState } from "../../../firebase/interfaces/FirebaseInterfaces";
import { IndividualUserRecord, IndividualUserRecordSaved } from "../../../firebase/types/RecordTypes";
import { SingleOptionType } from "../../tools/types/GeneralTypes";

/** handleEditFormSubmit
 *
 * Submission event for student edit form
 *
 */
export async function updateProfileCallback(state: IndividualUserRecord,
    id: string,
    updateDocument: any,
    response: FirestoreState,
    history: any): Promise<void> {

    const uploadObject = {
        userName: state.userName,
        userEmail: state.userEmail,
        userInstitution: state.userInstitution,

        userAge: state.userAge?.value,
        userEducation: state.userEducation?.value,
        userGender: state.userGender?.value,
        userOrientation: state.userOrientation?.value,
        userNationality: state.userNationality?.label,
        userRaceEthnicity: state.userRaceEthnicity?.map((resp: SingleOptionType) => {
            return resp.value
        }).join(":"),
    } as IndividualUserRecordSaved;

    await updateDocument(id, uploadObject);

    if (response.error) {
        alert(response.error);
    } else {
        history.push(`/user/${id}`);
    }

    return;
}