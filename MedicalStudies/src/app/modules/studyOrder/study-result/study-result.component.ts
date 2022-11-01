import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogStudyResultComponent } from '../dialog-study-result/dialog-study-result.component';
import { StudyOrderService } from '../study-order.service';
import { StudyOrder } from '../studyOrder';

@Component({
  selector: 'app-study-result',
  templateUrl: './study-result.component.html',
  styleUrls: ['./study-result.component.scss']
})
export class StudyResultComponent implements OnInit {

   
  displayedColumns: string[] = ['id', 'dateOfStudy','nameProject', 'namePatient','description', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private studyOrderService:StudyOrderService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllStudyOrders()
  }

  getAllStudyOrders(){
    this.studyOrderService.getStudyOrder()
    .subscribe({
      next:(studies)=>{
        studies = studies.filter((el:StudyOrder)=> {return new Date(el.dateOfStudy) < new Date()})
        this.dataSource = new MatTableDataSource(studies);
        this.dataSource.paginator=  this.paginator ;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  editValueDialog(row: any) {
    console.log("row: ",row)
    this.dialog.open(DialogStudyResultComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllStudyOrders()
      }
    });
  }

  deleteRow(id:number){
    this.studyOrderService.deleteStudyOrder(id)
    .subscribe({
      next:(val)=>{
        this.getAllStudyOrders()

      },
      error:(err)=>{
        
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
