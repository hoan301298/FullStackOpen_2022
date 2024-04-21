/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";
import patientService from "../services/patientService";
import utils from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPublicEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);
  
    if (patient) {
      res.send(patient);
    } else {
      res.sendStatus(404);
    }
  });

router.post('/', (req, res) => {
    try {
        const newPatientEntry = utils.toNewPatientEntry(req.body);
        const addedEntry = patientService.addPatient(newPatientEntry);
        res.send(addedEntry);
    } catch (e) {
        res.sendStatus(400);
    }
});

router.post('/:id/entries', (req, res) => {
  const newPatientWithEntry = utils.toPatientWithEntry(req.body);
  const addedPatientEntry = patientService.addPatientWithEntries(
    newPatientWithEntry,
    req.params.id
  );
  res.send(addedPatientEntry);
});

export default router;