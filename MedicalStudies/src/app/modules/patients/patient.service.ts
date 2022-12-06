import { Injectable } from '@angular/core';
import { Patient } from './patient'
import { HttpClient } from '@angular/common/http';
import { PatientsInProjectsService } from '../patientsInProjects/patients-in-projects.service';
import { PatientsInProjects } from '../patientsInProjects/patientsInProjects';

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  private api = "http://localhost:3000/patients/";
  constructor(
    private http: HttpClient
  ) {
  }

  postPatient(patient: Patient) {
    return this.http.post<any>(this.api, patient);
  }

  getPatients() {
    return this.http.get<any>(this.api);
  }

  putPatient(patient: Patient, id: number) {
    return this.http.put<any>(this.api + id, patient);
  }

  deletePatient(id: number) {
    return this.http.delete<any>(this.api + id);
  }




}
