export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry["code"]>;
}

export type NonIdBaseEntry = Omit<BaseEntry, 'id'>;
  
  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
  }
  
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }
  
  interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
      date: string;
      criteria: string;
    };
  }
  
  interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
      startDate: string;
      endDate: string;
    };
  }
  
export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;

export type NewEntry = | NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthcareEntry;


export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >;

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: Gender,
    occupation: string,
    ssn: string,
    entries: Entry[];
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type newPatientEntry = Omit<PatientEntry, 'id'>;