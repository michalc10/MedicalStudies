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
    this.studyOrderForm = this.formBilder.group({
      nameProject: ['', Validators.required],
      namePatient: ['', Validators.required],
      dateControl: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllProjects()
    this.getAllPatientsInProjects()
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
          console.log(projectList);
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
        },
        error: (err) => {
          // console.log(this.dataSource);
        }
      })
  }

  addStudyOrder() {
    if (this.studyOrderForm.valid) {

      const value: StudyOrder = {
        dateOfStudy: this.studyOrderForm.value.dateControl,
        dateOfAssignmentOfStudy: new Date(),
        idProject: this.studyOrderForm.value.nameProject.id,
        nameProject: this.studyOrderForm.value.nameProject.name,
        idPatient: this.studyOrderForm.value.namePatient.idPatient,
        namePatient: this.studyOrderForm.value.namePatient.namePatient,
      }
      this.studyOrderService.postStudyOrder(value)
        .subscribe({
          next: (res) => {
            alert("Added study for patient");
            this.studyOrderForm.reset();
            this.dialogRef.close('save');

          },
          error:(err)=> {
            
          }
        })




    }
  }

}
