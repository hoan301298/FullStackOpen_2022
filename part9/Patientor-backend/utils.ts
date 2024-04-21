/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { newPatientEntry, Gender, DiagnoseEntry, HealthCheckRating, NewEntry, NonIdBaseEntry } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown, type: string): string => {
    if(!str || !isString(str)) {
        throw new Error(`missing string for ${type}`);
    }
    return str; 
};

const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const parseSSN = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn:' + ssn);
    }
    return ssn;
};

const isDiagnosisCodes = (diagnosisCodes: Array<unknown>): diagnosisCodes is Array<DiagnoseEntry['code']> => {
    return diagnosisCodes.every((code: unknown) => isString(code));
};

const parseDiagnosisCodes = (diagnosisCodes: Array<unknown>): Array<DiagnoseEntry['code']> => {
    if(!isDiagnosisCodes(diagnosisCodes) || !diagnosisCodes)
        throw new Error('Missing diagnosis codes');
    return diagnosisCodes;
};

const isHealthCheckRating = (healthRate: any): healthRate is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(healthRate);
}; 

const parseHealthCheckRating = (healthRate: unknown): HealthCheckRating => {
    if(!healthRate || !isHealthCheckRating(healthRate)) {
        throw new Error('Health check is missing');
    }
    return healthRate;
};

const toNewPatientEntry = (object: any): newPatientEntry => {
    const newEntry: newPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        ssn: parseSSN(object.ssn),
        entries: []
    };

    return newEntry;
};

const toPatientWithEntry = (object: any): NewEntry => {
    const newBaseEntry: NonIdBaseEntry = {
        description: parseString(object.description, 'description'),
        date: parseDateOfBirth(object.date),
        specialist: parseString(object.specialist, 'specialist')
    };
    if(object.diagnosisCodes) newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    if(!object.type || !isString(object.type)) {
        throw new Error('Missing type value');
    }
    switch(object.type) {
        case "OccupationalHealthcare":
            const entry: NewEntry  = {
                ...newBaseEntry,
                type: "OccupationalHealthcare",
                employerName: parseString(object.employerName, 'employer name')
            };
            if(object.sickLeave) {
                if(object.sickLeave.startDate && object.sickLeave.endDate) {
                    const sickLeave = {
                        startDate: parseDateOfBirth(object.sickLeave.startDate),
                        endDate: parseDateOfBirth(object.sickLeave.startDate)
                    };
                    entry.sickLeave = sickLeave;
                }
                else throw new Error('One of the date is missing');
            }
            return entry;
        case "HealthCheck":
            return {
                ...newBaseEntry,
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
        case "Hospital":
            return {
                ...newBaseEntry,
                type: "Hospital",
                discharge : {
                    date: parseDateOfBirth(object.discharge.date),
                    criteria: parseString(object.discharge.criteria, 'discharge criteria')
                }
            };
        default:
            throw new Error('Wrong type');
    }
};

export default {toNewPatientEntry, toPatientWithEntry};

