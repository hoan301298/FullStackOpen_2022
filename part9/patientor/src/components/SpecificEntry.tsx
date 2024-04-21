import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";

const HealthCheck: React.FC<{entry: HealthCheckEntry}> = ({ entry }) => {
    return (
        <Segment>
            <h2>
                {entry.date} <Icon name='user md' />
            </h2>
            <p>{entry.description}</p>
        </Segment>
    );
};

const Hospital: React.FC<{entry: HospitalEntry}> = ({ entry }) => {
    return (
        <Segment>
            <h2>
                {entry.date} <Icon name='hospital' />
            </h2>
            <p>{entry.description}</p>
        </Segment>
    );
};

const OccupationalHealthcare: React.FC<{entry: OccupationalHealthcareEntry}> = ({ entry }) => {
    return (
    <>
        <Segment>
            <h2>
                {entry.date} <Icon name='stethoscope' /> 
            </h2>
            <p>Employee: {entry.employerName}</p>
            <p>{entry.description}</p>
        </Segment>
    </>
    );
};

const SpecificEntry: React.FC<{entry: Entry}> = ({ entry }) => {
    switch(entry.type) {
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        case "Hospital":
            return <Hospital entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} />;
    }
};

export default SpecificEntry;