import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SemanticICONS, Card, Icon, Segment} from "semantic-ui-react";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import SpecificEntry from "../components/SpecificEntry";
import { apiBaseUrl } from "../constants";
import { addEntry, setSpecificPatient, useStateValue } from "../state";
import { Patient, Gender, Entry } from "../types";

const SpecificPatient = () => {
    const {id} = useParams<{id : string}>();
    const [{patients}, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient>();

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const submitEntry = async (values: EntryFormValues) => {
        const {data: newEntry} = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
        ); 
        dispatch(addEntry(newEntry, id));
        closeModal();
    }

    useEffect(() => {
        const fetchedPatient = async () => {
            try {
                const { data: specificPatient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(setSpecificPatient(specificPatient));
            } catch (err) {
                console.log(err);
            }
        };
        if(patients[id] && patients[id].ssn) {
            setPatient(patients[id]);
        } else {
            void fetchedPatient();
        }
    }, [id]);

    const genderIcon = (gender: Gender): SemanticICONS => {
        switch(gender) {
            case "male":
                return "mars";
            case "female":
                return "venus";
            default:
                return "genderless";
        }
    };
    return (
        <>
            {patient && (
                <>
                <Card>
                    <Card.Content>
                        <Card.Header>
                            {patient.name}
                            <Icon name={genderIcon(patient.gender)} />
                        </Card.Header>
                        <Card.Description>
                            {`occupation : ${patient.occupation}`} <br />
                            {`ssn: ${patient.ssn}`}
                        </Card.Description>                    
                    </Card.Content>
                </Card>
                <Segment>
                    <h2>Entries</h2>
                    {patient.entries.map(entry =>
                    <div key={entry.id} style={{
                        margin: "10px",
                        border: "2px"
                    }}> 
                        <SpecificEntry entry={entry} />
                    </div>
                    )}
                </Segment>
                <AddEntryModal />
                </>
            )}
        </>
    );
};

export default SpecificPatient;