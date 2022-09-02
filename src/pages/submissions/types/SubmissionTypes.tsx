import firebase from 'firebase/app';

export type PosterSubmission = {
    name: string,
    title: string,
    email: string,
    abstract: string,
    list: string,
    time: firebase.firestore.Timestamp,
    presenter: boolean,
};