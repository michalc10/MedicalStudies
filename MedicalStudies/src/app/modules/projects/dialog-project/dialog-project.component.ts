import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ProjectService } from '../project.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core'


@Component({
  selector: 'app-dialog-project',
  templateUrl: './dialog-project.component.html',
  styleUrls: ['./dialog-project.component.scss']
})
export class DialogProjectComponent implements OnInit {


  projectForm!: FormGroup

  constructor(
    private formBilder: FormBuilder,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogProjectComponent>
  ) { }

  ngOnInit(): void {
    this.projectForm = this.formBilder.group({
      name: ['', Validators.required]
    })

    if (this.editData) {
      this.projectForm.controls['name'].setValue(this.editData.name)
    }
  }

  addProject() {
    if (this.projectForm.valid) {
      if (!this.editData) {
        this.projectService.postProject(this.projectForm.value)
          .subscribe({
            next: (res) => {
              this.projectForm.reset();
              this.dialogRef.close('save');
            },

            error: () => {
              alert("Error while adding project");
            }
          })
      }
      else{//update product
        this.projectService.putProject(this.projectForm.value, this.editData.id)
        .subscribe({
          next:(res)=>{
            this.projectForm.reset();
            this.dialogRef.close('update');
          },
          error:(err)=>{
            alert("Error while updating project");
          }
        }
          
        )
      }
    }

  }
}
