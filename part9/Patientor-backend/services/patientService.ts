/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */

import patientsEntries from "../data/patientsEntries";
import patientData from '../data/patientsEntries';
import { newPatientEntry, PatientEntry, PublicPatient, Entry, NewEntry } from "../types";
import {v1 as uuid} from 'uuid';

const patients: Array<PatientEntry> = patientData;

const id = uuid();


const getPublicEntries = (): Array<PublicPatient> => {
    return patientsEntries.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
}; 

const addPatient = (entry: newPatientEntry): PatientEntry => {
    const newPatientEntry  = {
        id: id,
        ...entry,
        entries: []
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
    const entry = patients.find(d => d.id === id);
    return entry;
};

const getPatientEntries = (id: string): Entry[] | undefined => {
    return patients.find(p => p.id === id)?.entries;
};

const addPatientWithEntries = (newEntry: NewEntry, id: string): Entry => {
    const entryWithId: Entry = {...newEntry, id: uuid()};
    patients.find(p => p.id === id)?.entries.push(entryWithId);
    return entryWithId;
};

export default {
    getPublicEntries,
    addPatient,
    findById,
    getPatientEntries,
    addPatientWithEntries
};