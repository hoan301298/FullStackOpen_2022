import diagnosesEntries from '../data/diagnosesEntries';

import { DiagnoseEntry } from '../types';

const getEntries = (): DiagnoseEntry[]               => {
    return diagnosesEntries;
};

const addEntry = () => {
    return null;
};

export default {
    getEntries,
    addEntry
};