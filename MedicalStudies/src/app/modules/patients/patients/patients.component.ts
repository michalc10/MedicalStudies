import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogPatientComponent } from '../dialog-patient/dialog-patient.component';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  patients: Patient[] = [];
  dtOptions: DataTables.Settings = {};

  displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private patientService: PatientService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllPatients();
  }

  openDialog() {
    this.dialog.open(DialogPatientComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllPatients()
      }
    })
  }

  getAllPatients() {
    this.patientService.getPatients()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          // console.log(this.dataSource);
        }
      })
  }

  editPatient(row: any) {
    this.dialog.open(DialogPatientComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllPatients()
      }
    });
  }

  deletePatient(id: number) {
    console.log("hej")
    this.patientService.deletePatient(id)
      .subscribe({
        next: (res) => {
          this.getAllPatients();
          alert("Patient was delete");
        },
        error: (err) => {
          alert("Error while deleting patient");
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
