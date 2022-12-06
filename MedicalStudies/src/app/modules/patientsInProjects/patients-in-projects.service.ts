import { Injectable } from '@angular/core';
import { PatientsInProjects } from './patientsInProjects';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsInProjectsService {

  private api= "http://localhost:3000/patientsInProjects/";
  constructor(private http: HttpClient) {
  }

  postPatientsInProjects(patientsInProjects: PatientsInProjects) {
    return this.http.post<any>(this.api, patientsInProjects);
  }

  getPatientsInProjects() {
    return this.http.get<any>(this.api);
  }

  putPatientsInProjects(patientsInProjects: PatientsInProjects,id:number) {
    return this.http.put<any>(this.api + id, patientsInProjects);
  }

  deletePatientsInProjects(id:number){
    return this.http.delete<any>(this.api + id);
  }
}
