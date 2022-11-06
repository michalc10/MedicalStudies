import { Injectable } from '@angular/core';
import { Patient } from './patient'
import { HttpClient } from '@angular/common/http';
import { PatientsInProjectsService } from '../patientsInProjects/patients-in-projects.service';
import { PatientsInProjects } from '../patientsInProjects/patientsInProjects';

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  private patientsInProjects: PatientsInProjects[] = []
  constructor(
    private http: HttpClient,
    private patientsInProjectsService: PatientsInProjectsService,
  ) {
  }

  postPatient(patient: Patient) {
    return this.http.post<any>("http://localhost:3000/patients/", patient);
  }

  getPatients() {
    return this.http.get<any>("http://localhost:3000/patients/");
  }

  putPatient(patient: Patient, id: number) {
    // this.changePatientsInProjects(patient)

    return this.http.put<any>("http://localhost:3000/patients/" + id, patient);
  }

  deletePatient(id: number) {
    // if (this.patientsInProjects.length == 0) {
    //   this.deletePatientsInProjects(id)
    // }
    // else {
    // }
    return this.http.delete<any>("http://localhost:3000/patients/" + id);
  }



  changePatientsInProjects(patient: Patient) {
    this.patientsInProjectsService.getPatientsInProjects()
      .subscribe({
        next: (val) => {
          val.filter((el:PatientsInProjects)=>el.idPatient == patient.id)
          .forEach((element:PatientsInProjects) => {
            const el: PatientsInProjects = {
              id: element.id,
              idProject: element.idProject,
              nameProject: element.nameProject,
              idPatient: element.idPatient,
              namePatient: patient.name,
              approval: element.approval
            }
            
          });
        }
      })
  }

  deletePatientsInProjects(idPatient: Number) {

  }

}
