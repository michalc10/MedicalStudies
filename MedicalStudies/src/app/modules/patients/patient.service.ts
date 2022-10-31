import { Injectable } from '@angular/core';
import { Patient } from './patient'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  constructor(private http: HttpClient) {
  }

  postPatient(patient: Patient) {
    return this.http.post<any>("http://localhost:3000/patients/", patient);
  }

  getPatients() {
    return this.http.get<any>("http://localhost:3000/patients/");
  }

  putPatient(patient: Patient,id:number) {
    return this.http.put<any>("http://localhost:3000/patients/" + id, patient);
  }

  deletePatient(id:number){
    return this.http.delete<any>("http://localhost:3000/patients/" + id);
  }

}
