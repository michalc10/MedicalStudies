import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../projects/project';
import { ProjectService } from '../../projects/project.service';
import { ActivatedRoute } from '@angular/router';
import { PatientsInProjects } from '../patientsInProjects';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { DialogPatientsInProjectsComponent } from '../dialog-patients-in-projects/dialog-patients-in-projects.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PatientsInProjectsService } from '../patients-in-projects.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-patients-in-projects',
  templateUrl: './patients-in-projects.component.html',
  styleUrls: ['./patients-in-projects.component.scss']
})
export class PatientsInProjectsComponent implements OnInit {

  projects: Project[] = [];
  listData: PatientsInProjects[] = [];
  chosenProject!: Project;
  wasChoseProject: boolean;
  patientsInProjects: PatientsInProjects[] = [];

  displayedColumns: string[] = ['id', 'namePatient', 'approval', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private projectService: ProjectService,
    private _Activatedroute: ActivatedRoute,
    private patientsInProjectsService: PatientsInProjectsService,
    public dialog: MatDialog
  ) {
    this.wasChoseProject = false

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
          console.log("Error while gettings projects: ", err);
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
      this.chosenProject = this.projects.find((val) => val.id == id)!;
      if (id != 0) {
        this.updatDataSource()

      }
    }

  }
  updatDataSource() {

    if (this.chosenProject) {
      const tab = this.patientsInProjects.filter((el: PatientsInProjects) => el.idProject == this.chosenProject!.id)
      this.dataSource = new MatTableDataSource(tab);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.wasChoseProject = true;
    }

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
    this.patientsInProjectsService.deletePatientsInProjects(id)
      .subscribe({
        next: (val) => {
          this.getAllPatientsInProjects();

        },
        error: (err) => {
          console.log("Error while deleting patient in project: ", err);

        }
      });
  }

  changeCheckbox(row: PatientsInProjects) {
    row.approval = !row.approval
    this.patientsInProjectsService.putPatientsInProjects(row, row.id!)
      .subscribe({
        next: (val) => {
          this.getAllPatientsInProjects();
        },
        error: (err) => {
          console.log("Error while changing satus of patient: ", err);

        }
      })
  }


}
