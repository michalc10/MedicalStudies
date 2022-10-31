import { Component, OnInit } from '@angular/core';
import { Project } from '../../projects/project';
import { ProjectService } from '../../projects/project.service';
import { ActivatedRoute } from '@angular/router';
import { PatientsInProjects } from '../patientsInProjects';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { DialogPatientsInProjectsComponent } from '../dialog-patients-in-projects/dialog-patients-in-projects.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PatientsInProjectsService } from '../patients-in-projects.service';

@Component({
  selector: 'app-patients-in-projects',
  templateUrl: './patients-in-projects.component.html',
  styleUrls: ['./patients-in-projects.component.scss']
})
export class PatientsInProjectsComponent implements OnInit {

  projects: Project[] = [];
  listData: PatientsInProjects[] = [];
  chosenProject?: Project;
  patientsInProjects: PatientsInProjects[] = [];

  displayedColumns: string[] = ['id', 'namePatient', 'approval', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private projectService: ProjectService,
    private _Activatedroute: ActivatedRoute,
    private patientsInProjectsService: PatientsInProjectsService,
    public dialog: MatDialog
  ) {

  }


  ngOnInit(): void {
    this.getAllProjects();
    this._Activatedroute.paramMap.subscribe(params => {
      this.getList(params.get('id'));
    })
  }

  getAllProjects() {
    this.projectService.getProjects()
      .subscribe({
        next: (res) => {
          this.projects = res
          this.getAllPatientsInProjects();
        },
        error: (err) => {
        }
      });
  }

  getAllPatientsInProjects() {

    this.patientsInProjectsService.getPatientsInProjects()
      .subscribe({
        next: (patientsInProjects) => {
          this.patientsInProjects = patientsInProjects;
          if (this.chosenProject) {
             this.getList(this.chosenProject.id);

          }

        },
        error: (err) => {
          // console.log(this.dataSource);
        }
      })
  }

  getList(id: any) {
    if (id) {
      this.chosenProject = this.projects.find((val) => val.id == id);
      this.updatDataSource()
    }

  }
  updatDataSource() {
    this.dataSource = new MatTableDataSource(this.patientsInProjects.filter((el: PatientsInProjects) => el.idProject === this.chosenProject!.id));
    

  }
  openDialog() {
    this.dialog.open(DialogPatientsInProjectsComponent, {
      width: '30%',
      data: this.chosenProject
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllPatientsInProjects()
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePatientInProject(id: number) {
    console.log(id);
    this.patientsInProjectsService.deletePatientsInProjects(id)
      .subscribe({
        next: (val) => {
          this.getAllPatientsInProjects();

        },
        error: (err) => {

        }
      });
  }

  changeCheckbox(row:PatientsInProjects){
    //ToDo!!!!
  }
}
