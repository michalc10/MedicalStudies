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
          // console.log(this.dataSource);
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
          // console.log(this.dataSource);
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
          // console.log(this.dataSource);
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
          console.log(err);
        }
      })
  }

  createCharts() {

    this.projectList.forEach((el) => {
      const tab = this.patientsINProjectsList.filter(((val) => val.idProject == el.id))
      const val: projectCount = {
        idProject: el.id,
        nameProject: el.name.toString(),
        allPatients: tab.length,
        permitPatients: tab.filter((val) => val.approval).length,
      }
      this.sumaryPatientsInProjects.push(val);
    });

    console.log(this.sumaryPatientsInProjects)
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
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });

    const chart3 = new Chart("MyChart3", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
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
