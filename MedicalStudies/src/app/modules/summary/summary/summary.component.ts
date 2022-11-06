import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Patient } from '../../patients/patient';
import { PatientService } from '../../patients/patient.service';
import { PatientsInProjectsService } from '../../patientsInProjects/patients-in-projects.service';
import { Project } from '../../projects/project';
import { ProjectService } from '../../projects/project.service';
import { StudyOrderService } from '../../studyOrder/study-order.service';
import { PatientsInProjects } from '../../patientsInProjects/patientsInProjects'
import { StudyOrder } from '../../studyOrder/studyOrder';
import { projectCount } from '../projectsCount';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  public chart: any;
  public chart2: any;
  patientList: Patient[] = [];
  projectList: Project[] = [];
  patientsINProjectsList: PatientsInProjects[] = [];
  studyList: StudyOrder[] = [];

  sumaryPatientsInProjects: projectCount[] = [];


  constructor(private patientService: PatientService,
    private projectService: ProjectService,
    private patientsInProjectsService: PatientsInProjectsService,
    private studyOrderService: StudyOrderService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients() {
    this.patientService.getPatients()
      .subscribe({
        next: (res) => {
          this.patientList = res;
          this.getAllProjects();
        },
        error: (err) => {
          console.log("Error while getting patients: ",err)
        }
      })
  }

  getAllProjects() {
    this.projectService.getProjects()
      .subscribe({
        next: (res) => {
          this.projectList = res;
          this.getAllPatientsInProjects()
        },
        error: (err) => {
          console.log("Error while getting projects: ",err)
        }
      })
  }

  getAllPatientsInProjects() {

    this.patientsInProjectsService.getPatientsInProjects()
      .subscribe({
        next: (patientsInProjects) => {
          this.patientsINProjectsList = patientsInProjects;
          this.getAllStudyOrders();
        },
        error: (err) => {
          console.log("Error while getting patients in projects: ",err)
        }
      })
  }

  getAllStudyOrders() {
    this.studyOrderService.getStudyOrder()
      .subscribe({
        next: (studies) => {
          this.studyList = studies
          this.createCharts()
        },
        error: (err) => {
          console.log("Error while getting study orders: ",err)
        }
      })
  }

  createCharts() {

    this.projectList.forEach((el) => {

      const tab = this.patientsINProjectsList.filter(((val) => val.idProject == el.id))

      const before:StudyOrder[] = this.studyList.filter((val) => new Date(val.dateOfStudy) >= new Date())
      const after = this.studyList.filter((val) => new Date(val.dateOfStudy) < new Date())
      const beforeTab = before.filter((val:StudyOrder) => val.idProject == el.id)
      const afterTab = after.filter((val:StudyOrder) => val.idProject == el.id)
      const val: projectCount = {
        idProject: el.id,
        nameProject: el.name.toString(),
        allPatients: tab.length,
        permitPatients: tab.filter((val) => val.approval).length,
        beforeStudy: beforeTab.length,
        afterStudy:afterTab.length
      }
      this.sumaryPatientsInProjects.push(val);
    });

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.sumaryPatientsInProjects.map((el) => el.nameProject),
        datasets: [
          {
            label: "all Patients",
            data: this.sumaryPatientsInProjects.map((el) => el.allPatients),

            backgroundColor: 'blue'
          },
          {
            label: "permit Patients",
            data: this.sumaryPatientsInProjects.map((el) => el.permitPatients),

            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
      }

    });


    this.chart2 = new Chart("MyChart2", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.sumaryPatientsInProjects.map((el) => el.nameProject),
        datasets: [
          {
            label: "before Study",
            data: this.sumaryPatientsInProjects.map((el) => el.beforeStudy),

            backgroundColor: 'blue'
          },
          {
            label: "after Study",
            data: this.sumaryPatientsInProjects.map((el) => el.afterStudy),

            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });

    
  }
}
