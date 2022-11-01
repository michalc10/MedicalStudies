import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogStudyOrderComponent } from '../dialog-study-order/dialog-study-order.component';
import { StudyOrderService } from '../study-order.service';

@Component({
  selector: 'app-study-order',
  templateUrl: './study-order.component.html',
  styleUrls: ['./study-order.component.scss']
})
export class StudyOrderComponent implements OnInit {

  
  displayedColumns: string[] = ['id', 'dateOfStudy','dateOfAssignmentOfStudy','nameProject', 'namePatient', 'action'];
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
      next:(val)=>{
        this.dataSource = new MatTableDataSource(val);
        this.dataSource.paginator=  this.paginator ;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  openDialog() {
    this.dialog.open(DialogStudyOrderComponent, {
      width: '30%',
      // data: this.chosenProject
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllStudyOrders()
      }
    });
  }

  editValueDialog(row: any) {
    console.log("row: ",row)
    this.dialog.open(DialogStudyOrderComponent, {
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
