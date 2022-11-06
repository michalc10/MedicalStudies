import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { PatientsInProjectsService } from '../patients-in-projects.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core'
import { PatientService } from '../../patients/patient.service';
import { Patient } from '../../patients/patient';
import { PatientsInProjects } from '../patientsInProjects';

@Component({
  selector: 'app-dialog-patients-in-projects',
  templateUrl: './dialog-patients-in-projects.component.html',
  styleUrls: ['./dialog-patients-in-projects.component.scss']
})
export class DialogPatientsInProjectsComponent implements OnInit {

  patientForm!: FormGroup
  patientsList: Patient[] = []
  constructor(
    private formBilder: FormBuilder,
    private patientsInProjectsService: PatientsInProjectsService,
    @Inject(MAT_DIALOG_DATA) public incomingData: any,
    private dialogRef: MatDialogRef<DialogPatientsInProjectsComponent>,
    private patientService: PatientService,
  ) {
    this.patientForm = this.formBilder.group({
      namePatient: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllPatients();

  }

  getAllPatients() {
    this.patientService.getPatients()
      .subscribe({
        next: (res) => {
          // this.patientsList = res
          this.getAllPatientsInProjects(res)
        },
        error: (err) => {
          // console.log(this.dataSource);
        }
      })
  }
  getAllPatientsInProjects(patients: Patient[]) {
    this.patientsInProjectsService.getPatientsInProjects()
      .subscribe({
        next: (patientsInProjects) => {
          patientsInProjects = patientsInProjects.filter((el: PatientsInProjects) => el.idProject === this.incomingData.id)
          this.patientsList = patients.filter(pat => !patientsInProjects.some((el: PatientsInProjects) => el.idPatient === pat.id))


        },
        error: (err) => {
          // console.log(this.dataSource);
          console.log("Error while geting patients in projects: ", err);
        }
      })
  }

  addPatientsInProjects() {
    if (this.patientForm.valid) {
      console.log()
      this.patientForm.value!.namePatient.forEach((el: Patient) => {
        const value: PatientsInProjects = {
          idPatient: el.id,
          namePatient: el.name,
          idProject: this.incomingData.id,
          nameProject: this.incomingData.name,
          approval: false
        }
        this.patientsInProjectsService.postPatientsInProjects(value)
          .subscribe({
            next: (res) => {
              alert("Sucessfull while adding patient to project");
              this.patientForm.reset();
              this.dialogRef.close('save');
            },

            error: (err) => {
              console.log("Error while adding patient: ",err);
            }
          })

      });


    }
  }


}
