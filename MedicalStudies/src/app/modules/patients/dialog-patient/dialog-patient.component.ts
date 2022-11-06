import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { PatientService } from '../patient.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core'

@Component({
  selector: 'app-dialog-patient',
  templateUrl: './dialog-patient.component.html',
  styleUrls: ['./dialog-patient.component.scss']
})
export class DialogPatientComponent implements OnInit {

  patientForm!: FormGroup;

  constructor(
    private formBilder: FormBuilder,
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogPatientComponent>
  ) { }

  ngOnInit(): void {
    this.patientForm = this.formBilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    })

    if (this.editData) {
      this.patientForm.controls['name'].setValue(this.editData.name)
      this.patientForm.controls['email'].setValue(this.editData.email)
    }
  }

  addPatient() {
    if (this.patientForm.valid) {
      if (!this.editData) {
        this.patientService.postPatient(this.patientForm.value)
          .subscribe({
            next: (res) => {
              alert("Patient added successfully");
              this.patientForm.reset();
              this.dialogRef.close( this.patientForm.value);
            },

            error: (err) => {
              console.log("Error while adding patient: ",err);
            }
          })
      }
      else{//update product
        this.patientService.putPatient(this.patientForm.value, this.editData.id)
        .subscribe({
          next:(res)=>{
            alert("Patient updated Successfully");
            this.patientForm.reset();
            this.dialogRef.close('update');
          },
          error:(err)=>{
            console.log("Error while updating patient", err);
          }
        }
          
        )
      }
    }

  }
}
