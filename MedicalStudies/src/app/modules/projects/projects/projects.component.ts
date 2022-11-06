import { Component, OnInit, ViewChild  } from '@angular/core';
import { Project } from '../project';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from '../project.service';
import { DialogProjectComponent } from '../dialog-project/dialog-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  dtOptions: DataTables.Settings = {};

  displayedColumns: string[] = ['id', 'name','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private projectService: ProjectService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  openDialog() {
    this.dialog.open(DialogProjectComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllProjects();
        alert("Project added successfully");
      }
    })
  }
  
  editProject(row: any) {
    this.dialog.open(DialogProjectComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      console.log(val)
      if (val == 'update') {
        this.getAllProjects();
        alert("Project updated Successfully");
      }
    });
  }

  getAllProjects() {
    this.projectService.getProjects()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log("Error while geting projects: ",err);
        }
      })
  }
 

  deleteProject(id: number) {
    this.projectService.deleteProject(id)
      .subscribe({
        next: (res) => {
          this.getAllProjects();
          alert("Project was delete");
        },
        error: (err) => {
          console.log("Error while deleting project: ",err);
        }
      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
