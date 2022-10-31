import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './modules/commons/navbar/navbar.component';
import { PatientsComponent } from './modules//patients/patients/patients.component';
import { DataTablesModule } from "angular-datatables";
import { MatDialogModule } from '@angular/material/dialog';
import { DialogPatientComponent } from './modules/patients/dialog-patient/dialog-patient.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProjectsComponent } from './modules/projects/projects/projects.component';
import { DialogProjectComponent } from './modules/projects/dialog-project/dialog-project.component';
import { PatientsInProjectsComponent } from './modules/patientsInProjects/patients-in-projects/patients-in-projects.component';
import { MatListModule } from '@angular/material/list';
import { DialogPatientsInProjectsComponent } from './modules/patientsInProjects/dialog-patients-in-projects/dialog-patients-in-projects.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { StudyOrderComponent } from './modules/studyOrder/study-order/study-order.component';
import { DialogStudyOrderComponent } from './modules/studyOrder/dialog-study-order/dialog-study-order.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PatientsComponent,
    DialogPatientComponent,
    ProjectsComponent,
    DialogProjectComponent,
    PatientsInProjectsComponent,
    DialogPatientsInProjectsComponent,
    StudyOrderComponent,
    DialogStudyOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
