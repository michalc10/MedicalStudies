import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './modules/patients/patients/patients.component';
import { PatientsInProjectsComponent } from './modules/patientsInProjects/patients-in-projects/patients-in-projects.component';
import { ProjectsComponent } from './modules/projects/projects/projects.component';
import { StudyOrderComponent } from './modules/studyOrder/study-order/study-order.component';
import { StudyResultComponent } from './modules/studyOrder/study-result/study-result.component';

const routes: Routes = [
  { path: '', redirectTo: '/patients', pathMatch: 'full' },
  { path: 'patients', component: PatientsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'patientsInProjects', component: PatientsInProjectsComponent },
  { path: 'patientsInProjects/:id', component: PatientsInProjectsComponent },
  { path: 'studyOrder', component: StudyOrderComponent },
  { path: 'studyResult', component: StudyResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
