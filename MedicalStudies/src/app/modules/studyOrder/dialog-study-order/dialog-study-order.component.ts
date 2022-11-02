import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientsInProjectsService } from '../../patientsInProjects/patients-in-projects.service';
import { PatientsInProjects } from '../../patientsInProjects/patientsInProjects';
import { Project } from '../../projects/project';
import { ProjectService } from '../../projects/project.service';
import { StudyOrderService } from '../study-order.service';
import { StudyOrder } from '../studyOrder';

@Component({
  selector: 'app-dialog-study-order',
  templateUrl: './dialog-study-order.component.html',
  styleUrls: ['./dialog-study-order.component.scss']
})
export class DialogStudyOrderComponent implements OnInit {

  studyOrderForm!: FormGroup
  projectsList: Project[] = []
  patientsInProjects: PatientsInProjects[] = []
  patientsInProjectsToSchow: PatientsInProjects[] = []
  today: String;


  constructor(
    private projestServis: ProjectService,
    private formBilder: FormBuilder,
    private patientsInProjectsService: PatientsInProjectsService,
    private studyOrderService: StudyOrderService,
    @Inject(MAT_DIALOG_DATA) public incomingData: any,
    private dialogRef: MatDialogRef<DialogStudyOrderComponent>,
  ) {
    this.today = new Date().toISOString().slice(0, -8);

  }

  ngOnInit(): void {
    this.studyOrderForm = this.formBilder.group({
      nameProject: ['', Validators.required],
      namePatient: ['', Validators.required],
      dateControl: ['', Validators.required],
    });
    this.getAllProjects();


  }


  selectProject(project: Project) {
    this.patientsInProjectsToSchow = this.patientsInProjects.filter((el) => el.idProject == project.id)
    this.studyOrderForm.value.namePatient = '';
  }

  getAllProjects() {
    this.projestServis.getProjects()
      .subscribe({
        next: (projectList) => {
          this.projectsList = projectList;

          this.getAllPatientsInProjects()
        },
        error: (err) => {

        }
      })

  }

  getAllPatientsInProjects() {
    this.patientsInProjectsService.getPatientsInProjects()
      .subscribe({
        next: (patientsInProjects) => {
          this.patientsInProjects = patientsInProjects.filter((el: PatientsInProjects) => el.approval)
          if (this.incomingData) {
            const project = this.projectsList!.find((el) => el.id == this.incomingData.idProject);
            this.patientsInProjectsToSchow = this.patientsInProjects.filter((el) => el.idProject == project!.id)
            const patient = this.patientsInProjectsToSchow.find((el) => el.idPatient == this.incomingData.idPatient)
            this.studyOrderForm.controls['nameProject'].setValue(project);
            this.studyOrderForm.controls['namePatient'].setValue(patient);
            this.studyOrderForm.controls['dateControl'].setValue(this.incomingData.dateOfStudy);
          }
        },
        error: (err) => {
          // console.log(this.dataSource);
        }
      })
  }

  addStudyOrder() {
    if (this.studyOrderForm.valid) {
      if (this.incomingData) {
        const value: StudyOrder = {
          id: this.incomingData.id,
          dateOfStudy: this.studyOrderForm.value.dateControl,
          dateOfAssignmentOfStudy: new Date(),
          idProject: this.studyOrderForm.value.nameProject.id,
          nameProject: this.studyOrderForm.value.nameProject.name,
          idPatient: this.studyOrderForm.value.namePatient.idPatient,
          namePatient: this.studyOrderForm.value.namePatient.namePatient,
          description:"Note"
        }
        console.log(value)
        this.studyOrderService.putStudyOrder(value, this.incomingData.id)
          .subscribe({
            next: (res) => {
              alert("Edit study for patient");
              this.studyOrderForm.reset();
              this.dialogRef.close('update');

            },
            error: (err) => {
              console.log(err)
            }
          })
      }
      else {
        
        const value: StudyOrder = {
          dateOfStudy: this.studyOrderForm.value.dateControl,
          dateOfAssignmentOfStudy: new Date(),
          idProject: this.studyOrderForm.value.nameProject.id,
          nameProject: this.studyOrderForm.value.nameProject.name,
          idPatient: this.studyOrderForm.value.namePatient.idPatient,
          namePatient: this.studyOrderForm.value.namePatient.namePatient,
          description:"Note"
        }
        this.studyOrderService.postStudyOrder(value)
          .subscribe({
            next: (res) => {
              alert("Added study for patient");
              this.studyOrderForm.reset();
              this.dialogRef.close('save');

            },
            error: (err) => {

            }
          });
      }
    }
  }

}
