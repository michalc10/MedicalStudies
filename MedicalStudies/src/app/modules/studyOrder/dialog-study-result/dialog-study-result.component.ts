import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogPatientComponent } from '../../patients/dialog-patient/dialog-patient.component';
import { StudyOrderService } from '../study-order.service';
import { StudyOrder } from '../studyOrder';

@Component({
  selector: 'app-dialog-study-result',
  templateUrl: './dialog-study-result.component.html',
  styleUrls: ['./dialog-study-result.component.scss']
})
export class DialogStudyResultComponent implements OnInit {

  studyForm!: FormGroup;

  constructor(
    private formBilder: FormBuilder,
    private studyService: StudyOrderService,
    @Inject(MAT_DIALOG_DATA) public incomingData: any,
    private dialogRef: MatDialogRef<DialogPatientComponent>
    ) { }

  ngOnInit(): void {
    this.studyForm = this.formBilder.group({
      description: ['', Validators.required],
    })

  }
  changeStudy(){
    if (this.studyForm.valid) {
      const value: StudyOrder = {
        id: this.incomingData.id,
        dateOfStudy: this.incomingData.dateOfStudy,
        dateOfAssignmentOfStudy: this.incomingData.dateOfAssignmentOfStudy,
        idProject: this.incomingData.idProject,
        nameProject: this.incomingData.nameProject,
        idPatient: this.incomingData.idPatient,
        namePatient: this.incomingData.namePatient,
        description: this.studyForm.value.description
      }
      this.studyService.putStudyOrder(value, this.incomingData.id)
        .subscribe({
          next: (res) => {
            alert("Edit study for patient");
            this.studyForm.reset();
            this.dialogRef.close('update');

          },
          error: (err) => {
            console.log(err)
          }
        })
    
    }
  }
}
