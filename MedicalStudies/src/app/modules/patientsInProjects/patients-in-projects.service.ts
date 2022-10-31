import { Injectable } from '@angular/core';
import { PatientsInProjects } from './patientsInProjects';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsInProjectsService {

  constructor(private http: HttpClient) {
  }

  postPatientsInProjects(patientsInProjects: PatientsInProjects) {
    return this.http.post<any>("http://localhost:3000/patientsInProjects/", patientsInProjects);
  }

  getPatientsInProjects() {
    return this.http.get<any>("http://localhost:3000/patientsInProjects/");
  }

  putPatientsInProjects(patientsInProjects: PatientsInProjects,id:number) {
    return this.http.put<any>("http://localhost:3000/patientsInProjects/" + id, patientsInProjects);
  }

  deletePatientsInProjects(id:number){
    return this.http.delete<any>("http://localhost:3000/patientsInProjects/" + id);
  }
}
