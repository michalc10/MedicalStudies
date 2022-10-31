import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogStudyOrderComponent } from '../dialog-study-order/dialog-study-order.component';

@Component({
  selector: 'app-study-order',
  templateUrl: './study-order.component.html',
  styleUrls: ['./study-order.component.scss']
})
export class StudyOrderComponent implements OnInit {

  constructor(
    public dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(DialogStudyOrderComponent, {
      width: '30%',
      // data: this.chosenProject
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        // this.getAllPatientsInProjects()
      }
    });
  }
}
